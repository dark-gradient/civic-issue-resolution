const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const additionalCities = [
  // North
  {name: 'Srinagar', lat: 34.0837, lng: 74.7973, weight: 60},
  {name: 'Jammu', lat: 32.7266, lng: 74.8570, weight: 70},
  {name: 'Shimla', lat: 31.1048, lng: 77.1734, weight: 50},
  {name: 'Chandigarh', lat: 30.7333, lng: 76.7794, weight: 90},
  {name: 'Dehradun', lat: 30.3165, lng: 78.0322, weight: 60},
  
  // West / Central
  {name: 'Jaipur', lat: 26.9124, lng: 75.7873, weight: 100},
  {name: 'Jodhpur', lat: 26.2389, lng: 73.0243, weight: 70},
  {name: 'Udaipur', lat: 24.5854, lng: 73.7125, weight: 60},
  {name: 'Bhopal', lat: 23.2599, lng: 77.4126, weight: 90},
  {name: 'Indore', lat: 22.7196, lng: 75.8577, weight: 110},
  {name: 'Nagpur', lat: 21.1458, lng: 79.0882, weight: 100},
  {name: 'Rajkot', lat: 22.3039, lng: 70.8022, weight: 80},
  
  // East / Northeast
  {name: 'Patna', lat: 25.5941, lng: 85.1376, weight: 120},
  {name: 'Ranchi', lat: 23.3441, lng: 85.3096, weight: 80},
  {name: 'Bhubaneswar', lat: 20.2961, lng: 85.8245, weight: 90},
  {name: 'Guwahati', lat: 26.1445, lng: 91.7362, weight: 100},
  {name: 'Shillong', lat: 25.5788, lng: 91.8933, weight: 40},
  
  // South
  {name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, weight: 90},
  {name: 'Vijayawada', lat: 16.5062, lng: 80.6480, weight: 80},
  {name: 'Mysuru', lat: 12.2958, lng: 76.6394, weight: 70},
  {name: 'Coimbatore', lat: 11.0168, lng: 76.9558, weight: 90},
  {name: 'Madurai', lat: 9.9252, lng: 78.1198, weight: 80},
  {name: 'Kochi', lat: 9.9312, lng: 76.2673, weight: 100},
  {name: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366, weight: 80}
];

let citiesMatch = code.match(/const CITIES = \[(.*?)\];/);
if (citiesMatch) {
  let existing = citiesMatch[1].split(',').map(s => s.trim().replace(/'/g, ''));
  let newCityNames = additionalCities.map(c => c.name);
  let all = [...new Set([...existing, ...newCityNames])];
  code = code.replace(citiesMatch[0], \`const CITIES = ['\${all.join("', '")}'];\`);
}

let locationsMatch = code.match(/const CITY_LOCATIONS: Record<string, \{.*?\}> = \{([\s\S]*?)\};/m);
if (locationsMatch) {
  let existingLocations = locationsMatch[1];
  let newLocations = additionalCities.map(c => \`  '\${c.name}': { state: 'State', lat: \${c.lat}, lng: \${c.lng}, address: ['Center'], authority: 'Gov', weight: \${c.weight} }\`).join(',\\n');
  code = code.replace(locationsMatch[0], \`const CITY_LOCATIONS: Record<string, { lat: number, lng: number, address: string[], authority: string, state: string, weight: number }> = {\\n\${existingLocations},\\n\${newLocations}\\n};\`);
}

fs.writeFileSync('src/data.ts', code);
