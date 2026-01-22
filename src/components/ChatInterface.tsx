import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, CheckCircle2 } from 'lucide-react';
import { ChatMessage, CollectedData } from '../../types';

interface ChatInterfaceProps {
  onComplete: (data: CollectedData) => void;
  isReturningUser?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onComplete, isReturningUser = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<number>(0);
  const [collectedData, setCollectedData] = useState<CollectedData>({
    type: null,
    amount: null,
    category: null
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isReturningUser) {
      addBotMessage("¡Hola de nuevo! 👋 ¿Qué registramos ahora?", 100);
      setTimeout(() => {
          addBotMessage("Selecciona una opción:", 600, ["Nuevo Gasto", "Nueva Meta"]);
      }, 800);
    } else {
      addBotMessage("¡Hola! Soy FinBot. 🤖 Vamos a organizar tus finanzas.", 100);
      setTimeout(() => {
          addBotMessage("¿Qué deseas registrar hoy?", 1000, ["Registrar Gasto", "Definir Meta"]);
      }, 1500);
    }
  }, [isReturningUser]);

  const addBotMessage = (text: string, delay = 500, options?: string[], cardData?: {label: string, value: string}) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text,
        type: cardData ? 'card' : (options ? 'options' : 'text'),
        options,
        cardData
      }]);
    }, delay);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      text
    }]);
  };

  const handleInput = (text: string) => {
    if (!text.trim()) return;
    addUserMessage(text);
    setInputValue('');
    processFlow(text);
  };

  const processFlow = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (step === 0) {
      if (lowerInput.includes('gasto')) {
        setCollectedData(prev => ({ ...prev, type: 'EXPENSE' }));
        setStep(1);
        addBotMessage("Entendido. ¿De cuánto fue el gasto? (Solo números)");
      } else if (lowerInput.includes('meta')) {
        setCollectedData(prev => ({ ...prev, type: 'GOAL' }));
        setStep(1);
        addBotMessage("¡Excelente! ¿Cuál es tu objetivo mensual?");
      } else {
        addBotMessage("Por favor selecciona una opción.", 500, ["Registrar Gasto", "Definir Meta"]);
      }
      return;
    }

    if (step === 1) {
      const amount = parseFloat(input.replace(/[^0-9.]/g, ''));
      if (isNaN(amount) || amount <= 0) {
        addBotMessage("Número no válido. Intenta de nuevo.");
      } else {
        setCollectedData(prev => ({ ...prev, amount }));
        setStep(2);
        
        const isExpense = collectedData.type === 'EXPENSE';
        const options = isExpense 
            ? ["Comida", "Transporte", "Hogar", "Ocio"] 
            : ["Emergencias", "Viaje", "Inversión", "Auto"];
            
        addBotMessage(
            isExpense ? `Monto: $${amount}. ¿Categoría?` : `Meta: $${amount}. ¿Para qué es?`, 
            800, 
            options
        );
      }
      return;
    }

    if (step === 2) {
      const category = input;
      const finalData = { ...collectedData, category };
      setCollectedData(finalData);
      setStep(3);

      addBotMessage("Guardado:", 500, undefined, {
          label: finalData.type === 'EXPENSE' ? 'Gasto' : 'Meta',
          value: `$${finalData.amount} - ${category}`
      });

      if (isReturningUser) {
        setTimeout(() => {
          addBotMessage("Actualizando tu dashboard...");
          setTimeout(() => {
            onComplete(finalData);
          }, 1500);
        }, 1000);
      } else {
        setTimeout(() => {
            addBotMessage("He creado tu proyección. Crea tu cuenta para ver el análisis completo.");
            setTimeout(() => {
                onComplete(finalData);
            }, 2500);
        }, 1500);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100dvh] w-full md:py-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="flex flex-col h-[100dvh] w-full md:h-[700px] md:w-[420px] bg-slate-900 md:rounded-[2.5rem] md:border md:border-slate-800 md:shadow-2xl overflow-hidden relative"
      >
        {/* Mobile Header / Desktop Status Bar */}
        <div className="p-4 bg-slate-900/90 backdrop-blur z-20 flex items-center justify-between border-b border-slate-800 sticky top-0">
          <div className="flex items-center gap-3 mt-10 md:mt-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-violet to-purple-600 flex items-center justify-center shadow-lg">
                <Bot className="text-white w-5 h-5" />
            </div>
            <div>
                <h3 className="text-white font-bold leading-tight">FinBot AI</h3>
                <p className="text-[10px] text-neon-green uppercase tracking-wider font-semibold">En línea</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'card' ? (
                  <div className="bg-slate-800/80 border border-neon-green/30 p-4 rounded-2xl w-full max-w-[85%] shadow-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-1 text-neon-green text-xs font-bold uppercase tracking-wider">
                          <CheckCircle2 size={14} />
                          {msg.cardData?.label}
                      </div>
                      <div className="text-2xl font-bold text-white tracking-tight">
                          {msg.cardData?.value}
                      </div>
                  </div>
              ) : (
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm md:text-base leading-relaxed ${
                  msg.sender === 'user' 
                      ? 'bg-neon-violet text-white rounded-br-none shadow-lg shadow-neon-violet/20' 
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}>
                  {msg.text}
                  </div>
              )}
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
              </div>
            </div>
          )}
          
          {/* Options Chips */}
          {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].options && (
              <div className="flex flex-wrap gap-2 mt-2">
                  {messages[messages.length - 1].options?.map(opt => (
                      <button
                          key={opt}
                          onClick={() => handleInput(opt)}
                          className="bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-neon-violet text-sm text-slate-200 py-2.5 px-5 rounded-full transition-all active:scale-95"
                      >
                          {opt}
                      </button>
                  ))}
              </div>
          )}
          
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Area - Sticky Bottom */}
        <div className="p-4 bg-slate-900/90 backdrop-blur border-t border-slate-800 sticky bottom-0 z-20 pb-8 md:pb-4">
          <div className="relative flex items-center gap-2">
              <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInput(inputValue)}
                  placeholder="Escribe tu respuesta..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-full py-3.5 px-5 text-white placeholder-slate-500 focus:outline-none focus:border-neon-violet focus:ring-1 focus:ring-neon-violet/50 transition-all text-base"
                  disabled={step === 3}
              />
              <button 
                  onClick={() => handleInput(inputValue)}
                  disabled={!inputValue.trim()}
                  className="p-3.5 bg-neon-violet rounded-full text-white hover:bg-violet-500 disabled:opacity-50 disabled:hover:bg-neon-violet transition-colors shadow-lg shadow-neon-violet/20"
              >
                  <Send size={20} />
              </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatInterface;