import { Issue, TimelineEvent } from './types';

const pastDate = (days: number, hours: number = 0) => new Date(Date.now() - 1000 * 60 * 60 * 24 * days - 1000 * 60 * 60 * hours).toISOString();

export const MOCK_ISSUES: Issue[] = [
  // CHENNAI - Pothole Cluster
  {
    id: 'CIV-10482',
    title: 'Large pothole near bus stop',
    type: 'Pothole',
    originalLanguage: 'ta',
    originalDescription: 'பேருந்து நிலையத்திற்கு அருகில் சாலையில் பெரிய குழி உள்ளது. இது மிகவும் ஆபத்தானது.',
    description: 'There is a massive pothole near the bus stop causing severe traffic slowdowns and risking accidents for two-wheelers.',
    location: '12, Anna Nagar Main Road',
    ward: 'Ward 37',
    city: 'Chennai',
    state: 'Tamil Nadu',
    authority: 'Greater Chennai Corporation (GCC)',
    lat: 13.0827,
    lng: 80.2707,
    status: 'Assigned',
    priority: 'Critical',
    department: 'Roads',
    reportedAt: pastDate(0, 2), // 2 hours ago
    updatedAt: pastDate(0, 0.5),
    reportsCount: 17,
    aiConfidence: 98,
    assignee: 'Road Maintenance Team B',
    slaHours: 24,
    slaRemaining: '21h 30m',
    images: { 
      before: 'https://loremflickr.com/400/300/pothole,road?lock=10482' 
    },
    privacyProcessed: true,
    facesBlurred: 2,
    timeline: [
      { id: 't1', title: 'Report submitted', timestamp: pastDate(0, 2), status: 'Submitted', description: 'Initial report by citizen.' },
      { id: 't2', title: 'AI analysis completed', timestamp: pastDate(0, 1.9), status: 'AI Analysis', description: 'Categorized as Pothole with 98% confidence. Merged 16 duplicate reports.' },
      { id: 't3', title: 'Assigned to Roads Department', timestamp: pastDate(0, 1.5), status: 'Assigned', description: 'Assigned based on jurisdiction.' },
    ]
  },
  // BENGALURU - Open Manhole Reopened
  {
    id: 'CIV-10501',
    title: 'Open manhole near school',
    type: 'Open Manhole',
    originalLanguage: 'en',
    originalDescription: 'Manhole cover is missing entirely on the pavement right outside the primary school. Very dangerous.',
    description: 'Manhole cover is missing entirely on the pavement right outside the primary school. Very dangerous.',
    location: 'Koramangala 5th Block, Near Govt School',
    ward: 'Ward 68',
    city: 'Bengaluru',
    state: 'Karnataka',
    authority: 'Bruhat Bengaluru Mahanagara Palike (BBMP)',
    lat: 12.9352,
    lng: 77.6245,
    status: 'Reopened',
    priority: 'Critical',
    department: 'Drainage',
    reportedAt: pastDate(1), // 1 day ago
    updatedAt: pastDate(0, 0.1),
    reportsCount: 31,
    aiConfidence: 99,
    assignee: 'Drainage Team C',
    slaHours: 12,
    slaRemaining: '-12h 10m', // Breached
    images: { 
      before: 'https://loremflickr.com/400/300/manhole?lock=10501',
      after: 'https://loremflickr.com/400/300/manhole?lock=10501' 
    },
    privacyProcessed: true,
    facesBlurred: 1,
    timeline: [
      { id: 't1', title: 'Report submitted', timestamp: pastDate(1), status: 'Submitted', description: 'Citizen reported open manhole.' },
      { id: 't2', title: 'Marked Resolved', timestamp: pastDate(0, 10), status: 'Awaiting Verification', description: 'Temporary barricade placed.' },
      { id: 't3', title: 'Reopened by Citizen', timestamp: pastDate(0, 0.1), status: 'Reopened', description: 'Barricade fell, manhole still open. Not permanently fixed.' },
    ]
  },
  // CHENNAI - Water Leakage
  {
    id: 'CIV-10512',
    title: 'Overflowing Sewage',
    type: 'Drainage',
    originalLanguage: 'ta',
    originalDescription: 'சாக்கடை நீர் பிரதான சாலையில் பெருக்கெடுத்து ஓடுகிறது.',
    description: 'Sewage water is overflowing onto the main road, causing a severe biohazard.',
    location: 'Velachery Main Road',
    ward: 'Ward 177',
    city: 'Chennai',
    state: 'Tamil Nadu',
    authority: 'CMWSSB',
    lat: 12.9750,
    lng: 80.2210,
    status: 'Submitted',
    priority: 'High',
    department: 'Unassigned',
    reportedAt: pastDate(0, 0.25),
    updatedAt: pastDate(0, 0.25),
    reportsCount: 8,
    aiConfidence: 91,
    assignee: 'Unassigned',
    slaHours: 12,
    slaRemaining: '11h 45m',
    images: { 
      before: 'https://loremflickr.com/400/300/city,street?lock=10512' 
    },
    privacyProcessed: true,
    facesBlurred: 0,
    timeline: [
      { id: 't1', title: 'Report submitted', timestamp: pastDate(0, 0.25), status: 'Submitted', description: 'Reported by citizen.' },
    ]
  },
  // DELHI - Garbage
  {
    id: 'CIV-10523',
    title: 'Illegal Garbage Dumping',
    type: 'Garbage accumulation',
    originalLanguage: 'hi',
    originalDescription: 'सड़क के किनारे बहुत सारा कचरा फेंका गया है। बदबू बहुत आ रही है।',
    description: 'A lot of garbage has been dumped on the side of the road. It smells very bad.',
    location: 'Lajpat Nagar Market, Ring Road',
    ward: 'Ward 14',
    city: 'Delhi',
    state: 'Delhi',
    authority: 'Municipal Corporation of Delhi (MCD)',
    lat: 28.5677,
    lng: 77.2433,
    status: 'In Progress',
    priority: 'Medium',
    department: 'Sanitation',
    reportedAt: pastDate(2),
    updatedAt: pastDate(1),
    reportsCount: 12,
    aiConfidence: 95,
    assignee: 'Sanitation Squad South',
    slaHours: 48,
    slaRemaining: '5h 20m',
    images: { 
      before: 'https://loremflickr.com/400/300/garbage,street?lock=10523' 
    },
    privacyProcessed: true,
    timeline: [
      { id: 't1', title: 'Report submitted', timestamp: pastDate(2), status: 'Submitted', description: 'Citizen reported garbage.' },
      { id: 't2', title: 'Assigned', timestamp: pastDate(1.5), status: 'Assigned', description: 'Assigned to MCD Sanitation.' },
      { id: 't3', title: 'In Progress', timestamp: pastDate(1), status: 'In Progress', description: 'Cleaning crew dispatched.' }
    ]
  },
  // MUMBAI - Waterlogging
  {
    id: 'CIV-10534',
    title: 'Severe Waterlogging',
    type: 'Road flooding',
    originalLanguage: 'hi',
    originalDescription: 'पूरी सड़क पानी से भर गई है, गाड़ियां नहीं जा पा रही हैं।',
    description: 'The entire road is flooded, vehicles cannot pass through.',
    location: 'Andheri West, Linking Road',
    ward: 'Ward K/W',
    city: 'Mumbai',
    state: 'Maharashtra',
    authority: 'Brihanmumbai Municipal Corporation (BMC)',
    lat: 19.1363,
    lng: 72.8277,
    status: 'Under Review',
    priority: 'Critical',
    department: 'Drainage',
    reportedAt: pastDate(0, 3),
    updatedAt: pastDate(0, 1),
    reportsCount: 52,
    aiConfidence: 99,
    assignee: 'Stormwater Mgmt Cell',
    slaHours: 6,
    slaRemaining: '3h 10m',
    images: { 
      before: 'https://loremflickr.com/400/300/flood,road?lock=10534' 
    },
    privacyProcessed: false,
    timeline: [
      { id: 't1', title: 'Report submitted', timestamp: pastDate(0, 3), status: 'Submitted', description: 'Citizen reported flooding.' },
      { id: 't2', title: 'Under Review', timestamp: pastDate(0, 1), status: 'Under Review', description: 'Escalated due to high report volume.' }
    ]
  },
  // HYDERABAD - Streetlight
  {
    id: 'CIV-10545',
    title: 'Broken Streetlights',
    type: 'Broken streetlight',
    originalLanguage: 'en',
    originalDescription: 'Entire stretch of streetlights is not working since 3 days. Very dark and unsafe.',
    description: 'Entire stretch of streetlights is not working since 3 days. Very dark and unsafe.',
    location: 'Banjara Hills Road No. 12',
    ward: 'Ward 92',
    city: 'Hyderabad',
    state: 'Telangana',
    authority: 'Greater Hyderabad Municipal Corporation (GHMC)',
    lat: 17.4156,
    lng: 78.4347,
    status: 'Resolved',
    priority: 'Medium',
    department: 'Electrical',
    reportedAt: pastDate(4),
    updatedAt: pastDate(1),
    reportsCount: 5,
    aiConfidence: 88,
    assignee: 'Electrical Maintenance Div 3',
    slaHours: 72,
    slaRemaining: 'Completed',
    images: { 
      before: 'https://loremflickr.com/400/300/streetlight?lock=10545',
      after: 'https://loremflickr.com/400/300/streetlight?lock=10545' 
    },
    privacyProcessed: false,
    timeline: [
      { id: 't1', title: 'Report submitted', timestamp: pastDate(4), status: 'Submitted', description: 'Reported by citizen.' },
      { id: 't2', title: 'Resolved', timestamp: pastDate(1), status: 'Resolved', description: 'Bulbs replaced.' }
    ]
  },
  // COIMBATORE - Stray animal
  {
    id: 'CIV-10556',
    title: 'Stray Cattle Hazard',
    type: 'Stray animal hazard',
    originalLanguage: 'ta',
    originalDescription: 'சாலை நடுவில் மாடுகள் சுற்றித்திரிகின்றன. போக்குவரத்துக்கு மிகவும் இடையூறாக உள்ளது.',
    description: 'Cattle wandering in the middle of the road causing traffic disruption.',
    location: 'Avinashi Road',
    ward: 'Ward 24',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    authority: 'Coimbatore City Municipal Corporation (CCMC)',
    lat: 11.0261,
    lng: 77.0142,
    status: 'Assigned',
    priority: 'Low',
    department: 'Sanitation',
    reportedAt: pastDate(0, 5),
    updatedAt: pastDate(0, 4),
    reportsCount: 3,
    aiConfidence: 75,
    assignee: 'Animal Control',
    slaHours: 24,
    slaRemaining: '19h 00m',
    images: { 
      before: 'https://loremflickr.com/400/300/cow,cattle?lock=10556' 
    },
    privacyProcessed: false,
    timeline: [
      { id: 't1', title: 'Report submitted', timestamp: pastDate(0, 5), status: 'Submitted', description: 'Reported by citizen.' },
      { id: 't2', title: 'Assigned', timestamp: pastDate(0, 4), status: 'Assigned', description: 'Assigned to animal control.' }
    ]
  },
  // MADURAI - Fallen Tree
  {
    id: 'CIV-10567',
    title: 'Fallen Tree Blocking Road',
    type: 'Fallen tree',
    originalLanguage: 'ta',
    originalDescription: 'மழையால் பெரிய மரம் சாலையில் விழுந்துவிட்டது. போக்குவரத்து பாதிக்கப்பட்டுள்ளது.',
    description: 'A large tree has fallen on the road due to rain. Traffic is blocked.',
    location: 'K K Nagar Main Road',
    ward: 'Ward 45',
    city: 'Madurai',
    state: 'Tamil Nadu',
    authority: 'Madurai Corporation',
    lat: 9.9329,
    lng: 78.1361,
    status: 'In Progress',
    priority: 'Critical',
    department: 'Parks',
    reportedAt: pastDate(0, 1),
    updatedAt: pastDate(0, 0.5),
    reportsCount: 15,
    aiConfidence: 94,
    assignee: 'Disaster Relief Team',
    slaHours: 4,
    slaRemaining: '3h 00m',
    images: { 
      before: 'https://loremflickr.com/400/300/fallen,tree,road?lock=10567' 
    },
    privacyProcessed: false,
    timeline: [
      { id: 't1', title: 'Report submitted', timestamp: pastDate(0, 1), status: 'Submitted', description: 'Reported by citizen.' },
      { id: 't2', title: 'In Progress', timestamp: pastDate(0, 0.5), status: 'In Progress', description: 'Team dispatched with equipment.' }
    ]
  }
];

