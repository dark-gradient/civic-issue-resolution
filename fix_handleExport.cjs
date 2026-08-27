const fs = require('fs');
let code = fs.readFileSync('src/government/screens/Overview.tsx', 'utf8');

const exportFunc = `
  const handleExport = () => {
    const headers = ['Report ID', 'Issue Type', 'Original Language', 'Description', 'City', 'State', 'Address', 'Latitude', 'Longitude', 'Jurisdiction', 'Ward', 'Department', 'Priority', 'Status', 'Citizen Report Count', 'Assigned Team', 'Created Date', 'Updated Date'];
    
    const rows = issues.map(i => [
      i.id,
      i.type,
      i.originalLanguage,
      '"' + i.description.replace(/"/g, '""') + '"',
      i.city,
      i.state,
      '"' + i.location.replace(/"/g, '""') + '"',
      i.lat,
      i.lng,
      '"' + i.authority.replace(/"/g, '""') + '"',
      i.ward,
      i.department,
      i.priority,
      i.status,
      i.reportsCount,
      i.assignee,
      i.reportedAt,
      i.updatedAt
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'civic_issues_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
`;

code = code.replace(/const issues = filterIssuesBySearch\(rawIssues, globalSearch\);/, "const issues = filterIssuesBySearch(rawIssues, globalSearch);\n" + exportFunc);

fs.writeFileSync('src/government/screens/Overview.tsx', code);
