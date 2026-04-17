import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  X, 
  Bot, 
  User, 
  Smartphone, 
  CreditCard, 
  ShieldAlert,
  Loader2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';
import { useCustomer } from '../context/CustomerContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatAssistant({ isOpen, onClose }: ChatAssistantProps) {
  const { currentCustomer } = useCustomer();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello ${currentCustomer.name}! I'm your TelcoConnect Business Assistant. How can I help you manage ${currentCustomer.companyName}'s account today? I can help with line management, billing inquiries, or plan upgrades.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemPrompt = `You are a helpful and professional business assistant for TelcoConnect, a telecommunications provider. 
      You are helping ${currentCustomer.name} from ${currentCustomer.companyName}.
      Context:
      - Customer Tier: ${currentCustomer.tier}
      - Total Lines: ${currentCustomer.totalLines}
      - Industry: ${currentCustomer.industry}
      - Account ID: ${currentCustomer.id}
      
      Capabilities:
      - Answer billing questions
      - Suggest plan upgrades
      - Help with line management (adding lines, changing devices)
      - Provide data usage insights
      
      Always be polite, concise, and professional. Use a business-friendly tone. 
      If asked to perform an action (like adding a line), explain that you can guide them through the process or initiate the request for their account manager.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: systemPrompt,
        }
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || 'I apologize, I encountered an issue processing that. How else can I help?',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I apologize, there was a connection issue with our AI services. Please try again or contact your account manager directly.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { label: 'Check usage', icon: Smartphone },
    { label: 'Billing question', icon: CreditCard },
    { label: 'Upgrade plan', icon: Sparkles },
    { label: 'Report issue', icon: ShieldAlert },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]"
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            className="fixed bottom-8 right-8 w-full max-w-[440px] h-[700px] bg-white rounded-lg shadow-2xl z-[70] flex flex-col overflow-hidden border border-border-main"
          >
            {/* Header */}
            <div className="p-5 bg-text-main text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold">Business Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#6c757d]">Connected</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#f8f9fa] no-scrollbar"
            >
              {messages.map((m) => (
                <div 
                  key={m.id}
                  className={cn(
                    "flex flex-col max-w-[90%]",
                    m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "px-4 py-3 rounded-lg text-[13px] leading-relaxed shadow-sm",
                    m.role === 'user' 
                      ? "bg-primary text-white rounded-tr-none font-medium" 
                      : "bg-white text-text-main rounded-tl-none border border-border-main"
                  )}>
                    {m.content}
                  </div>
                  <span className="mt-2 text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-text-muted font-bold text-[10px] uppercase tracking-widest px-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Analyzing response...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-border-main">
              <div className="flex overflow-x-auto gap-2 mb-4 no-scrollbar">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(s.label)}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-white border border-border-main rounded-md text-[11px] font-bold text-text-muted hover:border-primary/50 hover:text-primary transition-all"
                  >
                    <s.icon className="w-3 h-3" />
                    {s.label}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a technical or billing question..."
                  className="w-full pl-4 pr-12 py-3 bg-[#f1f3f5] border border-border-main rounded-md text-[13px] font-medium outline-none focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary text-white rounded-md flex items-center justify-center hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