// Add more dynamically to reach around 30 canonical issues

const CITIES = ['Chennai', 'Bengaluru', 'New Delhi', 'Mumbai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Ludhiana', 'Meerut', 'Faribabad', 'Gwalior', 'Kota', 'Surat'];

const CITY_LOCATIONS: Record<string, { lat: number, lng: number, address: string[], authority: string, state: string, weight: number }> = {
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
};

const AUTHORITIES = ['GCC', 'BBMP', 'MCD', 'BMC', 'GHMC', 'CCMC', 'Madurai Corporation', 'CMWSSB', 'State Highways PWD'];
const DEPARTMENTS: ('Roads' | 'Sanitation' | 'Electrical' | 'Drainage' | 'Water' | 'Parks' | 'Unassigned')[] = ['Roads', 'Sanitation', 'Electrical', 'Drainage', 'Water', 'Parks', 'Unassigned'];
const typeToKeyword: Record<string, string> = {
  "Pothole": "pothole,road",
  "Garbage accumulation": "garbage,street",
  "Overflowing drain": "drain,water",
  "Broken streetlight": "streetlight",
  "Damaged footpath": "sidewalk,broken",
  "Water leakage": "water,leak",
  "Damaged traffic signal": "trafficlight",
  "Public toilet maintenance": "public,toilet",
  "Road debris": "debris,road",
  "Open Manhole": "manhole",
  "Road flooding": "flood,road",
  "Stray animal hazard": "stray,dog",
  "Fallen tree": "fallen,tree,road"
};

