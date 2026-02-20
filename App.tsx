
import React, { useState, useCallback } from 'react';
import { Screen, ReportData, Task, TaskStatus } from './types';
import { HomeView } from './views/HomeView';
import { ActivityView } from './views/ActivityView';
import { EvidenceView } from './views/EvidenceView';
import { SummaryView } from './views/SummaryView';
import { DashboardView } from './views/DashboardView';
import { Navigation } from './components/Navigation';
import { SECTORS, LEVELS, INITIAL_TASKS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  
  // Dynamic lists for selection
  const [availableProjects, setAvailableProjects] = useState(['Edificio Miraflores', 'Torre San Isidro', 'Residencial El Sol']);
  const [availableSectors, setAvailableSectors] = useState(SECTORS);
  const [availableLevels, setAvailableLevels] = useState(LEVELS);
  const [availableTasks, setAvailableTasks] = useState<Task[]>(INITIAL_TASKS);

  const [reportData, setReportData] = useState<ReportData>({
    project: 'Edificio Miraflores',
    sector: '',
    level: '',
    selectedTask: null,
    executedQuantity: 0,
    totalQuantity: 200,
    operators: 2,
    peons: 4,
    startTime: '08:00',
    endTime: '17:00',
    observations: '',
    evidences: [],
    qualityControl: {
      structuralNorm: true,
      safetyHygiene: false,
    },
    signature: null,
  });

  const updateReportData = useCallback((updates: Partial<ReportData>) => {
    setReportData(prev => ({ ...prev, ...updates }));
  }, []);

  const addSector = (name: string, icon: string) => {
    setAvailableSectors(prev => [...prev, { id: name.toLowerCase().replace(/\s+/g, '-'), name, icon }]);
  };

  const addLevel = (level: string) => {
    setAvailableLevels(prev => [...prev, level]);
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    };
    setAvailableTasks(prev => [newTask, ...prev]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return (
          <HomeView 
            data={reportData} 
            onUpdate={updateReportData} 
            onNext={() => setCurrentScreen('ACTIVITY')}
            projects={availableProjects}
            sectors={availableSectors}
            levels={availableLevels}
            tasks={availableTasks}
            onAddSector={addSector}
            onAddLevel={addLevel}
            onAddTask={addTask}
          />
        );
      case 'ACTIVITY':
        return (
          <ActivityView 
            data={reportData} 
            onUpdate={updateReportData} 
            onNext={() => setCurrentScreen('EVIDENCE')} 
            onBack={() => setCurrentScreen('HOME')}
          />
        );
      case 'EVIDENCE':
        return (
          <EvidenceView 
            data={reportData} 
            onUpdate={updateReportData} 
            onNext={() => setCurrentScreen('SUMMARY')} 
            onBack={() => setCurrentScreen('ACTIVITY')}
          />
        );
      case 'SUMMARY':
        return (
          <SummaryView 
            data={reportData} 
            onUpdate={updateReportData} 
            onNext={() => setCurrentScreen('DASHBOARD')} 
            onBack={() => setCurrentScreen('EVIDENCE')}
          />
        );
      case 'DASHBOARD':
        return (
          <DashboardView 
            onBack={() => setCurrentScreen('HOME')}
          />
        );
      default:
        return (
          <HomeView 
            data={reportData} 
            onUpdate={updateReportData} 
            onNext={() => setCurrentScreen('ACTIVITY')} 
            projects={availableProjects} 
            sectors={availableSectors} 
            levels={availableLevels} 
            tasks={availableTasks}
            onAddSector={addSector} 
            onAddLevel={addLevel} 
            onAddTask={addTask}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 relative">
      <div className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </div>
      <Navigation 
        currentScreen={currentScreen} 
        onNavigate={(screen) => setCurrentScreen(screen)} 
      />
    </div>
  );
};

export default App;
