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
import { Analytics } from '@vercel/analytics/react';
import { track } from '@vercel/analytics';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      track('theme_toggle', { to: nextTheme });
    } catch {
      // Ignore if analytics is blocked
    }
  };

  const triggerDownload = (location: string = 'hero') => {
    setDownloadStarted(true);

    try {
      track('apk_download', {
        source: location,
        version: '1.0.0',
        platform: 'android'
      });
    } catch {
      // Ignore if analytics is blocked
    }

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
      {/* Vercel Web Analytics Tracker */}
      <Analytics />

      {/* Minimal Condensed Header */}
      <header className="w-full border-b border-theme-subtle bg-theme-primary/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src="/app-icon.png" 
              alt="Dayboxd Logo" 
              className="w-7 h-7 object-contain" 
            />
            <span className="font-bold tracking-tight text-base text-theme-primary">
              Dayboxd
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-theme-subtle bg-theme-surface hover:border-theme-strong text-theme-secondary hover:text-theme-primary transition-all active:scale-95 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Editorial Light' : 'Cinema Dark'}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[#ffcc00]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-theme-primary" />
              )}
            </button>

            <button
              onClick={() => triggerDownload('header_button')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00e054] hover:bg-[#00c048] text-black font-semibold text-xs tracking-wide transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <Download className="w-3 h-3 stroke-[2.5]" />
              <span>{downloadStarted ? 'Downloading...' : 'Get APK'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section (Vertically Condensed) */}
      <section className="pt-8 sm:pt-12 pb-10 sm:pb-12 px-4 sm:px-6 text-center max-w-3xl mx-auto">
        <div className="text-[11px] sm:text-xs font-mono font-bold tracking-[3px] text-theme-muted uppercase mb-4">
          Personal Cinema
        </div>

        {/* Clean Borderless Icon */}
        <div className="flex justify-center mb-5">
          <img 
            src="/app-icon.png" 
            alt="Dayboxd" 
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]" 
          />
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-5xl font-semibold leading-[1.18] tracking-[-1px] text-theme-primary mb-4">
          Every day, <span className="text-[#00e054]">a feature film</span>
        </h1>

        {/* 2-Liner Content About the App */}
        <div className="text-sm sm:text-base text-theme-secondary font-normal leading-relaxed max-w-xl mx-auto mb-6 space-y-1">
          <p>
            Treat every day like a feature film—rate your day in half-stars, log memorable quotes, and collect cinematic posters.
          </p>
          <p className="text-xs sm:text-sm text-theme-muted">
            An offline-first personal sanctuary designed to turn everyday life into a timeless visual archive.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => triggerDownload('hero_button')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl bg-[#00e054] hover:bg-[#00c048] text-black font-semibold text-sm tracking-wide transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>{downloadStarted ? 'Downloading APK...' : 'Download for Android'}</span>
            <span className="text-xs opacity-75 font-mono ml-1">17.6 MB</span>
          </button>
        </div>
      </section>

      {/* How it Works Section (Compact 2-Column) */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 max-w-4xl mx-auto border-t border-theme-subtle">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-theme-primary mb-6 leading-snug">
              How it works
            </h2>

            <div className="space-y-4 text-theme-secondary">
              <div className="space-y-1">
                <div className="text-sm sm:text-base font-semibold text-theme-primary">
                  1. Rate your day
                </div>
                <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
                  0.5–5 stars with a personal moment and dialogue quote.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-sm sm:text-base font-semibold text-theme-primary">
                  2. Collect posters
                </div>
                <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
                  Cinematic 2:3 vertical cards for each day with curated fallback aesthetics.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-sm sm:text-base font-semibold text-theme-primary">
                  3. View your archive
                </div>
                <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
                  Browse your year through an iconic film wall and Top 4 pinned pinboard.
                </p>
              </div>
            </div>
          </div>

          {/* Minimalist App Preview Card */}
          <div className="bg-theme-surface rounded-2xl border border-theme-subtle p-5 sm:p-6 flex items-center justify-center shadow-xs">
            <div className="w-48 aspect-[2/3] rounded-xl overflow-hidden border border-theme-strong bg-[#14181c] shadow-xl flex flex-col justify-between p-4 text-white">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase font-semibold">
                  TODAY
                </span>
                <Heart className="w-3.5 h-3.5 fill-[#ff6060] text-[#ff6060]" />
              </div>

              <div className="text-center space-y-1.5 py-2">
                <div className="w-9 h-9 mx-auto rounded-full bg-[#00e054]/10 border border-[#00e054]/30 flex items-center justify-center">
                  <Film className="w-4 h-4 text-[#00e054]" />
                </div>
                <p className="text-[11px] font-serif italic text-white/90 line-clamp-2 px-1">
                  &ldquo;A quiet afternoon coffee, watching the rain.&rdquo;
                </p>
              </div>

              <div className="border-t border-white/10 pt-2 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span>The Sunday Reset</span>
                  <span className="text-[#00e054]">★★★★½</span>
                </div>
                <div className="text-[9px] font-mono text-white/40">3 SCENES • COZY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for Cinephiles (Compact 3-Column Clean Grid) */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-theme-surface border-y border-theme-subtle">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-theme-primary mb-8 tracking-tight">
            Designed for cinephiles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-theme-primary">
                Rate & reflect
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                Track your year in half-star increments with a single memorable quote.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <Film className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-theme-primary">
                Poster gallery
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                Cinematic vertical posters. Curated day-of-week graphics or custom camera photos.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <BarChart3 className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-theme-primary">
                Pro analytics
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                Native SVG rating histograms, monthly heatmaps, and streak tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy First Section (Compact) */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 max-w-xl mx-auto text-center space-y-4">
        <div className="w-9 h-9 mx-auto rounded-xl bg-theme-surface border border-theme-subtle flex items-center justify-center text-[#00e054]">
          <ShieldCheck className="w-4.5 h-4.5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-theme-primary tracking-tight">
          Privacy first
        </h2>

        <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
          Your entries stay encrypted on-device. Zero cloud accounts, zero tracking. Only you see your cinema.
        </p>

        <div className="pt-1">
          <button
            onClick={() => triggerDownload('bottom_cta')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00e054] hover:bg-[#00c048] text-black font-semibold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Download APK (17.6 MB)</span>
          </button>
        </div>
      </section>

      {/* Minimal Condensed Footer */}
      <footer className="py-6 px-4 sm:px-6 text-center text-xs text-theme-muted border-t border-theme-subtle max-w-4xl mx-auto">
        <div>© {new Date().getFullYear()} Dayboxd. Made for your life story.</div>
      </footer>
    </div>
  );
};