const TYPES = ['Pothole', 'Garbage accumulation', 'Overflowing drain', 'Broken streetlight', 'Damaged footpath', 'Water leakage', 'Damaged traffic signal', 'Public toilet maintenance', 'Road debris'];



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

  const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];

  
  const statusPool: Issue['status'][] = ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Awaiting Verification', 'Closed'];
  const status = statusPool[Math.floor(Math.random() * statusPool.length)];
  
  const priorityPool: Issue['priority'][] = ['Low', 'Medium', 'High', 'Critical'];
  const priority = priorityPool[Math.floor(Math.random() * priorityPool.length)];
  
  const randomBeforeImg = `https://loremflickr.com/400/300/${typeToKeyword[type] || 'city'}?lock=${10600 + i}`;
  const randomAfterImg = `https://loremflickr.com/400/300/${typeToKeyword[type] || 'city'}?lock=${10600 + i}`;
  
  MOCK_ISSUES.push({
    id: `CIV-106${i.toString().padStart(2, '0')}`,
    title: `${type} in ${city}`,
    type: type,
    originalLanguage: Math.random() > 0.5 ? 'en' : (Math.random() > 0.5 ? 'hi' : 'ta'),
    originalDescription: `Issue reported regarding ${type}. Needs attention.`,
    description: `Issue reported regarding ${type}. Needs attention.`,
    location: `${address}, ${city}`,
    ward: `Ward ${Math.floor(Math.random() * 200)}`,
    city: city,
    state: CITY_LOCATIONS[city].state,
    authority: authority,
    lat: lat,
    lng: lng,
    status: status,
    priority: priority,
    department: department,
    reportedAt: pastDate(Math.floor(Math.random() * 10), Math.floor(Math.random() * 24)),
    updatedAt: pastDate(Math.floor(Math.random() * 2), Math.floor(Math.random() * 10)),
    reportsCount: Math.floor(Math.random() * (locationData.weight > 20 ? 80 : 30)) + 1,
    aiConfidence: 70 + Math.floor(Math.random() * 30),
    assignee: status === 'Submitted' ? 'Unassigned' : `Team ${Math.floor(Math.random() * 10)}`,
    slaHours: 24 * (Math.floor(Math.random() * 3) + 1),
    slaRemaining: status === 'Resolved' || status === 'Closed' ? 'Completed' : `${Math.floor(Math.random() * 20)}h`,
    images: { 
      before: randomBeforeImg,
      ...(['Resolved', 'Awaiting Verification', 'Closed'].includes(status) ? {after: randomAfterImg} : {})
    },
    privacyProcessed: true,
    timeline: [
      { id: `t1-${i}`, title: 'Report submitted', timestamp: pastDate(5), status: 'Submitted', description: 'Citizen reported' }
    ]
  });
}

