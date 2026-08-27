const fs = require('fs');

let code = fs.readFileSync('src/auth/AuthFlow.tsx', 'utf8');

code = code.replace(/export const AuthFlow: React\.FC = \(\) => \{/, "export const AuthFlow: React.FC<{ initialView?: 'WELCOME' | 'CITIZEN_AUTH' | 'GOV_AUTH' }> = ({ initialView = 'WELCOME' }) => {");
code = code.replace(/const \[view, setView\] = useState\<'WELCOME' \| 'CITIZEN_AUTH' \| 'GOV_AUTH'\>\('WELCOME'\);/, "const [view, setView] = useState<'WELCOME' | 'CITIZEN_AUTH' | 'GOV_AUTH'>(initialView);");

// Let's also fix the back buttons to navigate back to /select-role if they are on a direct login URL, or just setView('WELCOME').
// Since they might have landed directly, navigating to /select-role is safer.
code = code.replace(/setView\('WELCOME'\);/g, "navigate('/select-role', { replace: true });");

fs.writeFileSync('src/auth/AuthFlow.tsx', code);

let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace(/<Navigate to="\/select-role" state=\{\{ from: location \}\} replace \/>/g, function(match, offset, str) {
  // If it's in CitizenRouteGuard
  if (str.substring(offset - 100, offset).includes('auth.citizenSession')) {
    return '<Navigate to="/citizen/login" state={{ from: location }} replace />';
  }
  if (str.substring(offset - 100, offset).includes('auth.governmentSession')) {
    return '<Navigate to="/government/login" state={{ from: location }} replace />';
  }
  return match;
});

const routes = `
  {
    path: '/select-role',
    element: <AuthFlow />
  },
  {
    path: '/citizen/login',
    element: <AuthFlow initialView="CITIZEN_AUTH" />
  },
  {
    path: '/government/login',
    element: <AuthFlow initialView="GOV_AUTH" />
  },
`;

appCode = appCode.replace(/\{\s*path: '\/select-role',\s*element: <AuthFlow \/>\s*\}/, routes);
fs.writeFileSync('src/App.tsx', appCode);

