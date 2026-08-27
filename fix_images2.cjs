const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const typeToKeyword = {
  'Pothole': 'pothole,road',
  'Garbage accumulation': 'garbage,street',
  'Overflowing drain': 'drain,water',
  'Broken streetlight': 'streetlight',
  'Damaged footpath': 'sidewalk,broken',
  'Water leakage': 'water,leak',
  'Damaged traffic signal': 'trafficlight',
  'Public toilet maintenance': 'public,toilet',
  'Road debris': 'debris,road',
  'Open Manhole': 'manhole',
  'Road flooding': 'flood,road',
  'Stray animal hazard': 'stray,dog',
  'Fallen tree': 'fallen,tree,road'
};

// For hardcoded mock issues
code = code.replace(/id:\s*'CIV-(\d+)',[\s\S]*?type:\s*'([^']+)',[\s\S]*?images:\s*\{([^}]*)\}/g, (match, id, type, imgContent) => {
  const numId = parseInt(id, 10);
  const kw = typeToKeyword[type] || 'city,street';
  
  const hasAfter = imgContent.includes('after:');
  const beforeUrl = `https://loremflickr.com/400/300/${kw}?lock=${numId}`;
  
  if (hasAfter) {
    const afterUrl = `https://loremflickr.com/400/300/${kw}?lock=${numId + 1000}`;
    return match.replace(/images:\s*\{[^}]*\}/, `images: { \n      before: '${beforeUrl}',\n      after: '${afterUrl}' \n    }`);
  } else {
    return match.replace(/images:\s*\{[^}]*\}/, `images: { \n      before: '${beforeUrl}' \n    }`);
  }
});

// For dynamic mock issues loop
code = code.replace(/const randomBeforeImg = [^;]+;/, `const randomBeforeImg = \`https://loremflickr.com/400/300/\${typeToKeyword[type] || 'city'}?lock=\${10600 + i}\`;`);
code = code.replace(/const randomAfterImg = [^;]+;/, `const randomAfterImg = \`https://loremflickr.com/400/300/\${typeToKeyword[type] || 'city'}?lock=\${20600 + i}\`;`);

code = code.replace(/const TYPE_IMAGES: Record<string, string\[\]> = \{[\s\S]*?\};\n/, `const typeToKeyword: Record<string, string> = ${JSON.stringify(typeToKeyword, null, 2)};\n`);

fs.writeFileSync('src/data.ts', code);
