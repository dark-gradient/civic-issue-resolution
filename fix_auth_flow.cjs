const fs = require('fs');
let code = fs.readFileSync('src/auth/AuthFlow.tsx', 'utf8');

// Add imports for router
code = code.replace(/import \{ useApp \} from '\.\.\/context\/AppContext';/, "import { useApp } from '../context/AppContext';\nimport { useNavigate } from 'react-router-dom';");

// Use navigate and the new auth manager fields
code = code.replace(/const \{ authState, setAuthState, loginCitizen, loginGov, setActiveApp, activeApp \} = useApp\(\);/, 
  `const { auth, onboardingState: authState, setOnboardingState: setAuthState, loginCitizen, loginGov } = useApp();
  const navigate = useNavigate();`);
  
// Fix view navigation
code = code.replace(/setActiveApp\('CITIZEN'\);/, "//"); // In WELCOME view
code = code.replace(/setActiveApp\('GOV'\);/, "//"); // In WELCOME view

code = code.replace(/loginCitizen\(mockUser\);/g, `loginCitizen(mockUser);\n    navigate('/citizen', { replace: true });`);
code = code.replace(/loginGov\(mockGov\);/g, `loginGov(mockGov);\n    navigate('/government', { replace: true });`);

// Update the back buttons to clear view correctly
code = code.replace(/setActiveApp\('CITIZEN'\);/g, ""); // In Back buttons
code = code.replace(/setActiveApp\('GOV'\);/g, ""); // In Back buttons

// For the demo login bypass if user already exists
// "Continue as Demo Citizen" - let's ensure it properly logs in and navigates if the session already exists,
// wait, the AuthFlow itself is completely separate now.
// Let's add the Auth Debug Panel to AuthFlow if we want.

// Let's check for an existing session and offer a fast track? The prompt says "Demo login must be explicit."
const debugPanel = `
        {/* Auth Debug Panel (Dev Only) */}
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white text-xs p-4 rounded-lg shadow-2xl opacity-20 hover:opacity-100 transition-opacity z-50">
          <h4 className="font-bold border-b border-slate-700 pb-2 mb-2 text-slate-300">Auth Diagnostics</h4>
          <div className="space-y-1 mb-3">
            <p>Role: <span className="text-blue-400">{auth.activeRole}</span></p>
            <p>Citizen: <span className={auth.citizenSession ? 'text-emerald-400' : 'text-red-400'}>{auth.citizenSession ? 'ACTIVE' : 'NONE'}</span></p>
            <p>Gov: <span className={auth.governmentSession ? 'text-emerald-400' : 'text-red-400'}>{auth.governmentSession ? 'ACTIVE' : 'NONE'}</span></p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="bg-red-900/50 hover:bg-red-800 px-2 py-1 rounded">Hard Reset All</button>
          </div>
        </div>
`;

code = code.replace(/<div className="w-full max-w-md space-y-4">/, debugPanel + '\n        <div className="w-full max-w-md space-y-4">');

// Also update the buttons that say "Continue as Citizen" (if they already have a session)
const citizenLoginButton = `
          {auth.citizenSession ? (
            <button 
              onClick={() => {
                loginCitizen(auth.citizenSession!);
                navigate('/citizen', { replace: true });
              }}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/20 flex items-center justify-center space-x-3 active:scale-95 transition-transform hover:bg-blue-500 mb-4"
            >
              <User size={24} />
              <span>Continue as {auth.citizenSession.name}</span>
            </button>
          ) : null}
`;

code = code.replace(/<button \n\s*onClick=\{\(\) => \{\n\s*\/\/\n\s*setView\('CITIZEN_AUTH'\);\n\s*\}\}/, citizenLoginButton + `<button 
            onClick={() => {
              setView('CITIZEN_AUTH');
            }}`);

const govLoginButton = `
          {auth.governmentSession ? (
            <button 
              onClick={() => {
                loginGov(auth.governmentSession!);
                navigate('/government', { replace: true });
              }}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-slate-900/20 flex items-center justify-center space-x-3 active:scale-95 transition-transform hover:bg-slate-800 mt-4"
            >
              <Building size={24} />
              <span>Continue as Municipal Staff</span>
            </button>
          ) : null}
`;
code = code.replace(/<button \n\s*onClick=\{\(\) => \{\n\s*\/\/\n\s*setView\('GOV_AUTH'\);\n\s*\}\}/, govLoginButton + `<button 
            onClick={() => {
              setView('GOV_AUTH');
            }}`);


fs.writeFileSync('src/auth/AuthFlow.tsx', code);
