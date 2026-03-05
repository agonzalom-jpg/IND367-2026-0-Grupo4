
import React from 'react';
import { ChevronLeft, BarChart2, Users, Minus, Plus, ArrowRight } from 'lucide-react';
import { ReportData } from '../types';

interface ActivityViewProps {
  data: ReportData;
  onUpdate: (updates: Partial<ReportData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ActivityView: React.FC<ActivityViewProps> = ({ data, onUpdate, onNext, onBack }) => {
  const percentage = Math.round((data.executedQuantity / data.totalQuantity) * 100) || 0;

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <header className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center text-blue-600 font-bold">
          <ChevronLeft size={24} />
          Volver
        </button>
        <h2 className="text-lg font-bold text-gray-800">Registro de Actividad</h2>
        <div className="w-10" />
      </header>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
        <img src="https://picsum.photos/seed/const/100/100" className="w-16 h-16 rounded-2xl object-cover" alt="Task" />
        <div>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Tarea Seleccionada</p>
          <h3 className="text-lg font-bold text-gray-800">{data.selectedTask?.name || 'Sin tarea seleccionada'}</h3>
          <p className="text-xs text-gray-400 font-medium">{data.sector || 'Sector no definido'} - {data.level || 'Nivel no definido'}</p>
        </div>
      </div>

      <section className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 size={20} className="text-blue-600" />
          <h3 className="font-bold text-gray-800">Avance</h3>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">CANTIDAD EJECUTADA HOY (M³)</label>
          <div className="relative">
            <input 
              type="number" 
              value={data.executedQuantity || ''}
              onChange={(e) => onUpdate({ executedQuantity: Number(e.target.value) })}
              placeholder="0.00"
              className="w-full text-2xl font-bold p-4 bg-slate-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">⌨️</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">PROGRESO ACUMULADO</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{data.executedQuantity}</span>
                <span className="text-gray-400 text-sm">/ {data.totalQuantity} m³</span>
              </div>
            </div>
            <span className="text-blue-600 font-bold text-xl">{percentage}%</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Users size={20} className="text-blue-600" />
          <h3 className="font-bold text-gray-800">Recursos</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-3xl p-4 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3 text-center">OPERADORES</p>
            <div className="flex items-center justify-between">
              <button onClick={() => onUpdate({ operators: Math.max(0, data.operators - 1) })} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-400"><Minus size={18} /></button>
              <span className="text-xl font-bold">{data.operators}</span>
              <button onClick={() => onUpdate({ operators: data.operators + 1 })} className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><Plus size={18} /></button>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-4 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3 text-center">PEONES</p>
            <div className="flex items-center justify-between">
              <button onClick={() => onUpdate({ peons: Math.max(0, data.peons - 1) })} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-400"><Minus size={18} /></button>
              <span className="text-xl font-bold">{data.peons}</span>
              <button onClick={() => onUpdate({ peons: data.peons + 1 })} className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><Plus size={18} /></button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">HORA INICIO</label>
              <input type="time" value={data.startTime} onChange={(e) => onUpdate({ startTime: e.target.value })} className="w-full p-3 bg-slate-50 rounded-xl border border-gray-100 font-medium" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">HORA FIN</label>
              <input type="time" value={data.endTime} onChange={(e) => onUpdate({ endTime: e.target.value })} className="w-full p-3 bg-slate-50 rounded-xl border border-gray-100 font-medium" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">OBSERVACIONES</label>
            <textarea 
              value={data.observations}
              onChange={(e) => onUpdate({ observations: e.target.value })}
              rows={4}
              placeholder="Escriba aquí cualquier novedad o impedimento..."
              className="w-full p-4 bg-slate-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <div className="pb-10">
        <button
          onClick={onNext}
          className="w-full py-5 bg-blue-600 text-white rounded-3xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all"
        >
          <span>Siguiente: Evidencias</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};
