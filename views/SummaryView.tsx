
import React, { useRef, useEffect } from 'react';
import { ChevronLeft, Check, ClipboardList, Image as ImageIcon, CheckCircle, ShieldCheck, PenTool, RefreshCcw } from 'lucide-react';
import { ReportData } from '../types';

interface SummaryViewProps {
  data: ReportData;
  onUpdate: (updates: Partial<ReportData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({ data, onUpdate, onNext, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && !data.signature) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        let isDrawing = false;
        const startDrawing = (e: any) => {
          isDrawing = true;
          const rect = canvas.getBoundingClientRect();
          const x = (e.clientX || e.touches[0].clientX) - rect.left;
          const y = (e.clientY || e.touches[0].clientY) - rect.top;
          ctx.beginPath();
          ctx.moveTo(x, y);
        };
        const draw = (e: any) => {
          if (!isDrawing) return;
          const rect = canvas.getBoundingClientRect();
          const x = (e.clientX || e.touches[0].clientX) - rect.left;
          const y = (e.clientY || e.touches[0].clientY) - rect.top;
          ctx.lineTo(x, y);
          ctx.stroke();
        };
        const stopDrawing = () => {
          if (isDrawing) {
            isDrawing = false;
            onUpdate({ signature: canvas.toDataURL() });
          }
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        window.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);

        return () => {
          canvas.removeEventListener('mousedown', startDrawing);
          canvas.removeEventListener('mousemove', draw);
          window.removeEventListener('mouseup', stopDrawing);
          canvas.removeEventListener('touchstart', startDrawing);
          canvas.removeEventListener('touchmove', draw);
          canvas.removeEventListener('touchend', stopDrawing);
        };
      }
    }
  }, [data.signature, onUpdate]);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      onUpdate({ signature: null });
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <header className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center text-blue-600 font-bold">
          <ChevronLeft size={24} />
          Atrás
        </button>
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PASO 4 DE 5</p>
        </div>
        <button className="text-blue-600 font-bold">Editar</button>
      </header>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Resumen Final</h2>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-500">Revise los datos antes de enviar</p>
          <span className="text-blue-600 font-bold text-sm">80% Listo</span>
        </div>
        <div className="h-1.5 w-full bg-blue-100 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-blue-600 w-4/5 rounded-full"></div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <ClipboardList size={22} className="text-blue-600" />
          <h3 className="font-bold text-gray-800 text-lg">Datos del Reporte</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Proyecto</span>
            <span className="text-gray-800 font-bold">{data.project}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Supervisor</span>
            <span className="text-gray-800 font-bold">Ing. Juan Pérez</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Ubicación</span>
            <div className="flex items-center gap-1 text-blue-600 font-bold">
              <CheckCircle size={14} />
              <span>Lima, Perú</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Fecha</span>
            <span className="text-gray-800 font-bold">24 May 2024, 14:30</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <ImageIcon size={22} className="text-blue-600" />
            <h3 className="font-bold text-gray-800 text-lg">Evidencia Adjunta</h3>
          </div>
          <span className="text-gray-400 font-medium text-sm">{data.evidences.length} archivos</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data.evidences.map((e, idx) => (
            <div key={e.id} className="space-y-2">
              <img src={e.imageUrl} className="w-full aspect-square rounded-3xl object-cover shadow-sm" alt="Preview" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{e.description || `IMG_${idx+1}`}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck size={22} className="text-blue-600" />
          <h3 className="font-bold text-gray-800 text-lg">Control de Calidad</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-800">Normativa Estructural</h4>
              <p className="text-[10px] text-gray-400 font-medium">NMX-C-403 Vigente</p>
            </div>
            <div className="flex bg-slate-100 rounded-full p-1 w-32">
              <button 
                onClick={() => onUpdate({ qualityControl: { ...data.qualityControl, structuralNorm: true }})}
                className={`flex-1 text-[10px] font-bold py-2 px-1 rounded-full transition-all ${data.qualityControl.structuralNorm ? 'bg-green-500 text-white shadow-md' : 'text-gray-400'}`}
              >
                CUMPLE
              </button>
              <button 
                onClick={() => onUpdate({ qualityControl: { ...data.qualityControl, structuralNorm: false }})}
                className={`flex-1 text-[10px] font-bold py-2 px-1 rounded-full transition-all ${!data.qualityControl.structuralNorm ? 'bg-red-500 text-white shadow-md' : 'text-gray-400'}`}
              >
                NO
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-800">Seguridad e Higiene</h4>
              <p className="text-[10px] text-gray-400 font-medium">Uso de EPP completo</p>
            </div>
            <div className="flex bg-slate-100 rounded-full p-1 w-32">
              <button 
                onClick={() => onUpdate({ qualityControl: { ...data.qualityControl, safetyHygiene: true }})}
                className={`flex-1 text-[10px] font-bold py-2 px-1 rounded-full transition-all ${data.qualityControl.safetyHygiene ? 'bg-green-500 text-white shadow-md' : 'text-gray-400'}`}
              >
                CUMPLE
              </button>
              <button 
                onClick={() => onUpdate({ qualityControl: { ...data.qualityControl, safetyHygiene: false }})}
                className={`flex-1 text-[10px] font-bold py-2 px-1 rounded-full transition-all ${!data.qualityControl.safetyHygiene ? 'bg-red-500 text-white shadow-md' : 'text-gray-400'}`}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 mb-10 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <PenTool size={22} className="text-blue-600" />
            <h3 className="font-bold text-gray-800 text-lg">Firma Autorizada</h3>
          </div>
          <button onClick={clearSignature} className="flex items-center gap-1 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
            <RefreshCcw size={14} />
            LIMPIAR
          </button>
        </div>
        
        <div className="relative border-2 border-slate-100 rounded-3xl h-48 flex items-center justify-center bg-slate-50/50">
          {!data.signature && <p className="absolute text-gray-300 font-medium pointer-events-none">Firme dentro del recuadro</p>}
          <canvas 
            ref={canvasRef} 
            width={350} 
            height={192} 
            className="w-full h-full cursor-crosshair touch-none"
          />
        </div>
        <p className="mt-6 text-[10px] text-gray-400 text-center leading-relaxed font-medium">
          Al firmar, usted certifica que la inspección se realizó siguiendo los protocolos técnicos y de seguridad establecidos.
        </p>
      </div>

      <div className="pb-10">
        <button
          onClick={onNext}
          className="w-full py-5 bg-blue-600 text-white rounded-3xl flex items-center justify-center gap-3 font-bold shadow-xl shadow-blue-200 active:scale-95 transition-all"
        >
          <ShieldCheck size={24} />
          <span>Enviar Reporte Oficial</span>
        </button>
      </div>
    </div>
  );
};
