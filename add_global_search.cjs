const fs = require('fs');

let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

if (!code.includes('globalSearch: string;')) {
  // Add to type
  code = code.replace(/resetDemoData: \(\) => void;/g, "resetDemoData: () => void;\n  globalSearch: string;\n  setGlobalSearch: (s: string) => void;");

  // Add state to component
  code = code.replace(/const \[activeApp, setActiveApp\] = useState\<'CITIZEN' \| 'GOV'\>\('CITIZEN'\);/, "const [activeApp, setActiveApp] = useState<'CITIZEN' | 'GOV'>('CITIZEN');\n  const [globalSearch, setGlobalSearch] = useState('');");

  // Add to Provider value
  code = code.replace(/resetDemoData\n    \}\}>/, "resetDemoData,\n      globalSearch,\n      setGlobalSearch\n    }}>");

  fs.writeFileSync('src/context/AppContext.tsx', code);
}
