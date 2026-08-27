const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const typeToKeyword = {
  'Pothole': 'pothole',
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

const getImg = (type, id, suffix='') => {
  const keyword = typeToKeyword[type] || 'city,street';
  const numericId = parseInt(id.replace(/\D/g, '')) || Math.floor(Math.random() * 1000);
  const lockId = suffix === 'after' ? numericId + 1000 : numericId;
  return `https://loremflickr.com/400/300/${keyword}?lock=${lockId}`;
};

code = code.replace(/images:\s*\{\s*before:\s*'[^']+'(?:,\s*after:\s*'[^']+')?\s*\}/g, (match, p1, offset, string) => {
  // We need to figure out the ID and TYPE for this block.
  // We can do this by regexing the whole file, but it's easier to just rewrite the file's image generation.
  return match;
});
