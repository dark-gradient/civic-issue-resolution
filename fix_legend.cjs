const fs = require('fs');
let code = fs.readFileSync('src/government/screens/LiveMap.tsx', 'utf8');

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

code = code.replace(/<\/MapContainer>/, '</MapContainer>' + legendUI);

fs.writeFileSync('src/government/screens/LiveMap.tsx', code);
