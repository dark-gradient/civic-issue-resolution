const fs = require('fs');

let cApp = fs.readFileSync('src/citizen/CitizenApp.tsx', 'utf8');
cApp = cApp.replace(/<button[^>]*>[\s\S]*?Exit to Role Selection[\s\S]*?<\/button>/g, '');
fs.writeFileSync('src/citizen/CitizenApp.tsx', cApp);

let gApp = fs.readFileSync('src/government/GovApp.tsx', 'utf8');
gApp = gApp.replace(/<button[^>]*>[\s\S]*?Exit to Role Selection[\s\S]*?<\/button>/g, '');
gApp = gApp.replace(/<button[^>]*>[\s\S]*?Switch to Citizen\?[\s\S]*?<\/button>/g, '');
fs.writeFileSync('src/government/GovApp.tsx', gApp);

let pCode = fs.readFileSync('src/citizen/screens/Profile.tsx', 'utf8');
pCode = pCode.replace(/<button[^>]*>[\s\S]*?Exit to Role Selection[\s\S]*?<\/button>/g, '');
pCode = pCode.replace(/<button[^>]*>[\s\S]*?Switch to Municipal Staff\?[\s\S]*?<\/button>/g, '');
fs.writeFileSync('src/citizen/screens/Profile.tsx', pCode);

// Fix stray cattle image
let dataTs = fs.readFileSync('src/data.ts', 'utf8');
dataTs = dataTs.replace(/stray,dog\?lock=10556/g, 'cow,cattle?lock=10556');
fs.writeFileSync('src/data.ts', dataTs);

