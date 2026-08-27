const fs = require('fs');
let pCode = fs.readFileSync('src/citizen/screens/Profile.tsx', 'utf8');

const privacySection = `
      {/* Privacy & Security Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><ShieldCheck className="text-emerald-600" size={20} /> Privacy & Security</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-bold text-slate-900">IDENTITY</p>
              <p className="text-xs text-slate-500 mt-1">Verified Citizen</p>
            </div>
            <CheckCircle className="text-emerald-500" size={18} />
          </div>
          
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-bold text-slate-900">AADHAAR</p>
              <p className="text-xs text-slate-500 mt-1">Identifier protected</p>
              <p className="text-[10px] text-slate-400 font-mono mt-1 bg-slate-50 px-2 py-0.5 rounded w-fit">Hash: {currentUser?.identityHash || 'a81f...93c2'}</p>
            </div>
            <CheckCircle className="text-emerald-500" size={18} />
          </div>

          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-bold text-slate-900">PHONE</p>
              <p className="text-xs text-slate-500 mt-1">Stored securely as one-way hash</p>
            </div>
            <CheckCircle className="text-emerald-500" size={18} />
          </div>

          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-slate-900">PHOTO PRIVACY</p>
              <p className="text-xs text-slate-500 mt-1">Faces will be protected before evidence sharing</p>
            </div>
            <CheckCircle className="text-emerald-500" size={18} />
          </div>
        </div>
      </div>
`;

// Insert before the Language preference section
pCode = pCode.replace(/<div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-8 overflow-hidden">/, privacySection + '\n      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-8 overflow-hidden">');

// Also need to import CheckCircle if not already imported
if (!pCode.includes('CheckCircle')) {
  pCode = pCode.replace(/import \{ /, 'import { CheckCircle, ');
}

fs.writeFileSync('src/citizen/screens/Profile.tsx', pCode);
