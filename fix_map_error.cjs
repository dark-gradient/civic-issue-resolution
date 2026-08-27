const fs = require('fs');

let code = fs.readFileSync('src/government/screens/LiveMap.tsx', 'utf8');

if (!code.includes('tileError')) {
  // Add state for tile error
  code = code.replace(/const \[viewMode, setViewMode\] = useState\<'markers' \| 'heatmap'\>\(focusedIssueId \? 'markers' : 'heatmap'\);/, 
    `const [viewMode, setViewMode] = useState<'markers' | 'heatmap'>(focusedIssueId ? 'markers' : 'heatmap');
  const [tileError, setTileError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);`);

  // Add error overlay
  const errorOverlay = `
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
  `;
  
  code = code.replace(/<div className="flex-1 w-full relative z-0">/, `<div className="flex-1 w-full relative z-0">
      ${errorOverlay}
  `);

  // Add event handler to TileLayer
  code = code.replace(/<TileLayer\n\s*attribution='&copy; <a href="https:\/\/www.openstreetmap.org\/copyright">OpenStreetMap<\/a> contributors'\n\s*url="https:\/\/{s}\.basemaps\.cartocdn\.com\/rastertiles\/voyager\/{z}\/{x}\/{y}\{r\}\.png"\n\s*\/>/, 
    `<TileLayer
            key={retryKey}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            eventHandlers={{
              tileerror: () => setTileError(true)
            }}
          />`);
          
  fs.writeFileSync('src/government/screens/LiveMap.tsx', code);
}

