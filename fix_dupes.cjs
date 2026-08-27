const fs = require('fs');

let cApp = fs.readFileSync('src/citizen/CitizenApp.tsx', 'utf8');
cApp = cApp.replace(/const currentUser = auth.citizenSession as any;\n\s*const currentUser = user as CitizenUser;/g, "const currentUser = auth.citizenSession as any;");
// Maybe they are separate lines
cApp = cApp.replace(/const currentUser = user as CitizenUser;/g, "");
fs.writeFileSync('src/citizen/CitizenApp.tsx', cApp);

let gApp = fs.readFileSync('src/government/GovApp.tsx', 'utf8');
gApp = gApp.replace(/const currentUser = user as GovUser;/g, "");
fs.writeFileSync('src/government/GovApp.tsx', gApp);

