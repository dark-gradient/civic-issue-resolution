const fs = require('fs');
let content = fs.readFileSync('src/government/screens/IssueDetail.tsx', 'utf8');

// The issue was I removed all closing braces for jsx comments.
// Let's replace `/* COL` with `/* COL` and ensure `*/}` is preserved? No, the easiest is to just find all unclosed `{\/\*` and add `}` after `*\/`
content = content.replace(/\{\/\*([^]*?)\*\/(?!})/g, '{/*$1*/}');

fs.writeFileSync('src/government/screens/IssueDetail.tsx', content);
