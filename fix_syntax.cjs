const fs = require('fs');
let code = fs.readFileSync('src/government/screens/IssueQueue.tsx', 'utf8');

code = code.replace(/    \}\n    \}\n    return true;/g, "    }\n    return true;");

fs.writeFileSync('src/government/screens/IssueQueue.tsx', code);
