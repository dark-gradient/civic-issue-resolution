const fs = require('fs');

let code = fs.readFileSync('src/data.ts', 'utf8');
code = code.replace(/const CITY_LOCATIONS: Record<string, \{ lat: number, lng: number, address: string\[\], authority: string, state: string \}> = \{[\s\S]*?'Madurai': \{ state: 'Tamil Nadu', lat: 9\.9252, lng: 78\.1198, address: \['Bypass Road', 'K K Nagar', 'Anna Nagar'\], authority: 'Madurai Corporation' \}\n\};\n/, "");
fs.writeFileSync('src/data.ts', code);
