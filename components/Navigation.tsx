
import React from 'react';
import { Home, FileText, Map, Settings } from 'lucide-react';
import { Screen } from '../types';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center z-50 sm:absolute max-w-[450px] mx-auto">
      <button 
        onClick={() => onNavigate('HOME')}
        className={`flex flex-col items-center gap-1 ${currentScreen === 'HOME' ? 'text-blue-600' : 'text-gray-400'}`}
      >
        <Home size={24} />
        <span className="text-[10px] font-medium">INICIO</span>
      </button>
      <button 
        onClick={() => onNavigate('SUMMARY')}
        className={`flex flex-col items-center gap-1 ${currentScreen === 'SUMMARY' ? 'text-blue-600' : 'text-gray-400'}`}
      >
        <FileText size={24} />
        <span className="text-[10px] font-medium">REPORTES</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400">
        <Map size={24} />
        <span className="text-[10px] font-medium">PLANOS</span>
      </button>
      <button 
        onClick={() => onNavigate('DASHBOARD')}
        className={`flex flex-col items-center gap-1 ${currentScreen === 'DASHBOARD' ? 'text-blue-600' : 'text-gray-400'}`}
      >
        <Settings size={24} />
        <span className="text-[10px] font-medium">AJUSTES</span>
      </button>
    </div>
  );
};
