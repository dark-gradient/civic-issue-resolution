const fs = require('fs');
let ctx = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

const langDetectionLogic = `
  useEffect(() => {
    const stored = localStorage.getItem('civic_language');
    if (stored) return; // User already set preference

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Simulated reverse geocoding for prototype. 
            // In a real app, this would call a geocoding API.
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            // Rough bounding boxes for prototype demo
            let detectedLang = 'en';
            if (lat > 8.0 && lat < 13.5 && lng > 76.0 && lng < 80.3) {
              detectedLang = 'ta'; // Tamil Nadu rough bounds
            } else if (lat > 20.0 && lat < 30.0 && lng > 73.0 && lng < 85.0) {
              detectedLang = 'hi'; // North/Central India rough bounds (Hindi)
            }
            // For the demo, if we don't match, we fallback to English
            setLanguageState(detectedLang);
          } catch (e) {
            console.error("Geocoding failed", e);
          }
        },
        (error) => {
          console.error("Location access denied or failed", error);
        }
      );
    }
  }, []);
`;

// Insert it before the first useEffect
ctx = ctx.replace(/  \/\/ Initial load\n  useEffect\(\(\) => \{/, langDetectionLogic + '\n  // Initial load\n  useEffect(() => {');

fs.writeFileSync('src/context/AppContext.tsx', ctx);
