const fs = require('fs');
let code = fs.readFileSync('src/government/screens/LiveMap.tsx', 'utf8');

// Add focusedIssueId prop
code = code.replace(/export const GovLiveMap: React\.FC<\{ onNavigate\?: \(s: any, id\?: string\) => void \}> = \(\{ onNavigate \}\) => \{/, 
  `export const GovLiveMap: React.FC<{ onNavigate?: (s: any, id?: string) => void, focusedIssueId?: string | null }> = ({ onNavigate, focusedIssueId }) => {`);

// Set viewMode to markers if there is a focusedIssueId
code = code.replace(/const \[viewMode, setViewMode\] = useState\<'markers' \| 'heatmap'\>\('heatmap'\);/, 
  `const [viewMode, setViewMode] = useState<'markers' | 'heatmap'>(focusedIssueId ? 'markers' : 'heatmap');`);

// Ref to map and zoom
code = code.replace(/<MapContainer \n\s*center=\{center\} \n\s*zoom=\{5\} \n\s*minZoom=\{4\}\n\s*maxBounds=\{bounds\}\n\s*maxBoundsViscosity=\{1\.0\}\n\s*className="w-full h-full"\n\s*scrollWheelZoom=\{true\}\n\s*>/, 
  `<MapContainer 
          center={center} 
          zoom={5} 
          minZoom={4}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          <MapController focusedIssueId={focusedIssueId} issues={issues} />`);

const mapController = `
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
`;

code = code.replace(/const HeatmapLayer = /, mapController + '\nconst HeatmapLayer = ');

// For the focused issue, maybe open popup automatically? We can use a ref or just highlight it. Let's just fly to it. 
// Also if focusedIssueId, render it as red/highlighted or just ensure it's shown.

fs.writeFileSync('src/government/screens/LiveMap.tsx', code);
