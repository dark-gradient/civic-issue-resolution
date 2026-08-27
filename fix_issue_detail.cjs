const fs = require('fs');

let code = fs.readFileSync('src/government/screens/IssueDetail.tsx', 'utf8');

const replacement = `{/* Jurisdiction */}
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
              </div>`;

code = code.replace(/\{\/\* Jurisdiction Routing \*\/\}[\s\S]*?<\/div>\s*<\/div>/, replacement);

fs.writeFileSync('src/government/screens/IssueDetail.tsx', code);
