const fs = require('fs');

let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

// We will overwrite AppContext.tsx completely, keeping the issues, offline state, language and search.
const newCode = `import React, { createContext, useContext, useState, useEffect } from 'react';
import { Issue, IssueStatus, AuthState, User, CitizenUser, GovUser } from '../types';
import { MOCK_ISSUES } from '../data';
import { translations, LanguageCode } from '../translations';

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
  user: User | null;
  
  loginCitizen: (user: CitizenUser) => void;
  loginGov: (user: GovUser) => void;
  logoutCitizen: () => void;
  logoutGov: () => void;
  switchToCitizen: () => void;
  switchToGov: () => void;
  
  // Legacy support for onboarding flow inside AuthFlow component
  onboardingState: AuthState;
  setOnboardingState: (state: AuthState) => void;
  
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: keyof typeof translations.en) => string;
  resetDemoData: () => void;
  globalSearch: string;
  setGlobalSearch: (s: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>(MOCK_ISSUES);
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState<Issue[]>([]);
  
  // Initialize language strictly from separate key
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('civic_language') as LanguageCode | null;
    return stored && ['en', 'ta', 'hi'].includes(stored) ? stored : 'en';
  });

  // Auth Manager State
  const [auth, setAuth] = useState<GlobalAuthState>({
    citizenSession: null,
    governmentSession: null,
    activeRole: 'none'
  });
  
  // Temporary state for the AuthFlow screen
  const [onboardingState, setOnboardingState] = useState<AuthState>('NOT_AUTHENTICATED');
  
  const [globalSearch, setGlobalSearch] = useState('');

  // Initial load
  useEffect(() => {
    try {
      const cSessionStr = localStorage.getItem('civicpulse_citizen_session');
      const gSessionStr = localStorage.getItem('civicpulse_government_session');
      const storedRole = localStorage.getItem('civicpulse_active_role');
      
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
    localStorage.setItem('civicpulse_citizen_session', JSON.stringify(cUser));
    localStorage.setItem('civicpulse_active_role', 'citizen');
    setAuth(prev => ({
      ...prev,
      citizenSession: cUser,
      activeRole: 'citizen'
    }));
  };

  const loginGov = (gUser: GovUser) => {
    localStorage.setItem('civicpulse_government_session', JSON.stringify(gUser));
    localStorage.setItem('civicpulse_active_role', 'government');
    setAuth(prev => ({
      ...prev,
      governmentSession: gUser,
      activeRole: 'government'
    }));
  };

  const logoutCitizen = () => {
    localStorage.removeItem('civicpulse_citizen_session');
    setAuth(prev => {
      const isCurrentlyCitizen = prev.activeRole === 'citizen';
      if (isCurrentlyCitizen) {
        localStorage.removeItem('civicpulse_active_role');
      }
      return {
        ...prev,
        citizenSession: null,
        activeRole: isCurrentlyCitizen ? 'none' : prev.activeRole
      };
    });
  };

  const logoutGov = () => {
    localStorage.removeItem('civicpulse_government_session');
    setAuth(prev => {
      const isCurrentlyGov = prev.activeRole === 'government';
      if (isCurrentlyGov) {
        localStorage.removeItem('civicpulse_active_role');
      }
      return {
        ...prev,
        governmentSession: null,
        activeRole: isCurrentlyGov ? 'none' : prev.activeRole
      };
    });
  };

  const switchToCitizen = () => {
    localStorage.removeItem('civicpulse_government_session');
    localStorage.removeItem('civicpulse_active_role');
    setAuth(prev => ({
      ...prev,
      governmentSession: null,
      activeRole: 'none'
    }));
  };

  const switchToGov = () => {
    localStorage.removeItem('civicpulse_citizen_session');
    localStorage.removeItem('civicpulse_active_role');
    setAuth(prev => ({
      ...prev,
      citizenSession: null,
      activeRole: 'none'
    }));
  };

  useEffect(() => {
    if (!isOffline && offlineQueue.length > 0) {
      setTimeout(() => {
        setIssues(prev => [...offlineQueue.map(i => ({...i, isOfflineSync: false})), ...prev]);
        setOfflineQueue([]);
        alert(\`Successfully synced \${offlineQueue.length} offline reports.\`);
      }, 1500);
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
          id: \`t-\${Date.now()}\`,
          title: \`Status updated to \${status}\`,
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
          timeline: [...issue.timeline, { id: \`t-\${Date.now()}\`, title: \`Assigned to \${assignee}\`, timestamp: new Date().toISOString(), status: 'Assigned', description: 'Manual assignment via Dashboard' }],
          updatedAt: new Date().toISOString() 
        };
      }
      return issue;
    }));
  };

  const toggleOffline = () => setIsOffline(prev => !prev);
  
  const user = auth.activeRole === 'citizen' ? auth.citizenSession : (auth.activeRole === 'government' ? auth.governmentSession : null);

  return (
    <AppContext.Provider value={{ 
      issues, addIssue, updateIssueStatus, updateIssueAssignment,
      isOffline, toggleOffline, offlineQueue,
      auth, user,
      loginCitizen, loginGov, logoutCitizen, logoutGov, switchToCitizen, switchToGov,
      onboardingState, setOnboardingState,
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
`;

fs.writeFileSync('src/context/AppContext.tsx', newCode);
