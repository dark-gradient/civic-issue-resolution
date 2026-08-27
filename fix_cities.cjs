const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const newCitiesArray = `const CITIES = ['Chennai', 'Bengaluru', 'New Delhi', 'Mumbai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Ludhiana', 'Meerut', 'Faribabad', 'Gwalior', 'Kota', 'Surat'];`;

const newCityLocations = `const CITY_LOCATIONS: Record<string, { lat: number, lng: number, address: string[], authority: string, state: string, weight: number }> = {
  'Chennai': { state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, address: ['Anna Salai', 'OMR'], authority: 'Greater Chennai Corporation', weight: 40 },
  'Bengaluru': { state: 'Karnataka', lat: 12.9716, lng: 77.5946, address: ['Outer Ring Road', 'M.G. Road'], authority: 'BBMP', weight: 150 },
  'New Delhi': { state: 'Delhi', lat: 28.6139, lng: 77.2090, address: ['Ring Road', 'Connaught Place'], authority: 'NDMC', weight: 180 },
  'Mumbai': { state: 'Maharashtra', lat: 19.0760, lng: 72.8777, address: ['Western Express Highway', 'Bandra'], authority: 'BMC', weight: 160 },
  'Hyderabad': { state: 'Telangana', lat: 17.3850, lng: 78.4867, address: ['Banjara Hills', 'Hitec City'], authority: 'GHMC', weight: 25 },
  'Kolkata': { state: 'West Bengal', lat: 22.5726, lng: 88.3639, address: ['Park Street', 'Salt Lake'], authority: 'KMC', weight: 20 },
  'Pune': { state: 'Maharashtra', lat: 18.5204, lng: 73.8567, address: ['MG Road', 'Hinjewadi'], authority: 'PMC', weight: 15 },
  'Ahmedabad': { state: 'Gujarat', lat: 23.0225, lng: 72.5714, address: ['SG Highway'], authority: 'AMC', weight: 15 },
  'Ludhiana': { state: 'Punjab', lat: 30.9009, lng: 75.8572, address: ['Ferozepur Road'], authority: 'LMC', weight: 90 },
  'Meerut': { state: 'Uttar Pradesh', lat: 28.9844, lng: 77.7064, address: ['Abu Lane'], authority: 'MMC', weight: 80 },
  'Faribabad': { state: 'Haryana', lat: 28.4089, lng: 77.3177, address: ['NIT'], authority: 'FMC', weight: 80 },
  'Gwalior': { state: 'Madhya Pradesh', lat: 26.2124, lng: 78.1772, address: ['Lashkar'], authority: 'GMC', weight: 80 },
  'Kota': { state: 'Rajasthan', lat: 25.2138, lng: 75.8647, address: ['Talwandi'], authority: 'KMC', weight: 80 },
  'Surat': { state: 'Gujarat', lat: 21.1702, lng: 72.8310, address: ['Adajan'], authority: 'SMC', weight: 110 }
};`;

code = code.replace(/const CITIES = \[.*?\];/s, newCitiesArray);
code = code.replace(/const CITY_LOCATIONS: Record<string, \{.*?\}> = \{[\s\S]*?\};\n/m, newCityLocations + '\n');

fs.writeFileSync('src/data.ts', code);
