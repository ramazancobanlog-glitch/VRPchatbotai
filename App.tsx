
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatContainer } from './components/ChatContainer';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { ChatThread, Message, GeminiModel, UserProfile } from './types';
import { geminiService } from './services/geminiService';

const STORAGE_KEY = 'veriplus_chat_threads';
const PROFILE_KEY = 'veriplus_user_profile';
const LANDING_KEY = 'veriplus_has_visited';

const App: React.FC = () => {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState<string>(GeminiModel.FLASH);
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: null, preferences: null });
  const [showLanding, setShowLanding] = useState(true);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedThreads = localStorage.getItem(STORAGE_KEY);
    const savedProfile = localStorage.getItem(PROFILE_KEY);
    const hasVisited = localStorage.getItem(LANDING_KEY);

    if (hasVisited === 'true') {
      setShowLanding(false);
    }

    if (savedThreads) {
      try {
        const parsed = JSON.parse(savedThreads);
        setThreads(parsed);
        if (parsed.length > 0) setActiveThreadId(parsed[0].id);
      } catch (e) { console.error("Failed to parse saved threads", e); }
    }

    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (e) { console.error("Failed to parse profile", e); }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (threads.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(userProfile));
  }, [userProfile]);

  const handleStartChat = () => {
    setShowLanding(false);
    localStorage.setItem(LANDING_KEY, 'true');
  };

  const activeThread = threads.find(t => t.id === activeThreadId) || null;

  const createNewThread = useCallback(() => {
    const newThread: ChatThread = {
      id: crypto.randomUUID(),
      title: 'Yeni Sohbet',
      messages: [],
      model: selectedModel,
      createdAt: Date.now()
    };
    setThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newThread.id);
  }, [selectedModel]);

  const deleteThread = useCallback((id: string) => {
    setThreads(prev => {
      const filtered = prev.filter(t => t.id !== id);
      if (activeThreadId === id) setActiveThreadId(filtered.length > 0 ? filtered[0].id : null);
      return filtered;
    });
  }, [activeThreadId]);

  const addMessageToThread = useCallback((threadId: string, message: Message) => {
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) return { ...t, messages: [...t.messages, message] };
      return t;
    }));
  }, []);

  const updateLastMessageContent = useCallback((threadId: string, content: string) => {
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        const messages = [...t.messages];
        if (messages.length > 0) messages[messages.length - 1] = { ...messages[messages.length - 1], content };
        return { ...t, messages };
      }
      return t;
    }));
  }, []);

  const handleSendMessage = async (text: string, images?: { data: string; mimeType: string }[]) => {
    let currentThread = activeThread;
    if (!currentThread) {
      const newThread: ChatThread = {
        id: crypto.randomUUID(),
        title: 'Yeni Sohbet',
        messages: [],
        model: selectedModel,
        createdAt: Date.now()
      };
      setThreads(prev => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
      currentThread = newThread;
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      parts: [
        { text },
        ...(images?.map(img => ({ inlineData: { data: img.data, mimeType: img.mimeType } })) || [])
      ]
    };

    addMessageToThread(currentThread.id, userMsg);

    if (currentThread.messages.length === 0) {
      geminiService.generateTitle(text).then(title => {
        setThreads(prev => prev.map(t => t.id === currentThread!.id ? { ...t, title } : t));
      });
    }

    const assistantMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: '', timestamp: Date.now() };
    addMessageToThread(currentThread.id, assistantMsg);

    try {
      let fullText = "";
      const stream = geminiService.streamChat(
        selectedModel,
        currentThread.messages,
        text,
        userProfile,
        images
      );

      for await (const chunk of stream) {
        fullText += chunk;
        updateLastMessageContent(currentThread.id, fullText);
      }

      // Background Memory Update
      const updatedMessages = [...currentThread.messages, userMsg, { ...assistantMsg, content: fullText }];
      geminiService.updateMemory(updatedMessages, userProfile).then(newProfile => {
        if (JSON.stringify(newProfile) !== JSON.stringify(userProfile)) {
          setUserProfile(newProfile);
        }
      });

    } catch (error) {
      updateLastMessageContent(currentThread.id, "Üzgünüm, isteğinizi işlerken bir hata oluştu.");
    }
  };

  // Show Landing Page
  if (showLanding) {
    return <LandingPage onStartChat={handleStartChat} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#030014] text-[#fafafa] overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={setActiveThreadId}
        onNewThread={createNewThread}
        onDeleteThread={deleteThread}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        profile={userProfile}
      />

      <main className="flex-1 flex flex-col relative h-full">
        <Header
          activeThread={activeThread}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          profile={userProfile}
        />

        <ChatContainer
          thread={activeThread}
          onSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
};

export default App;
