const fs = require('fs');
let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

code = code.replace(/const logout = \(\) => \{[\s\S]*?\};\n/, `const logout = () => {
    localStorage.removeItem('cscirr_citizen_auth');
    localStorage.removeItem('cscirr_citizen_user');
    setCitizenUser(null);
    setCitizenAuthState('NOT_AUTHENTICATED');
    
    localStorage.removeItem('cscirr_gov_auth');
    localStorage.removeItem('cscirr_gov_user');
    setGovUser(null);
    
    localStorage.removeItem('cscirr_active_app');
  };\n`);

fs.writeFileSync('src/context/AppContext.tsx', code);
