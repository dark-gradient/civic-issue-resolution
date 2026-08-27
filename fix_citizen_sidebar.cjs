const fs = require('fs');

let code = fs.readFileSync('src/citizen/CitizenApp.tsx', 'utf8');

// Ensure citizenLogout is destructured
code = code.replace(/logout, t/, "citizenLogout, t");
code = code.replace(/logout,/, "citizenLogout,"); // just in case

// Add switch to Municipal Staff button before sign out
const switchBtn = `
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (window.confirm('Switch to Municipal Staff? This will clear your current Citizen session.')) {
                        citizenLogout();
                      }
                    }} 
                    className="w-full text-left px-5 py-3 text-base text-slate-700 hover:bg-slate-50 font-bold flex items-center gap-3 border-b border-slate-100"
                  >
                    Switch to Municipal Staff
                  </button>
                  <button `;

code = code.replace(/<button \n\s*onClick=\{\(\) => \{\n\s*setIsMenuOpen\(false\);\n\s*if\(window\.confirm\(t\('signout_confirm_msg'\)\)\) \{\n\s*logout\(\);\n\s*\}\n\s*\}\}/, 
  `<button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      if(window.confirm(t('signout_confirm_msg'))) {
                        citizenLogout();
                      }
                    }}`);

code = code.replace(/<button \n\s*onClick=\{\(\) => \{\n\s*setIsMenuOpen\(false\);\n\s*if\(window\.confirm\(t\('signout_confirm_msg'\)\)\) \{\n\s*citizenLogout\(\);\n\s*\}\n\s*\}\}/, 
  switchBtn + `
                    onClick={() => {
                      setIsMenuOpen(false);
                      if(window.confirm(t('signout_confirm_msg'))) {
                        citizenLogout();
                      }
                    }}`);


fs.writeFileSync('src/citizen/CitizenApp.tsx', code);
