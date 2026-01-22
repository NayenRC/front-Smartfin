import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Send, TrendingUp, CheckCircle, Wallet, ArrowUpRight, PlusCircle, MessageSquare, LogOut } from 'lucide-react';
import { CollectedData, UserProfile } from '../types';

interface DashboardProps {
  data: CollectedData;
  user: UserProfile;
  onAddMore: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, user, onAddMore, onLogout }) => {
  const [redirecting, setRedirecting] = useState(false);

  // Fallback data if amounts are null
  const amount = data.amount || 100;
  const category = data.category || 'Varios';
  
  // Fake projection logic
  const projection = amount * 12;
  const savingsPotential = amount * 0.2;

  const chartData = [
    { name: category, value: amount },
    { name: 'Potencial Ahorro', value: savingsPotential },
  ];
  
  const COLORS = ['#7c3aed', '#34d399']; // Violet, Green

  const handleTelegramRedirect = () => {
    setRedirecting(true);
    setTimeout(() => {
        window.open('https://t.me/Smartfin27_bot', '_blank');
        setRedirecting(false);
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto min-h-[100dvh] p-4 md:p-10 flex flex-col pt-20"
    >
      <header className="mb-8 md:mb-12">
        <div className="flex flex-row items-start md:items-center justify-between gap-4">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <CheckCircle size={14} />
                    Cuenta Activa
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">Hola, {user.email.split('@')[0]}</h2>
                <p className="text-slate-400 mt-1 text-sm md:text-base">Aquí está el análisis de tu {data.type === 'GOAL' ? 'meta' : 'gasto'}.</p>
            </div>
            <div className="flex items-center gap-3">
                <button 
                  onClick={onAddMore}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-colors"
                >
                  <PlusCircle size={18} className="text-neon-violet" />
                  <span>Nuevo Registro</span>
                </button>
                <div className="text-right hidden md:block border-l border-slate-700 pl-4">
                    <p className="text-xs text-slate-500 uppercase tracking-widest">ID de Usuario</p>
                    <p className="font-mono text-slate-300">{user.id.slice(-6)}</p>
                </div>
                
                <button 
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl border border-slate-700/50 hover:border-red-500/20 transition-all ml-2"
                  title="Cerrar Sesión"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline text-sm font-medium">Salir</span>
                </button>
            </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
        
        {/* Chart Card - 7 Columns on Desktop */}
        <div className="md:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <TrendingUp size={20} className="text-neon-violet" /> 
                    Proyección Anual
                </h3>
                <span className="text-2xl font-bold text-white">${projection.toLocaleString()}</span>
            </div>
            
            <div className="flex-1 w-full min-h-[300px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={110}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff' }}
                            itemStyle={{ color: '#e2e8f0' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <span className="text-xs text-slate-500 block uppercase tracking-wider">Total Mes</span>
                    <span className="text-3xl font-bold text-white">${amount}</span>
                </div>
            </div>
        </div>

        {/* Stats & CTA Column - 5 Columns on Desktop */}
        <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Action Buttons for Mobile */}
            <button 
                onClick={onAddMore}
                className="md:hidden w-full bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex items-center justify-between group active:scale-95 transition-all"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neon-violet/20 flex items-center justify-center text-neon-violet">
                        <MessageSquare size={20} />
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-white">Registrar en ChatBot</p>
                        <p className="text-xs text-slate-400">Agrega gastos o metas</p>
                    </div>
                </div>
                <ArrowUpRight className="text-slate-500 group-hover:text-white transition-colors" />
            </button>

            {/* Stat Card */}
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-neon-green">
                    <Wallet size={24} />
                </div>
                <div>
                    <p className="text-slate-400 text-sm">Oportunidad de Ahorro</p>
                    <p className="text-2xl font-bold text-white">${savingsPotential.toLocaleString()} <span className="text-sm text-slate-500 font-normal">/mes</span></p>
                </div>
            </div>

            {/* Telegram CTA Card */}
            <div className="flex-1 bg-gradient-to-br from-[#229ED9]/20 to-slate-900 border border-[#229ED9]/30 p-8 rounded-3xl flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#229ED9]/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-[#229ED9]/30 transition-all"></div>
                
                <div className="mb-6 relative">
                    <div className="w-16 h-16 bg-[#229ED9] rounded-full flex items-center justify-center shadow-lg shadow-[#229ED9]/40 z-10 relative">
                        <Send className="text-white w-8 h-8 ml-1" />
                    </div>
                    <div className="absolute inset-0 bg-[#229ED9] rounded-full animate-ping opacity-20"></div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">Activa tu Asistente</h3>
                <p className="text-slate-300 mb-8 text-sm leading-relaxed max-w-xs">
                    Recibe alertas, consejos diarios y gestiona tus finanzas desde Telegram.
                </p>

                <button
                    onClick={handleTelegramRedirect}
                    className="w-full bg-white text-[#229ED9] font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 hover:bg-slate-50"
                >
                    {redirecting ? 'Conectando...' : 'IR A TELEGRAM'}
                    <ArrowUpRight className="w-5 h-5" />
                </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;