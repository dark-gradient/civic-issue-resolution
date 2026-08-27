const fs = require('fs');
let code = fs.readFileSync('src/government/screens/LiveMap.tsx', 'utf8');

code = code.replace(
  /<HeatmapLayer points=\{heatPoints\} \/>\n\s*<CityLabels \/>/, 
  '<>\n              <HeatmapLayer points={heatPoints} />\n              <CityLabels />\n            </>'
);

fs.writeFileSync('src/government/screens/LiveMap.tsx', code);
