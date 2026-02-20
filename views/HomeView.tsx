
import React, { useState } from 'react';
import { ChevronDown, Bell, Plus, Hammer, PlayCircle, X, Check } from 'lucide-react';
import { ReportData, Task, TaskStatus } from '../types';

interface HomeViewProps {
  data: ReportData;
  onUpdate: (updates: Partial<ReportData>) => void;
  onNext: () => void;
  projects: string[];
  sectors: { id: string, name: string, icon: string }[];
  levels: string[];
  tasks: Task[];
  supervisors: string[];
  onAddSector: (name: string, icon: string) => void;
  onAddLevel: (level: string) => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  data, 
  onUpdate, 
  onNext, 
  projects, 
  sectors, 
  levels,
  tasks,
  supervisors,
  onAddSector,
  onAddLevel,
  onAddTask
}) => {
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  const [showAddSector, setShowAddSector] = useState(false);
  const [showAddLevel, setShowAddLevel] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  
  const [newSectorName, setNewSectorName] = useState('');
  const [newSectorIcon, setNewSectorIcon] = useState('🏗️');
  const [newLevelName, setNewLevelName] = useState('');

  // Task Modal State
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('ESTRUCTURA');
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>(TaskStatus.PENDIENTE);
  const [newTaskSupervisor, setNewTaskSupervisor] = useState(supervisors[0] || '');

  const handleAddSector = () => {
    if (newSectorName.trim()) {
      onAddSector(newSectorName, newSectorIcon);
      onUpdate({ sector: newSectorName });
      setNewSectorName('');
      setShowAddSector(false);
    }
  };

  const handleAddLevel = () => {
    if (newLevelName.trim()) {
      onAddLevel(newLevelName);
      onUpdate({ level: newLevelName });
      setNewLevelName('');
      setShowAddLevel(false);
    }
  };

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      onAddTask({
        name: newTaskName,
        category: newTaskCategory,
        status: newTaskStatus,
        supervisor: newTaskSupervisor
      });
      setNewTaskName('');
      setNewTaskSupervisor(supervisors[0] || '');
      setShowAddTask(false);
    }
  };

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/seed/juan/100/100" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Profile" />
          <div>
            <p className="text-sm text-gray-500">Buen día,</p>
            <h1 className="text-lg font-bold">Ing. Juan Pérez</h1>
          </div>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      <div className="relative mb-6">
        <div 
          onClick={() => setShowProjectSelector(!showProjectSelector)}
          className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer transition-all ${showProjectSelector ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <span className="font-bold text-xl">🏢</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Proyecto Actual</p>
              <p className="font-semibold text-gray-800">{data.project}</p>
            </div>
          </div>
          <ChevronDown size={20} className={`text-gray-400 transition-transform ${showProjectSelector ? 'rotate-180' : ''}`} />
        </div>

        {showProjectSelector && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
            {projects.map((p) => (
              <button
                key={p}
                onClick={() => {
                  onUpdate({ project: p });
                  setShowProjectSelector(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center justify-between font-medium text-sm ${data.project === p ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'}`}
              >
                {p}
                {data.project === p && <Check size={16} />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-medium text-gray-500">📅 Lunes, 24 de Mayo</span>
        <span className="text-gray-300">•</span>
        <span className="text-sm font-medium text-gray-500">⏰ 08:30 AM</span>
      </div>

      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">Seleccionar Sector</h3>
          <button onClick={() => setShowAddSector(true)} className="p-1 bg-blue-50 rounded-full text-blue-600 active:scale-90 transition-transform">
            <Plus size={18} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {sectors.map((s) => (
            <button
              key={s.id}
              onClick={() => onUpdate({ sector: s.name })}
              className={`min-w-[100px] p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                data.sector === s.name ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white shadow-sm'
              }`}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-xs font-bold ${data.sector === s.name ? 'text-blue-600' : 'text-gray-500'}`}>{s.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">Nivel</h3>
          <button onClick={() => setShowAddLevel(true)} className="p-1 bg-blue-50 rounded-full text-blue-600 active:scale-90 transition-transform">
            <Plus size={18} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => onUpdate({ level: l })}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                data.level === l ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">Tareas Programadas</h3>
          <button onClick={() => setShowAddTask(true)} className="p-1 bg-blue-50 rounded-full text-blue-600 active:scale-90 transition-transform">
            <Plus size={18} />
          </button>
        </div>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onUpdate({ selectedTask: task as Task })}
              className={`p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer transition-all ${
                data.selectedTask?.id === task.id ? 'ring-2 ring-blue-500 ring-offset-2 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-50 p-3 rounded-xl text-gray-400">
                  <Hammer size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{task.name}</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{task.category}</p>
                    <span className="text-gray-300 text-[10px]">•</span>
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{task.supervisor || 'Sin asignar'}</p>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                task.status === TaskStatus.PENDIENTE ? 'bg-gray-100 text-gray-400' : 
                task.status === TaskStatus.EN_PROCESO ? 'bg-orange-100 text-orange-600' :
                'bg-green-100 text-green-600'
              }`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-20 left-6 right-6 sm:absolute max-w-[400px] mx-auto z-10">
        <button
          disabled={!data.selectedTask}
          onClick={onNext}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${
            data.selectedTask 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 active:scale-95' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <PlayCircle size={24} />
          <span>Iniciar Reporte</span>
        </button>
      </div>

      {/* MODAL: ADD SECTOR */}
      {showAddSector && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-6 bg-blue-600 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Nuevo Sector</h3>
              <button onClick={() => setShowAddSector(false)}><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">NOMBRE DEL SECTOR</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newSectorName}
                  onChange={(e) => setNewSectorName(e.target.value)}
                  placeholder="Ej. Torre C, Parqueo..."
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">ICONO</label>
                <div className="flex gap-4">
                   {['🏗️', '🏢', '🏢', '🏠', '💠'].map((emoji, idx) => (
                     <button 
                       key={idx}
                       onClick={() => setNewSectorIcon(emoji)}
                       className={`text-2xl p-3 rounded-xl border-2 transition-all ${newSectorIcon === emoji ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-white'}`}
                     >
                       {emoji}
                     </button>
                   ))}
                </div>
              </div>
              <button 
                onClick={handleAddSector}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all"
              >
                Guardar Sector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD LEVEL */}
      {showAddLevel && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-6 bg-blue-600 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Nuevo Nivel</h3>
              <button onClick={() => setShowAddLevel(false)}><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">DENOMINACIÓN</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newLevelName}
                  onChange={(e) => setNewLevelName(e.target.value)}
                  placeholder="Ej. Piso 14, Penthouse..."
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <button 
                onClick={handleAddLevel}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all"
              >
                Guardar Nivel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD TASK */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-6 bg-blue-600 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Nueva Tarea</h3>
              <button onClick={() => setShowAddTask(false)}><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">NOMBRE DE LA TAREA</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="Ej. Armado de estribos..."
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">ESPECIALIDAD</label>
                <select 
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none font-medium appearance-none"
                >
                  <option value="ESTRUCTURA">ESTRUCTURA</option>
                  <option value="CIMENTACIÓN">CIMENTACIÓN</option>
                  <option value="ACABADOS">ACABADOS</option>
                  <option value="ELECTRICAS">INST. ELÉCTRICAS</option>
                  <option value="SANITARIAS">INST. SANITARIAS</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">ENCARGADO / SUPERVISOR</label>
                <select 
                  value={newTaskSupervisor}
                  onChange={(e) => setNewTaskSupervisor(e.target.value)}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none font-medium appearance-none"
                >
                  {supervisors.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">ESTADO INICIAL</label>
                <div className="grid grid-cols-1 gap-2">
                  {[TaskStatus.PENDIENTE, TaskStatus.EN_PROCESO, TaskStatus.COMPLETADO].map((status) => (
                    <button
                      key={status}
                      onClick={() => setNewTaskStatus(status)}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between font-bold text-xs transition-all ${
                        newTaskStatus === status ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-50 bg-slate-50 text-gray-400'
                      }`}
                    >
                      {status === TaskStatus.COMPLETADO ? 'TERMINADA' : status}
                      {newTaskStatus === status && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAddTask}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all mt-4"
              >
                Crear Tarea
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
