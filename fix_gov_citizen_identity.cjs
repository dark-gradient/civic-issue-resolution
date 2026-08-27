const fs = require('fs');
let gDetail = fs.readFileSync('src/government/screens/IssueDetail.tsx', 'utf8');

const identityBlock = `
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
`;

// Inject into COL 1 (Evidence)
gDetail = gDetail.replace(/<\/div>\n\s*<\/div>\n\s*\{?\/\* COL 2: Intelligence & Citizen Reports \(5 cols\) \*\//, 
`</div>\n${identityBlock}\n        </div>\n        {/* COL 2: Intelligence & Citizen Reports (5 cols) */}`);

if (!gDetail.includes('Lock')) {
  gDetail = gDetail.replace(/import \{ /, 'import { Lock, ');
}

fs.writeFileSync('src/government/screens/IssueDetail.tsx', gDetail);
