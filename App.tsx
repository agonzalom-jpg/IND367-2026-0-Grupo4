
import React, { useState, useCallback } from 'react';
import { Screen, ReportData, Task, TaskStatus, AppUser } from './types';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ReportSuccessView } from './views/ReportSuccessView';
import { HomeView } from './views/HomeView';
import { ActivityView } from './views/ActivityView';
import { EvidenceView } from './views/EvidenceView';
import { SummaryView } from './views/SummaryView';
import { DashboardView } from './views/DashboardView';
import { Navigation } from './components/Navigation';
import { SECTORS, LEVELS, INITIAL_TASKS, SUPERVISORS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('LOGIN');
  const [registeredUsers, setRegisteredUsers] = useState<AppUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  // Dynamic lists for selection
  const [availableProjects, setAvailableProjects] = useState(['Edificio Miraflores', 'Torre San Isidro', 'Residencial El Sol']);
  const [availableSectors, setAvailableSectors] = useState(SECTORS);
  const [availableLevels, setAvailableLevels] = useState(LEVELS);
  const [availableTasks, setAvailableTasks] = useState<Task[]>(INITIAL_TASKS);
  const [availableSupervisors, setAvailableSupervisors] = useState(SUPERVISORS);

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

  const handleRegister = (user: AppUser) => {
    setRegisteredUsers(prev => [...prev, user]);
    setRegistrationSuccess(true);
    setCurrentScreen('LOGIN');
  };

  const handleLogin = (user: AppUser) => {
    setCurrentUser(user);
    setCurrentScreen('HOME');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'LOGIN':
        return (
          <LoginView 
            onLogin={handleLogin} 
            onRegister={() => {
              setRegistrationSuccess(false);
              setCurrentScreen('REGISTER');
            }} 
            registeredUsers={registeredUsers}
            successMessage={registrationSuccess ? '¡Cuenta creada con éxito! Por favor, inicia sesión.' : undefined}
          />
        );
      case 'REGISTER':
        return <RegisterView onBack={() => setCurrentScreen('LOGIN')} onRegister={handleRegister} />;
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
            supervisors={availableSupervisors}
            onAddSector={addSector}
            onAddLevel={addLevel}
            onAddTask={addTask}
            currentUser={currentUser}
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
            onNext={() => setCurrentScreen('REPORT_SUCCESS')} 
            onBack={() => setCurrentScreen('EVIDENCE')}
          />
        );
      case 'REPORT_SUCCESS':
        return (
          <ReportSuccessView 
            data={reportData} 
            onGoHome={() => setCurrentScreen('HOME')}
            onGoDashboard={() => setCurrentScreen('DASHBOARD')}
          />
        );
      case 'DASHBOARD':
        return (
          <DashboardView 
            onBack={() => setCurrentScreen('HOME')}
          />
        );
      default:
        return <LoginView onLogin={handleLogin} onRegister={() => setCurrentScreen('REGISTER')} registeredUsers={registeredUsers} />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 relative">
      <div className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </div>
      {currentScreen !== 'LOGIN' && currentScreen !== 'REGISTER' && (
        <Navigation 
          currentScreen={currentScreen} 
          onNavigate={(screen) => setCurrentScreen(screen)} 
        />
      )}
    </div>
  );
};

export default App;
