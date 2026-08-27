const fs = require('fs');

const filterLogic = `
export const filterIssuesBySearch = (issues: any[], search: string) => {
  if (!search) return issues;
  const q = search.toLowerCase();
  return issues.filter(i => 
    i.id.toLowerCase().includes(q) || 
    i.type.toLowerCase().includes(q) || 
    i.city.toLowerCase().includes(q) || 
    i.state.toLowerCase().includes(q) || 
    i.ward.toLowerCase().includes(q) || 
    i.authority.toLowerCase().includes(q) || 
    i.department.toLowerCase().includes(q) || 
    i.status.toLowerCase().includes(q) ||
    i.description.toLowerCase().includes(q)
  );
};
`;

let utils = fs.readFileSync('src/utils.ts', 'utf8');
if (!utils.includes('filterIssuesBySearch')) {
  utils += filterLogic;
  fs.writeFileSync('src/utils.ts', utils);
}

const fixScreen = (file) => {
  let code = fs.readFileSync(file, 'utf8');
  if (code.includes('const { issues } = useApp();')) {
    code = code.replace(/const \{ issues \} = useApp\(\);/, "const { issues: rawIssues, globalSearch } = useApp();\n  const issues = filterIssuesBySearch(rawIssues, globalSearch);");
    code = code.replace(/import \{ useApp \} from '\.\.\/\.\.\/context\/AppContext';/, "import { useApp } from '../../context/AppContext';\nimport { filterIssuesBySearch } from '../../utils';");
    fs.writeFileSync(file, code);
  }
};

fixScreen('src/government/screens/Overview.tsx');
fixScreen('src/government/screens/LiveMap.tsx');
