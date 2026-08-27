const fs = require('fs');

let code = fs.readFileSync('src/data.ts', 'utf8');

const citiesDef = `
const CITIES = ['Chennai', 'Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad', 'Coimbatore', 'Madurai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kochi', 'Visakhapatnam'];

const CITY_LOCATIONS: Record<string, { lat: number, lng: number, address: string[], authority: string, state: string, weight: number }> = {
  'Chennai': { state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, address: ['Anna Salai', 'Arcot Road', 'OMR', 'Velachery Main Road', 'T Nagar', 'Mount Road'], authority: 'Greater Chennai Corporation', weight: 40 },
  'Bengaluru': { state: 'Karnataka', lat: 12.9716, lng: 77.5946, address: ['Outer Ring Road', 'M.G. Road', 'Hosur Road', 'Koramangala', 'Indiranagar'], authority: 'BBMP', weight: 30 },
  'Delhi': { state: 'Delhi', lat: 28.6139, lng: 77.2090, address: ['Ring Road', 'MG Road', 'Mathura Road', 'Connaught Place', 'Karol Bagh'], authority: 'MCD', weight: 35 },
  'Mumbai': { state: 'Maharashtra', lat: 19.0760, lng: 72.8777, address: ['Western Express Highway', 'S.V. Road', 'LBS Marg', 'Andheri', 'Bandra'], authority: 'BMC', weight: 35 },
  'Hyderabad': { state: 'Telangana', lat: 17.3850, lng: 78.4867, address: ['Banjara Hills', 'Jubilee Hills', 'Hitec City', 'Gachibowli'], authority: 'GHMC', weight: 25 },
  'Kolkata': { state: 'West Bengal', lat: 22.5726, lng: 88.3639, address: ['Park Street', 'Salt Lake', 'Howrah Bridge', 'New Town'], authority: 'KMC', weight: 20 },
  'Pune': { state: 'Maharashtra', lat: 18.5204, lng: 73.8567, address: ['MG Road', 'Koregaon Park', 'Viman Nagar', 'Hinjewadi'], authority: 'PMC', weight: 15 },
  'Ahmedabad': { state: 'Gujarat', lat: 23.0225, lng: 72.5714, address: ['SG Highway', 'CG Road', 'Ashram Road'], authority: 'AMC', weight: 15 },
  'Jaipur': { state: 'Rajasthan', lat: 26.9124, lng: 75.7873, address: ['MI Road', 'Malviya Nagar', 'Vaishali Nagar'], authority: 'JMC', weight: 10 },
  'Lucknow': { state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, address: ['Gomti Nagar', 'Hazratganj', 'Alambagh'], authority: 'LMC', weight: 10 },
  'Coimbatore': { state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558, address: ['Avinashi Road', 'Trichy Road', 'Sathy Road', 'RS Puram'], authority: 'CCMC', weight: 15 },
  'Madurai': { state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198, address: ['Bypass Road', 'K K Nagar', 'Anna Nagar'], authority: 'Madurai Corporation', weight: 10 },
  'Kochi': { state: 'Kerala', lat: 9.9312, lng: 76.2673, address: ['MG Road', 'Edappally', 'Kakkanad'], authority: 'KMC', weight: 10 },
  'Visakhapatnam': { state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185, address: ['Beach Road', 'MVP Colony', 'Gajuwaka'], authority: 'GVMC', weight: 5 }
};
`;

code = code.replace(/const CITIES = \[[\s\S]*?'Madurai'\];\n/g, "");
code = code.replace(/const CITY_LOCATIONS: Record<[\s\S]*?\} \};\n/g, "");

// Insert the new definitions right before `const AUTHORITIES`
code = code.replace(/const AUTHORITIES = /, citiesDef + "\nconst AUTHORITIES = ");

const generatorLogic = `
const weightedCities: string[] = [];
for (const city of Object.keys(CITY_LOCATIONS)) {
  for (let w = 0; w < CITY_LOCATIONS[city].weight; w++) {
    weightedCities.push(city);
  }
}

for (let i = 0; i < 250; i++) {
  const city = weightedCities[Math.floor(Math.random() * weightedCities.length)];
  const locationData = CITY_LOCATIONS[city];
  const authority = locationData.authority;
  const address = locationData.address[Math.floor(Math.random() * locationData.address.length)];
  
  // Create a realistic cluster spread: most within 0.05 deg, some within 0.15 deg
  const spread = Math.random() > 0.8 ? 0.15 : 0.05;
  const lat = locationData.lat + (Math.random() - 0.5) * spread;
  const lng = locationData.lng + (Math.random() - 0.5) * spread;
`;

code = code.replace(/for \(let i = 0; i < 22; i\+\+\) \{[\s\S]*?const lng = locationData.lng \+ \(Math.random\(\) - 0.5\) \* 0.1;/, generatorLogic);

fs.writeFileSync('src/data.ts', code);
