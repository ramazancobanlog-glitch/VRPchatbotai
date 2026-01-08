
import React from 'react';
import { ChatThread, GeminiModel, UserProfile } from '../types';
import { Settings, Info, Share2, ChevronDown, Menu, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeThread: ChatThread | null;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  profile: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  activeThread,
  isSidebarOpen,
  onToggleSidebar,
  selectedModel,
  onModelChange,
  profile
}) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-white/5 sticky top-0 bg-[#030014]/80 backdrop-blur-xl z-10">
      <div className="flex items-center gap-3">
        {!isSidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-white/5 rounded-xl transition-all text-zinc-400 hover:text-white"
          >
            <Menu size={20} />
          </button>
        )}

        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 group cursor-pointer p-1.5 px-3 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10 relative">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles size={10} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-zinc-200">
              {selectedModel === GeminiModel.FLASH ? 'VeriPlus Hızlı' : 'VeriPlus Pro'}
            </span>
            <select
              className="absolute opacity-0 cursor-pointer w-full inset-0"
              value={selectedModel}
              onChange={(e) => onModelChange(e.target.value)}
            >
              <option value={GeminiModel.FLASH}>VeriPlus Hızlı</option>
              <option value={GeminiModel.PRO}>VeriPlus Pro (Akıllı)</option>
            </select>
            <ChevronDown size={12} className="text-zinc-500" />
          </div>
          {profile.name && (
            <span className="text-[10px] text-zinc-400 px-3 font-medium">Merhaba, {profile.name}</span>
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
