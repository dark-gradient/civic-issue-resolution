import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate, cn } from '../../utils';
import { MapPin, WifiOff, Filter } from 'lucide-react';
import { LanguageCode } from '../../translations';
import { ReportService } from '../../services/api';

export const MyReports: React.FC<{ onNavigate: (s: any, id?: string) => void }> = ({ onNavigate }) => {
  const { offlineQueue, t } = useApp();
  const [filter, setFilter] = useState<'All' | 'Active' | 'Resolved'>('All');
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        const data = await ReportService.getMyReports();
        setIssues(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMyReports();
  }, []);

  const filtered = issues.filter(issue => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !['Resolved', 'Closed', 'Awaiting Verification'].includes(issue.status);
    if (filter === 'Resolved') return ['Resolved', 'Closed', 'Awaiting Verification'].includes(issue.status);
    return true;
  });

  if (loading) return <div className="p-8 text-center text-slate-500 font-bold">{t('loading')}</div>;

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white px-5 py-4 shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t('my_reports')}</h2>
        
        {/* Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
          {[{k:'All', l:t('filter_all')}, {k:'Active', l:t('filter_active')}, {k:'Resolved', l:t('filter_resolved')}].map(f => (
            <button 
              key={f.k}
              onClick={() => setFilter(f.k as any)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border-2 transition-colors",
                filter === f.k 
                  ? "bg-slate-900 text-white border-slate-900" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}
            >
              {f.l}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* Offline Queue UI */}
        {offlineQueue.length > 0 && filter === 'All' && (
          <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-lg mb-1">
              <WifiOff size={20} /> {t('saved_offline_reports')} ({offlineQueue.length})
            </div>
            <p className="text-sm text-amber-700 font-medium">{t('sent_when_internet')}</p>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-10 text-slate-500 font-medium text-lg">
            {t('no_reports')}
          </div>
        ) : (
          filtered.map(issue => (
            <div 
              key={issue.id} 
              className="bg-white p-4 rounded-2xl shadow-sm border-2 border-slate-200 flex flex-col gap-4 active:scale-[0.98] transition-transform cursor-pointer"
              onClick={() => onNavigate('issue_detail', issue.id)}
            >
              <div className="flex gap-4">
                <img src={issue.images.before} alt="" className="w-24 h-24 rounded-xl object-cover border border-slate-100 fallback-image" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400&h=300'; }} />
                <div className="flex-1 flex flex-col">
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight leading-tight mb-2">📷 {issue.title}</h4>
                  
                  <div className="flex items-start text-sm text-slate-600 gap-1.5 font-medium mb-3">
                    <MapPin size={16} className="mt-0.5 text-slate-400 shrink-0" /> 
                    <span className="line-clamp-2">{issue.location.split(',')[0]}</span>
                  </div>
                  
                  <CitizenStatusBadge status={issue.status} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const getSimplifiedStatus = (status: string, t: any) => {
  if (['Submitted', 'Under Review'].includes(status)) return { text: t('status_received'), color: 'bg-blue-100 text-blue-800 border-blue-200', dot: 'bg-blue-500' };
  if (['Assigned', 'In Progress'].includes(status)) return { text: t('status_handling'), color: 'bg-amber-100 text-amber-800 border-amber-200', dot: 'bg-amber-500' };
  if (['Awaiting Verification'].includes(status)) return { text: t('status_confirm'), color: 'bg-emerald-100 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500' };
  if (['Resolved', 'Closed'].includes(status)) return { text: t('status_completed'), color: 'bg-slate-100 text-slate-800 border-slate-200', dot: 'bg-slate-500' };
  if (status === 'Reopened') return { text: t('status_reopened'), color: 'bg-red-100 text-red-800 border-red-200', dot: 'bg-red-500' };
  return { text: t('status_received'), color: 'bg-blue-100 text-blue-800 border-blue-200', dot: 'bg-blue-500' };
};

export const CitizenStatusBadge = ({ status }: { status: string }) => {
  const { t } = useApp();
  const simpleStatus = getSimplifiedStatus(status, t);
  
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-sm border", simpleStatus.color, "w-fit")}>
      <span className={cn("w-2.5 h-2.5 rounded-full animate-pulse", simpleStatus.dot)}></span>
      {simpleStatus.text}
    </div>
  );
}

export const StatusBadge = ({ status }: { status: string }) => {
  let color = 'bg-slate-100 text-slate-700 border-slate-200';
  
  if (['Submitted', 'Under Review'].includes(status)) color = 'bg-blue-50 text-blue-700 border-blue-200';
  else if (['Assigned', 'In Progress'].includes(status)) color = 'bg-amber-50 text-amber-700 border-amber-200';
  else if (['Resolved', 'Closed', 'Awaiting Verification'].includes(status)) color = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  else if (status === 'Reopened') color = 'bg-red-50 text-red-700 border-red-200';
  
  return (
    <span className={cn("text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border", color)}>
      {status}
    </span>
  );
}
