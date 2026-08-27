const fs = require('fs');
let code = fs.readFileSync('src/government/screens/LiveMap.tsx', 'utf8');

code = code.replace(
  /gradient: \{ 0\.4: 'blue', 0\.6: 'cyan', 0\.7: 'lime', 0\.8: 'yellow', 1\.0: 'red' \}/,
  "gradient: { 0.1: '#fffad3', 0.2: '#fff06b', 0.3: '#fcd253', 0.5: '#f99d31', 0.7: '#f25b22', 0.8: '#c02626', 0.9: '#731613', 1.0: '#230906' }"
);

fs.writeFileSync('src/government/screens/LiveMap.tsx', code);
