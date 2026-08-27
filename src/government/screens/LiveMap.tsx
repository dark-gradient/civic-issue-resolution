import React, { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L, { Icon } from 'leaflet';
import 'leaflet.heat';
import { useApp } from '../../context/AppContext';
import { filterIssuesBySearch } from '../../utils';
import { Filter, Layers, MapPin } from 'lucide-react';
import { DashboardService } from '../../services/api';


const MapController = ({ focusedIssueId, issues }: { focusedIssueId?: string | null, issues: any[] }) => {
  const map = useMap();
  useEffect(() => {
    if (focusedIssueId) {
      const issue = issues.find(i => i.id === focusedIssueId);
      if (issue) {
        map.flyTo([issue.lat, issue.lng], 15);
      }
    }
  }, [focusedIssueId, issues, map]);
  return null;
};


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
            html: `<div style="display:flex;align-items:center;gap:6px;margin-left:-50px;white-space:nowrap;"><span style="color:white;text-shadow:1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black;font-weight:600;font-size:18px;">${c.name}</span><div style="width:12px;height:12px;background:white;border:2px solid black;border-radius:50%;"></div></div>`,
            iconSize: [120, 20],
            iconAnchor: [60, 10]
          })}
        />
      ))}
    </>
  );
};

const HeatmapLayer = ({ points }: { points: [number, number, number][] }) => {
  const map = useMap();

  useEffect(() => {
    const heat = (L as any).heatLayer(points, {
      radius: 40,
      blur: 30,
      maxZoom: 10,
      max: 1.0,
      gradient: { 0.1: '#fffad3', 0.2: '#fff06b', 0.3: '#fcd253', 0.5: '#f99d31', 0.7: '#f25b22', 0.8: '#c02626', 0.9: '#731613', 1.0: '#230906' }
    }).addTo(map);
    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
};

export const GovLiveMap: React.FC<{ onNavigate?: (s: any, id?: string) => void, focusedIssueId?: string | null }> = ({ onNavigate, focusedIssueId }) => {
  const { auth, globalSearch } = useApp();
  
  const [mapIssues, setMapIssues] = useState<any[]>([]);
  const [heatmapPoints, setHeatmapPoints] = useState<[number, number, number][]>([]);
  
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [viewMode, setViewMode] = useState<'markers' | 'heatmap'>(focusedIssueId ? 'markers' : 'heatmap');
  const [tileError, setTileError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const [mapRes, heatRes] = await Promise.all([
          DashboardService.getMap(),
          DashboardService.getHeatmap()
        ]);
        setMapIssues(mapRes);
        setHeatmapPoints(heatRes);
      } catch (e) {
        console.error("Failed to fetch map data", e);
      }
    };
    fetchMapData();
  }, [globalSearch]); // Refetch if global search changes (could pass as query param)
  
  const uniqueTypes = useMemo(() => {
    const types = new Set(mapIssues.map(i => i.issue_type));
    return ['All Types', ...Array.from(types)].sort();
  }, [mapIssues]);
  
  const filteredIssues = useMemo(() => {
    return mapIssues.filter(issue => {
      const matchType = typeFilter === 'All Types' || issue.issue_type === typeFilter;
      const matchPriority = priorityFilter === 'All Priorities' || issue.priority === priorityFilter;
      return matchType && matchPriority;
    });
  }, [mapIssues, typeFilter, priorityFilter]);

  
  const getIcon = (priority: string) => {
    let color = 'blue';
    if (priority === 'Critical') color = 'red';
    else if (priority === 'High') color = 'orange';
    
    return new Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
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
            className={`flex-1 py-1.5 text-xs font-bold rounded-md flex justify-center items-center gap-1 transition-colors ${viewMode === 'heatmap' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Layers size={14} /> Heatmap
          </button>
          <button 
            onClick={() => setViewMode('markers')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md flex justify-center items-center gap-1 transition-colors ${viewMode === 'markers' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
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
      
      {tileError && (
        <div className="absolute inset-0 z-[2000] bg-slate-50 flex flex-col items-center justify-center">
          <p className="text-slate-600 font-bold mb-4">Map temporarily unavailable</p>
          <button 
            onClick={() => { setTileError(false); setRetryKey(k => k + 1); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}
  
  
      
      {/* Demo Data Tag */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-slate-900/80 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded shadow backdrop-blur-sm pointer-events-none border border-slate-700">
        Demo Civic Data
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs w-48">
        <h4 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">Map Legend</h4>
        {viewMode === 'heatmap' ? (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-medium text-slate-500">
              <span>Low Reports</span>
              <span>High Reports</span>
            </div>
            <div className="h-2 w-full rounded bg-gradient-to-r from-blue-500 via-lime-400 to-red-600"></div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 border border-red-700"></div> <span>Critical Priority</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500 border border-orange-700"></div> <span>High Priority</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500 border border-blue-700"></div> <span>Standard Priority</span></div>
          </div>
        )}
      </div>


        <MapContainer 
          center={center} 
          zoom={5} 
          minZoom={5}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          <MapController focusedIssueId={focusedIssueId} issues={issues} />
          <TileLayer
            key={retryKey}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            eventHandlers={{
              tileerror: () => setTileError(true)
            }}
          />
          
          {viewMode === 'heatmap' && (
            <>
              <HeatmapLayer points={heatmapPoints} />
              <CityLabels />
            </>
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
                      {onNavigate && (
                        <button 
                          onClick={() => onNavigate('issue_detail', issue.id)}
                          className="mt-2 w-full bg-blue-600 text-white py-1 rounded text-xs font-bold hover:bg-blue-700 transition-colors"
                        >
                          View Issue Details
                        </button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          )}
        </MapContainer>
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

      </div>
    </div>
  );
};
