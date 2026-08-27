const fs = require('fs');

// 1. Update types.ts
let types = fs.readFileSync('src/types.ts', 'utf8');
types = types.replace(/city: string;/, 'city: string;\n  state: string;');
fs.writeFileSync('src/types.ts', types);

// 2. Update data.ts
let data = fs.readFileSync('src/data.ts', 'utf8');

const cityToState = {
  'Chennai': 'Tamil Nadu',
  'Bengaluru': 'Karnataka',
  'Delhi': 'Delhi',
  'Mumbai': 'Maharashtra',
  'Hyderabad': 'Telangana',
  'Coimbatore': 'Tamil Nadu',
  'Madurai': 'Tamil Nadu'
};

data = data.replace(/city:\s*'([^']+)',/g, (match, city) => {
  if (cityToState[city]) {
    return `city: '${city}',\n    state: '${cityToState[city]}',`;
  }
  return match;
});

data = data.replace(/city: city,/, 'city: city,\n    state: CITY_LOCATIONS[city].state,');

// Update CITY_LOCATIONS definition to include state
data = data.replace(/const CITY_LOCATIONS: Record<string, \{ lat: number, lng: number, address: string\[\], authority: string \}> = \{/, 
  "const CITY_LOCATIONS: Record<string, { lat: number, lng: number, address: string[], authority: string, state: string }> = {");

data = data.replace(/'Chennai': \{/, "'Chennai': { state: 'Tamil Nadu',");
data = data.replace(/'Bengaluru': \{/, "'Bengaluru': { state: 'Karnataka',");
data = data.replace(/'Delhi': \{/, "'Delhi': { state: 'Delhi',");
data = data.replace(/'Mumbai': \{/, "'Mumbai': { state: 'Maharashtra',");
data = data.replace(/'Hyderabad': \{/, "'Hyderabad': { state: 'Telangana',");
data = data.replace(/'Coimbatore': \{/, "'Coimbatore': { state: 'Tamil Nadu',");
data = data.replace(/'Madurai': \{/, "'Madurai': { state: 'Tamil Nadu',");

fs.writeFileSync('src/data.ts', data);
