const fs = require('fs');
let gApp = fs.readFileSync('src/government/GovApp.tsx', 'utf8');

gApp = gApp.replace(/<button\s*onClick=\{\(\) => \{\s*setIsMenuOpen\(false\);\s*logoutGov\(\);\s*navigate\('\/select-role', \{ replace: true \}\);\s*\}\s*\}\}\s*className="w-full text-left px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 font-bold flex items-center gap-2 border-t border-slate-100"\s*>\s*<\/button>/g, '');

fs.writeFileSync('src/government/GovApp.tsx', gApp);
