import React, { createContext, useContext, useState, useEffect } from 'react';
import { Issue, IssueStatus, AuthState, User, CitizenUser, GovUser } from '../types';
import { MOCK_ISSUES } from '../data';
import { translations, LanguageCode } from '../translations';
import { ReportService } from '../services/api';

export interface GlobalAuthState {
  citizenSession: CitizenUser | null;
  governmentSession: GovUser | null;
  activeRole: 'none' | 'citizen' | 'government';
}

interface AppContextType {
  issues: Issue[];
  addIssue: (issue: Issue) => void;
  updateIssueStatus: (id: string, status: IssueStatus, comment?: string, afterImage?: string) => void;
  updateIssueAssignment: (id: string, assignee: string) => void;
  isOffline: boolean;
  toggleOffline: () => void;
  offlineQueue: Issue[];
  
  // New Auth Manager
  auth: GlobalAuthState;
  user: User | null; // Aliased for backwards compatibility
  
  loginCitizen: (user: CitizenUser) => void;
  loginGov: (user: GovUser) => void;
  logoutCitizen: () => void;
  logoutGov: () => void;
  switchToCitizen: () => void;
  switchToGov: () => void;
  
  // Keep activeApp for components that rely on it conditionally
  activeApp: 'CITIZEN' | 'GOV' | null;
  
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  govLanguage: LanguageCode;
  setGovLanguage: (lang: LanguageCode) => void;
  t: (key: keyof typeof translations.en) => string;
  govT: (key: string) => string;
  resetDemoData: () => void;
  globalSearch: string;
  setGlobalSearch: (s: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>(MOCK_ISSUES);
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState<Issue[]>([]);
  
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('civic_language') as LanguageCode | null;
    return stored && ['en', 'ta', 'hi'].includes(stored) ? stored : 'en';
  });
  
  const [govLanguage, setGovLanguageState] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('civic_gov_language') as LanguageCode | null;
    return stored && ['en', 'ta', 'hi'].includes(stored) ? stored : 'en';
  });

  const setGovLanguage = (lang: LanguageCode) => {
    setGovLanguageState(lang);
    localStorage.setItem('civic_gov_language', lang);
  };

  const [auth, setAuth] = useState<GlobalAuthState>({
    citizenSession: null,
    governmentSession: null,
    activeRole: 'none'
  });
  
  const [globalSearch, setGlobalSearch] = useState('');


  useEffect(() => {
    const stored = localStorage.getItem('civic_language');
    if (stored) return; // User already set preference

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Simulated reverse geocoding for prototype. 
            // In a real app, this would call a geocoding API.
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            // Rough bounding boxes for prototype demo
            let detectedLang = 'en';
            if (lat > 8.0 && lat < 13.5 && lng > 76.0 && lng < 80.3) {
              detectedLang = 'ta'; // Tamil Nadu rough bounds
            } else if (lat > 20.0 && lat < 30.0 && lng > 73.0 && lng < 85.0) {
              detectedLang = 'hi'; // North/Central India rough bounds (Hindi)
            }
            // For the demo, if we don't match, we fallback to English
            setLanguageState(detectedLang);
          } catch (e) {
            console.error("Geocoding failed", e);
          }
        },
        (error) => {
          console.error("Location access denied or failed", error);
        }
      );
    }
  }, []);

  // Initial load
  useEffect(() => {
    try {
      const cSessionStr = localStorage.getItem('civic_citizen_session');
      const gSessionStr = localStorage.getItem('civic_government_session');
      const storedRole = localStorage.getItem('civic_active_role');
      
      const cSession = cSessionStr ? JSON.parse(cSessionStr) : null;
      const gSession = gSessionStr ? JSON.parse(gSessionStr) : null;
      
      let initialRole: 'none' | 'citizen' | 'government' = 'none';
      if (storedRole === 'citizen' || storedRole === 'government') {
        initialRole = storedRole;
      }
      
      setAuth({
        citizenSession: cSession,
        governmentSession: gSession,
        activeRole: initialRole
      });
    } catch (e) {
      console.error("Failed to parse sessions", e);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('civic_language', lang);
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key] || key;
  };

  const resetDemoData = () => {
    setIssues(MOCK_ISSUES);
    setOfflineQueue([]);
  };

  const loginCitizen = (cUser: CitizenUser) => {
    localStorage.setItem('civic_citizen_session', JSON.stringify(cUser));
    localStorage.setItem('civic_active_role', 'citizen');
    setAuth(prev => ({
      ...prev,
      citizenSession: cUser,
      activeRole: 'citizen'
    }));
  };

  const loginGov = (gUser: GovUser) => {
    localStorage.setItem('civic_government_session', JSON.stringify(gUser));
    localStorage.setItem('civic_active_role', 'government');
    setAuth(prev => ({
      ...prev,
      governmentSession: gUser,
      activeRole: 'government'
    }));
  };

  const logoutCitizen = () => {
    localStorage.removeItem('civic_citizen_session');
    setAuth(prev => {
      const isCurrentlyCitizen = prev.activeRole === 'citizen';
      if (isCurrentlyCitizen) {
        localStorage.removeItem('civic_active_role');
      }
      return {
        ...prev,
        citizenSession: null,
        activeRole: isCurrentlyCitizen ? 'none' : prev.activeRole
      };
    });
  };

  const logoutGov = () => {
    localStorage.removeItem('civic_government_session');
    setAuth(prev => {
      const isCurrentlyGov = prev.activeRole === 'government';
      if (isCurrentlyGov) {
        localStorage.removeItem('civic_active_role');
      }
      return {
        ...prev,
        governmentSession: null,
        activeRole: isCurrentlyGov ? 'none' : prev.activeRole
      };
    });
  };

  const switchToCitizen = () => {
    logoutGov();
  };

  const switchToGov = () => {
    logoutCitizen();
  };

  useEffect(() => {
    if (!isOffline && offlineQueue.length > 0) {
      const syncQueue = async () => {
        let syncedCount = 0;
        const remainingQueue = [...offlineQueue];
        
        for (const issue of offlineQueue) {
          try {
            const formData = new FormData();
            formData.append('description', issue.description);
            formData.append('language', issue.originalLanguage);
            formData.append('latitude', issue.lat.toString());
            formData.append('longitude', issue.lng.toString());
            formData.append('city', issue.city);
            formData.append('state', issue.state);
            formData.append('address', issue.location);
            const dummyBlob = new Blob(['dummy image content'], { type: 'image/jpeg' });
            formData.append('image', dummyBlob, 'photo.jpg');

            const data = await ReportService.createReport(formData);
            // Add the real mapped issue to state
            setIssues(prev => [{ ...issue, id: data.report_id, isOfflineSync: false }, ...prev]);
            syncedCount++;
            
            // Remove from remaining queue
            const index = remainingQueue.findIndex(i => i.id === issue.id);
            if (index > -1) remainingQueue.splice(index, 1);
          } catch (e) {
            console.error('Failed to sync report', e);
          }
        }
        
        setOfflineQueue(remainingQueue);
        if (syncedCount > 0) {
          alert(`Successfully synced ${syncedCount} offline reports to backend.`);
        }
      };
      
      syncQueue();
    }
  }, [isOffline, offlineQueue]);

  const addIssue = (issue: Issue) => {
    if (isOffline) {
      setOfflineQueue(prev => [issue, ...prev]);
    } else {
      setIssues(prev => [issue, ...prev]);
    }
  };

  const updateIssueStatus = (id: string, status: IssueStatus, comment?: string, afterImage?: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        const newTimeline = [...issue.timeline, {
          id: `t-${Date.now()}`,
          title: `Status updated to ${status}`,
          timestamp: new Date().toISOString(),
          status: status,
          description: comment || 'System update'
        }];
        let newImages = issue.images;
        if (afterImage) newImages = { ...newImages, after: afterImage };
        return { ...issue, status, timeline: newTimeline, images: newImages, updatedAt: new Date().toISOString() };
      }
      return issue;
    }));
  };

  const updateIssueAssignment = (id: string, assignee: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        return { 
          ...issue, assignee, status: 'Assigned',
          timeline: [...issue.timeline, { id: `t-${Date.now()}`, title: `Assigned to ${assignee}`, timestamp: new Date().toISOString(), status: 'Assigned', description: 'Manual assignment via Dashboard' }],
          updatedAt: new Date().toISOString() 
        };
      }
      return issue;
    }));
  };

  const toggleOffline = () => setIsOffline(prev => !prev);
  
  const user = auth.activeRole === 'citizen' ? auth.citizenSession : (auth.activeRole === 'government' ? auth.governmentSession : null);
  const activeApp = auth.activeRole === 'citizen' ? 'CITIZEN' : (auth.activeRole === 'government' ? 'GOV' : null);

  return (
    <AppContext.Provider value={{
        govLanguage,
        setGovLanguage,
        govT, 
        issues, addIssue, updateIssueStatus, updateIssueAssignment,
      isOffline, toggleOffline, offlineQueue,
      auth, user,
      loginCitizen, loginGov, logoutCitizen, logoutGov, switchToCitizen, switchToGov,
      activeApp,
      language, setLanguage, t, resetDemoData,
      globalSearch, setGlobalSearch
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
