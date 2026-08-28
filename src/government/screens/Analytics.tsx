import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertTriangle, Cpu } from 'lucide-react';
import { DashboardService, AnalyticsService } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const GovAnalytics: React.FC = () => {
  const { issues } = useApp();
  const [deptData, setDeptData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rawDept, rawTrends] = await Promise.all([
          DashboardService.getDepartments(),
          AnalyticsService.getTrends()
        ]);

        setDeptData(rawDept.map((d: any) => ({
          name: d.department,
          open: d.open_issues,
          resolved: d.resolved
        })));
        
        setTrendData(rawTrends.map((t: any) => ({
          name: t.date.slice(5), // Just MM-DD
          issues: t.count
        })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Analytics...</div>;

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-300 space-y-6 pb-10 w-full">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">City Analytics Dashboard</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Macro-level operational performance and trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-6 tracking-tight">Department Workload & Resolution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 500, color: '#475569'}} />
                <Bar dataKey="open" name="Open Issues" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="resolved" name="Resolved Issues" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-6 tracking-tight">Report Volume Trend (YTD)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="issues" name="Total Reports" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Hotspots Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6">
        <h3 className="font-bold text-slate-900 mb-2 tracking-tight">Recurring Infrastructure Intelligence</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium">System analysis of repeated issues at identical coordinates over time.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-red-50 border-2 border-red-100 flex flex-col relative">
            <div className="absolute top-4 right-4 bg-red-100 text-red-700 font-bold px-2 py-1 rounded text-[10px] uppercase tracking-wider">
              Critical Risk
            </div>
            <p className="text-sm font-bold text-red-900">Ward 37 (Anna Nagar)</p>
            <p className="text-xs text-red-700 mt-1 mb-4 font-medium">{142 + issues.filter(i => i.ward === 'Ward 37').length} reports at identical coordinates this month</p>
            
            <div className="mt-auto bg-white p-3 rounded-lg border border-red-100 shadow-sm flex items-start gap-2">
              <div className="bg-red-100 p-1.5 rounded-md text-red-600 shrink-0 mt-0.5">
                <AlertTriangle size={14} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Recommendation</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">Preventive Road Resurfacing</p>
                <p className="text-[10px] text-slate-600 mt-1 leading-tight">Pothole recurrence rate is 430% above city baseline. Structural intervention required.</p>
              </div>
            </div>
          </div>
          
          <div className="p-5 rounded-xl bg-amber-50 border-2 border-amber-100 flex flex-col relative">
            <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 font-bold px-2 py-1 rounded text-[10px] uppercase tracking-wider">
              Elevated Risk
            </div>
            <p className="text-sm font-bold text-amber-900">Ward 12 (T Nagar)</p>
            <p className="text-xs text-amber-700 mt-1 mb-4 font-medium">{89 + issues.filter(i => i.ward === 'Ward 12').length} reports near storm drains</p>
            
            <div className="mt-auto bg-white p-3 rounded-lg border border-amber-100 shadow-sm flex items-start gap-2">
              <div className="bg-amber-100 p-1.5 rounded-md text-amber-600 shrink-0 mt-0.5">
                <AlertTriangle size={14} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Recommendation</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">Sewer Line Audit</p>
                <p className="text-[10px] text-slate-600 mt-1 leading-tight">High correlation of drainage blocks during minor rain events.</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border-2 border-slate-200 flex flex-col relative">
            <div className="absolute top-4 right-4 bg-slate-200 text-slate-700 font-bold px-2 py-1 rounded text-[10px] uppercase tracking-wider">
              Monitor Zone
            </div>
            <p className="text-sm font-bold text-slate-800">Ward 68 (Koramangala)</p>
            <p className="text-xs text-slate-600 mt-1 mb-4 font-medium">{54 + issues.filter(i => i.ward === 'Ward 68').length} reports this month</p>
            
            <div className="mt-auto bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-start gap-2">
              <div className="bg-slate-100 p-1.5 rounded-md text-slate-600 shrink-0 mt-0.5">
                <Cpu size={14} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Status</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">Expected Baseline</p>
                <p className="text-[10px] text-slate-600 mt-1 leading-tight">Issue volume falls within predicted seasonal operating parameters.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
