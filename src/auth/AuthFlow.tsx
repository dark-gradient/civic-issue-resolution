import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Building, ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { AuthService } from '../services/api';
import { CitizenUser, GovUser } from '../types';

export const AuthFlow: React.FC<{ initialView?: 'WELCOME' | 'CITIZEN_AUTH' | 'GOV_AUTH' }> = ({ initialView = 'WELCOME' }) => {
  const { auth, loginCitizen, loginGov } = useApp();
  const navigate = useNavigate();

  const handleCitizenDemo = async () => {
    try {
      const data = await AuthService.citizenLogin('9999999999', '123456');
      localStorage.setItem('backend_token', data.access_token);
      
      const me = await AuthService.getMe();
      
      const realUser: CitizenUser = {
        type: 'Citizen',
        id: me.id || `usr-${Date.now()}`,
        name: me.name || 'Citizen',
        phone: 'PROTECTED',
        identityHash: me.identity_hash || 'hidden',
        phoneHash: me.phone_hash || 'hidden',
        aadhaarVerified: true,
        preferredLanguage: me.preferred_language || 'English',
        location: me.city || 'Unknown',
        createdAt: me.created_at || new Date().toISOString(),
        reportsCount: 0,
        resolvedCount: 0,
        reopenedCount: 0,
        contributionScore: 100
      };
      
      loginCitizen(realUser);
      navigate('/citizen/home', { replace: true });
    } catch (e) {
      console.error(e);
      alert('Backend unavailable — using demo data');
      // Fallback
      loginCitizen({
        type: 'Citizen', id: 'demo-cit', name: 'Demo Citizen', phone: 'PROTECTED', identityHash: 'hidden', phoneHash: 'hidden',
        aadhaarVerified: true, preferredLanguage: 'English', location: 'Demo City', createdAt: new Date().toISOString(),
        reportsCount: 0, resolvedCount: 0, reopenedCount: 0, contributionScore: 100
      });
      navigate('/citizen/home', { replace: true });
    }
  };

  const handleGovDemo = async () => {
    try {
      const data = await AuthService.governmentLogin('EMP001', 'password123');
      localStorage.setItem('backend_token', data.access_token);
      
      const me = await AuthService.getMe();
      
      const realGov: GovUser = {
        type: 'Government',
        id: me.id || `gov-${Date.now()}`,
        name: me.name || 'Municipal Officer',
        role: me.role || 'Staff',
        department: 'Roads'
      };
      
      loginGov(realGov);
      navigate('/government/dashboard', { replace: true });
    } catch (e) {
      console.error(e);
      alert('Backend unavailable — using demo data');
      // Fallback
      loginGov({
        type: 'Government', id: 'demo-gov', name: 'Demo Officer', role: 'Staff', department: 'Demo Dept'
      });
      navigate('/government/dashboard', { replace: true });
    }
  };

  // Auth Debug Panel
  const DebugPanel = () => (
    <div className="fixed bottom-4 right-4 bg-slate-900 text-white text-xs p-4 rounded-lg shadow-2xl opacity-20 hover:opacity-100 transition-opacity z-50">
      <h4 className="font-bold border-b border-slate-700 pb-2 mb-2 text-slate-300">Auth Diagnostics</h4>
      <div className="space-y-1 mb-3">
        <p>Role: <span className="text-blue-400">{auth.activeRole}</span></p>
        <p>Citizen: <span className={auth.citizenSession ? 'text-emerald-400' : 'text-red-400'}>{auth.citizenSession ? 'ACTIVE' : 'NONE'}</span></p>
        <p>Gov: <span className={auth.governmentSession ? 'text-emerald-400' : 'text-red-400'}>{auth.governmentSession ? 'ACTIVE' : 'NONE'}</span></p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="bg-red-900/50 hover:bg-red-800 px-2 py-1 rounded">Hard Reset All</button>
      </div>
    </div>
  );

  if (initialView === 'CITIZEN_AUTH') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <DebugPanel />
        <div className="w-full max-w-md">
          <button 
            onClick={() => navigate('/select-role', { replace: true })} 
            className="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-2 mb-8"
          >
            <ArrowLeft size={20} /> Back to Role Selection
          </button>
          
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Citizen Portal</h2>
            <p className="text-slate-500 mb-8 font-medium">Demo Access</p>
            
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <User size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Welcome to CSCIRR</h3>
              <p className="text-sm text-slate-500 mb-8">Click below to enter the prototype as a simulated citizen user.</p>
              
              <button 
                onClick={handleCitizenDemo}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform hover:bg-blue-700"
              >
                Continue as Demo Citizen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (initialView === 'GOV_AUTH') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <DebugPanel />
        <div className="w-full max-w-md">
          <button 
            onClick={() => navigate('/select-role', { replace: true })} 
            className="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-2 mb-8"
          >
            <ArrowLeft size={20} /> Back to Role Selection
          </button>
          
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Municipal Staff Portal</h2>
            <p className="text-slate-500 mb-8 font-medium">Demo Access</p>
            
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              <div className="w-20 h-20 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Government Dashboard</h3>
              <p className="text-sm text-slate-500 mb-8">Click below to enter the prototype as a simulated municipal officer.</p>
              
              <button 
                onClick={handleGovDemo}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform hover:bg-slate-800"
              >
                Continue as Municipal Officer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // WELCOME (Role Selection)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 relative">
      <DebugPanel />
      
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-4xl text-white shadow-lg mb-6">
        C
      </div>
      <h1 className="text-3xl text-center font-bold text-slate-900 tracking-tight mb-2 px-4 max-w-2xl">
        Crowd Sourced Civic Issue Reporting and Resolution
      </h1>
      <p className="text-lg text-slate-500 font-medium mb-12">Choose your experience</p>
      
      <div className="w-full max-w-md flex flex-col gap-4">
        {auth.citizenSession ? (
          <button 
            onClick={() => {
              loginCitizen(auth.citizenSession!);
              navigate('/citizen/home', { replace: true });
            }}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/20 flex items-center justify-center space-x-3 active:scale-95 transition-transform hover:bg-blue-500"
          >
            <User size={24} />
            <span>Continue as {auth.citizenSession.name}</span>
          </button>
        ) : (
          <button 
            onClick={() => navigate('/citizen/login')}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/20 flex items-center justify-center space-x-3 active:scale-95 transition-transform hover:bg-blue-500"
          >
            <User size={24} />
            <span>Citizen</span>
          </button>
        )}

        {auth.governmentSession ? (
          <button 
            onClick={() => {
              loginGov(auth.governmentSession!);
              navigate('/government/dashboard', { replace: true });
            }}
            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-sm flex items-center justify-center space-x-3 active:scale-95 transition-transform hover:bg-slate-700"
          >
            <Building size={24} />
            <span>Continue as Municipal Staff</span>
          </button>
        ) : (
          <button 
            onClick={() => navigate('/government/login')}
            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-sm flex items-center justify-center space-x-3 active:scale-95 transition-transform hover:bg-slate-700"
          >
            <Building size={24} />
            <span>Municipal Staff</span>
          </button>
        )}
      </div>
    </div>
  );

  const [authStep, setAuthStep] = useState<"PHONE" | "OTP" | "AADHAAR" | "VERIFIED">("PHONE");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) setAuthStep("OTP");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) setAuthStep("AADHAAR");
  };

  if (initialView === "CITIZEN_AUTH") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <DebugPanel />
        <div className="w-full max-w-md">
          <button 
            onClick={() => navigate("/select-role", { replace: true })} 
            className="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-2 mb-8"
          >
            <ArrowLeft size={20} /> Back to Role Selection
          </button>
          
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Citizen Portal</h2>
            <p className="text-slate-500 mb-8 font-medium">Demo Access</p>
            
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              
              {authStep === "PHONE" && (
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <User size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Mobile Number</h3>
                  <div className="flex bg-slate-100 rounded-xl overflow-hidden border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                    <div className="px-4 py-4 bg-slate-200 text-slate-700 font-bold border-r border-slate-300">
                      +91
                    </div>
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="w-full bg-transparent px-4 py-4 outline-none font-bold text-slate-900 tracking-wider text-lg"
                      placeholder="99999 99999"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-transform mt-4">
                    Continue
                  </button>
                </form>
              )}

              {authStep === "OTP" && (
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Verify Mobile</h3>
                  <p className="text-sm text-slate-500 mb-4">OTP sent to +91 {phone}</p>
                  
                  <input 
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full bg-slate-100 px-4 py-4 rounded-xl outline-none border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-center font-bold text-2xl tracking-[0.5em]"
                    placeholder="------"
                    required
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-transform">
                      Verify OTP
                    </button>
                    <button type="button" onClick={() => setOtp("123456")} className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-xl font-bold text-lg hover:bg-slate-300 active:scale-95 transition-transform">
                      Demo OTP
                    </button>
                  </div>
                </form>
              )}

              {authStep === "AADHAAR" && (
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Demo Aadhaar Verification</h3>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4 text-left">
                    <p className="text-slate-900 font-mono font-bold tracking-widest text-center text-lg mb-2">XXXX XXXX 1234</p>
                    <div className="text-xs text-slate-500 bg-white p-3 rounded border border-slate-200 shadow-inner">
                      <p className="font-bold text-slate-700 mb-1">Privacy Notice:</p>
                      <p>Identity identifier stored as a one-way cryptographic hash (SHA-256). Full Aadhaar is never saved.</p>
                      <p className="text-[10px] mt-2 font-mono text-slate-400 break-all">Hash: 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92</p>
                    </div>
                  </div>
                  <button onClick={() => setAuthStep("VERIFIED")} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 active:scale-95 transition-transform">
                    Verify Identity
                  </button>
                </div>
              )}

              {authStep === "VERIFIED" && (
                <div className="space-y-6 animate-in zoom-in duration-300">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Identity Verified</h3>
                  <p className="text-slate-600 mb-6">Your CivicPulse account is verified.</p>
                  <button onClick={handleCitizenDemo} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-transform">
                    Enter Portal
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    );
  }

};