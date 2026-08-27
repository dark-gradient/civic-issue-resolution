const fs = require('fs');

let code = fs.readFileSync('src/government/GovApp.tsx', 'utf8');

// Update useApp imports
code = code.replace(/logout, resetDemoData/, "logout, govLogout, resetDemoData");

// Fix "Switch to Citizen"
code = code.replace(/if \(window\.confirm\('Switch account type\?'\)\) \{[\s\S]*?setActiveApp\('CITIZEN'\);\n\s*\}/, `if (window.confirm('Switch to Citizen? This will clear your current Government session.')) {
                      govLogout();
                    }`);

// Fix "Sign Out"
code = code.replace(/if \(window\.confirm\('Sign out of Government Portal\?'\)\) \{[\s\S]*?logout\(\);\n\s*\}/, `if (window.confirm('Sign out of Government Portal?')) {
                      govLogout();
                    }`);

fs.writeFileSync('src/government/GovApp.tsx', code);
