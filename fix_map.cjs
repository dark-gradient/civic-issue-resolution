const fs = require('fs');

let code = fs.readFileSync('src/government/screens/LiveMap.tsx', 'utf8');

// We need to inject GovApp's navigation into LiveMap. Wait, LiveMap does not take onNavigate props.
// Let's modify LiveMap definition first.
code = code.replace(/export const GovLiveMap: React\.FC = \(\) => \{/, `export const GovLiveMap: React.FC<{ onNavigate?: (s: any, id?: string) => void }> = ({ onNavigate }) => {`);

// Also update GovApp to pass onNavigate to GovLiveMap. Wait, I will do that in another script.

// Update HeatPoints to use reportsCount
code = code.replace(/const heatPoints = useMemo\(\(\) => \{[\s\S]*?\}, \[filteredIssues\]\);/, `
  const heatPoints = useMemo(() => {
    // Max reports count in mock data is usually around 50-100, we normalize it to a reasonable intensity
    const maxReports = Math.max(...filteredIssues.map(i => i.reportsCount || 1), 10);
    return filteredIssues.map(i => [
      i.lat, 
      i.lng, 
      // Intensity based purely on reports count volume
      Math.min((i.reportsCount || 1) / (maxReports * 0.5), 1.0) 
    ] as [number, number, number]);
  }, [filteredIssues]);
`);

// Add maxBoundsViscosity to MapContainer
code = code.replace(/maxBounds=\{bounds\}/, "maxBounds={bounds}\n          maxBoundsViscosity={1.0}");

// Update popup to include a View Issue button
code = code.replace(/<div className="mt-2 text-xs">\s*<span className="font-bold text-slate-900">\{issue\.authority\}<\/span>\s*<\/div>\s*<\/div>/, `<div className="mt-2 text-xs">
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
                    </div>`);

// Add legend and demo data overlay
const overlays = `
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
`;

code = code.replace(/<div className="flex-1 w-full relative z-0">/, `<div className="flex-1 w-full relative z-0">
      ${overlays}
`);

// Increase heatmap properties for better visualization
code = code.replace(/radius: 25,\s*blur: 15,\s*maxZoom: 12,\s*max: 1\.0,/, `radius: 30,
      blur: 20,
      maxZoom: 10,
      max: 1.0,`);

fs.writeFileSync('src/government/screens/LiveMap.tsx', code);
