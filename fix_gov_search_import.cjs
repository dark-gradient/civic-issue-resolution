const fs = require('fs');
let code = fs.readFileSync('src/government/GovApp.tsx', 'utf8');

code = code.replace(/const \{ user, logout, resetDemoData, issues, setActiveApp \} = useApp\(\);/, "const { user, logout, resetDemoData, issues, setActiveApp, globalSearch, setGlobalSearch } = useApp();");

fs.writeFileSync('src/government/GovApp.tsx', code);
