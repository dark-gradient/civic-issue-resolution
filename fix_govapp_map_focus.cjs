const fs = require('fs');
let code = fs.readFileSync('src/government/GovApp.tsx', 'utf8');

code = code.replace(/<GovLiveMap onNavigate=\{navigateTo\} \/>/g, "<GovLiveMap onNavigate={navigateTo} focusedIssueId={selectedIssueId} />");

fs.writeFileSync('src/government/GovApp.tsx', code);
