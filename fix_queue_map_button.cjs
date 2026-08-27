const fs = require('fs');
let code = fs.readFileSync('src/government/screens/IssueQueue.tsx', 'utf8');

const actionButtons = `
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
`;

code = code.replace(/<button \n\s*onClick=\{\(e\) => \{ e\.stopPropagation\(\); onNavigate\('issue_detail', issue\.id\); \}\}\n\s*className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1\.5 rounded-lg shadow-sm transition-colors"\n\s*>\n\s*Action\n\s*<\/button>/, actionButtons);

fs.writeFileSync('src/government/screens/IssueQueue.tsx', code);
