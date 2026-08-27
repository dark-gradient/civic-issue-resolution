const fs = require('fs');

let code = fs.readFileSync('src/government/GovApp.tsx', 'utf8');

code = code.replace(/\{currentScreen === 'map' && <GovLiveMap \/>\}/, "{currentScreen === 'map' && <GovLiveMap onNavigate={navigateTo} />}");
code = code.replace(/\{currentScreen === 'field' && <GovLiveMap \/>\}/, "{currentScreen === 'field' && <GovLiveMap onNavigate={navigateTo} />}");
code = code.replace(/\{currentScreen === 'hotspots' && <GovLiveMap \/>\}/, "{currentScreen === 'hotspots' && <GovLiveMap onNavigate={navigateTo} />}");

fs.writeFileSync('src/government/GovApp.tsx', code);
