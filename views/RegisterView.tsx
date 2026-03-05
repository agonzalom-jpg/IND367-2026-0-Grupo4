
import React, { useState } from 'react';
import { ArrowLeft, User as UserIcon, Briefcase, Building2, Mail, Lock, Eye, EyeOff, ArrowRight, History, Home } from 'lucide-react';
import { AppUser } from '../types';

interface RegisterViewProps {
  onBack: () => void;
  onRegister: (user: AppUser) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onBack, onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<AppUser & { termsAccepted: boolean }>({
    fullName: '',
    professionalId: '',
    company: '',
    email: '',
    password: '',
    termsAccepted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.termsAccepted) {
      const { termsAccepted, ...userData } = formData;
      onRegister(userData);
    }
  };

  return (
    <div className="min-h-full bg-white flex flex-col p-6 animate-in fade-in duration-300">
      {/* Header */}
      <header className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800">Registro de Ingeniero</h1>
      </header>

      {/* Hero Banner */}
      <div className="bg-blue-600 rounded-3xl p-6 mb-8 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Crear Cuenta</h2>
          <p className="text-blue-100 text-sm font-medium">Acceso al Sistema de Control de Obra</p>
        </div>
        {/* Abstract shapes background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/50 rounded-full -ml-10 -mb-10 blur-xl"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pb-24">
        {/* Professional Info Section */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">INFORMACIÓN PROFESIONAL</h3>
          
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Nombre Completo</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <UserIcon size={18} />
              </div>
              <input 
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="Ej: Juan Pérez"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Número de Registro Profesional</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Briefcase size={18} />
              </div>
              <input 
                type="text"
                value={formData.professionalId}
                onChange={(e) => setFormData({...formData, professionalId: e.target.value})}
                placeholder="ID Profesional / Cédula"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Empresa</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Building2 size={18} />
              </div>
              <input 
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Nombre de la constructora"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                required
              />
            </div>
          </div>
        </section>

        <div className="h-px bg-slate-100 my-6"></div>

        {/* Access Info Section */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">ACCESO</h3>
          
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Correo Electrónico</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="usuario@empresa.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Contraseña</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </section>

        <div className="flex items-start gap-3 mt-6">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-blue-600 checked:bg-blue-600 focus:ring-2 focus:ring-blue-500/20"
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
            Acepto los <span className="text-blue-600 font-bold hover:underline">términos y condiciones</span>, incluyendo el seguimiento de geolocalización para reportes de obra y cumplimiento normativo.
          </label>
        </div>

        <button 
          type="submit"
          disabled={!formData.termsAccepted}
          className={`w-full py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all ${
            formData.termsAccepted 
              ? 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700 active:scale-[0.98]' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Registrarse</span>
          <ArrowRight size={18} />
        </button>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400 font-medium">
            ¿Ya tienes una cuenta? <button type="button" onClick={onBack} className="text-blue-600 font-bold hover:underline">Inicia sesión</button>
          </p>
        </div>
      </form>

      {/* Bottom Navigation (Mock) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 flex justify-around items-center text-slate-400 text-[10px] font-bold uppercase tracking-widest z-50 sm:absolute sm:max-w-[450px] sm:mx-auto">
        <div className="flex flex-col items-center gap-1">
          <Home size={20} />
          <span>Inicio</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <History size={20} />
          <span>Historial</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-blue-600">
          <UserIcon size={20} />
          <span>Perfil</span>
        </div>
      </div>
    </div>
  );
};
