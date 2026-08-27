const fs = require('fs');
let pCode = fs.readFileSync('src/citizen/screens/Profile.tsx', 'utf8');

pCode = pCode.replace(/<button\s*onClick=\{\(\) => \{\s*logoutCitizen\(\);\s*navigate\('\/select-role', \{ replace: true \}\);\s*\}\s*\}\}\s*className="w-full flex items-center justify-center gap-2 p-4 text-slate-500 bg-white border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors mt-4"\s*>\s*<\/button>/g, '');

fs.writeFileSync('src/citizen/screens/Profile.tsx', pCode);
