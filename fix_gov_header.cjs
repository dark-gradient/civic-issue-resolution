const fs = require('fs');
let gApp = fs.readFileSync('src/government/GovApp.tsx', 'utf8');

gApp = gApp.replace(/<div className="flex items-center space-x-4 relative">[\s\S]*?<\/header>/, 
`<div className="flex items-center space-x-4 relative">
          <div className="flex items-center space-x-3 text-right mr-2 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">{currentUser?.name}</span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{currentUser?.role}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold border border-slate-600">
              {currentUser?.name?.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          {isMenuOpen && (
            <div className="absolute top-12 right-0 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-slate-100">
                <p className="font-bold">{currentUser?.name}</p>
                <p className="text-xs text-slate-500">{currentUser?.department} Department</p>
              </div>
              <div className="flex flex-col">
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (window.confirm('Sign out of Government Portal?')) {
                      logoutGov();
                      navigate('/select-role', { replace: true });
                    }
                  }} 
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold flex items-center gap-2"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>`);

fs.writeFileSync('src/government/GovApp.tsx', gApp);
