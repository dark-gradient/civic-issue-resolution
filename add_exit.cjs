const fs = require('fs');

let cCode = fs.readFileSync('src/citizen/CitizenApp.tsx', 'utf8');
const exitCBtn = `
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      if(window.confirm('Exit to Role Selection?')) {
                        logoutCitizen();
                        navigate('/select-role', { replace: true });
                      }
                    }} 
                    className="w-full text-left px-5 py-3 text-base text-slate-500 hover:bg-slate-50 font-bold flex items-center gap-3 border-t border-slate-100"
                  >
                    Exit to Role Selection
                  </button>
`;
cCode = cCode.replace(/<\/button>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/, `</button>\n${exitCBtn}\n                </div>\n              </div>\n            </div>\n          )}`);
fs.writeFileSync('src/citizen/CitizenApp.tsx', cCode);

let gCode = fs.readFileSync('src/government/GovApp.tsx', 'utf8');
const exitGBtn = `
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (window.confirm('Exit to Role Selection?')) {
                      logoutGov();
                      navigate('/select-role', { replace: true });
                    }
                  }} 
                  className="w-full text-left px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 font-bold flex items-center gap-2 border-t border-slate-100"
                >
                  Exit to Role Selection
                </button>
`;
gCode = gCode.replace(/Sign Out\n\s*<\/button>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/, `Sign Out\n                </button>\n${exitGBtn}\n              </div>\n            </div>\n          )}`);
fs.writeFileSync('src/government/GovApp.tsx', gCode);

