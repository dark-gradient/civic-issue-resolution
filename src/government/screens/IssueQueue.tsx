import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, ChevronDown, MoreHorizontal, Download, AlertTriangle, RefreshCw } from 'lucide-react';
import { StatusBadge } from '../../citizen/screens/MyReports';
import { cn } from '../../utils';
import { IssueService } from '../../services/api';
import { Issue } from '../../types';

export const mapApiIssueToIssue = (apiIssue: any): Issue => {
  return {
    id: apiIssue.id || apiIssue._id || apiIssue.issue_id,
    title: apiIssue.title || apiIssue.type || 'Untitled',
    type: apiIssue.type || apiIssue.category || 'Unknown',
    originalLanguage: apiIssue.originalLanguage || 'en',
    originalDescription: apiIssue.originalDescription || apiIssue.description || '',
    description: apiIssue.description || '',
    location: apiIssue.location || apiIssue.address || '',
    ward: apiIssue.ward || '',
    city: apiIssue.city || '',
    state: apiIssue.state || '',
    authority: apiIssue.authority || '',
    lat: parseFloat(apiIssue.lat || apiIssue.latitude || 0),
    lng: parseFloat(apiIssue.lng || apiIssue.longitude || 0),
    status: apiIssue.status || 'Submitted',
    priority: apiIssue.priority || 'Low',
    department: apiIssue.department || 'Unassigned',
    reportedAt: apiIssue.reportedAt || apiIssue.created_at || new Date().toISOString(),
    updatedAt: apiIssue.updatedAt || apiIssue.updated_at || new Date().toISOString(),
    reportsCount: parseInt(apiIssue.reportsCount || apiIssue.report_count || 1),
    aiConfidence: apiIssue.aiConfidence,
    assignee: apiIssue.assignee,
    slaHours: apiIssue.slaHours,
    slaRemaining: apiIssue.slaRemaining,
    images: apiIssue.images || { before: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400' },
    timeline: apiIssue.timeline || []
  };
};

export const GovIssueQueue: React.FC<{ onNavigate: (s: any, id?: string) => void, filterBy?: string }> = ({ onNavigate, filterBy }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { globalSearch, govT } = useApp();
  const [langFilter, setLangFilter] = useState('all');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await IssueService.getIssues();
      const mapped = data.map(mapApiIssueToIssue);
      setIssues(mapped);
    } catch (e) {
      console.error('API failed:', e);
      setError('Unable to connect to the civic services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Loading civic issues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-xl border border-red-200">
        <AlertTriangle className="text-red-500 mb-4" size={48} />
        <p className="text-red-700 font-medium mb-4">{error}</p>
        <button 
          onClick={fetchIssues}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  const filteredIssues = issues.filter(i => {
    if (filterBy === 'sla' && i.slaRemaining && !i.slaRemaining.startsWith('-')) return false;
    if (langFilter !== 'all' && i.originalLanguage !== langFilter) return false;
    
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Queue..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={langFilter}
              onChange={(e) => setLangFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none"
            >
              <option value="all">All Languages</option>
              <option value="en">English</option>
              <option value="ta">Tamil</option>
              <option value="hi">Hindi</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50">
              <Filter size={18} /> <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50">
              <Download size={18} /> <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
        
        <div className="text-sm font-medium text-slate-500">
          Showing {filteredIssues.length} of {issues.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
              <th className="px-5 py-4 font-bold">ID</th>
              <th className="px-5 py-4 font-bold">{govT('th_priority')}</th>
              <th className="px-5 py-4 font-bold">{govT('th_details')}</th>
              <th className="px-5 py-4 font-bold">{govT('th_location')}</th>
              <th className="px-5 py-4 font-bold">{govT('th_assignee')}</th>
              <th className="px-5 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredIssues.map((issue) => (
              <tr key={issue.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-5 py-4">
                  <div className="font-mono font-medium text-slate-900 text-sm">{issue.id.substring(0, 8)}</div>
                  <div className="text-xs text-slate-500 mt-1">{new Date(issue.reportedAt).toLocaleDateString()}</div>
                </td>
                <td className="px-5 py-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                    issue.priority === 'Critical' ? "bg-red-100 text-red-700" :
                    issue.priority === 'High' ? "bg-orange-100 text-orange-700" :
                    "bg-blue-100 text-blue-700"
                  )}>
                    {issue.priority}
                  </span>
                  {issue.slaRemaining && issue.slaRemaining.startsWith('-') && (
                    <div className="flex items-center gap-1 text-red-600 text-xs font-bold mt-2">
                      <AlertTriangle size={12} /> SLA Breach
                    </div>
                  )}
                </td>
                <td className="px-5 py-4 max-w-xs">
                  <div className="font-bold text-slate-900 mb-1 truncate">{issue.type}</div>
                  <div className="flex gap-2 items-center">
                    <StatusBadge status={issue.status} />
                    {issue.originalLanguage !== 'en' && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        {issue.originalLanguage}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-medium text-slate-900 text-sm truncate max-w-[150px]">{issue.ward || issue.city}</div>
                  <div className="text-xs text-slate-500 mt-1">{issue.department}</div>
                </td>
                <td className="px-5 py-4">
                  {issue.assignee ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {issue.assignee.substring(0,2).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{issue.assignee}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400 italic">Unassigned</span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <button 
                    onClick={() => onNavigate('issue_detail', issue.id)}
                    className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    {govT('btn_manage')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredIssues.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No issues found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};
