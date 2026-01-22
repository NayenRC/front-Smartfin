import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { signUpUser } from '../services/supabaseClient';

interface AuthFormProps {
  onSuccess: (email: string) => void;
  dataSummary: { amount: number | null; category: string | null };
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess, dataSummary }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await signUpUser(email, password);
      if (error) throw error;
      if (data.user) {
        onSuccess(data.user.email || email);
      }
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100dvh] w-full p-4 md:p-0">
        <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md bg-slate-900 border border-slate-700 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
        >
        {/* Glow Effect */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-neon-green/10 via-transparent to-neon-violet/10 pointer-events-none"></div>

        <div className="relative z-10">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-600 shadow-xl rotate-3">
                    <Lock className="text-neon-green w-8 h-8 -rotate-3" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Guarda tu Plan</h2>
                <p className="text-slate-400 text-sm leading-relaxed px-4">
                    Tu proyección de <span className="text-white font-semibold border-b border-neon-green/50">{dataSummary.category}</span> está lista. 
                    Crea una cuenta segura para acceder al dashboard.
                </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-neon-green transition-colors" />
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 transition-all"
                            placeholder="tu@email.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Contraseña</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-neon-green transition-colors" />
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {error && <p className="text-red-400 text-xs text-center bg-red-900/20 py-2 rounded-lg">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-white text-slate-900 font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                        <>
                            VER MI DASHBOARD <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <p className="text-center text-[10px] text-slate-600 mt-8">
                Encriptación de grado bancario simulada.
            </p>
        </div>
        </motion.div>
    </div>
  );
};

export default AuthForm;