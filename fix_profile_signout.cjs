const fs = require('fs');
let code = fs.readFileSync('src/citizen/screens/Profile.tsx', 'utf8');

// Add state
code = code.replace(/const \[showLangModal, setShowLangModal\] = useState\(false\);/, "const [showLangModal, setShowLangModal] = useState(false);\n  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);");

// Replace onClick
code = code.replace(/onClick=\{\(\) => \{\s*if \(window\.confirm\('Are you sure you want to sign out\?'\)\) \{\s*logoutCitizen\(\);\s*navigate\('\/select-role', \{ replace: true \}\);\s*\}\s*\}\}/, 
"onClick={() => setShowSignOutConfirm(true)}");

// Add Modal
const modal = `
      {/* Sign Out Confirm Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Sign Out</h3>
            <p className="text-slate-500 mb-6">Are you sure you want to sign out of your Citizen account?</p>
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
                  logoutCitizen();
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

code = code.replace(/\{(\/\* Language Modal \*\/)/, modal + '\n      {$1');

fs.writeFileSync('src/citizen/screens/Profile.tsx', code);
