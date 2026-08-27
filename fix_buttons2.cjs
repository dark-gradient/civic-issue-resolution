const fs = require('fs');

let cApp = fs.readFileSync('src/citizen/CitizenApp.tsx', 'utf8');
cApp = cApp.replace(/<button\s*onClick=\{\(\) => \{\s*setIsMenuOpen\(false\);\s*if \(window\.confirm\('Switch to Municipal Staff\?[\s\S]*?<\/button>/g, '');
fs.writeFileSync('src/citizen/CitizenApp.tsx', cApp);

let pCode = fs.readFileSync('src/citizen/screens/Profile.tsx', 'utf8');
pCode = pCode.replace(/<button\s*onClick=\{\(\) => \{\s*if \(window\.confirm\('Switch to Municipal Staff\?[\s\S]*?<\/button>/g, '');
fs.writeFileSync('src/citizen/screens/Profile.tsx', pCode);

let gApp = fs.readFileSync('src/government/GovApp.tsx', 'utf8');
gApp = gApp.replace(/<button\s*onClick=\{\(\) => \{\s*setIsMenuOpen\(false\);\s*if \(window\.confirm\('Switch to Citizen\?[\s\S]*?<\/button>/g, '');
fs.writeFileSync('src/government/GovApp.tsx', gApp);

