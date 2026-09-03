import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Star, 
  Film, 
  BarChart3, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Heart 
} from 'lucide-react';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const triggerDownload = () => {
    setDownloadStarted(true);
    const link = document.createElement('a');
    link.href = '/downloads/dayboxd-app.apk';
    link.download = 'dayboxd-app.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadStarted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary font-sans antialiased selection:bg-[#00e054] selection:text-black transition-colors duration-200">
      {/* Minimal Header */}
      <header className="w-full border-b border-theme-subtle bg-theme-primary/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img 
              src="/app-icon.png" 
              alt="Dayboxd Logo" 
              className="w-9 h-9 object-contain" 
            />
            <span className="font-bold tracking-tight text-lg text-theme-primary">
              Dayboxd
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-theme-subtle bg-theme-surface hover:border-theme-strong text-theme-secondary hover:text-theme-primary transition-all active:scale-95 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Editorial Light' : 'Cinema Dark'}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#ffcc00]" />
              ) : (
                <Moon className="w-4 h-4 text-theme-primary" />
              )}
            </button>

            <button
              onClick={triggerDownload}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00e054] hover:bg-[#00c048] text-black font-semibold text-xs tracking-wide transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{downloadStarted ? 'Downloading...' : 'Get APK'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-28 pb-24 px-6 text-center max-w-4xl mx-auto">
        <div className="text-xs sm:text-sm font-mono font-bold tracking-[4px] text-theme-muted uppercase mb-10">
          Personal Cinema
        </div>

        {/* Clean Borderless Icon */}
        <div className="flex justify-center mb-10">
          <img 
            src="/app-icon.png" 
            alt="Dayboxd" 
            className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]" 
          />
        </div>

        {/* Larger Hero Heading */}
        <h1 className="text-5xl sm:text-7xl font-semibold leading-[1.12] tracking-[-1.5px] text-theme-primary mb-8">
          Every day, <span className="text-[#00e054]">a feature film</span>
        </h1>

        {/* 2-Liner Content About the App */}
        <div className="text-lg sm:text-2xl text-theme-secondary font-normal leading-relaxed max-w-2xl mx-auto mb-12 space-y-2">
          <p>
            Treat every day like a feature film—rate your day in half-stars, log memorable quotes, and collect cinematic posters.
          </p>
          <p className="text-base sm:text-lg text-theme-muted">
            An offline-first personal sanctuary designed to turn everyday life into a timeless visual archive.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={triggerDownload}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-9 py-4 rounded-xl bg-[#00e054] hover:bg-[#00c048] text-black font-semibold text-base tracking-wide transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>{downloadStarted ? 'Downloading APK...' : 'Download for Android'}</span>
            <span className="text-xs opacity-75 font-mono ml-1">1.6 MB</span>
          </button>
        </div>
      </section>

      {/* How it Works Section (2-Column Grid) */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-theme-subtle">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-theme-primary mb-10 leading-snug">
              How it works
            </h2>

            <div className="space-y-9 text-theme-secondary">
              <div className="space-y-2">
                <div className="text-lg sm:text-xl font-semibold text-theme-primary">
                  1. Rate your day
                </div>
                <p className="text-base text-theme-muted leading-relaxed">
                  0.5–5 stars with a personal moment and dialogue quote.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-lg sm:text-xl font-semibold text-theme-primary">
                  2. Collect posters
                </div>
                <p className="text-base text-theme-muted leading-relaxed">
                  Cinematic 2:3 vertical cards for each day with curated fallback aesthetics.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-lg sm:text-xl font-semibold text-theme-primary">
                  3. View your archive
                </div>
                <p className="text-base text-theme-muted leading-relaxed">
                  Browse your year through an iconic film wall and Top 4 pinned pinboard.
                </p>
              </div>
            </div>
          </div>

          {/* Minimalist App Preview Card */}
          <div className="bg-theme-surface rounded-3xl border border-theme-subtle p-8 sm:p-10 flex items-center justify-center shadow-sm">
            <div className="w-60 aspect-[2/3] rounded-2xl overflow-hidden border border-theme-strong bg-[#14181c] shadow-2xl flex flex-col justify-between p-5 text-white">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase font-semibold">
                  TODAY
                </span>
                <Heart className="w-4 h-4 fill-[#ff6060] text-[#ff6060]" />
              </div>

              <div className="text-center space-y-2 py-4">
                <div className="w-11 h-11 mx-auto rounded-full bg-[#00e054]/10 border border-[#00e054]/30 flex items-center justify-center">
                  <Film className="w-5 h-5 text-[#00e054]" />
                </div>
                <p className="text-xs font-serif italic text-white/90 line-clamp-2 px-1">
                  &ldquo;A quiet afternoon coffee, watching the rain.&rdquo;
                </p>
              </div>

              <div className="border-t border-white/10 pt-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>The Sunday Reset</span>
                  <span className="text-[#00e054]">★★★★½</span>
                </div>
                <div className="text-[10px] font-mono text-white/40">3 SCENES • COZY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for Cinephiles (3-Column Clean Grid) */}
      <section className="py-24 px-6 bg-theme-surface border-y border-theme-subtle">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-theme-primary mb-16 tracking-tight">
            Designed for cinephiles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-14">
            <div className="space-y-3.5">
              <div className="w-9 h-9 rounded-xl bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <h3 className="text-lg font-semibold text-theme-primary">
                Rate & reflect
              </h3>
              <p className="text-base text-theme-secondary leading-relaxed">
                Track your year in half-star increments with a single memorable quote.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="w-9 h-9 rounded-xl bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <Film className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-theme-primary">
                Poster gallery
              </h3>
              <p className="text-base text-theme-secondary leading-relaxed">
                Cinematic vertical posters. Curated day-of-week graphics or custom camera photos.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="w-9 h-9 rounded-xl bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-theme-primary">
                Pro analytics
              </h3>
              <p className="text-base text-theme-secondary leading-relaxed">
                Native SVG rating histograms, monthly heatmaps, and streak tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy First Section */}
      <section className="py-24 px-6 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-theme-surface border border-theme-subtle flex items-center justify-center text-[#00e054]">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold text-theme-primary tracking-tight">
          Privacy first
        </h2>

        <p className="text-base sm:text-lg text-theme-secondary leading-relaxed">
          Your entries stay encrypted on-device. Zero cloud accounts, zero tracking. Only you see your cinema.
        </p>

        <div className="pt-3">
          <button
            onClick={triggerDownload}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#00e054] hover:bg-[#00c048] text-black font-semibold text-sm transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Download APK (1.6 MB)</span>
          </button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 px-6 text-center text-sm text-theme-muted border-t border-theme-subtle max-w-5xl mx-auto">
        <div>© {new Date().getFullYear()} Dayboxd. Made for your life story.</div>
      </footer>
    </div>
  );
};
