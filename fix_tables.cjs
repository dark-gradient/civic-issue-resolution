const fs = require('fs');

let iq = fs.readFileSync('src/government/screens/IssueQueue.tsx', 'utf8');

// Fix the table head
iq = iq.replace(/<th className="px-6 py-4 font-semibold text-center">Action<\/th>/, 
  '<th className="px-6 py-4 font-semibold text-center sticky right-0 bg-slate-50 z-20 shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.1)]">Action</th>');

// Fix the table cell
iq = iq.replace(/<td className="px-6 py-4 text-center">([\s\S]*?)<\/td>/g, (match, p1) => {
  return `<td className="px-6 py-4 text-center sticky right-0 bg-white group-hover:bg-slate-50 shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.1)] transition-colors z-10">${p1}</td>`;
});

// Also make the first column (Priority / Issue ID) sticky maybe? Not required, but Action is required.
// Wait, the thead has `bg-slate-50/50`, let's make it solid so it overlaps properly.
iq = iq.replace(/<thead className="text-xs text-slate-500 bg-slate-50\/50 uppercase tracking-wider sticky top-0 z-10">/, 
  '<thead className="text-xs text-slate-500 bg-slate-50 uppercase tracking-wider sticky top-0 z-20 shadow-sm">');

fs.writeFileSync('src/government/screens/IssueQueue.tsx', iq);

let overview = fs.readFileSync('src/government/screens/Overview.tsx', 'utf8');

// Fix Overview table head
overview = overview.replace(/<th className="px-4 py-3 font-semibold text-right">Action<\/th>/, 
  '<th className="px-4 py-3 font-semibold text-right sticky right-0 bg-slate-50 z-20 shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.1)]">Action</th>');

overview = overview.replace(/<td className="px-4 py-3 text-right">([\s\S]*?)<\/td>/g, (match, p1) => {
  return `<td className="px-4 py-3 text-right sticky right-0 bg-white group-hover:bg-slate-50 shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.1)] transition-colors z-10">${p1}</td>`;
});

overview = overview.replace(/<thead className="text-xs text-slate-500 bg-slate-50 uppercase tracking-wider sticky top-0">/, 
  '<thead className="text-xs text-slate-500 bg-slate-50 uppercase tracking-wider sticky top-0 z-20 shadow-sm">');

fs.writeFileSync('src/government/screens/Overview.tsx', overview);
