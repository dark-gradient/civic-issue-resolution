const fs = require('fs');

let cApp = fs.readFileSync('src/citizen/CitizenApp.tsx', 'utf8');

cApp = cApp.replace(/import \{ useApp \} from '\.\.\/context\/AppContext';/, 
  "import { useApp } from '../context/AppContext';\nimport { useNavigate } from 'react-router-dom';");

// Remove citizenLogout because we renamed to logoutCitizen in the context rewrite
cApp = cApp.replace(/const \{ isOffline, toggleOffline, offlineQueue, issues, user, citizenLogout, t \} = useApp\(\);/, 
  "const { isOffline, toggleOffline, offlineQueue, issues, auth, logoutCitizen, switchToGov, t } = useApp();\n  const navigate = useNavigate();\n  const currentUser = auth.citizenSession as any;");

cApp = cApp.replace(/if\(window\.confirm\(t\('signout_confirm_msg'\)\)\) \{\n\s*citizenLogout\(\);\n\s*\}/g, 
  "if(window.confirm(t('signout_confirm_msg'))) {\n                        logoutCitizen();\n                        navigate('/select-role', { replace: true });\n                      }");

cApp = cApp.replace(/if \(window\.confirm\('Switch to Municipal Staff\? This will clear your current Citizen session\.'\)\) \{\n\s*citizenLogout\(\);\n\s*\}/g, 
  "if (window.confirm('Switch to Municipal Staff? This will clear your current Citizen session.')) {\n                        switchToGov();\n                        navigate('/select-role', { replace: true });\n                      }");

if (!cApp.includes('Exit to Role Selection')) {
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
  cApp = cApp.replace(/<\/button>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/, `</button>\n${exitCBtn}\n                </div>\n              </div>\n            </div>\n          )}`);
}

fs.writeFileSync('src/citizen/CitizenApp.tsx', cApp);


let gApp = fs.readFileSync('src/government/GovApp.tsx', 'utf8');

gApp = gApp.replace(/import \{ useApp \} from '\.\.\/context\/AppContext';/, 
  "import { useApp } from '../context/AppContext';\nimport { useNavigate } from 'react-router-dom';");

gApp = gApp.replace(/const \{ user, logout, govLogout, resetDemoData, issues, setActiveApp, globalSearch, setGlobalSearch \} = useApp\(\);/, 
  "const { auth, logoutGov, switchToCitizen, resetDemoData, issues, globalSearch, setGlobalSearch } = useApp();\n  const navigate = useNavigate();\n  const currentUser = auth.governmentSession;");

gApp = gApp.replace(/<span className="font-bold">\{user\?.name\}<\/span>/g, '<span className="font-bold">{currentUser?.name}</span>');
gApp = gApp.replace(/\{user\?.role === 'Municipal Administrator' \|\| user\?.role === 'Department Supervisor'\}/g, "{currentUser?.role === 'Municipal Administrator' || currentUser?.role === 'Department Supervisor'}");

gApp = gApp.replace(/if \(window\.confirm\('Switch to Citizen\? This will clear your current Government session\.'\)\) \{\n\s*govLogout\(\);\n\s*\}/g, 
  "if (window.confirm('Switch to Citizen? This will clear your current Government session.')) {\n                      switchToCitizen();\n                      navigate('/select-role', { replace: true });\n                    }");

gApp = gApp.replace(/if \(window\.confirm\('Sign out of Government Portal\?'\)\) \{\n\s*govLogout\(\);\n\s*\}/g, 
  "if (window.confirm('Sign out of Government Portal?')) {\n                      logoutGov();\n                      navigate('/select-role', { replace: true });\n                    }");

if (!gApp.includes('Exit to Role Selection')) {
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
  gApp = gApp.replace(/Sign Out\n\s*<\/button>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/, `Sign Out\n                </button>\n${exitGBtn}\n              </div>\n            </div>\n          )}`);
}

fs.writeFileSync('src/government/GovApp.tsx', gApp);

