const fs = require('fs');

let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

code = code.replace(/const citizenLogout = \(\) => \{\n\s*localStorage\.removeItem\('cscirr_citizen_auth'\);\n\s*localStorage\.removeItem\('cscirr_citizen_user'\);\n\s*setCitizenUser\(null\);/, 
  `const citizenLogout = () => {
    localStorage.setItem('cscirr_citizen_auth', 'false');
    // We purposefully KEEP the citizen_user to not delete the account
    setCitizenAuthState('NOT_AUTHENTICATED');`);
    
code = code.replace(/const govLogout = \(\) => \{\n\s*localStorage\.removeItem\('cscirr_gov_auth'\);\n\s*localStorage\.removeItem\('cscirr_gov_user'\);\n\s*setGovUser\(null\);/, 
  `const govLogout = () => {
    localStorage.setItem('cscirr_gov_auth', 'false');
    // We purposefully KEEP the gov_user to not delete the account
    `);

// Wait, if we keep them in localStorage, what happens when AuthFlow finishes?
// AuthFlow creates a NEW mockUser inside finishCitizenOnboarding if we go through it again!
// Let's modify AuthFlow to use the existing user if it exists!

fs.writeFileSync('src/context/AppContext.tsx', code);
