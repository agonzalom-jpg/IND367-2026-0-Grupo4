
import React from 'react';
import { ChevronLeft, Calendar, BarChart, TrendingUp, Clock, CreditCard, Share2, AlertTriangle, Info } from 'lucide-react';
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DashboardViewProps {
  onBack: () => void;
}

const chartData = [
  { name: 'CIMENTACIÓN', prog: 100, ejec: 100 },
  { name: 'ESTRUCTURA', prog: 92, ejec: 85 },
  { name: 'INSTALACIONES', prog: 45, ejec: 38 },
];

export const DashboardView: React.FC<DashboardViewProps> = ({ onBack }) => {
  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <header className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-blue-600"><ChevronLeft size={28} /></button>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Panel de Control</h2>
          <p className="text-[10px] text-gray-400 font-medium">Edificio Miraflores • Fase 1</p>
        </div>
        <button className="p-2 -mr-2 text-gray-400">
          <Calendar size={24} />
        </button>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <div className="bg-blue-50 text-blue-600 p-2 rounded-xl"><BarChart size={18} /></div>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+2.4%</span>
          </div>
          <p className="text-3xl font-black text-gray-800">85%</p>
          <p className="text-xs text-gray-400 font-bold mt-1">Avance Físico</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-600 h-full w-[85%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <div className="bg-orange-50 text-orange-600 p-2 rounded-xl"><TrendingUp size={18} /></div>
            <span className="text-[10px] font-bold text-gray-400 border border-gray-100 px-2 py-1 rounded-full uppercase">Meta 9.5</span>
          </div>
          <p className="text-3xl font-black text-gray-800">9.2</p>
          <p className="text-xs text-gray-400 font-bold mt-1">Desempeño (Score)</p>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="bg-slate-50 text-slate-400 p-2 rounded-xl w-fit mb-4"><Clock size={18} /></div>
          <p className="text-3xl font-black text-gray-800">124</p>
          <p className="text-xs text-gray-400 font-bold mt-1">Días Restantes</p>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="bg-green-50 text-green-600 p-2 rounded-xl w-fit mb-4"><CreditCard size={18} /></div>
          <p className="text-lg font-black text-green-600 uppercase">SALUDABLE</p>
          <p className="text-xs text-gray-400 font-bold mt-1">Estado Presupuesto</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 uppercase text-xs tracking-widest">PROGRAMADO VS EJECUTADO</h3>
          <div className="flex gap-4 text-[10px] font-bold">
            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-200"></span><span className="text-gray-400 uppercase">PROG.</span></div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-900"></span><span className="text-blue-900 uppercase">EJEC.</span></div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-6">
            {chartData.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.name}</span>
                  <span className="text-[11px] font-black text-blue-900">{item.ejec}%</span>
                </div>
                <div className="h-6 w-full bg-slate-50 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-slate-200 rounded-full opacity-50" style={{ width: `${item.prog}%` }}></div>
                  <div className="absolute top-0 left-0 h-full bg-blue-900 rounded-full" style={{ width: `${item.ejec}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-4">ALERTAS RECIENTES</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-100 rounded-3xl p-5 flex gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-gray-800 text-sm">Retraso en materiales</h4>
                <span className="text-[10px] font-bold text-gray-400 uppercase">AHORA</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Acero S.A. • Fase Estructura</p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-3xl p-5 flex gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-400 shadow-sm">
              <Info size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-gray-800 text-sm">Inspección pendiente</h4>
                <span className="text-[10px] font-bold text-gray-400 uppercase">2H</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Control de Calidad • Sector B</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-10">
        <button className="w-full py-5 bg-blue-600 text-white rounded-3xl flex items-center justify-center gap-3 font-bold shadow-xl shadow-blue-200 active:scale-95 transition-all">
          <Share2 size={24} />
          <span>Exportar Reporte General</span>
        </button>
      </div>
    </div>
  );
};
