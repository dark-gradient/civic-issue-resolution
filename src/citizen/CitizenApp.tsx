import React, { useState } from 'react';
import { Home, PlusCircle, ListTodo, Bell, User, WifiOff, CheckCircle, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { CitizenHome } from './screens/Home';
import { ReportFlow } from './screens/ReportFlow';
import { MyReports } from './screens/MyReports';
import { IssueDetail } from './screens/IssueDetail';
import { Profile } from './screens/Profile';
import { cn } from '../utils';
import { CitizenUser } from '../types';

export type CitizenScreen = 'report' | 'my_reports' | 'issue_detail' | 'notifications' | 'profile';

export const CitizenApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<CitizenScreen>('report');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { isOffline, toggleOffline, offlineQueue, issues, auth, logoutCitizen, switchToGov, t } = useApp();
  const navigate = useNavigate();
  const currentUser = auth.citizenSession as any;

  const navigateTo = (screen: CitizenScreen, issueId?: string) => {
    if (issueId) setSelectedIssueId(issueId);
    setCurrentScreen(screen);
    setIsMenuOpen(false);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <section className="flex-1 bg-slate-200 flex justify-center overflow-hidden">
      {/* Mobile constrained wrapper */}
      <div className="w-full max-w-md bg-slate-50 h-full flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigateTo('report')}>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-slate-900">CSCIRR</span>
              <span className="text-[10px] text-slate-500 font-medium">{currentUser?.location || 'Chennai'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 relative">
            <button onClick={toggleOffline} className={cn("p-1.5 rounded-full transition-colors", isOffline ? "bg-red-100 text-red-600" : "text-slate-400 hover:text-slate-600")}>
              <WifiOff size={20} />
            </button>
            <button className="text-slate-400 hover:text-slate-600 relative" onClick={() => navigateTo('notifications')}>
              <Bell size={20} />
              {issues.some(i => i.status === 'Awaiting Verification') && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold border border-blue-200 focus:outline-none"
            >
              {getInitials(currentUser?.name)}
            </button>
            
            {/* Profile Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-10 right-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-lg">{currentUser?.name}</h3>
                  {currentUser?.aadhaarVerified && (
                    <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-bold mt-1">
                      <ShieldCheck size={16} /> {t('verified_citizen')}
                    </div>
                  )}
                </div>
                <div className="py-2">
                  <button onClick={() => navigateTo('profile')} className="w-full text-left px-5 py-3 text-base text-slate-700 hover:bg-slate-50 font-bold">{t('menu_my_profile')}</button>
                  <button onClick={() => navigateTo('my_reports')} className="w-full text-left px-5 py-3 text-base text-slate-700 hover:bg-slate-50 font-bold">{t('nav_my_reports')}</button>
                  <button onClick={() => navigateTo('profile')} className="w-full text-left px-5 py-3 text-base text-slate-700 hover:bg-slate-50 font-bold">{t('menu_language')}</button>
                  <button onClick={() => navigateTo('profile')} className="w-full text-left px-5 py-3 text-base text-slate-700 hover:bg-slate-50 font-bold">{t('menu_privacy')}</button>
                </div>
                <div className="border-t border-slate-100 py-2">
                  
                  
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      if(window.confirm(t('signout_confirm_msg'))) {
                        logoutCitizen();
                        navigate('/select-role', { replace: true });
                      }
                    }} 
                    className="w-full text-left px-5 py-3 text-base text-red-600 hover:bg-red-50 font-bold flex items-center gap-3"
                  >
                    <LogOut size={20} /> {t('menu_signout')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Offline Banner */}
        {isOffline && (
          <div className="bg-slate-800 text-white p-3 flex flex-col items-center justify-center text-center shrink-0">
            <span className="font-bold text-sm flex items-center gap-2">
              <WifiOff size={16} /> {t('no_internet')}
            </span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative pb-16">
          {currentScreen === 'report' && <ReportFlow onComplete={() => navigateTo('my_reports')} />}
          {currentScreen === 'my_reports' && <MyReports onNavigate={navigateTo} />}
          {currentScreen === 'issue_detail' && selectedIssueId && (
            <IssueDetail issueId={selectedIssueId} onBack={() => navigateTo('my_reports')} />
          )}
          {currentScreen === 'profile' && <Profile />}
          {currentScreen === 'notifications' && (
            <div className="p-4 flex flex-col items-center justify-center h-full">
              {issues.some(i => i.status === 'Awaiting Verification') ? (
                <div className="w-full space-y-3">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Recent Notifications</h2>
                  {issues.filter(i => i.status === 'Awaiting Verification').map(issue => (
                    <div 
                      key={issue.id} 
                      className="bg-white border-2 border-blue-200 p-4 rounded-xl shadow-sm cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => {
                        setSelectedIssueId(issue.id);
                        navigateTo('issue_detail');
                      }}
                    >
                      <div className="flex gap-3">
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 tracking-tight">Action Required</p>
                          <p className="text-sm text-slate-600 mt-0.5">Your report <span className="font-bold">{issue.id}</span> has been resolved. Please verify the repair.</p>
                          <p className="text-xs text-blue-600 font-bold mt-2">Tap to verify →</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <Bell className="w-12 h-12 mb-2 text-slate-300" />
                  <p>No new notifications</p>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Bottom Nav */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 pb-safe shrink-0 z-20">
          <NavItem icon={<Home />} label={t('nav_home')} isActive={currentScreen === 'report'} onClick={() => navigateTo('report')} />
          <NavItem 
            icon={<PlusCircle className="text-blue-600 w-7 h-7" />} 
            label={t('nav_report')} 
            isActive={currentScreen === 'report'} 
            onClick={() => navigateTo('report')} 
            isPrimary 
          />
          <NavItem icon={<ListTodo />} label={t('nav_my_reports')} isActive={currentScreen === 'my_reports' || currentScreen === 'issue_detail'} onClick={() => navigateTo('my_reports')} />
          <NavItem icon={<User />} label={t('nav_profile')} isActive={currentScreen === 'profile'} onClick={() => navigateTo('profile')} />
        </nav>
      </div>
    </section>
  );
};

const NavItem = ({ icon, label, isActive, onClick, isPrimary = false }: any) => (
  <button 
    onClick={onClick} 
    className={cn(
      "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
      isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
    )}
  >
    <div className={cn(
      isPrimary && "-mt-5 bg-white p-2 rounded-full border border-slate-100 shadow-sm"
    )}>
      {React.cloneElement(icon, { size: isPrimary ? 28 : 20, className: isActive && !isPrimary ? "text-blue-600" : "" })}
    </div>
    <span className={cn("text-[10px] font-medium", isActive ? "text-blue-600 font-semibold" : "")}>{label}</span>
  </button>
);
