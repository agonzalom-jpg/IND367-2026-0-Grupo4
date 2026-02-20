
import React, { useState } from 'react';
import { ChevronLeft, Info, Camera, X, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { ReportData, Evidence } from '../types';

interface EvidenceViewProps {
  data: ReportData;
  onUpdate: (updates: Partial<ReportData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({ data, onUpdate, onNext, onBack }) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const addEvidence = () => {
    const newEvidence: Evidence = {
      id: Date.now().toString(),
      imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
      description: '',
      timestamp: '24 May 2024, 10:12 AM',
      coords: '19.4327° N, 99.1335° W',
      isGeotagged: true,
    };
    onUpdate({ evidences: [...data.evidences, newEvidence] });
  };

  const removeEvidence = (id: string) => {
    onUpdate({ evidences: data.evidences.filter(e => e.id !== id) });
  };

  const updateDescription = (id: string, text: string) => {
    onUpdate({
      evidences: data.evidences.map(e => e.id === id ? { ...e, description: text } : e)
    });
  };

  return (
    <div className="p-6 bg-white min-h-full flex flex-col">
      <header className="flex items-center justify-between mb-2">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={28} /></button>
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-800">Carga de Evidencias</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PASO 3 DE 5</p>
        </div>
        <button className="p-2 -mr-2 text-blue-600"><Info size={24} /></button>
      </header>

      <div className="flex justify-center gap-2 mb-8">
        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
        <div className="w-8 h-2 rounded-full bg-blue-600"></div>
        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
      </div>

      <div 
        onClick={addEvidence}
        className="border-2 border-dashed border-blue-200 rounded-[40px] p-10 flex flex-col items-center justify-center gap-4 bg-blue-50/30 mb-8 cursor-pointer active:scale-95 transition-transform"
      >
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-100 text-white">
          <Camera size={36} />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800">Tomar o Subir Foto</h3>
          <p className="text-sm text-gray-400 font-medium mt-1">Toca para capturar evidencia del avance</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200">
          Capturar
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 text-lg">Evidencias capturadas ({data.evidences.length})</h3>
        <span className="text-[10px] font-bold text-gray-400 uppercase">JPG, PNG permitidos</span>
      </div>

      <div className="space-y-6 flex-1">
        {data.evidences.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm relative">
            <button 
              onClick={() => removeEvidence(item.id)}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center z-10"
            >
              <X size={16} />
            </button>
            <div className="flex gap-4 mb-4">
              <img src={item.imageUrl} className="w-24 h-24 rounded-2xl object-cover shadow-sm" alt="Evidence" />
              <div className="space-y-2 py-1">
                <div className="flex items-center gap-2 text-gray-500 text-[11px] font-medium">
                  <MapPin size={12} />
                  <span>{item.coords}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-[11px] font-medium">
                  <Clock size={12} />
                  <span>{item.timestamp}</span>
                </div>
                {item.isGeotagged && (
                  <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                    <CheckCircle size={12} />
                    <span>GEO-ETIQUETADO</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-800 uppercase tracking-widest mb-2">Descripción</p>
              <textarea 
                value={item.description}
                onChange={(e) => updateDescription(item.id, e.target.value)}
                placeholder="Escribe el detalle de la evidencia..."
                className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={2}
              />
            </div>
          </div>
        ))}
        {data.evidences.length === 0 && (
          <div className="text-center py-10 text-gray-300 font-medium italic">
            No hay evidencias cargadas aún.
          </div>
        )}
      </div>

      <div className="mt-8 pb-4">
        <button
          onClick={onNext}
          disabled={data.evidences.length === 0}
          className={`w-full py-5 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg transition-all ${
            data.evidences.length > 0 
              ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' 
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          <span>Guardar y Revisar</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};
