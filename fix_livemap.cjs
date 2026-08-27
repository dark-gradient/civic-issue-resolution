const fs = require('fs');

let code = `import React, { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L, { Icon } from 'leaflet';
import 'leaflet.heat';
import { useApp } from '../../context/AppContext';
import { filterIssuesBySearch } from '../../utils';
import { Filter, Layers, MapPin } from 'lucide-react';

const HeatmapLayer = ({ points }: { points: [number, number, number][] }) => {
  const map = useMap();

  useEffect(() => {
    const heat = (L as any).heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 12,
      max: 1.0,
      gradient: { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' }
    }).addTo(map);
    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
};

export const GovLiveMap: React.FC = () => {
  const { issues: rawIssues, globalSearch } = useApp();
  const issues = filterIssuesBySearch(rawIssues, globalSearch);
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [viewMode, setViewMode] = useState<'markers' | 'heatmap'>('heatmap');
  
  const uniqueTypes = useMemo(() => {
    const types = new Set(issues.map(i => i.type));
    return ['All Types', ...Array.from(types)].sort();
  }, [issues]);
  
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      if (typeFilter !== 'All Types' && issue.type !== typeFilter) return false;
      if (priorityFilter !== 'All Priorities' && priorityFilter === 'Critical Only' && issue.priority !== 'Critical') return false;
      return true;
    });
  }, [issues, typeFilter, priorityFilter]);

  const heatPoints = useMemo(() => {
    return filteredIssues.map(i => [i.lat, i.lng, i.priority === 'Critical' ? 1.0 : (i.priority === 'High' ? 0.7 : 0.4)] as [number, number, number]);
  }, [filteredIssues]);

  const getIcon = (priority: string) => {
    let color = 'blue';
    if (priority === 'Critical') color = 'red';
    else if (priority === 'High') color = 'orange';
    
    return new Icon({
      iconUrl: \`https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-\${color}.png\`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  const center: [number, number] = [20.5937, 78.9629]; // India center
  const bounds: [[number, number], [number, number]] = [[6.5, 68.0], [35.5, 97.3]];

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 relative">
      <div className="absolute top-4 left-4 z-[1000] bg-white p-4 rounded-xl shadow-lg border border-slate-200 w-80 max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-blue-600" /> INDIA CIVIC ISSUE MAP
        </h3>
        
        <div className="flex gap-2 mb-4 p-1 bg-slate-100 rounded-lg">
          <button 
            onClick={() => setViewMode('heatmap')}
            className={\`flex-1 py-1.5 text-xs font-bold rounded-md flex justify-center items-center gap-1 transition-colors \${viewMode === 'heatmap' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}\`}
          >
            <Layers size={14} /> Heatmap
          </button>
          <button 
            onClick={() => setViewMode('markers')}
            className={\`flex-1 py-1.5 text-xs font-bold rounded-md flex justify-center items-center gap-1 transition-colors \${viewMode === 'markers' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}\`}
          >
            <MapPin size={14} /> Issues
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><Filter size={14} /> Category</label>
            <select 
              value={typeFilter} 
              onChange={e => setTypeFilter(e.target.value)}
              className="w-full border-slate-200 rounded-lg text-sm bg-slate-50 focus:ring-blue-500"
            >
              {uniqueTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Priority</label>
            <select 
              value={priorityFilter} 
              onChange={e => setPriorityFilter(e.target.value)}
              className="w-full border-slate-200 rounded-lg text-sm bg-slate-50 focus:ring-blue-500"
            >
              <option>All Priorities</option>
              <option>Critical Only</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative z-0">
        <MapContainer 
          center={center} 
          zoom={5} 
          minZoom={4}
          maxBounds={bounds}
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {viewMode === 'heatmap' && (
            <HeatmapLayer points={heatPoints} />
          )}

          {viewMode === 'markers' && (
            <MarkerClusterGroup chunkedLoading>
              {filteredIssues.map((issue) => (
                <Marker 
                  key={issue.id} 
                  position={[issue.lat, issue.lng]}
                  icon={getIcon(issue.priority)}
                >
                  <Popup>
                    <div className="p-1">
                      <p className="font-bold text-sm mb-1">{issue.type}</p>
                      <p className="text-xs text-slate-500">{issue.location}</p>
                      <p className="text-xs text-slate-500">{issue.city}, {issue.state}</p>
                      <div className="mt-2 text-xs">
                        <span className="font-bold text-slate-900">{issue.authority}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          )}
        </MapContainer>
      </div>
    </div>
  );
};
`;

fs.writeFileSync('src/government/screens/LiveMap.tsx', code);
