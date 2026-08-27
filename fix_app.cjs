const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// The main app should render AuthFlow if activeApp is null, OR if the active app is not authenticated.
// Actually, AuthFlow handles the WELCOME screen when activeApp is null.
code = code.replace(/if \(authState !== 'AUTHENTICATED' \|\| !user\) \{/, "if (!activeApp || authState !== 'AUTHENTICATED' || !user) {");

fs.writeFileSync('src/App.tsx', code);
