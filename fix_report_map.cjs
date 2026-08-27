const fs = require('fs');
let rFlow = fs.readFileSync('src/citizen/screens/ReportFlow.tsx', 'utf8');

// Add imports
rFlow = rFlow.replace(/import \{ Issue \} from '\.\.\/\.\.\/types';/, 
`import { Issue } from '../../types';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icon issue in react
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationPicker({ initialPos, onSelect, onCancel }: any) {
  const [pos, setPos] = React.useState(initialPos || [13.0827, 80.2707]);
  
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setPos([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-lg">Adjust Location</h3>
        <button onClick={onCancel} className="text-slate-500 font-bold px-3 py-1 bg-white border border-slate-200 rounded-lg">Cancel</button>
      </div>
      <div className="flex-1 relative">
        <MapContainer center={pos} zoom={15} className="w-full h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={pos} />
          <MapClickHandler />
        </MapContainer>
      </div>
      <div className="p-5 bg-white border-t border-slate-200">
        <p className="text-sm text-slate-500 mb-1">Selected Coordinates:</p>
        <p className="font-bold mb-4">{pos[0].toFixed(4)}, {pos[1].toFixed(4)}</p>
        <button onClick={() => onSelect(pos)} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl">
          Use This Location
        </button>
      </div>
    </div>
  );
}
`);

// Add states
rFlow = rFlow.replace(/const \[location, setLocation\] = useState\('12, Anna Nagar Main Road'\);/,
`const [location, setLocation] = useState('12, Anna Nagar Main Road');
  const [coordinates, setCoordinates] = useState<[number, number]>([13.0827, 80.2707]);
  const [showMap, setShowMap] = useState(false);`);

// Replace the location block
rFlow = rFlow.replace(/<div className="bg-slate-100 border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between mb-8">[\s\S]*?<\/div>\s*<button \s*onClick=\{handleSubmit\}/,
`<div className="bg-slate-100 border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white p-2 rounded-full shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 tracking-tight">📍 {t('location_detected')}</p>
                  <p className="text-xs text-slate-500 break-all">{location}</p>
                </div>
              </div>
              <button onClick={() => setShowMap(true)} className="text-blue-600 text-sm font-bold underline shrink-0 px-2">{t('btn_change')}</button>
            </div>
            {showMap && (
              <LocationPicker 
                initialPos={coordinates} 
                onCancel={() => setShowMap(false)} 
                onSelect={(newPos) => {
                  setCoordinates(newPos);
                  setLocation(\`Selected Location: \${newPos[0].toFixed(4)}, \${newPos[1].toFixed(4)}\`);
                  setShowMap(false);
                }} 
              />
            )}
            <button 
              onClick={handleSubmit}`);

fs.writeFileSync('src/citizen/screens/ReportFlow.tsx', rFlow);
