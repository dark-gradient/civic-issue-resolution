const fs = require('fs');
let code = fs.readFileSync('src/government/screens/IssueQueue.tsx', 'utf8');

code = code.replace(/const \{ issues \} = useApp\(\);/, "const { issues, globalSearch } = useApp();");
code = code.replace(/const \[searchTerm, setSearchTerm\] = useState\(''\);/, "");
code = code.replace(/if \(searchTerm\) \{[\s\S]*?\}/, `
    if (globalSearch) {
      const q = globalSearch.toLowerCase();
      if (!i.id.toLowerCase().includes(q) && 
          !i.type.toLowerCase().includes(q) && 
          !i.city.toLowerCase().includes(q) && 
          !i.state.toLowerCase().includes(q) && 
          !i.ward.toLowerCase().includes(q) && 
          !i.authority.toLowerCase().includes(q) && 
          !i.department.toLowerCase().includes(q) && 
          !i.status.toLowerCase().includes(q) &&
          !i.description.toLowerCase().includes(q)) {
        return false;
      }
    }
`);

// Also remove the local search bar in IssueQueue.tsx since we have the global one
code = code.replace(/<div className="relative flex-1 max-w-md">[\s\S]*?<\/div>/, "");

fs.writeFileSync('src/government/screens/IssueQueue.tsx', code);
