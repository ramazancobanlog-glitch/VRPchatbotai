
import React from 'react';
import { ChatThread, UserProfile } from '../types';
import { Plus, MessageSquare, Trash2, PanelLeftClose, PanelLeftOpen, Sparkles } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
  onNewThread: () => void;
  onDeleteThread: (id: string) => void;
  onToggle: () => void;
  profile: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  threads,
  activeThreadId,
  onSelectThread,
  onNewThread,
  onDeleteThread,
  onToggle,
  profile
}) => {
  if (!isOpen) {
    return (
      <div className="p-4 border-r border-white/5 bg-[#030014]/80 backdrop-blur-xl flex flex-col items-center gap-4">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-white/5 rounded-xl transition-all text-zinc-400 hover:text-white"
        >
          <PanelLeftOpen size={20} />
        </button>
        <button
          onClick={onNewThread}
          className="p-2 hover:bg-white/5 rounded-xl transition-all text-zinc-400 hover:text-white"
        >
          <Plus size={20} />
        </button>
      </div>
    );
  }

  return (
    <aside className="w-72 bg-[#030014]/80 backdrop-blur-xl border-r border-white/5 flex flex-col h-full transition-all duration-300">
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg gradient-text">VeriPlus</span>
        </div>
        <button
          onClick={onToggle}
          className="p-1.5 hover:bg-white/5 rounded-lg transition-all text-zinc-400"
        >
          <PanelLeftClose size={18} />
        </button>
      </div>

      <div className="p-3">
        <button
          onClick={onNewThread}
          className="w-full flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all font-semibold text-sm shadow-lg shadow-purple-500/20 text-white"
        >
          <Plus size={18} />
          Yeni Sohbet
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {threads.map(thread => (
          <div
            key={thread.id}
            className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${activeThreadId === thread.id
                ? 'bg-white/10 text-white shadow-lg border border-white/10'
                : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
              }`}
            onClick={() => onSelectThread(thread.id)}
          >
            <MessageSquare size={16} className="shrink-0" />
            <span className="truncate text-sm font-medium pr-8">{thread.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteThread(thread.id);
              }}
              className="absolute right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-red-400 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {threads.length === 0 && (
          <div className="text-center py-10 px-4">
            <p className="text-xs text-zinc-500 italic">Henüz sohbet geçmişi yok</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-2 glass rounded-xl">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
            {profile.name ? profile.name[0].toUpperCase() : 'K'}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-zinc-100">{profile.name || 'Kullanıcı'}</span>
            <span className="text-[10px] text-zinc-500">Ücretsiz Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
