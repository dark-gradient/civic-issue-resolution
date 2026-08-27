import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Clock, ArrowRight, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';
import { formatDate } from '../../utils';
import { ReportService } from '../../services/api';

export const CitizenHome: React.FC<{ onNavigate: (screen: any, issueId?: string) => void }> = ({ onNavigate }) => {
  const { user, t } = useApp();
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    ReportService.getMyReports().then(data => setIssues(data)).catch(console.error);
  }, []);
  
  // Calculate summary
  const total = issues.length;
  const resolved = issues.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
  const inProgress = issues.filter(i => i.status === 'In Progress' || i.status === 'Assigned').length;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <div className="bg-blue-600 px-5 pt-8 pb-12 rounded-b-[2rem] text-white relative shadow-inner">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-b-[2rem] pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 -left-10 w-32 h-32 bg-blue-700 rounded-full blur-2xl opacity-40"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-sm font-medium text-blue-200 mb-1">{t('welcome')} {user?.name?.split(' ')[0]}</h1>
          <h2 className="text-2xl font-bold mb-1 tracking-tight">See a civic issue?</h2>
          <p className="text-blue-100 text-sm mb-6">Report it directly to the corporation.</p>
          
          <button 
            onClick={() => onNavigate('report')}
            className="w-full bg-white text-blue-600 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/20 flex items-center justify-center space-x-3 active:scale-95 transition-transform"
          >
            <PlusCircle size={28} />
            <span>{t('report_issue')}</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-4 -mt-6 relative z-20 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 grid grid-cols-3 gap-2 text-center divide-x divide-slate-100">
          <div>
            <div className="text-xl font-bold text-slate-800">{total}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{t('reported')}</div>
          </div>
          <div>
            <div className="text-xl font-bold text-amber-500">{inProgress}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{t('in_progress')}</div>
          </div>
          <div>
            <div className="text-xl font-bold text-emerald-500">{resolved}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{t('resolved')}</div>
          </div>
        </div>
      </div>

      {/* Recent Nearby */}
      <div className="px-4 pb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-900 tracking-tight">Recent Updates Near You</h3>
          <button className="text-xs text-blue-600 font-bold hover:underline" onClick={() => onNavigate('my_reports')}>{t('view_all')}</button>
        </div>

        <div className="space-y-3">
          {issues.slice(0, 3).map(issue => (
            <div 
              key={issue.id} 
              className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 cursor-pointer hover:border-blue-200 transition-colors"
              onClick={() => onNavigate('issue_detail', issue.id)}
            >
              <img src={issue.images.before} alt="Issue" className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{issue.title}</h4>
                  <div className="flex items-center text-xs text-slate-500 mt-1 gap-1">
                    <MapPin size={12} className="shrink-0" /> <span className="line-clamp-1">{issue.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    issue.status === 'Resolved' || issue.status === 'Closed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    issue.status === 'In Progress' || issue.status === 'Assigned' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                    'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {issue.status}
                  </span>
                  <div className="flex items-center text-[10px] text-slate-400 gap-1 font-medium">
                    <Clock size={10} /> {formatDate(issue.reportedAt).split(',')[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
