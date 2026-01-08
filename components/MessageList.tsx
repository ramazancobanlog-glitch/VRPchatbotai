
import React from 'react';
import { Message } from '../types';
import { User, Sparkles, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col gap-8">
      {messages.map((msg, idx) => (
        <div
          key={msg.id}
          className={`group flex gap-4 md:gap-5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {msg.role === 'assistant' && (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20 mt-1">
              <Sparkles size={16} className="text-white" />
            </div>
          )}

          <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            {msg.parts?.some(p => p.inlineData) && (
              <div className="flex flex-wrap gap-2 mb-2">
                {msg.parts.filter(p => p.inlineData).map((p, i) => (
                  <img
                    key={i}
                    src={`data:${p.inlineData?.mimeType};base64,${p.inlineData?.data}`}
                    alt="Uploaded content"
                    className="max-w-xs rounded-xl border border-white/10 shadow-lg"
                  />
                ))}
              </div>
            )}

            <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                ? 'bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-white shadow-lg shadow-purple-500/10 border border-purple-500/20'
                : 'text-zinc-200 glass'
              }`}>
              <div className="whitespace-pre-wrap">
                {msg.content || (msg.role === 'assistant' && !msg.isError ? (
                  <div className="flex gap-1.5 items-center py-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  </div>
                ) : null)}
              </div>
            </div>

            {msg.role === 'assistant' && msg.content && (
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => copyToClipboard(msg.content)}
                  className="p-1.5 hover:bg-white/5 rounded-lg transition-all text-zinc-500 hover:text-purple-400"
                  title="Kopyala"
                >
                  <Copy size={14} />
                </button>
                <button className="p-1.5 hover:bg-white/5 rounded-lg transition-all text-zinc-500 hover:text-green-400" title="Beğen">
                  <ThumbsUp size={14} />
                </button>
                <button className="p-1.5 hover:bg-white/5 rounded-lg transition-all text-zinc-500 hover:text-red-400" title="Beğenme">
                  <ThumbsDown size={14} />
                </button>
              </div>
            )}
          </div>

          {msg.role === 'user' && (
            <div className="w-9 h-9 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center shrink-0 shadow-lg mt-1">
              <User size={16} className="text-zinc-400" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
