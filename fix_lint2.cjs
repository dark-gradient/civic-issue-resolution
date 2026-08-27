const fs = require('fs');

// Fix ReportFlow
let rf = fs.readFileSync('src/citizen/screens/ReportFlow.tsx', 'utf8');
rf = rf.replace(/city: 'Chennai',/, "state: 'Tamil Nadu',\n        city: 'Chennai',");
fs.writeFileSync('src/citizen/screens/ReportFlow.tsx', rf);

// Fix IssueQueue
let iq = fs.readFileSync('src/government/screens/IssueQueue.tsx', 'utf8');
if (!iq.includes('const [searchTerm, setSearchTerm]')) {
  iq = iq.replace(/export const GovIssueQueue: React\.FC<\{ onNavigate: \(s: any, id\?: string\) => void, filterBy\?: string \}> = \(\{ onNavigate, filterBy \}\) => \{/,
    `export const GovIssueQueue: React.FC<{ onNavigate: (s: any, id?: string) => void, filterBy?: string }> = ({ onNavigate, filterBy }) => {
  const [searchTerm, setSearchTerm] = React.useState('');`);
  fs.writeFileSync('src/government/screens/IssueQueue.tsx', iq);
}
