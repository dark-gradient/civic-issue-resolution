const fs = require('fs');
let code = fs.readFileSync('src/citizen/screens/Profile.tsx', 'utf8');

code = code.replace(/import \{ useApp \} from '\.\.\/\.\.\/context\/AppContext';/, "import { useApp } from '../../context/AppContext';\nimport { useNavigate } from 'react-router-dom';");
code = code.replace(/const \{ user, language, setLanguage, t, citizenLogout, setActiveApp \} = useApp\(\);/, 
  `const { auth, language, setLanguage, t, logoutCitizen, switchToGov } = useApp();
  const navigate = useNavigate();
  const currentUser = auth.citizenSession as CitizenUser;`);
code = code.replace(/const currentUser = user as CitizenUser;/, ""); // Remove duplicate

// Switch to Municipal Staff
code = code.replace(/if \(window\.confirm\('Switch to Municipal Staff\? This will clear your current Citizen session\.'\)\) \{[\s\S]*?citizenLogout\(\);\n\s*\}/, 
  `if (window.confirm('Switch to Municipal Staff? This will clear your current Citizen session.')) {
              switchToGov();
              navigate('/select-role', { replace: true });
            }`);

// Sign Out
code = code.replace(/if \(window\.confirm\('Are you sure you want to sign out\?'\)\) \{[\s\S]*?citizenLogout\(\);\n\s*\}/, 
  `if (window.confirm('Are you sure you want to sign out?')) {
              logoutCitizen();
              navigate('/select-role', { replace: true });
            }`);

fs.writeFileSync('src/citizen/screens/Profile.tsx', code);

// Now CitizenApp.tsx
let citApp = fs.readFileSync('src/citizen/CitizenApp.tsx', 'utf8');
citApp = citApp.replace(/import \{ useApp \} from '\.\.\/context\/AppContext';/, "import { useApp } from '../context/AppContext';\nimport { useNavigate } from 'react-router-dom';");
citApp = citApp.replace(/const \{ isOffline, toggleOffline, offlineQueue, issues, user, citizenLogout, t \} = useApp\(\);/, 
  `const { isOffline, toggleOffline, offlineQueue, issues, auth, logoutCitizen, switchToGov, t } = useApp();
  const navigate = useNavigate();
  const currentUser = auth.citizenSession as CitizenUser;`);
citApp = citApp.replace(/const currentUser = user as CitizenUser;/, "");

citApp = citApp.replace(/if \(window\.confirm\('Switch to Municipal Staff\? This will clear your current Citizen session\.'\)\) \{[\s\S]*?citizenLogout\(\);\n\s*\}/, 
  `if (window.confirm('Switch to Municipal Staff? This will clear your current Citizen session.')) {
                        switchToGov();
                        navigate('/select-role', { replace: true });
                      }`);

citApp = citApp.replace(/if\(window\.confirm\(t\('signout_confirm_msg'\)\)\) \{\n\s*citizenLogout\(\);\n\s*\}/g, 
  `if(window.confirm(t('signout_confirm_msg'))) {
                        logoutCitizen();
                        navigate('/select-role', { replace: true });
                      }`);
                      
fs.writeFileSync('src/citizen/CitizenApp.tsx', citApp);

// Now GovApp.tsx
let govApp = fs.readFileSync('src/government/GovApp.tsx', 'utf8');
govApp = govApp.replace(/import \{ useApp \} from '\.\.\/context\/AppContext';/, "import { useApp } from '../context/AppContext';\nimport { useNavigate } from 'react-router-dom';");
govApp = govApp.replace(/const \{ user, logout, govLogout, resetDemoData, issues, setActiveApp, globalSearch, setGlobalSearch \} = useApp\(\);/, 
  `const { auth, logoutGov, switchToCitizen, resetDemoData, issues, globalSearch, setGlobalSearch } = useApp();
  const navigate = useNavigate();
  const currentUser = auth.governmentSession;`);

govApp = govApp.replace(/if \(window\.confirm\('Switch to Citizen\? This will clear your current Government session\.'\)\) \{[\s\S]*?govLogout\(\);\n\s*\}/, 
  `if (window.confirm('Switch to Citizen? This will clear your current Government session.')) {
                      switchToCitizen();
                      navigate('/select-role', { replace: true });
                    }`);
                    
govApp = govApp.replace(/if \(window\.confirm\('Sign out of Government Portal\?'\)\) \{[\s\S]*?govLogout\(\);\n\s*\}/, 
  `if (window.confirm('Sign out of Government Portal?')) {
                      logoutGov();
                      navigate('/select-role', { replace: true });
                    }`);
                    
govApp = govApp.replace(/<span className="font-bold">\{user\?.name\}<\/span>/, `<span className="font-bold">{currentUser?.name}</span>`);
govApp = govApp.replace(/\{user\?.role === 'Municipal Administrator' \|\| user\?.role === 'Department Supervisor'\}/g, 
  `{currentUser?.role === 'Municipal Administrator' || currentUser?.role === 'Department Supervisor'}`);

fs.writeFileSync('src/government/GovApp.tsx', govApp);
