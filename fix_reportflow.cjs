const fs = require('fs');
let code = fs.readFileSync('src/citizen/screens/ReportFlow.tsx', 'utf8');

code = code.replace(/\{privacyProtected && \(\s*\)\}/g, '');

fs.writeFileSync('src/citizen/screens/ReportFlow.tsx', code);
