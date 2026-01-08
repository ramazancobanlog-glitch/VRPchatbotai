
import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, X, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string, images?: { data: string; mimeType: string }[]) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<{ data: string; mimeType: string; preview: string }[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (text.trim() || attachments.length > 0) {
      onSendMessage(text, attachments.map(a => ({ data: a.data, mimeType: a.mimeType })));
      setText('');
      setAttachments([]);
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileList = Array.from(files) as File[];
    for (const file of fileList) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          const base64Data = result.split(',')[1];
          setAttachments(prev => [...prev, {
            data: base64Data,
            mimeType: file.type,
            preview: result
          }]);
        };
        reader.readAsDataURL(file);
      }
    }
    e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

      <div className="relative glass-strong rounded-2xl shadow-2xl focus-within:border-purple-500/30 transition-all overflow-hidden p-1 input-glow">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 border-b border-white/5">
            {attachments.map((att, idx) => (
              <div key={idx} className="relative group/att">
                <img
                  src={att.preview}
                  className="w-16 h-16 object-cover rounded-xl border border-white/10 shadow-lg"
                  alt="Upload preview"
                />
                <button
                  onClick={() => removeAttachment(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover/att:opacity-100 transition-opacity shadow-lg"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-end gap-2 p-2 px-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept="image/*"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 text-zinc-400 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all"
          >
            <ImageIcon size={20} />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="VeriPlus'a mesaj yaz..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-zinc-100 placeholder-zinc-500 py-2.5 resize-none max-h-[200px] outline-none"
          />

          <button
            type="submit"
            disabled={!text.trim() && attachments.length === 0}
            className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${text.trim() || attachments.length > 0
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-purple-500/20'
                : 'bg-white/5 text-zinc-500 cursor-not-allowed'
              }`}
          >
            {text.trim() || attachments.length > 0 ? <Sparkles size={18} /> : <Send size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};
