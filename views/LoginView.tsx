
import React, { useState } from 'react';
import { Hammer, Mail, Lock, Eye, EyeOff, Fingerprint, Building2, LogIn, Check } from 'lucide-react';
import { AppUser } from '../types';

interface LoginViewProps {
  onLogin: (user: AppUser) => void;
  onRegister: () => void;
  registeredUsers: AppUser[];
  successMessage?: string;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, onRegister, registeredUsers, successMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      onLogin(user);
    } else {
      setError('Credenciales incorrectas. Por favor, regístrate si no tienes cuenta.');
    }
  };

  return (
    <div className="min-h-full bg-white flex flex-col items-center p-8 animate-in fade-in duration-500">
      {/* Logo Section */}
      <div className="mt-8 mb-4 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-sm">
          <Hammer size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">FollowConstruction</h1>
      </div>

      {/* Banner Image */}
      <div className="w-full rounded-2xl overflow-hidden mb-8 shadow-md">
        <img 
          src="https://picsum.photos/seed/construction/600/300" 
          alt="Construction Banner" 
          className="w-full h-40 object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Welcome Text */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">Bienvenido a</h2>
        <h2 className="text-xl font-bold text-slate-800 mb-2">FollowConstruction</h2>
        <p className="text-sm text-slate-400 font-medium">Ingresa tus credenciales para continuar</p>
      </div>

      {successMessage && !error && (
        <div className="w-full p-4 mb-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <Check size={16} />
          </div>
          <p className="text-xs font-bold text-emerald-700">{successMessage}</p>
        </div>
      )}

      {error && <p className="text-red-500 text-xs font-bold mb-4 text-center">{error}</p>}
      
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
            Correo electrónico / Usuario
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@empresa.com"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
            Contraseña
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Lock size={18} />
            </div>
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="flex justify-between items-center px-1">
          <button type="button" onClick={onRegister} className="text-xs font-bold text-blue-600 hover:underline">
            Crear Cuenta
          </button>
          <button type="button" onClick={onRegister} className="text-xs font-bold text-slate-400 hover:underline">
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Iniciar Sesión</span>
          <LogIn size={18} />
        </button>
      </form>

      {/* Divider */}
      <div className="w-full flex items-center gap-4 my-8">
        <div className="flex-1 h-[1px] bg-slate-100"></div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">O ACCEDER CON</span>
        <div className="flex-1 h-[1px] bg-slate-100"></div>
      </div>

      {/* Social/Alt Login */}
      <div className="w-full grid grid-cols-2 gap-4 mb-10">
        <button className="flex items-center justify-center gap-2 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
          <Fingerprint size={20} className="text-blue-500" />
          <span className="text-xs font-bold text-slate-600">Biometría</span>
        </button>
        <button className="flex items-center justify-center gap-2 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
          <Building2 size={20} className="text-blue-500" />
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[10px] font-bold text-slate-600">ID</span>
            <span className="text-[10px] font-bold text-slate-600">Corporativo</span>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-auto text-center">
        <p className="text-xs text-slate-400 font-medium">
          ¿No tienes una cuenta? <button type="button" onClick={onRegister} className="text-blue-600 font-bold hover:underline">Contacta a soporte</button>
        </p>
      </div>
    </div>
  );
};
