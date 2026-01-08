
import React, { useRef, useEffect } from 'react';
import { ChatThread } from '../types';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Sparkles, Code, Lightbulb, FileText, Compass } from 'lucide-react';

interface ChatContainerProps {
  thread: ChatThread | null;
  onSendMessage: (text: string, images?: { data: string; mimeType: string }[]) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ thread, onSendMessage }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thread?.messages]);

  const suggestions = [
    { icon: <Code size={18} />, text: "Python ile web scraping örneği yaz" },
    { icon: <Lightbulb size={18} />, text: "Kuantum bilgisayarları basitçe açıkla" },
    { icon: <FileText size={18} />, text: "İş başvurusu için özgeçmiş hazırla" },
    { icon: <Compass size={18} />, text: "İstanbul'da 3 günlük gezi planı yap" }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#030014]">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-8 md:px-0"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          {thread ? (
            <MessageList messages={thread.messages} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center pt-16 space-y-8">
              {/* Logo */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/40 to-fuchsia-600/40 blur-3xl rounded-full" />
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-purple-500/30 float">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Welcome Text */}
              <div className="text-center space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-white">Merhaba, </span>
                  <span className="gradient-text">nasıl yardımcı olabilirim?</span>
                </h2>
                <p className="text-zinc-400 max-w-md mx-auto text-sm md:text-base">
                  VeriPlus ile kodlama, yazı yazma, analiz ve daha fazlasında size yardımcı olabilirim.
                </p>
              </div>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl mt-4">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSendMessage(suggestion.text)}
                    className="group flex items-center gap-3 p-4 text-left text-sm glass rounded-2xl hover:bg-white/10 transition-all border border-white/5 hover:border-purple-500/30"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                      {suggestion.icon}
                    </div>
                    <span className="text-zinc-300 group-hover:text-white transition-colors line-clamp-2">
                      {suggestion.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 md:p-6 bg-gradient-to-t from-[#030014] via-[#030014]/95 to-transparent">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSendMessage={onSendMessage} />
          <p className="mt-3 text-[10px] text-center text-zinc-500">
            VeriPlus hatalı bilgi üretebilir. Önemli konularda yanıtları doğrulamanızı öneririz.
          </p>
        </div>
      </div>
    </div>
  );
};
