const fs = require('fs');

let code = fs.readFileSync('src/data.ts', 'utf8');

// For hardcoded issues:
code = code.replace(/after: 'https:\/\/loremflickr\.com\/400\/300\/[^?]+\?lock=\d+'/g, (match) => {
  return match.replace(/104\d\d/, (num) => parseInt(num) - 1000); // Wait, I added 1000 in my previous script. Let's just do a regex replace to use the SAME lock ID.
});

// Actually, let's just make randomAfterImg equal to randomBeforeImg
code = code.replace(/const randomAfterImg = \`https:\/\/loremflickr\.com\/400\/300\/\$\{typeToKeyword\[type\] \|\| 'city'\}\?lock=\$\{20600 \+ i\}\`;/g, 
  "const randomAfterImg = `https://loremflickr.com/400/300/${typeToKeyword[type] || 'city'}?lock=${10600 + i}`;");

// And for the hardcoded ones, they have lock=10482 etc.
code = code.replace(/after:\s*'https:\/\/loremflickr\.com\/400\/300\/([^?]+)\?lock=(\d+)'/g, (match, kw, lockStr) => {
  let num = parseInt(lockStr);
  if (num >= 1000) num -= 1000;
  return `after: 'https://loremflickr.com/400/300/${kw}?lock=${num}'`;
});

fs.writeFileSync('src/data.ts', code);
