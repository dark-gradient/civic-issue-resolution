const fs = require('fs');

let ctx = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

ctx = ctx.replace(/alert\\\(\\\`Successfully synced \\\\\\\$\\\{offlineQueue\.length\\\}\ offline reports\.\\\`\\\);/g, 
  "alert(`Successfully synced ${offlineQueue.length} offline reports.`);");
  
ctx = ctx.replace(/id: \\\`t-\\\\\\\$\\\{Date\.now\(\)\\\}\\\`/g, "id: `t-${Date.now()}`");
ctx = ctx.replace(/title: \\\`Status updated to \\\\\\\$\\\{status\\\}\\\`/g, "title: `Status updated to ${status}`");
ctx = ctx.replace(/title: \\\`Assigned to \\\\\\\$\\\{assignee\\\}\\\`/g, "title: `Assigned to ${assignee}`");

// Actually, let's just do a blanket replace of all escaped backticks and dollars.
ctx = ctx.replace(/\\\`/g, '`').replace(/\\\$/g, '$');

fs.writeFileSync('src/context/AppContext.tsx', ctx);
