const fs = require('fs');
let code = fs.readFileSync('src/government/GovApp.tsx', 'utf8');

// Hook into context
code = code.replace(/const \{ user, logout, setActiveApp \} = useApp\(\);/, "const { user, logout, setActiveApp, globalSearch, setGlobalSearch } = useApp();");

// Replace search input
code = code.replace(/<input [\s\S]*?className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500\/20 focus:border-blue-500 transition-all placeholder-slate-400"\s*\/>/, 
  `<input 
                type="text" 
                placeholder="Search ID, City, Type, Desc..." 
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400"
              />`);

// Fix logo click
code = code.replace(/<div className="flex items-center space-x-3">/g, `<div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('overview')}>`);

fs.writeFileSync('src/government/GovApp.tsx', code);
