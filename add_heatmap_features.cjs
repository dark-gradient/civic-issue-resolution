const fs = require('fs');
let code = fs.readFileSync('src/government/screens/LiveMap.tsx', 'utf8');

const cityLabelsComponent = `
const CityLabels = () => {
  const cities = [
    { name: 'Ludhiana', lat: 30.9009, lng: 75.8572 },
    { name: 'Meerut', lat: 28.9844, lng: 77.7064 },
    { name: 'New Delhi', lat: 28.6139, lng: 77.2090 },
    { name: 'Faribabad', lat: 28.4089, lng: 77.3177 },
    { name: 'Gwalior', lat: 26.2124, lng: 78.1772 },
    { name: 'Kota', lat: 25.2138, lng: 75.8647 },
    { name: 'Surat', lat: 21.1702, lng: 72.8310 },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  ];

  return (
    <>
      {cities.map(c => (
        <Marker
          key={c.name}
          position={[c.lat, c.lng]}
          icon={new L.DivIcon({
            className: 'custom-city-label',
            html: \`<div style="display:flex;align-items:center;gap:6px;margin-left:-50px;white-space:nowrap;"><span style="color:white;text-shadow:1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black;font-weight:600;font-size:18px;">\${c.name}</span><div style="width:12px;height:12px;background:white;border:2px solid black;border-radius:50%;"></div></div>\`,
            iconSize: [120, 20],
            iconAnchor: [60, 10]
          })}
        />
      ))}
    </>
  );
};
`;

const legendUI = `
      {viewMode === 'heatmap' && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[400] bg-white p-2 rounded shadow-lg flex flex-col items-center border border-slate-200">
          <div className="flex w-full h-4 mb-1">
            <div className="flex-1" style={{backgroundColor: '#fffad3'}}></div>
            <div className="flex-1" style={{backgroundColor: '#fff06b'}}></div>
            <div className="flex-1" style={{backgroundColor: '#fcd253'}}></div>
            <div className="flex-1" style={{backgroundColor: '#f99d31'}}></div>
            <div className="flex-1" style={{backgroundColor: '#f25b22'}}></div>
            <div className="flex-1" style={{backgroundColor: '#c02626'}}></div>
            <div className="flex-1" style={{backgroundColor: '#731613'}}></div>
            <div className="flex-1" style={{backgroundColor: '#230906'}}></div>
          </div>
          <div className="flex w-full justify-between text-xs font-bold text-slate-700 px-1 gap-2">
            <span>0.0</span>
            <span>2.5</span>
            <span>5.0</span>
            <span>7.5</span>
            <span>10</span>
            <span>12.5</span>
            <span>15</span>
            <span>17.5</span>
            <span>20</span>
          </div>
        </div>
      )}
`;

code = code.replace(/const HeatmapLayer = /, cityLabelsComponent + '\nconst HeatmapLayer = ');
code = code.replace(/<HeatmapLayer points=\{heatPoints\} \/>/, '<HeatmapLayer points={heatPoints} />\n            <CityLabels />');

// Inject legend right before closing relative container
code = code.replace(/(<\/div>\n\s*<\/div>\n\s*\)$)/, legendUI + '$1');

fs.writeFileSync('src/government/screens/LiveMap.tsx', code);
