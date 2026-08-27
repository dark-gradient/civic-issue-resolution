const fs = require('fs');

let pCode = fs.readFileSync('src/citizen/screens/Profile.tsx', 'utf8');

pCode = pCode.replace(/import \{ useApp \} from '\.\.\/\.\.\/context\/AppContext';/, 
  "import { useApp } from '../../context/AppContext';\nimport { useNavigate } from 'react-router-dom';");

pCode = pCode.replace(/const \{ user, language, setLanguage, t, citizenLogout, setActiveApp \} = useApp\(\);/, 
  "const { auth, language, setLanguage, t, logoutCitizen, switchToGov } = useApp();\n  const navigate = useNavigate();\n  const currentUser = auth.citizenSession as any;");

pCode = pCode.replace(/const currentUser = user as CitizenUser;/g, "");

pCode = pCode.replace(/if \(window\.confirm\('Switch to Municipal Staff\? This will clear your current Citizen session\.'\)\) \{\n\s*citizenLogout\(\);\n\s*\}/g, 
  "if (window.confirm('Switch to Municipal Staff? This will clear your current Citizen session.')) {\n              switchToGov();\n              navigate('/select-role', { replace: true });\n            }");

pCode = pCode.replace(/if \(window\.confirm\('Are you sure you want to sign out\?'\)\) \{\n\s*citizenLogout\(\);\n\s*\}/g, 
  "if (window.confirm('Are you sure you want to sign out?')) {\n              logoutCitizen();\n              navigate('/select-role', { replace: true });\n            }");

if (!pCode.includes('Exit to Role Selection')) {
  const exitPBtn = `
        <button 
          onClick={() => {
            if (window.confirm('Exit to Role Selection?')) {
              logoutCitizen();
              navigate('/select-role', { replace: true });
            }
          }}
          className="w-full flex items-center justify-center gap-2 p-4 text-slate-500 bg-white border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors mt-4"
        >
          Exit to Role Selection
        </button>
  `;
  pCode = pCode.replace(/<LogOut size=\{20\} \/> Sign Out\n\s*<\/button>/, `<LogOut size={20} /> Sign Out\n        </button>\n${exitPBtn}`);
}

fs.writeFileSync('src/citizen/screens/Profile.tsx', pCode);
