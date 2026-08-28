import React, { useState } from 'react';
import { 
  LayoutDashboard, Map as MapIcon, Layers, Users, Truck, AlertTriangle, 
  MessageSquare, BarChart3, Settings, Search, Bell, UserCircle, Menu, LogOut, DatabaseBackup
} from 'lucide-react';
import { GovOverview } from './screens/Overview';
import { GovLiveMap } from './screens/LiveMap';
import { GovIssueQueue } from './screens/IssueQueue';
import { GovIssueDetail } from './screens/IssueDetail';
import { GovAnalytics } from './screens/Analytics';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { GovUser } from '../types';

export type GovScreen = 'overview' | 'map' | 'queue' | 'departments' | 'field' | 'sla' | 'reports' | 'analytics' | 'hotspots' | 'settings' | 'issue_detail';

export const GovApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<GovScreen>('overview');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const { auth, logoutGov, switchToCitizen, resetDemoData, issues, globalSearch, setGlobalSearch, govLanguage, setGovLanguage, govT } = useApp();
  const navigate = useNavigate();
  const currentUser = auth.governmentSession;
  

  const navigateTo = (screen: GovScreen, issueId?: string) => {
    if (issueId) setSelectedIssueId(issueId);
    setCurrentScreen(screen);
  };

  const getNavItems = () => {
    const role = currentUser?.role;
    const items = [];

    // All roles see basic operational things
    items.push({ id: 'overview', label: govT('nav_overview'), icon: LayoutDashboard });
    items.push({ id: 'map', label: govT('nav_live_map'), icon: MapIcon });
    
    const activeCount = issues.filter(i => !['Resolved', 'Closed'].includes(i.status)).length;
    items.push({ id: 'queue', label: govT('nav_issue_queue'), icon: Layers, badge: activeCount > 0 ? activeCount : undefined });
    
    items.push({ id: 'departments', label: govT('nav_departments'), icon: Users });
    items.push({ id: 'field', label: govT('nav_field_ops'), icon: Truck });
    
    const slaBreached = issues.filter(i => i.slaRemaining.startsWith('-')).length;
    items.push({ id: 'sla', label: govT('nav_sla_alerts'), icon: AlertTriangle, badge: slaBreached > 0 ? slaBreached : undefined });

    items.push({ id: 'reports', label: govT('nav_citizen_reports'), icon: MessageSquare });
    items.push({ id: 'analytics', label: govT('nav_analytics'), icon: BarChart3 });
    items.push({ id: 'hotspots', label: govT('nav_hotspots'), icon: MapIcon });
    items.push({ id: 'settings', label: govT('nav_settings'), icon: Settings });

    return items;
  };

  const navItems = getNavItems();

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      {/* GOV HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between shrink-0 z-30 text-white shadow-md">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('overview')}>
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">
            C
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-lg tracking-tight uppercase">CSCIRR</span>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Government Portal</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 relative">
          <div className="flex items-center space-x-3 text-right mr-2 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">{currentUser?.name}</span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{currentUser?.role}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold border border-slate-600">
              {currentUser?.name?.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          {isMenuOpen && (
            
              <div className="absolute top-12 right-0 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-slate-100">
                  <p className="font-bold">{currentUser?.name}</p>
                  <p className="text-xs text-slate-500">{currentUser?.department} Department</p>
                </div>
                <div className="p-2 border-b border-slate-100 bg-slate-50">
                  <p className="text-xs font-bold text-slate-500 mb-2 px-2 uppercase tracking-wider">{govT('nav_language')}</p>
                  <div className="flex bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button onClick={() => setGovLanguage("en")} className={`flex-1 py-1.5 text-xs font-bold ${govLanguage === "en" ? "bg-blue-600 text-white" : "hover:bg-slate-50"}`}>EN</button>
                    <button onClick={() => setGovLanguage("ta")} className={`flex-1 py-1.5 text-xs font-bold border-l border-r border-slate-200 ${govLanguage === "ta" ? "bg-blue-600 text-white" : "hover:bg-slate-50"}`}>TA</button>
                    <button onClick={() => setGovLanguage("hi")} className={`flex-1 py-1.5 text-xs font-bold ${govLanguage === "hi" ? "bg-blue-600 text-white" : "hover:bg-slate-50"}`}>HI</button>
                  </div>
                </div>
                <div className="flex flex-col">

                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowSignOutConfirm(true);
                  }} 
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold flex items-center gap-2"
                >
                  <LogOut size={16} /> {govT('nav_sign_out')}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      
      {/* Sign Out Confirm Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 animate-in zoom-in-95 duration-200 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{govT('nav_sign_out')}</h3>
            <p className="text-slate-500 mb-6">{govT('sign_out_confirm')}</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowSignOutConfirm(false);
                  logoutGov();
                  navigate('/select-role', { replace: true });
                }}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search ID, City, Type, Desc..." 
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400"
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2 px-3">{govT('nav_views')}</div>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as GovScreen)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentScreen === item.id || (currentScreen === 'issue_detail' && item.id === 'queue')
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon size={18} className={currentScreen === item.id ? 'text-blue-600' : 'text-slate-400'} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto py-0.5 px-2 rounded-full text-xs font-bold ${item.id === 'sla' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT WRAPPER */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-auto p-6 relative">
          {currentScreen === 'overview' && <GovOverview onNavigate={navigateTo} />}
          {currentScreen === 'map' && <GovLiveMap onNavigate={navigateTo} focusedIssueId={selectedIssueId} />}
          {currentScreen === 'queue' && <GovIssueQueue onNavigate={navigateTo} />}
          {currentScreen === 'issue_detail' && selectedIssueId && (
            <GovIssueDetail issueId={selectedIssueId} onBack={() => navigateTo('queue')} />
          )}
          {currentScreen === 'analytics' && <GovAnalytics />}
          
          {/* Mapping requested routes to meaningful existing views */}
          {currentScreen === 'departments' && <GovAnalytics />}
          {currentScreen === 'field' && <GovLiveMap onNavigate={navigateTo} focusedIssueId={selectedIssueId} />}
          {currentScreen === 'sla' && <GovIssueQueue onNavigate={navigateTo} filterBy="sla" />}
          {currentScreen === 'reports' && <GovIssueQueue onNavigate={navigateTo} />}
          {currentScreen === 'hotspots' && <GovLiveMap onNavigate={navigateTo} focusedIssueId={selectedIssueId} />}
          
          {currentScreen === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Government Portal Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Municipal Corporation</label>
                  <input type="text" disabled value={currentUser?.department || 'Administration'} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-500 font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Notification Preferences</label>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                    <span className="text-slate-700">Email alerts for Critical SLAs</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
