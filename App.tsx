import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Landing from './src/components/Landing';
import ChatInterface from './src/components/ChatInterface';
import AuthForm from './src/components/AuthForm';
import Dashboard from './src/components/Dashboard';

import { AppView, CollectedData, UserProfile } from './types';
import { saveOnboardingData } from './src/services/supabaseClient';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  
  const [collectedData, setCollectedData] = useState<CollectedData>({
    type: null,
    amount: null,
    category: null
  });
  
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleStart = () => {
    setCurrentView(AppView.CHAT);
  };

  const handleChatComplete = async (data: CollectedData) => {
    setCollectedData(data);
    
    // If user is already logged in, save and go straight to Dashboard (Loop)
    if (user) {
      await saveOnboardingData(user.id, data);
      setCurrentView(AppView.DASHBOARD);
    } else {
      // First time flow: Go to Auth
      setCurrentView(AppView.AUTH);
    }
  };

  const handleAuthSuccess = async (email: string) => {
    const newUser = { id: Date.now().toString(), email };
    setUser(newUser);
    await saveOnboardingData(newUser.id, collectedData);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleAddMore = () => {
    setCurrentView(AppView.CHAT);
  };

  const handleLogout = () => {
    setUser(null);
    setCollectedData({ type: null, amount: null, category: null });
    setCurrentView(AppView.LANDING);
  };

  return (
    <div className="w-full min-h-[100dvh] bg-slate-950 text-slate-100 font-sans overflow-hidden relative selection:bg-neon-green/30 flex flex-col">
      {/* Global Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
      
      {/* Header - Absolute on mobile to overlay, fixed/relative on desktop */}
      <header className="absolute top-0 left-0 w-full p-6 z-30 pointer-events-none">
          <div className="font-bold text-xl tracking-wider text-white select-none flex items-center gap-1 pointer-events-auto w-fit">
              NEON<span className="text-neon-green">FINANCE</span>
              <span className="text-[10px] bg-slate-800/80 backdrop-blur px-1.5 py-0.5 rounded text-slate-400 ml-2 border border-slate-700">BETA</span>
          </div>
      </header>

      <main className="flex-1 w-full h-full relative z-10 flex flex-col">
          <AnimatePresence mode="wait">
              {currentView === AppView.LANDING && (
                  <Landing key="landing" onStart={handleStart} />
              )}
              
              {currentView === AppView.CHAT && (
                  <ChatInterface 
                    key="chat" 
                    onComplete={handleChatComplete} 
                    isReturningUser={!!user}
                  />
              )}
              
              {currentView === AppView.AUTH && (
                  <AuthForm 
                      key="auth" 
                      onSuccess={handleAuthSuccess} 
                      dataSummary={{ amount: collectedData.amount, category: collectedData.category }} 
                  />
              )}
              
              {currentView === AppView.DASHBOARD && user && (
                  <Dashboard 
                      key="dashboard" 
                      data={collectedData} 
                      user={user} 
                      onAddMore={handleAddMore}
                      onLogout={handleLogout}
                  />
              )}
          </AnimatePresence>
      </main>
    </div>
  );
};

export default App;