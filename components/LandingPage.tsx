
import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Brain, Shield, ArrowRight, MessageSquare, Star, ChevronDown } from 'lucide-react';

interface LandingPageProps {
    onStartChat: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: "Gelişmiş Yapay Zeka",
            description: "En son teknoloji AI modelleri ile güçlendirilmiş akıllı yanıtlar"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Ultra Hızlı",
            description: "Milisaniyeler içinde yanıt veren optimize edilmiş altyapı"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Güvenli & Gizli",
            description: "Verileriniz şifrelenir ve asla üçüncü taraflarla paylaşılmaz"
        },
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Doğal Konuşma",
            description: "İnsan gibi anlayan ve yanıt veren gelişmiş dil modeli"
        }
    ];

    const stats = [
        { value: "10M+", label: "Mesaj İşlendi" },
        { value: "99.9%", label: "Uptime" },
        { value: "<100ms", label: "Yanıt Süresi" },
        { value: "50+", label: "Dil Desteği" }
    ];

    return (
        <div className="min-h-screen overflow-hidden relative">
            {/* Animated Background Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 15}s`,
                            animationDuration: `${15 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            {/* Aurora Effect */}
            <div className="aurora fixed inset-0 pointer-events-none opacity-60" />

            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 glass transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center glow-purple">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text">VeriPlus</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Özellikler</a>
                        <a href="#stats" className="text-sm text-zinc-400 hover:text-white transition-colors">İstatistikler</a>
                        <a href="#demo" className="text-sm text-zinc-400 hover:text-white transition-colors">Demo</a>
                    </div>

                    <button
                        onClick={onStartChat}
                        className="btn-glow px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-sm font-semibold text-white ripple"
                    >
                        Başla
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
                <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-zinc-300">Yeni Nesil AI Deneyimi</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                        <span className="text-white">Yapay Zeka ile</span>
                        <br />
                        <span className="gradient-text text-glow">Sınırsız Potansiyel</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        VeriPlus, en gelişmiş yapay zeka teknolojisini kullanarak sorularınızı yanıtlar,
                        içerik üretir ve size yardımcı olur. <span className="text-purple-400 font-medium">7/24 yanınızda.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <button
                            onClick={onStartChat}
                            className="btn-glow group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl text-lg font-bold text-white shadow-2xl ripple"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Hemen Sohbet Et
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <a
                            href="#features"
                            className="flex items-center gap-2 px-8 py-4 glass rounded-2xl text-zinc-300 hover:text-white transition-colors"
                        >
                            Daha Fazla Bilgi
                            <ChevronDown className="w-4 h-4 animate-bounce" />
                        </a>
                    </div>

                    {/* Hero Visual */}
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 blur-3xl rounded-full" />
                        <div className="relative glass-strong rounded-3xl p-6 md:p-8 border-gradient float">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-4 text-xs text-zinc-500">VeriPlus Chat</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                                        <span className="text-xs">👤</span>
                                    </div>
                                    <div className="flex-1 bg-zinc-800/50 rounded-2xl rounded-tl-sm px-4 py-3">
                                        <p className="text-sm text-zinc-200">Python ile web scraping nasıl yapılır?</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center glow-purple">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-2xl rounded-tl-sm px-4 py-3 border border-purple-500/20">
                                        <p className="text-sm text-zinc-200">Harika bir soru! Python ile web scraping için BeautifulSoup ve Requests kütüphanelerini kullanabilirsiniz. İşte basit bir örnek...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            <span className="gradient-text">Neden VeriPlus?</span>
                        </h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            En son teknolojilerle donatılmış, kullanıcı odaklı tasarlanmış yapay zeka asistanı
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="card-3d glass rounded-2xl p-6 cursor-pointer group"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="relative py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="glass-strong rounded-3xl p-8 md:p-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="text-3xl md:text-4xl font-black gradient-text">{stat.value}</div>
                                    <div className="text-sm text-zinc-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="demo" className="relative py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 blur-3xl rounded-full" />
                        <div className="relative">
                            <h2 className="text-4xl md:text-6xl font-black mb-6">
                                <span className="text-white">Hemen</span>{' '}
                                <span className="gradient-text">Başla</span>
                            </h2>
                            <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
                                Ücretsiz olarak VeriPlus'ın gücünü keşfedin. Kayıt gerektirmez, hemen sohbet etmeye başlayın.
                            </p>
                            <button
                                onClick={onStartChat}
                                className="btn-glow group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl text-xl font-bold text-white shadow-2xl ripple"
                            >
                                <Sparkles className="w-6 h-6" />
                                VeriPlus'a Sor
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-12 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold gradient-text">VeriPlus</span>
                    </div>
                    <p className="text-sm text-zinc-500">
                        © 2026 VeriPlus. Tüm hakları saklıdır.
                    </p>
                </div>
            </footer>
        </div>
    );
};
