import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, TrendingUp, Smartphone } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-center justify-center min-h-[100dvh] w-full max-w-7xl mx-auto px-6 py-20 md:py-0 relative"
    >
      {/* Desktop Background Decoration */}
      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-violet/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Left Column: Content */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-left z-20 mt-10 md:mt-0">
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-violet/30 bg-neon-violet/10 backdrop-blur-md">
          <Zap size={14} className="text-neon-violet fill-neon-violet" />
          <span className="text-xs font-semibold text-neon-violet tracking-wide uppercase">AI Financial Assistant</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white leading-[1.1]">
          Tu dinero, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-violet animate-pulse-slow">
            Inteligente.
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
          Deja de adivinar. Obtén un análisis financiero instantáneo y conecta con nuestro asistente inteligente en Telegram.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full md:w-auto px-8 py-5 bg-white text-slate-950 font-bold text-lg rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          <span className="relative z-10">EMPEZAR AHORA</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-violet opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </motion.button>

        {/* Mobile Trust Badges */}
        <div className="mt-12 flex gap-6 text-slate-500 opacity-60">
          <div className="flex items-center gap-2">
              <Shield size={18} />
              <span className="text-xs uppercase tracking-widest">Seguro</span>
          </div>
          <div className="flex items-center gap-2">
              <TrendingUp size={18} />
              <span className="text-xs uppercase tracking-widest">Preciso</span>
          </div>
        </div>
      </div>

      {/* Right Column: Visual (Hidden on small mobile if needed, or scaled down) */}
      <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 relative z-10">
        <div className="relative w-64 h-64 md:w-96 md:h-96">
            {/* Abstract Graphic */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-violet to-neon-green rounded-3xl rotate-6 opacity-20 blur-xl animate-pulse"></div>
            <div className="absolute inset-0 bg-slate-900 border border-slate-700 rounded-3xl rotate-3 shadow-2xl flex items-center justify-center overflow-hidden">
                 {/* Mock UI Elements */}
                 <div className="w-full p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green"><Smartphone size={20}/></div>
                        <div className="h-2 w-24 bg-slate-700 rounded"></div>
                    </div>
                    <div className="h-32 bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
                        <div className="flex justify-between items-end h-full gap-2">
                            <div className="w-full bg-neon-violet/20 h-[40%] rounded-t"></div>
                            <div className="w-full bg-neon-violet/40 h-[70%] rounded-t"></div>
                            <div className="w-full bg-neon-green h-[50%] rounded-t shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
                            <div className="w-full bg-neon-violet/30 h-[60%] rounded-t"></div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Landing;