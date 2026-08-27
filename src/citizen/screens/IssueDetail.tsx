import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, MapPin, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CitizenStatusBadge } from './MyReports';
import { formatDate } from '../../utils';
import { ReportService, IssueService } from '../../services/api';

export const IssueDetail: React.FC<{ issueId: string, onBack: () => void }> = ({ issueId, onBack }) => {
  const { t } = useApp();
  const [issue, setIssue] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reopenMessage, setReopenMessage] = useState(false);

  const loadReport = async () => {
    try {
      const data = await ReportService.getReport(issueId);
      setIssue(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, [issueId]);

  if (loading || !issue) return <div className="p-8 text-center text-slate-500 font-bold">{t('loading')}</div>;

  const showVerification = issue?.status === 'Awaiting Verification';

  const handleVerify = async (confirmed: boolean) => {
    try {
      if (confirmed) {
        await IssueService.verifyResolution(issue.id, 'confirmed');
      } else {
        await IssueService.verifyResolution(issue.id, 'rejected', 'Citizen reported issue is not resolved.');
        setReopenMessage(true);
      }
      await loadReport();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-20">
      <header className="bg-white px-5 py-3 border-b border-slate-200 flex items-center gap-3 sticky top-0 z-20 shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight tracking-tight">{t('your_report')}</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('reported_on')} {formatDate(issue.reportedAt).split(',')[0]}</p>
        </div>
      </header>

      {/* Main image */}
      <div className="relative flex w-full h-64 bg-slate-200">
        <img src={issue.images.before} alt="Problem" className="w-full h-full object-cover fallback-image" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400&h=300'; }} />
        
        {issue.privacyProcessed && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50/90 backdrop-blur-sm px-3 py-1.5 rounded shadow-sm border border-emerald-200">
            <ShieldCheck size={16} /> {t('faces_protected')}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-6">
          <CitizenStatusBadge status={issue.status} />
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-slate-200 mb-6">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">{issue.title}</h3>
          
          {issue.description && (
            <p className="text-slate-600 mb-4">{issue.description}</p>
          )}

          <div className="flex items-start text-sm text-slate-700 gap-2 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
            <MapPin size={18} className="mt-0.5 text-blue-500 shrink-0" /> 
            <span>{issue.location}</span>
          </div>
        </div>

        {/* Verification Card */}
        {showVerification && !reopenMessage && (
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 shadow-lg relative z-10 animate-in slide-in-from-bottom-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('verify_title')}</h3>
            <p className="text-slate-600 mb-6 font-medium">
              {t('verify_subtitle')}
            </p>
            
            {issue.images.after && (
              <div className="mb-6">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1 block">Work Photo</span>
                <img src={issue.images.after} className="w-full h-40 object-cover rounded-xl border-2 border-emerald-200 fallback-image" alt="Fixed" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400&h=300'; }} />
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleVerify(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <CheckCircle2 size={24} /> {t('btn_yes_fixed')}
              </button>
              <button 
                onClick={() => handleVerify(false)}
                className="w-full bg-white text-slate-700 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 border-2 border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <XCircle size={24} /> {t('btn_no_fixed')}
              </button>
            </div>
          </div>
        )}

        {/* Reopen Message */}
        {reopenMessage && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 shadow-sm text-center animate-in zoom-in duration-300">
            <p className="text-amber-800 font-bold text-lg">{t('thank_you')}</p>
            <p className="text-amber-700 font-medium mt-1">{t('reopen_msg')}</p>
          </div>
        )}

      </div>
    </div>
  );
};
