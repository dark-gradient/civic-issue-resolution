import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, MapPin, ShieldAlert, Cpu, Layers, UserPlus, FileCheck, XCircle, CheckCircle2, AlertTriangle, Truck, Clock, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '../../citizen/screens/MyReports';
import { formatDate, cn, calculateResolutionTime, formatDuration } from '../../utils';
import { IssueService } from '../../services/api';

export const GovIssueDetail: React.FC<{ issueId: string, onBack: () => void }> = ({ issueId, onBack }) => {
  const { auth, issues } = useApp();
  const formatTime = (ts: string) => { return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); };
  const [issue, setIssue] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadIssue = async () => {
    try {
      const data = await IssueService.getIssue(issueId);
      setIssue(data);
    } catch (e) {
      console.error('API fail, fallback', e);
      const fallbackIssue = issues.find(i => i.id === issueId);
      if (fallbackIssue) setIssue(fallbackIssue);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssue();
  }, [issueId]);

  if (loading || !issue) return <div className="p-8 text-center text-slate-500">Loading Issue Details...</div>;

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-300 w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Issue #{issue.id}</h2>
              <StatusBadge status={issue.status} />
              {['Resolved', 'Closed'].includes(issue.status) && calculateResolutionTime(issue) && (
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-100">
                  Resolved in {formatDuration(calculateResolutionTime(issue)!)}
                </span>
              )}
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
                issue.priority === 'Critical' ? "bg-red-100 text-red-700" :
                issue.priority === 'High' ? "bg-amber-100 text-amber-700" :
                "bg-slate-100 text-slate-700"
              )}>
                {issue.priority} PRIORITY
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold bg-white text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
            Print Dossier
          </button>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COL 1: Evidence (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-100 bg-white font-bold text-slate-800 text-sm flex items-center gap-2 tracking-tight">
              <MapPin size={16} className="text-blue-600" /> Location Evidence
            </div>
            <div className="p-4 space-y-4">
              <div className="relative">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Before Photo</p>
                <div className="relative rounded-lg overflow-hidden border border-slate-100 shadow-sm">
                  <img src={issue.images.before} alt="Reported" className="w-full h-48 object-cover" />
                  {issue.privacyProcessed && (
                    <>
                      <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-emerald-200">
                        <ShieldCheck size={12} /> Privacy Protected
                      </div>
                    </>
                  )}
                </div>
              </div>
              {issue.images.after && (
                <div>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-2">After Photo (Resolved)</p>
                  <img src={issue.images.after} alt="Resolved" className="w-full h-48 object-cover rounded-lg border-2 border-emerald-200 shadow-sm" />
                </div>
              )}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                <p className="font-bold text-slate-900">{issue.ward}</p>
                <p className="text-slate-600 mt-1">{issue.location}</p>
                <p className="text-xs text-slate-400 mt-2 font-mono">{issue.lat.toFixed(4)}, {issue.lng.toFixed(4)}</p>
              </div>
              
              <div className="h-32 bg-blue-50 rounded-lg border border-blue-100 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#93c5fd 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                 <MapPin size={32} className="text-red-500 relative z-10" />
              </div>
            </div>
          </div>

          {/* Identity Shielding Demonstration */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col mt-6">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 font-bold text-slate-800 text-sm flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-600" /> Reporter Identity Shield
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase">Reporter</span>
                <span className="text-sm font-bold text-slate-900">Sathyendhar B</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Verified Citizen</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase">System ID</span>
                <span className="text-sm font-mono text-slate-600">CIT-10482</span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-start gap-2">
                <Lock size={14} className="text-slate-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 leading-tight">
                  Personal identifiers (Aadhaar, Phone) are completely shielded from municipal staff and stored only as irreversible cryptographic hashes in the core system.
                </p>
              </div>
            </div>
          </div>

        </div>
        {/* COL 2: Intelligence & Citizen Reports (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-indigo-50 bg-indigo-50/30 font-bold text-slate-800 text-sm flex items-center gap-2 tracking-tight">
              <Cpu size={16} className="text-indigo-600" /> Platform Intelligence Engine
            </div>
            <div className="p-5 grid grid-cols-2 gap-x-6 gap-y-6">
              
              {/* AI Triage Block */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Classification</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5 tracking-tight">{issue.type}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${issue.aiConfidence}%` }} />
                  </div>
                  <span className="text-xs font-bold text-indigo-700">{issue.aiConfidence}%</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verification Score</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <ShieldAlert size={18} className="text-emerald-500" />
                  <span className="font-bold text-emerald-700 tracking-tight">High Trust (98%)</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Spam probability: 2%</p>
              </div>

              {/* Jurisdiction */}
              <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Jurisdiction</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Authority:</span>
                    <p className="font-bold text-slate-900">{issue.authority}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Ward:</span>
                    <p className="font-bold text-slate-900">{issue.ward}</p>
                  </div>
                </div>
              </div>

              {/* Prioritization Factors */}
              <div className="col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Capacity-Aware Prioritization</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5">
                    <AlertTriangle size={12} /> School Zone (120m)
                  </span>
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5">
                    <Layers size={12} /> High Report Volume
                  </span>
                  <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5">
                    <Clock size={12} /> Dept Load: 84%
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-100 bg-white font-bold text-slate-800 text-sm flex items-center justify-between tracking-tight">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-blue-600" /> Canonical Issue Generation
              </div>
              <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">Merged</span>
            </div>
            <div className="p-4">
              <div className="bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100 mb-4 text-sm flex items-start gap-3">
                <div className="bg-white p-1.5 rounded-md shadow-sm shrink-0">
                  <Layers size={16} className="text-blue-600" />
                </div>
                <p>
                  <strong>Report ≠ Issue:</strong> The AI has analyzed photos and coordinates, consolidating <strong>{issue.reportsCount} separate citizen reports</strong> into this single canonical task to prevent duplicate municipal dispatch.
                </p>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex gap-3 items-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                    <img src={issue.images.before} className="w-10 h-10 rounded-md object-cover opacity-80 grayscale" alt="" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-800">Duplicate Report #{Math.floor(Math.random() * 90000)}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[200px]">"{issue.description}"</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{formatDate(issue.reportedAt).split(',')[0]}</span>
                  </div>
                ))}
                <button className="w-full py-2 text-xs font-bold text-blue-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm mt-1">
                  View All {issue.reportsCount} Merged Reports
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* COL 3: Workflow & Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Timeline Insert */}
          {issue.timeline && issue.timeline.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-slate-100 bg-white">
                <h3 className="font-bold text-slate-900 tracking-tight">Issue Timeline</h3>
              </div>
              <div className="p-5">
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                  {issue.timeline.map((event: any) => (
                    <div key={event.id} className="relative flex items-center group">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full bg-slate-300 border-2 border-white text-slate-500 shadow-sm shrink-0 z-10 group-last:bg-blue-500"></div>
                      <div className="ml-4 p-2.5 rounded-lg bg-slate-50 border border-slate-100 shadow-sm w-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{event.title}</p>
                            {event.notes && <p className="text-xs text-slate-600 mt-0.5">{event.notes}</p>}
                          </div>
                          <p className="text-[10px] font-medium text-slate-500 shrink-0">{formatTime(event.timestamp)}</p>
                        </div>
                        {(event.actor || event.action) && (
                          <div className="mt-1 flex items-center gap-2">
                            {event.actor && <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{event.actor}</span>}
                            {event.action && <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-medium">{event.action}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col border-t-4 border-t-blue-600">
            <div className="px-4 py-3 border-b border-slate-100 bg-white">
              <h3 className="font-bold text-slate-900 tracking-tight">Operational Workflow</h3>
            </div>
            <div className="p-5 space-y-5">
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Current Owner</p>
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900 text-sm tracking-tight">{issue.assignee}</p>
                    <p className="text-xs text-slate-500">{issue.department} Department</p>
                  </div>
                  <button className="p-2 bg-white rounded-md shadow-sm border border-slate-200 text-blue-600 hover:bg-slate-50 transition-colors">
                    <UserPlus size={16} />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">SLA Status</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className={cn("text-2xl font-bold tracking-tight", issue.slaRemaining.startsWith('-') ? "text-red-600" : "text-slate-900")}>
                      {issue.slaRemaining}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">remaining of {issue.slaHours}h SLA</p>
                  </div>
                  {issue.slaRemaining.startsWith('-') && (
                    <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider animate-pulse">Breached</span>
                  )}
                </div>
              </div>

              {issue.privacyProcessed && (
                <>
                  <hr className="border-slate-100" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Photo Privacy</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <CheckCircle2 size={14} className="text-emerald-500" /> Face detection completed
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <CheckCircle2 size={14} className="text-emerald-500" /> Detected faces blurred ({issue.facesBlurred || 0} faces)
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <CheckCircle2 size={14} className="text-emerald-500" /> Privacy-protected image available
                      </div>
                    </div>
                  </div>
                </>
              )}

              <hr className="border-slate-100" />
              <div className="space-y-2.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Actions</p>
                
                {issue.status === 'Submitted' || issue.status === 'Under Review' ? (
                  <button 
                    onClick={async () => {
                      await IssueService.assignIssue(issue.id, { assignee: 'Field Team B' });
                      loadIssue();
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-[15px] shadow-sm transition-colors flex justify-center items-center gap-2"
                  >
                    <UserPlus size={18} /> Assign to Field Team B
                  </button>
                ) : issue.status === 'Assigned' ? (
                  <button 
                    onClick={async () => {
                      await IssueService.startIssue(issue.id);
                      loadIssue();
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold text-[15px] shadow-sm transition-colors flex justify-center items-center gap-2"
                  >
                    <Truck size={18} /> Mark as In Progress
                  </button>
                ) : issue.status === 'In Progress' || issue.status === 'Reopened' ? (
                  <button 
                    onClick={async () => {
                      const formData = new FormData();
                      formData.append('notes', 'Work completed. After-photo uploaded. Awaiting citizen confirmation.');
                      const dummyBlob = new Blob(['dummy'], { type: 'image/jpeg' });
                      formData.append('image', dummyBlob, 'after.jpg');
                      await IssueService.uploadEvidence(issue.id, formData);
                      loadIssue();
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold text-[15px] shadow-sm transition-colors flex justify-center items-center gap-2"
                  >
                    <CheckCircle2 size={18} /> Upload Resolution Evidence
                  </button>
                ) : issue.status === 'Awaiting Verification' ? (
                  <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg text-sm font-semibold flex items-center gap-2 justify-center">
                    <Clock size={16} /> Awaiting Citizen Verification
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 text-slate-600 p-3 rounded-lg text-sm font-semibold flex items-center gap-2 justify-center">
                    <CheckCircle2 size={16} /> Issue Closed
                  </div>
                )}
                
                {issue.status !== 'Closed' && issue.status !== 'Awaiting Verification' && (
                  <button className="w-full bg-white border border-slate-200 hover:bg-red-50 text-red-600 hover:border-red-200 py-3 rounded-xl font-bold text-[15px] transition-colors shadow-sm mt-2">
                    Escalate Issue
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col p-5">
            <h3 className="font-bold text-slate-900 mb-4 tracking-tight">Audit Trail</h3>
            <div className="space-y-4 relative">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200" />
              {issue.timeline.map((event, i) => (
                <div key={event.id} className="relative z-10 flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border-2 border-white text-blue-600 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 tracking-tight">{event.title}</p>
                    <p className="text-[10px] text-slate-500 mb-0.5 font-medium uppercase tracking-wider">{formatDate(event.timestamp)}</p>
                    <p className="text-xs text-slate-600">{event.description}</p>
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
