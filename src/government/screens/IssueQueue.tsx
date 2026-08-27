import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, ChevronDown, MoreHorizontal, Download, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '../../citizen/screens/MyReports';
import { cn } from '../../utils';
import { IssueService } from '../../services/api';

export const GovIssueQueue: React.FC<{ onNavigate: (s: any, id?: string) => void, filterBy?: string }> = ({ onNavigate, filterBy }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { globalSearch } = useApp();
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await IssueService.getIssues();
        setIssues(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const filteredIssues = issues.filter(i => {
    // Keep local filtering for prototype speed on the frontend
    if (filterBy === 'sla' && i.slaRemaining && !i.slaRemaining.startsWith('-')) return false;
    
    if (globalSearch) {
      const q = globalSearch.toLowerCase();
      const fields = [
        i.id, i.type, i.city, i.state, i.ward, i.authority, i.department, i.status, i.description
      ].map(f => (f || '').toLowerCase());
      
      if (!fields.some(f => f.includes(q))) {
        return false;
      }
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const fields = [
        i.id, i.type, i.city, i.state, i.ward, i.authority, i.department, i.status, i.description
      ].map(f => (f || '').toLowerCase());
      
      if (!fields.some(f => f.includes(q))) {
        return false;
      }
    }

    return true;
  });

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Queue...</div>;

  return (
    <div className="h-full flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300 max-w-7xl mx-auto w-full">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search ID, Type, Ward..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-72 transition-all placeholder-slate-400"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white hover:bg-slate-50 text-slate-700 transition-colors">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white hover:bg-slate-50 text-slate-700 transition-colors">
            <Download size={16} /> Export
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm transition-colors">
            Bulk Assign
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-slate-500 bg-slate-50 uppercase tracking-wider sticky top-0 z-20 shadow-sm">
            <tr>
              <th className="px-6 py-4 font-semibold">Priority</th>
              <th className="px-6 py-4 font-semibold">Issue ID</th>
              <th className="px-6 py-4 font-semibold">Details</th>
              <th className="px-6 py-4 font-semibold">Location</th>
              <th className="px-6 py-4 font-semibold">AI Intel</th>
              <th className="px-6 py-4 font-semibold">Assignment</th>
              <th className="px-6 py-4 font-semibold">SLA Limit</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-center sticky right-0 bg-slate-50 z-20 shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.1)]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredIssues.map(issue => (
              <tr key={issue.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => onNavigate('issue_detail', issue.id)}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      issue.priority === 'Critical' ? "bg-red-500" :
                      issue.priority === 'High' ? "bg-amber-500" :
                      issue.priority === 'Medium' ? "bg-blue-500" : "bg-slate-400"
                    )} />
                    <span className="font-bold text-slate-700">{issue.priority}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">{issue.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{issue.type}</div>
                  <div className="text-xs text-slate-500">{issue.reportsCount} citizen reports</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{issue.ward}</div>
                  <div className="text-xs text-slate-500 truncate max-w-[150px]">{issue.location}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{issue.aiConfidence}% match</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{issue.department}</div>
                  <div className="text-xs text-slate-500">{issue.assignee}</div>
                </td>
                <td className="px-6 py-4">
                  <div className={cn(
                    "font-bold text-xs px-2 py-1 rounded inline-block", 
                    issue.slaRemaining.startsWith('-') ? "bg-red-100 text-red-700" :
                    issue.slaRemaining.includes('1h') || issue.slaRemaining.includes('2h') ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-700"
                  )}>
                    {issue.slaRemaining.startsWith('-') ? `Overdue (${issue.slaRemaining.replace('-', '')})` : issue.slaRemaining}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={issue.status} />
                  {issue.status === 'Reopened' && (
                    <div className="text-[10px] text-red-600 font-bold mt-1 flex items-center gap-1">
                      <AlertTriangle size={10} /> Citizen Escalated
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-center sticky right-0 bg-white group-hover:bg-slate-50 shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.1)] transition-colors z-10">
                  
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onNavigate('map', issue.id); }}
                      className="text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                    >
                      Map
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onNavigate('issue_detail', issue.id); }}
                      className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                    >
                      Action
                    </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between text-sm text-slate-500 shrink-0">
        <div>Showing {filteredIssues.length} issues</div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 font-medium disabled:opacity-50 transition-colors" disabled>Previous</button>
          <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 font-medium transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};
