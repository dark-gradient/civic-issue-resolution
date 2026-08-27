import React, { useState } from 'react';
import { Camera, MapPin, Mic, Send, Edit2, AlertTriangle, CheckCircle, Upload, ShieldCheck, Info } from 'lucide-react';
import { ReportService } from '../../services/api';
import { useApp } from '../../context/AppContext';
import { generateId } from '../../utils';
import { Issue } from '../../types';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icon issue in react
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationPicker({ initialPos, onSelect, onCancel }: any) {
  const [pos, setPos] = React.useState(initialPos || [13.0827, 80.2707]);
  
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setPos([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-lg">Adjust Location</h3>
        <button onClick={onCancel} className="text-slate-500 font-bold px-3 py-1 bg-white border border-slate-200 rounded-lg">Cancel</button>
      </div>
      <div className="flex-1 relative">
        <MapContainer center={pos} zoom={15} className="w-full h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={pos} />
          <MapClickHandler />
        </MapContainer>
      </div>
      <div className="p-5 bg-white border-t border-slate-200">
        <p className="text-sm text-slate-500 mb-1">Selected Coordinates:</p>
        <p className="font-bold mb-4">{pos[0].toFixed(4)}, {pos[1].toFixed(4)}</p>
        <button onClick={() => onSelect(pos)} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl">
          Use This Location
        </button>
      </div>
    </div>
  );
}


export const ReportFlow: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState('12, Anna Nagar Main Road');
  const [coordinates, setCoordinates] = useState<[number, number]>([13.0827, 80.2707]);
  const [showMap, setShowMap] = useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Pothole');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [isProcessingPrivacy, setIsProcessingPrivacy] = useState(false);
  const [privacyProtected, setPrivacyProtected] = useState(false);
  
  const { addIssue, isOffline, t, language } = useApp();
  
  // Simulate image capture
  const handleCapture = () => {
    setIsProcessingPrivacy(true);
    setTimeout(() => {
      setImage('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400&h=300');
      setIsProcessingPrivacy(false);
      setPrivacyProtected(true);
      setTimeout(() => setStep(2), 1500);
    }, 1500);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (isOffline) {
        // Fallback to offline logic
        const issueId = 'CIV-' + Math.floor(10000 + Math.random() * 90000);
        setGeneratedId(issueId);
        
        const newIssue: Issue = {
          id: issueId,
          title: description || category,
          type: category,
          originalLanguage: language,
          originalDescription: description,
          description,
          location: location,
          ward: 'Ward 37',
          state: 'Tamil Nadu',
          city: 'Chennai',
          authority: 'Greater Chennai Corporation (GCC)',
          lat: coordinates[0],
          lng: coordinates[1],
          status: 'Submitted',
          priority: 'High',
          department: 'Roads',
          reportedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          reportsCount: 1,
          aiConfidence: 96,
          assignee: 'Unassigned',
          slaHours: 24,
          slaRemaining: '24h',
          images: { before: image! },
          privacyProcessed: privacyProtected,
          facesBlurred: privacyProtected ? 2 : 0,
          isOfflineSync: isOffline,
          timeline: [
            {
              id: generateId(),
              title: t('status_received'),
              timestamp: new Date().toISOString(),
              status: 'Submitted',
              description: 'Saved offline.'
            }
          ]
        };
        addIssue(newIssue);
        setStep(3);
      } else {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('language', language);
        formData.append('latitude', coordinates[0].toString());
        formData.append('longitude', coordinates[1].toString());
        formData.append('city', 'Chennai');
        formData.append('state', 'Tamil Nadu');
        formData.append('address', location);
        
        // Use a dummy image blob since the camera logic is simulated
        const dummyBlob = new Blob(['dummy image content'], { type: 'image/jpeg' });
        formData.append('image', dummyBlob, 'photo.jpg');

        const data = await ReportService.createReport(formData);
        
        setGeneratedId(data.report_id);
        
        // Optionally still add to local AppContext so the frontend works seamlessly
        // but now it has the real ID
        const newIssue: Issue = {
          id: data.report_id,
          title: description || category,
          type: category,
          originalLanguage: language,
          originalDescription: description,
          description,
          location: location,
          ward: 'Ward 37',
          state: 'Tamil Nadu',
          city: 'Chennai',
          authority: 'Greater Chennai Corporation (GCC)',
          lat: coordinates[0],
          lng: coordinates[1],
          status: 'Submitted',
          priority: 'High',
          department: 'Roads',
          reportedAt: data.created_at,
          updatedAt: data.created_at,
          reportsCount: 1,
          aiConfidence: 96,
          assignee: 'Unassigned',
          slaHours: 24,
          slaRemaining: '24h',
          images: { before: `http://localhost:8000${data.image_url}` },
          privacyProcessed: privacyProtected,
          facesBlurred: privacyProtected ? 2 : 0,
          isOfflineSync: false,
          timeline: [
            {
              id: generateId(),
              title: t('status_received'),
              timestamp: data.created_at,
              status: 'Submitted',
              description: 'Your report has been received.'
            }
          ]
        };
        addIssue(newIssue);
        setStep(3);
      }
    } catch (e) {
      console.error(e);
      alert('Error submitting report to backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative pb-20">
      {/* Progress Header */}
      {step < 3 && (
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex gap-1.5">
            {[1, 2].map(s => (
              <div key={s} className={`h-1.5 w-10 rounded-full ${s <= step ? 'bg-blue-600' : 'bg-slate-200'}`} />
            ))}
          </div>
          <button onClick={onComplete} className="text-sm font-bold text-slate-500 hover:text-slate-700">{t('btn_cancel')}</button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-5">
        
        {/* STEP 1: Capture */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-3xl font-bold mb-2 text-slate-900 tracking-tight">{t('home_title')}</h2>
            <p className="text-slate-500 mb-8 font-medium">{t('home_subtitle')}</p>
            
            {image ? (
              <div className="mb-8">
                <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-md">
                  <img src={image} alt="Captured" className="w-full h-64 object-cover" />
                  
                  

                  <button onClick={() => { setImage(null); setPrivacyProtected(false); }} className="absolute top-2 right-2 bg-slate-900/60 text-white p-2 rounded-full backdrop-blur-sm">
                    <Edit2 size={16} />
                  </button>
                </div>
                
                {privacyProtected && (
                  <div className="mt-3">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 w-full">
                      <ShieldCheck size={16} /> {t('faces_protected')}
                    </div>
                  </div>
                )}
              </div>
            ) : isProcessingPrivacy ? (
              <div className="bg-slate-100 rounded-3xl h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 mb-8">
                <ShieldCheck size={48} className="mb-4 text-blue-500 animate-pulse" />
                <p className="font-bold text-slate-700 text-lg">Protecting privacy...</p>
                <p className="text-sm text-slate-500 mt-1">Detecting faces</p>
              </div>
            ) : (
              <div className="bg-slate-100 rounded-3xl h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 mb-8">
                <Camera size={64} className="mb-4 opacity-30 text-slate-400" />
              </div>
            )}
            
            <div className="space-y-4">
              {image ? (
                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 active:scale-95 transition-transform"
                >
                  {t('btn_continue')}
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleCapture}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 active:scale-95 transition-transform"
                  >
                    <Camera size={24} /> {t('btn_take_photo')}
                  </button>
                  <button 
                    onClick={handleCapture}
                    className="w-full bg-white border-2 border-slate-200 text-slate-700 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 active:bg-slate-50 transition-colors shadow-sm"
                  >
                    <Upload size={24} /> {t('btn_gallery')}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Details & Location */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-slate-100 rounded-xl overflow-hidden mb-6 h-32 relative">
              <img src={image || ''} alt="Report" className="w-full h-full object-cover opacity-60" />
            </div>

            <h2 className="text-3xl font-bold mb-2 text-slate-900 tracking-tight">{t('problem_title')}</h2>
            
            <div className="relative mt-4 mb-6">
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-2 border-slate-200 bg-white rounded-xl p-5 text-lg focus:border-blue-500 outline-none text-slate-800 resize-none shadow-sm"
                rows={4}
                placeholder={t('problem_placeholder')}
              />
              <button className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-md active:scale-95 transition-transform flex items-center gap-2 font-bold">
                <Mic size={20} /> {t('btn_speak')}
              </button>
            </div>
            
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white p-2 rounded-full shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 tracking-tight">📍 {t('location_detected')}</p>
                  <p className="text-xs text-slate-500 break-all">{location}</p>
                </div>
              </div>
              <button onClick={() => setShowMap(true)} className="text-blue-600 text-sm font-bold underline shrink-0 px-2">{t('btn_change')}</button>
            </div>
            {showMap && (
              <LocationPicker 
                initialPos={coordinates} 
                onCancel={() => setShowMap(false)} 
                onSelect={(newPos) => {
                  setCoordinates(newPos);
                  setLocation(`Selected Location: ${newPos[0].toFixed(4)}, ${newPos[1].toFixed(4)}`);
                  setShowMap(false);
                }} 
              />
            )}
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-5 rounded-xl font-bold text-xl flex justify-center items-center gap-2 shadow-xl shadow-blue-900/20 active:scale-95 transition-transform disabled:opacity-70"
            >
              {isSubmitting ? t('btn_sending') : t('btn_submit')}
            </button>
          </div>
        )}

        {/* STEP 3: Success */}
        {step === 3 && (
          <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 pb-10">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-white">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">{t('report_submitted')}</h2>
            <div className="bg-slate-100 border border-slate-200 px-4 py-2 rounded-lg font-mono text-slate-700 font-bold tracking-widest mb-4 text-lg">
              {generatedId}
            </div>
            
            {isOffline ? (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-8 w-full text-left flex items-start gap-3">
                <div className="mt-0.5">⚠️</div>
                <div>
                  <p className="text-amber-800 font-bold text-lg mb-1">{t('saved_offline')}</p>
                  <p className="text-amber-700 text-sm">{t('sent_when_internet')}</p>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 mb-8 max-w-[250px] text-lg font-medium">
                {t('thank_you')}
              </p>
            )}

            <button 
              onClick={onComplete}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform mt-4"
            >
              {t('btn_track')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
