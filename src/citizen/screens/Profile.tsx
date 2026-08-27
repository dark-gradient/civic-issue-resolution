import React, { useState } from 'react';
import { CheckCircle, ShieldCheck, User, MapPin, Globe, ChevronRight, X, Lock, LogOut, Building } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { CitizenUser } from '../../types';
import { cn } from '../../utils';
import { LanguageCode } from '../../translations';

export const Profile: React.FC = () => {
  const { auth, language, setLanguage, t, logoutCitizen, switchToGov } = useApp();
  const navigate = useNavigate();
  const currentUser = auth.citizenSession as any;
  
  
  const [showLangModal, setShowLangModal] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  if (!currentUser) return null;

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  const getLanguageName = (code: LanguageCode) => {
    switch (code) {
      case 'ta': return 'தமிழ்';
      case 'hi': return 'हिन्दी';
      default: return 'English';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 p-5 pb-20 bg-slate-50 min-h-full">
      <h2 className="text-3xl font-bold mb-6 text-slate-900 tracking-tight">{t('profile_title')}</h2>

      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-4xl font-bold mb-4">
          {getInitials(currentUser.name)}
        </div>
        <h3 className="text-2xl font-bold text-slate-900">{currentUser.name}</h3>
        <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-bold mt-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
          <ShieldCheck size={18} /> {t('verified_citizen')}
        </div>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm mb-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3 text-slate-600 font-bold">
            <User size={20} /> {t('mobile')}
          </div>
          <span className="font-bold text-slate-900 text-lg">{currentUser.phone}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-600 font-bold">
            <MapPin size={20} /> {t('area')}
          </div>
          <span className="font-bold text-slate-900 text-lg">{currentUser.location}</span>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-sm mb-8 overflow-hidden">
        

        <button 
          onClick={() => setShowSignOutConfirm(true)}
          className="w-full flex items-center justify-center gap-2 p-4 text-red-600 bg-red-50 border border-red-200 rounded-xl font-bold text-lg hover:bg-red-100 transition-colors"
        >
          <LogOut size={20} /> Sign Out
        </button>

        
  
      </div>

      
      {/* Sign Out Confirm Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Sign Out</h3>
            <p className="text-slate-500 mb-6">Are you sure you want to sign out of your Citizen account?</p>
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
                  logoutCitizen();
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

      {/* Language Modal */}
      {showLangModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-end justify-center sm:items-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 pb-safe animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">{t('language')}</h3>
              <button onClick={() => setShowLangModal(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {(['en', 'ta', 'hi'] as LanguageCode[]).map(code => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code);
                    setShowLangModal(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors font-bold text-lg",
                    language === code ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {getLanguageName(code)}
                  {language === code && <ShieldCheck size={24} className="text-blue-500" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-end justify-center sm:items-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 pb-safe animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pt-2 pb-4 border-b border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900">{t('privacy_title')}</h3>
              <button onClick={() => setShowPrivacyModal(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                  <User size={20} className="text-blue-500" /> {t('identity')}
                </h4>
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg border border-emerald-100 font-medium text-sm mb-2 flex items-center gap-2">
                  <ShieldCheck size={18} /> {t('id_completed')}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{t('aadhaar_msg')}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-emerald-500" /> {t('photo_privacy')}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">{t('faces_blurred_msg')}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                  <Lock size={20} className="text-amber-500" /> {t('personal_data')}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">{t('data_msg')}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                  <Globe size={20} className="text-indigo-500" /> {t('report_visibility')}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">{t('visibility_msg')}</p>
              </div>
            </div>

            <button 
              onClick={() => setShowPrivacyModal(false)}
              className="mt-8 w-full bg-slate-900 text-white font-bold py-4 rounded-xl text-lg hover:bg-slate-800 transition-colors"
            >
              {t('btn_close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
