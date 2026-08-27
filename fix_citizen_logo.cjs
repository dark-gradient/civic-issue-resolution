const fs = require('fs');

let code = fs.readFileSync('src/citizen/CitizenApp.tsx', 'utf8');

code = code.replace(/<div className="flex items-center space-x-2">/, `<div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigateTo('report')}>`);

fs.writeFileSync('src/citizen/CitizenApp.tsx', code);
