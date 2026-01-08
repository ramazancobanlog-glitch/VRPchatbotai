
import React, { useState, useRef, useEffect } from 'react';
import { ChatThread, GeminiModel, UserProfile } from '../types';
import { Settings, Info, Share2, ChevronDown, Menu, Sparkles, Zap, Brain, Bot, Rocket, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeThread: ChatThread | null;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  profile: UserProfile;
}

const MODEL_DETAILS: Record<string, { label: string; icon: any; color: string; desc: string; category: string }> = {
  [GeminiModel.GEMINI_3_PRO]: { label: 'Gemini 3 Pro', icon: <Brain size={14} />, color: 'from-violet-500 to-fuchsia-500', desc: 'En akıllı ve gelişmiş model', category: 'Gemini 3' },
  [GeminiModel.GEMINI_3_FLASH]: { label: 'Gemini 3 Flash', icon: <Zap size={14} />, color: 'from-blue-500 to-cyan-500', desc: 'Hızlı ve hafif işlemler için', category: 'Gemini 3' },
  [GeminiModel.GEMINI_2_5_PRO]: { label: 'Gemini 2.5 Pro', icon: <ShieldCheck size={14} />, color: 'from-amber-500 to-orange-500', desc: 'Dengeli ve güvenilir zekâ', category: 'Gemini 2.5' },
  [GeminiModel.GEMINI_2_5_FLASH]: { label: 'Gemini 2.5 Flash', icon: <Rocket size={14} />, color: 'from-indigo-500 to-blue-500', desc: 'Seri ve verimli yanıtlar', category: 'Gemini 2.5' },
  [GeminiModel.GEMINI_2_0_FLASH]: { label: 'Gemini 2.0 Flash', icon: <Zap size={14} />, color: 'from-emerald-500 to-teal-500', desc: 'Geleneksel hız performansı', category: 'Gemini 2.0' },
  [GeminiModel.GEMMA_3_27B]: { label: 'Gemma 3 27B', icon: <Bot size={14} />, color: 'from-rose-500 to-pink-500', desc: 'Büyük ölçekli açık model', category: 'Gemma 3' },
  [GeminiModel.GEMMA_3_12B]: { label: 'Gemma 3 12B', icon: <Bot size={14} />, color: 'from-purple-500 to-indigo-500', desc: 'Optimize edilmiş zekâ', category: 'Gemma 3' },
  [GeminiModel.GEMMA_3_4B]: { label: 'Gemma 3 4B', icon: <Bot size={14} />, color: 'from-zinc-500 to-slate-500', desc: 'Ultra hafif ve hızlı', category: 'Gemma 3' },
};

export const Header: React.FC<HeaderProps> = ({
  activeThread,
  isSidebarOpen,
  onToggleSidebar,
  selectedModel,
  onModelChange,
  profile
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentModel = MODEL_DETAILS[selectedModel] || {
    label: 'Model Seç',
    icon: <Sparkles size={14} />,
    color: 'from-violet-500 to-purple-600',
    desc: '',
    category: ''
  };

  const categories = Array.from(new Set(Object.values(MODEL_DETAILS).map(m => m.category)));

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-white/5 sticky top-0 bg-[#030014]/80 backdrop-blur-xl z-10 w-full">
      <div className="flex items-center gap-3">
        {!isSidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-white/5 rounded-xl transition-all text-zinc-400 hover:text-white"
          >
            <Menu size={20} />
          </button>
        )}

        <div className="relative" ref={menuRef}>
          <div className="flex flex-col items-start cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="flex items-center gap-2 group p-1.5 px-3 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">
              <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${currentModel.color} flex items-center justify-center shadow-lg shadow-black/20`}>
                <div className="text-white scale-75">{currentModel.icon}</div>
              </div>
              <span className="text-xs font-semibold text-zinc-200">
                {currentModel.label}
              </span>
              <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </div>
            {profile.name && (
              <span className="text-[10px] text-zinc-400 px-3 font-medium">Merhaba, {profile.name}</span>
            )}
          </div>

          {isMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 max-h-[80vh] overflow-y-auto bg-[#0b0b14] border border-white/10 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2">
              {categories.map(category => (
                <div key={category} className="mb-2 last:mb-0">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    {category}
                  </div>
                  <div className="space-y-1">
                    {Object.entries(MODEL_DETAILS)
                      .filter(([_, details]) => details.category === category)
                      .map(([id, details]) => (
                        <button
                          key={id}
                          onClick={() => {
                            onModelChange(id);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all text-left ${selectedModel === id
                              ? 'bg-white/10 border border-white/10'
                              : 'hover:bg-white/5 border border-transparent'
                            }`}
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${details.color} flex items-center justify-center shrink-0`}>
                            <div className="text-white">{details.icon}</div>
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${selectedModel === id ? 'text-white' : 'text-zinc-300'}`}>
                                {details.label}
                              </span>
                              {selectedModel === id && <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
                            </div>
                            <span className="text-[10px] text-zinc-500 truncate">{details.desc}</span>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden md:flex items-center gap-2 p-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Share2 size={18} />
        </button>
        <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Settings size={18} />
        </button>
        <button className="hidden md:flex items-center gap-2 p-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Info size={18} />
        </button>
      </div>
    </header>
  );
};
