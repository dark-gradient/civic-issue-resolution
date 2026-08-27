const fs = require('fs');
let code = fs.readFileSync('src/government/GovApp.tsx', 'utf8');

// Add state
code = code.replace(/const \[isMenuOpen, setIsMenuOpen\] = useState\(false\);/, "const [isMenuOpen, setIsMenuOpen] = useState(false);\n  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);");

// Replace onClick
code = code.replace(/onClick=\{\(\) => \{\s*setIsMenuOpen\(false\);\s*if \(window\.confirm\('Sign out of Government Portal\?'\)\) \{\s*logoutGov\(\);\s*navigate\('\/select-role', \{ replace: true \}\);\s*\}\s*\}\}/, 
"onClick={() => {\n                    setIsMenuOpen(false);\n                    setShowSignOutConfirm(true);\n                  }}");

// Add Modal
const modal = `
      {/* Sign Out Confirm Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 animate-in zoom-in-95 duration-200 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Sign Out</h3>
            <p className="text-slate-500 mb-6">Are you sure you want to sign out of the Government Portal?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowSignOutConfirm(false);
                  logoutGov();
                  navigate('/select-role', { replace: true });
                }}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
`;

code = code.replace(/<main className="flex flex-1 overflow-hidden">/, modal + '\n      <main className="flex flex-1 overflow-hidden">');

fs.writeFileSync('src/government/GovApp.tsx', code);
