const fs = require('fs');
let auth = fs.readFileSync('src/auth/AuthFlow.tsx', 'utf8');

auth = auth.replace(/phone: '\+91 98765 43210',/, 
`phone: 'PROTECTED',
      identityHash: 'a81f3d9b...93c2',
      phoneHash: 'e4d909c2...41a1',`);

fs.writeFileSync('src/auth/AuthFlow.tsx', auth);
