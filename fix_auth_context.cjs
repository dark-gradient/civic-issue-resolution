const fs = require('fs');

let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

// We need to change the activeApp type to include null
code = code.replace(/activeApp: 'CITIZEN' \| 'GOV';/, "activeApp: 'CITIZEN' | 'GOV' | null;");
code = code.replace(/setActiveApp: \(app: 'CITIZEN' \| 'GOV'\) => void;/, "setActiveApp: (app: 'CITIZEN' | 'GOV' | null) => void;");

// Also add citizenLogout and govLogout to AppContextType
code = code.replace(/logout: \(\) => void;/, "logout: () => void;\n  citizenLogout: () => void;\n  govLogout: () => void;");

// Update the initial state of activeApp
code = code.replace(/const \[activeApp, setActiveApp\] = useState\<'CITIZEN' \| 'GOV'\>\('CITIZEN'\);/, "const [activeApp, setActiveApp] = useState<'CITIZEN' | 'GOV' | null>(null);");

code = code.replace(/const storedApp = localStorage.getItem\('cscirr_active_app'\);/, `const storedApp = localStorage.getItem('cscirr_active_app') as 'CITIZEN' | 'GOV' | null;`);

code = code.replace(/logout = \(\) => \{[\s\S]*?removeItem\('cscirr_active_app'\);\n  \};/, `logout = () => {
    localStorage.removeItem('cscirr_citizen_auth');
    localStorage.removeItem('cscirr_citizen_user');
    setCitizenUser(null);
    setCitizenAuthState('NOT_AUTHENTICATED');
    
    localStorage.removeItem('cscirr_gov_auth');
    localStorage.removeItem('cscirr_gov_user');
    setGovUser(null);
    
    localStorage.removeItem('cscirr_active_app');
    setActiveApp(null);
  };

  const citizenLogout = () => {
    localStorage.removeItem('cscirr_citizen_auth');
    localStorage.removeItem('cscirr_citizen_user');
    setCitizenUser(null);
    setCitizenAuthState('NOT_AUTHENTICATED');
    localStorage.removeItem('cscirr_active_app');
    setActiveApp(null);
  };

  const govLogout = () => {
    localStorage.removeItem('cscirr_gov_auth');
    localStorage.removeItem('cscirr_gov_user');
    setGovUser(null);
    localStorage.removeItem('cscirr_active_app');
    setActiveApp(null);
  };
`);

// Now in the provider context value
code = code.replace(/logout,/, "logout,\n      citizenLogout,\n      govLogout,");
code = code.replace(/setActiveApp: \(app\) => \{/, `setActiveApp: (app) => {
        setActiveApp(app);
        if (app) {
          localStorage.setItem('cscirr_active_app', app);
        } else {
          localStorage.removeItem('cscirr_active_app');
        }`);

fs.writeFileSync('src/context/AppContext.tsx', code);
