const fs = require('fs');

let code = fs.readFileSync('src/citizen/screens/Profile.tsx', 'utf8');

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
code = code.replace(/<LogOut size=\{20\} \/> Sign Out\n\s*<\/button>/, `<LogOut size={20} /> Sign Out\n        </button>\n${exitPBtn}`);
fs.writeFileSync('src/citizen/screens/Profile.tsx', code);
