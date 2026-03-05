
import React from 'react';
import { CheckCircle, ArrowRight, LayoutDashboard, Home } from 'lucide-react';
import { ReportData } from '../types';

interface ReportSuccessViewProps {
  data: ReportData;
  onGoHome: () => void;
  onGoDashboard: () => void;
}

export const ReportSuccessView: React.FC<ReportSuccessViewProps> = ({ data, onGoHome, onGoDashboard }) => {
  return (
    <div className="min-h-full bg-slate-50 flex flex-col p-6 animate-in fade-in duration-500">
      
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100 ring-4 ring-green-50">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Reporte enviado correctamente</h1>
        <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto leading-relaxed">
          El reporte fue registrado con éxito en el sistema central de supervisión.
        </p>

        <div className="w-full bg-white rounded-3xl p-6 mt-10 shadow-sm border border-slate-100">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 text-left">DETALLES DEL ENVÍO</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 font-medium">ID del Reporte</span>
              <span className="text-sm text-slate-800 font-bold">#REP-{Date.now().toString().slice(-4)}</span>
            </div>
            <div className="h-px bg-slate-50 w-full"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 font-medium">Proyecto</span>
              <span className="text-sm text-slate-800 font-bold">{data.project}</span>
            </div>
            <div className="h-px bg-slate-50 w-full"></div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 font-medium">Sector / Frente</span>
              <span className="text-sm text-slate-800 font-bold">{data.sector} - {data.level}</span>
            </div>
            <div className="h-px bg-slate-50 w-full"></div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 font-medium">Fecha y Hora</span>
              <span className="text-sm text-slate-800 font-bold">{new Date().toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-8 pb-24">
        <button 
          onClick={onGoHome}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Volver al inicio</span>
          <Home size={18} />
        </button>

        <button 
          onClick={onGoDashboard}
          className="w-full py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <LayoutDashboard size={18} />
          <span>Ver dashboard</span>
        </button>
      </div>
    </div>
  );
};
