import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { filterIssuesBySearch } from '../../utils';
import { AlertCircle, Clock, CheckCircle2, TrendingUp, MapPin, Download, ListTodo, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '../../citizen/screens/MyReports';
import { cn } from '../../utils';
import { DashboardService, IssueService } from '../../services/api';

export const GovOverview: React.FC<{ onNavigate: (s: any, id?: string) => void }> = ({ onNavigate }) => {
  const { auth, issues, govT } = useApp();
  const [statsData, setStatsData] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [deptData, setDeptData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overview, queueRes, dept] = await Promise.all([
          DashboardService.getOverview(),
          IssueService.getIssues({ status: 'Submitted', limit: '5' }),
          DashboardService.getDepartments()
        ]);
        setStatsData(overview);
        setQueue(queueRes);
        setDeptData(dept);
      } catch (e) {
        console.error("API failed, using fallback data", e);
        const localOpen = issues.filter(i => i.status === 'Submitted' || i.status === 'Assigned').length;
        const localInProgress = issues.filter(i => i.status === 'In Progress').length;
        const localResolved = issues.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
        const localCritical = issues.filter(i => i.priority === 'Critical' && i.status !== 'Closed').length;
        const localHigh = issues.filter(i => i.priority === 'High' && i.status !== 'Closed').length;
        const localReopened = issues.filter(i => i.status === 'Reopened').length;
        const localSlaBreaches = issues.filter(i => i.slaRemaining.startsWith('-') && i.status !== 'Closed').length;

        setStatsData({
          total_reports: issues.reduce((acc, i) => acc + (i.reportsCount || 1), 0),
          open_issues: localOpen,
          in_progress: localInProgress,
          resolved: localResolved,
          critical_issues: localCritical,
          high_priority: localHigh,
          reopened: localReopened,
          sla_breaches: localSlaBreaches
        });

        const priorityQueue = [...issues]
          .filter(i => !['Resolved', 'Closed'].includes(i.status))
          .sort((a, b) => {
            if (a.priority === 'Critical' && b.priority !== 'Critical') return -1;
            if (a.priority === 'High' && !['Critical', 'High'].includes(b.priority)) return -1;
            return 0;
          })
          .slice(0, 10);
        
        setQueue(priorityQueue as any);

        const depts = ['Roads', 'Sanitation', 'Electrical', 'Water'];
        const deptFallback = depts.map(d => {
          const dIssues = issues.filter(i => i.department === d && !['Closed', 'Resolved'].includes(i.status));
          return {
            department: d,
            open_issues: dIssues.length,
            critical: dIssues.filter(i => i.priority === 'Critical').length,
            backlog: dIssues.length
          };
        });
        setDeptData(deptFallback);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExport = () => {
    window.location.href = 'http://localhost:8000/api/export/issues';
  };

  if (loading || !statsData) return <div className="p-8 text-center text-slate-500">Loading Command Center...</div>;

  const stats = [
    { label: govT('kpi_active_issues'), value: statsData.open_issues + statsData.in_progress, trend: 'Current', icon: ListTodo, color: 'text-blue-600', bg: 'bg-blue-100', trendColor: 'text-slate-500' },
    { label: govT('kpi_critical'), value: statsData.critical_issues + statsData.high_priority, trend: 'Action Required', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100', trendColor: 'text-red-600 font-bold' },
    { label: govT('kpi_reopened'), value: statsData.reopened, trend: 'Escalated', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100', trendColor: 'text-amber-600 font-bold' },
    { label: govT('kpi_sla_breach'), value: statsData.sla_breaches, trend: 'Immediate', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-100', trendColor: 'text-indigo-600 font-bold' },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Command Center</h2>
          <p className="text-sm text-slate-500 mt-1">Real-time civic operations overview</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleExport} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center space-x-2">
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
              <div className={cn("p-1 rounded-md shrink-0", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
              <span className={cn("text-xs px-1.5 py-0.5 rounded", stat.trendColor)}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Priority Queue */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold text-slate-800 text-base">{govT('priority_queue')}</h3>
            <button onClick={() => onNavigate('queue')} className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">{govT('view_all')}</button>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50/50 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 font-semibold">{govT('th_priority')}</th>
                  <th className="px-5 py-3 font-semibold">{govT('th_details')}</th>
                  <th className="px-5 py-3 font-semibold">{govT('th_location')}</th>
                  <th className="px-5 py-3 font-semibold">{govT('th_assignee')}</th>
                  <th className="px-5 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queue.map(issue => (
                  <tr key={issue.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded",
                        issue.priority === 'Critical' ? "bg-red-100 text-red-700" :
                        issue.priority === 'High' ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-700"
                      )}>
                        {issue.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-bold text-slate-900">{issue.id}</div>
                      <div className="text-xs text-slate-500">{issue.type} ({issue.reportsCount || 1} reps)</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-slate-900 font-medium">{issue.ward || 'Unknown'}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[120px]">{issue.location}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-slate-900 font-medium">{issue.department}</div>
                      <div className="text-xs text-slate-500">{issue.assignee || 'Unassigned'}</div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button 
                        onClick={() => onNavigate('issue_detail', issue.id)}
                        className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Department Workload Widget */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold text-slate-800 text-base">{govT('dept_workload')}</h3>
            <button onClick={() => onNavigate('departments')} className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">{govT('view_all')}</button>
          </div>
          <div className="flex-1 p-5 space-y-5 overflow-y-auto">
            
            {deptData.map(dept => (
              <div key={dept.department}>
                <div className="flex justify-between items-end mb-1">
                  <span className="font-bold text-slate-700 text-sm">{dept.department}</span>
                  <span className={cn("text-xs font-bold", dept.backlog > 10 ? "text-red-600" : "text-emerald-600")}>
                    {dept.backlog > 10 ? 'High Load' : 'Normal'}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className={cn("h-2 rounded-full", dept.backlog > 10 ? "bg-red-500" : "bg-emerald-500")} style={{ width: `${Math.min(dept.backlog * 5, 100)}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>{dept.open_issues} Open Issues</span>
                  <span>{dept.critical} Critical</span>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};
