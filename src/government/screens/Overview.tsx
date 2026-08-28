import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { filterIssuesBySearch } from '../../utils';
import { AlertCircle, Clock, CheckCircle2, TrendingUp, MapPin, Download, ListTodo, AlertTriangle, Activity, Wifi, WifiOff } from 'lucide-react';
import { StatusBadge } from '../../citizen/screens/MyReports';
import { cn } from '../../utils';
import { DashboardService, IssueService } from '../../services/api';
import { mapApiIssueToIssue } from './IssueQueue';

export const GovOverview: React.FC<{ onNavigate: (s: any, id?: string) => void }> = ({ onNavigate }) => {
  const { auth, govT } = useApp();
  const [statsData, setStatsData] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [deptData, setDeptData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [overview, queueRes, dept] = await Promise.all([
          DashboardService.getOverview(),
          IssueService.getIssues({ status: 'Submitted', limit: '10' }),
          DashboardService.getDepartments()
        ]);
        
        setStatsData(overview);
        setQueue(queueRes.map(mapApiIssueToIssue));
        setDeptData(dept);
        setIsLive(true);
      } catch (e) {
        console.error("API failed:", e);
        setError('Unable to connect to the civic services.');
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExport = () => {
    // Export should hit VITE_API_URL instead of localhost
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
    window.location.href = `${baseUrl}/export/issues`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Loading Command Center...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-xl border border-red-200 p-8 text-center max-w-2xl mx-auto mt-12">
        <AlertTriangle className="text-red-500 mb-4" size={48} />
        <h3 className="text-xl font-bold text-red-800 mb-2">Backend Connection Failed</h3>
        <p className="text-red-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const stats = [
    { label: govT('kpi_active_issues'), value: statsData?.open_issues + (statsData?.in_progress || 0), trend: 'Current', icon: ListTodo, color: 'text-blue-600', bg: 'bg-blue-100', trendColor: 'text-slate-500' },
    { label: govT('kpi_critical'), value: statsData?.critical_issues + (statsData?.high_priority || 0), trend: 'Action Required', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100', trendColor: 'text-red-600 font-bold' },
    { label: govT('kpi_reopened'), value: statsData?.reopened, trend: 'Escalated', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100', trendColor: 'text-amber-600 font-bold' },
    { label: govT('kpi_sla_breach'), value: statsData?.sla_breaches, trend: 'Immediate', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-100', trendColor: 'text-indigo-600 font-bold' },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Command Center</h2>
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                <Wifi size={12} /> Backend Connected (Live Data)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                <WifiOff size={12} /> Demo Mode - Backend Unavailable
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">Real-time civic operations overview</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleExport} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center space-x-2">
            <Download size={16} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
              <div className={cn("p-2 rounded-lg", s.bg, s.color)}>
                <s.icon size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">{s.value || 0}</div>
            <div className={cn("text-xs mt-2", s.trendColor)}>{s.trend}</div>
            <div className={cn("absolute -right-4 -bottom-4 opacity-5 transform group-hover:scale-110 transition-transform", s.color)}>
              <s.icon size={100} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Queue (Left 2/3) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle size={18} className="text-red-500" />
              {govT('priority_queue')}
            </h3>
            <button onClick={() => onNavigate('issue_queue')} className="text-sm text-blue-600 font-bold hover:text-blue-700">
              {govT('view_all')} &rarr;
            </button>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {queue.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400">No urgent issues</div>
            ) : (
              <div className="space-y-2">
                {queue.map(issue => (
                  <div key={issue.id} onClick={() => onNavigate('issue_detail', issue.id)} className="p-4 rounded-lg border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer bg-white group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm",
                          issue.priority === 'Critical' ? "bg-red-100 text-red-700" :
                          issue.priority === 'High' ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                        )}>
                          {issue.priority}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{issue.id}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 group-hover:text-blue-500 transition-colors">Details &rarr;</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{issue.type}</h4>
                    <p className="text-sm text-slate-500 line-clamp-1 mb-3">{issue.description || issue.originalDescription}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1"><MapPin size={12} /> {issue.ward || issue.city}</div>
                      <div className="flex items-center gap-1"><Clock size={12} /> {issue.slaRemaining} remaining</div>
                      <StatusBadge status={issue.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Workload (Right 1/3) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50 rounded-t-xl">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Activity size={18} className="text-indigo-500" />
              {govT('dept_workload')}
            </h3>
          </div>
          <div className="flex-1 overflow-auto p-5">
            <div className="space-y-6">
              {deptData.map(dept => (
                <div key={dept.department}>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{dept.department}</h4>
                      <div className="text-xs text-slate-500 mt-0.5">{dept.open_issues} open • {dept.critical} critical</div>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">{dept.backlog} backlog</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                    <div className="bg-red-500 h-2" style={{ width: `${(dept.critical / Math.max(1, dept.open_issues)) * 100}%` }}></div>
                    <div className="bg-blue-500 h-2" style={{ width: `${((dept.open_issues - dept.critical) / Math.max(1, dept.open_issues)) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
