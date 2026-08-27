const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const replacement = `const CITY_LOCATIONS: Record<string, { lat: number, lng: number, address: string[], authority: string }> = {
  'Chennai': { lat: 13.0827, lng: 80.2707, address: ['Anna Salai', 'Arcot Road', 'OMR', 'Velachery Main Road'], authority: 'Greater Chennai Corporation' },
  'Bengaluru': { lat: 12.9716, lng: 77.5946, address: ['Outer Ring Road', 'M.G. Road', 'Hosur Road'], authority: 'BBMP' },
  'Delhi': { lat: 28.6139, lng: 77.2090, address: ['Ring Road', 'MG Road', 'Mathura Road'], authority: 'MCD' },
  'Mumbai': { lat: 19.0760, lng: 72.8777, address: ['Western Express Highway', 'S.V. Road', 'LBS Marg'], authority: 'BMC' },
  'Hyderabad': { lat: 17.3850, lng: 78.4867, address: ['Banjara Hills', 'Jubilee Hills', 'Hitec City'], authority: 'GHMC' },
  'Coimbatore': { lat: 11.0168, lng: 76.9558, address: ['Avinashi Road', 'Trichy Road', 'Sathy Road'], authority: 'CCMC' },
  'Madurai': { lat: 9.9252, lng: 78.1198, address: ['Bypass Road', 'K K Nagar', 'Anna Nagar'], authority: 'Madurai Corporation' }
};

for (let i = 0; i < 22; i++) {
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  const locationData = CITY_LOCATIONS[city];
  const authority = locationData.authority;
  const address = locationData.address[Math.floor(Math.random() * locationData.address.length)];
  const lat = locationData.lat + (Math.random() - 0.5) * 0.1;
  const lng = locationData.lng + (Math.random() - 0.5) * 0.1;
  const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
`;

// Replace from `for (let i = 0; i < 22; i++) {` down to `const type = `
code = code.replace(/for \(let i = 0; i < 22; i\+\+\) \{[\s\S]*?const type = TYPES\[Math.floor\(Math.random\(\) \* TYPES.length\)\];/, replacement);

code = code.replace(/location: \`Random Street, \$\{city\}\`/, 'location: `${address}, ${city}`');
code = code.replace(/lat: 13.0 \+ Math.random\(\),/, 'lat: lat,');
code = code.replace(/lng: 80.0 \+ Math.random\(\),/, 'lng: lng,');

fs.writeFileSync('src/data.ts', code);
