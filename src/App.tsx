import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom';
import { CitizenApp } from './citizen/CitizenApp';
import { GovApp } from './government/GovApp';
import { AppProvider, useApp } from './context/AppContext';
import { AuthFlow } from './auth/AuthFlow';

const CitizenRouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useApp();
  const location = useLocation();
  
  if (!auth.citizenSession) {
    return <Navigate to="/citizen/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const GovernmentRouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useApp();
  const location = useLocation();
  
  if (!auth.governmentSession) {
    return <Navigate to="/government/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

// A smart root component that redirects based on active role
const RootRedirect = () => {
  const { auth } = useApp();
  
  if (auth.activeRole === 'citizen' && auth.citizenSession) {
    return <Navigate to="/citizen/home" replace />;
  }
  if (auth.activeRole === 'government' && auth.governmentSession) {
    return <Navigate to="/government/dashboard" replace />;
  }
  
  return <Navigate to="/select-role" replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />
  },
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
  {
    path: '/citizen/*',
    element: (
      <CitizenRouteGuard>
        <div className="flex flex-col h-[100dvh] w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
          <CitizenApp />
        </div>
      </CitizenRouteGuard>
    )
  },
  {
    path: '/government/*',
    element: (
      <GovernmentRouteGuard>
        <div className="flex flex-col h-[100dvh] w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
          <GovApp />
        </div>
      </GovernmentRouteGuard>
    )
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
