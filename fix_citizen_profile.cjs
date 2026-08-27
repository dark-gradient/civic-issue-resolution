const fs = require('fs');
let code = fs.readFileSync('src/citizen/screens/Profile.tsx', 'utf8');

code = code.replace(/const \{ user, language, setLanguage, t, logout, setActiveApp \} = useApp\(\);/, "const { user, language, setLanguage, t, citizenLogout, setActiveApp } = useApp();");

code = code.replace(/if \(window\.confirm\('Switch account type\?'\)\) \{[\s\S]*?setActiveApp\('GOV'\);\n\s*\}/, `if (window.confirm('Switch to Municipal Staff? This will clear your current Citizen session.')) {
              citizenLogout();
            }`);

code = code.replace(/if \(window\.confirm\('Are you sure you want to sign out\?'\)\) \{[\s\S]*?logout\(\);\n\s*\}/, `if (window.confirm('Are you sure you want to sign out?')) {
              citizenLogout();
            }`);

fs.writeFileSync('src/citizen/screens/Profile.tsx', code);
