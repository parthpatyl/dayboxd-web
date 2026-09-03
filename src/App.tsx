import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Film, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Heart, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Github
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { track } from '@vercel/analytics';

interface PosterTheme {
  day: string;
  label: string;
  tagline: string;
  quote: string;
  rating: string;
  stars: number;
  bgGradient: string;
  accentColor: string;
  subMeta: string;
}

const POSTER_THEMES: PosterTheme[] = [
  {
    day: 'MON',
    label: 'Opening Scene',
    tagline: 'ACT I • MONDAY',
    quote: 'A quiet morning coffee, watching the rain begin.',
    rating: '★★★★½',
    stars: 4.5,
    bgGradient: 'from-[#0f1912] to-[#14181c]',
    accentColor: '#00e054',
    subMeta: '3 SCENES • 08:30 AM'
  },
  {
    day: 'WED',
    label: 'Midweek Pause',
    tagline: 'ACT II • WEDNESDAY',
    quote: 'Halfway through the script, finding steady momentum.',
    rating: '★★★★☆',
    stars: 4.0,
    bgGradient: 'from-[#1a170f] to-[#14181c]',
    accentColor: '#ffbb00',
    subMeta: '4 SCENES • 02:15 PM'
  },
  {
    day: 'FRI',
    label: 'Nocturne',
    tagline: 'CLIMAX • FRIDAY',
    quote: 'City lights, late night jazz, and good company.',
    rating: '★★★★★',
    stars: 5.0,
    bgGradient: 'from-[#121324] to-[#14181c]',
    accentColor: '#4080ff',
    subMeta: '5 SCENES • 10:45 PM'
  },
  {
    day: 'SUN',
    label: 'The Reset',
    tagline: 'EPILOGUE • SUNDAY',
    quote: 'Turning the final page before the next act begins.',
    rating: '★★★★½',
    stars: 4.5,
    bgGradient: 'from-[#1f1214] to-[#14181c]',
    accentColor: '#ff5577',
    subMeta: '2 SCENES • 07:00 PM'
  }
];

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const activePoster = POSTER_THEMES[selectedDayIndex];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      track('theme_toggle', { to: nextTheme });
    } catch {
      // Ignore
    }
  };

  const triggerDownload = (location: string = 'hero_pill') => {
    setDownloadStarted(true);

    try {
      track('apk_download', {
        source: location,
        version: '1.0.0',
        platform: 'android'
      });
    } catch {
      // Ignore
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
    <div className="min-h-screen bg-theme-primary text-theme-primary font-sans antialiased selection:bg-[#00e054] selection:text-black transition-colors duration-200 flex flex-col justify-between">
      <Analytics />

      {/* Header with Hairline Divider */}
      <header className="w-full border-b border-theme-subtle bg-theme-primary/80 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 h-15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/app-icon.png" 
              alt="Dayboxd Logo" 
              className="w-8 h-8 object-contain" 
            />
            <span className="font-bold tracking-tight text-base sm:text-lg text-theme-primary">
              Dayboxd
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub App Link (Points to dayboxd-app) */}
            <a
              href="https://github.com/parthpatyl/dayboxd-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-theme-subtle bg-theme-surface hover:border-theme-strong text-theme-secondary hover:text-theme-primary transition-all active:scale-95 text-xs font-mono cursor-pointer"
              title="View Dayboxd App on GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 border border-theme-subtle bg-theme-surface hover:border-theme-strong text-theme-secondary hover:text-theme-primary transition-all active:scale-95 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Editorial Light' : 'Cinema Dark'}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[#ffcc00]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-theme-primary" />
              )}
            </button>

            {/* Top Download Trigger */}
            <button
              onClick={() => triggerDownload('header_button')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00e054] hover:bg-[#00c048] text-black font-semibold text-xs tracking-wide transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{downloadStarted ? 'Downloading...' : 'Get APK (1.6 MB)'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Bento Grid — Fills Width & Screen Comfortably */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10 flex-1 flex flex-col justify-center">
        <div className="border border-theme-subtle bg-theme-subtle grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[1px] w-full">
          
          {/* TILE 1: Main Hero & Direct Download (Span 7 cols) */}
          <div className="md:col-span-2 lg:col-span-7 bg-theme-surface p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            {/* Eyebrow & Release Tag */}
            <div className="flex items-center justify-between gap-2 mb-6 sm:mb-8">
              <span className="text-xs font-mono font-bold tracking-[2px] text-theme-muted uppercase px-2.5 py-1 border border-theme-subtle bg-theme-elevated">
                Personal Cinema
              </span>
              <span className="text-xs font-mono text-[#00e054] font-semibold border border-[#00e054]/30 bg-[#00e054]/10 px-2.5 py-1">
                v1.0.0 (1.6 MB)
              </span>
            </div>

            {/* Core Value Pitch */}
            <div className="space-y-4 mb-8 sm:mb-10">
              <div className="flex items-center gap-4 sm:gap-5">
                <img 
                  src="/app-icon.png" 
                  alt="Dayboxd 3D Icon" 
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] shrink-0" 
                />
                <div>
                  <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.12] tracking-[-1.5px] text-theme-primary">
                    Every day, <span className="text-[#00e054]">a feature film</span>
                  </h1>
                </div>
              </div>

              <div className="space-y-1.5 text-sm sm:text-base lg:text-lg text-theme-secondary leading-relaxed pt-2">
                <p>
                  Treat every day like a feature film—rate your day in half-stars, log memorable quotes, and collect cinematic posters.
                </p>
                <p className="text-xs sm:text-sm text-theme-muted">
                  An offline-first personal sanctuary designed to turn everyday life into a timeless visual archive.
                </p>
              </div>
            </div>

            {/* Download CTA Action */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => triggerDownload('bento_hero_pill')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#00e054] hover:bg-[#00c048] text-black font-semibold text-sm sm:text-base tracking-wide transition-all active:scale-[0.98] cursor-pointer shadow-xs"
              >
                <Download className="w-4.5 h-4.5 stroke-[2.5]" />
                <span>{downloadStarted ? 'Starting Download...' : 'Download Android APK'}</span>
                <span className="text-xs opacity-80 font-mono px-2 py-0.5 bg-black/10">1.6 MB</span>
              </button>

              <div className="text-xs text-theme-muted flex items-center gap-3 flex-wrap font-mono pt-1">
                <span>✓ 100% Free & Open-Source</span>
                <span>•</span>
                <span>✓ Local-First IndexedDB</span>
                <span>•</span>
                <span>✓ Android 8.0+</span>
              </div>
            </div>
          </div>

          {/* TILE 2: Interactive Poster Engine (Span 5 cols) */}
          <div className="md:col-span-2 lg:col-span-5 bg-theme-surface p-5 sm:p-7 lg:p-8 flex flex-col justify-between">
            {/* Header with Switcher Tabs */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#00e054]" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-theme-primary">
                  Poster Engine
                </span>
              </div>

              {/* Day Chips */}
              <div className="flex items-center border border-theme-subtle bg-theme-elevated p-1">
                {POSTER_THEMES.map((themeItem, idx) => (
                  <button
                    key={themeItem.day}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`px-2.5 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedDayIndex === idx
                        ? 'bg-[#00e054] text-black shadow-xs'
                        : 'text-theme-muted hover:text-theme-primary'
                    }`}
                  >
                    {themeItem.day}
                  </button>
                ))}
              </div>
            </div>

            {/* 2:3 Vertical Card Preview */}
            <div className="flex items-center justify-center my-3">
              <div className={`w-48 sm:w-54 aspect-[2/3] p-4 flex flex-col justify-between text-white border border-white/10 shadow-2xl transition-all duration-300 bg-gradient-to-b ${activePoster.bgGradient}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase font-semibold">
                    {activePoster.tagline}
                  </span>
                  <Heart className="w-3.5 h-3.5 fill-[#ff6060] text-[#ff6060]" />
                </div>

                <div className="text-center space-y-2 py-2">
                  <div 
                    className="w-10 h-10 mx-auto flex items-center justify-center border"
                    style={{ 
                      backgroundColor: `${activePoster.accentColor}15`,
                      borderColor: `${activePoster.accentColor}40`,
                      color: activePoster.accentColor 
                    }}
                  >
                    <Film className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-serif italic text-white/90 line-clamp-3 px-1 leading-snug">
                    &ldquo;{activePoster.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-white/10 pt-2.5 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{activePoster.label}</span>
                    <span style={{ color: activePoster.accentColor }}>{activePoster.rating}</span>
                  </div>
                  <div className="text-[9px] font-mono text-white/40">{activePoster.subMeta}</div>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-theme-muted text-center pt-2">
              Select day chip to inspect dynamic fallback poster aesthetics
            </div>
          </div>

          {/* TILE 3: Offline & Privacy Guarantee (Span 4 cols) */}
          <div className="md:col-span-1 lg:col-span-4 bg-theme-surface p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                Sanctuary
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm sm:text-base font-semibold text-theme-primary">
                100% On-Device & Private
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                Entries stay on your hardware in IndexedDB. Zero telemetry, zero accounts, zero trackers. Only you see your cinema.
              </p>
            </div>

            <div className="pt-1">
              <span className="inline-block text-xs font-mono text-[#00e054] border border-[#00e054]/30 bg-[#00e054]/10 px-2.5 py-1">
                🔒 Local-First Sandbox
              </span>
            </div>
          </div>

          {/* TILE 4: How It Works 3-Step Flow (Span 5 cols) */}
          <div className="md:col-span-1 lg:col-span-5 bg-theme-surface p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                Workflow
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-theme-elevated/60 border border-theme-subtle p-2.5 space-y-1">
                <div className="text-xs font-bold text-theme-primary">1. Rate</div>
                <div className="text-[10px] text-theme-muted leading-tight">0.5–5★ scale</div>
              </div>
              <div className="bg-theme-elevated/60 border border-theme-subtle p-2.5 space-y-1">
                <div className="text-xs font-bold text-theme-primary">2. Collect</div>
                <div className="text-[10px] text-theme-muted leading-tight">2:3 posters</div>
              </div>
              <div className="bg-theme-elevated/60 border border-theme-subtle p-2.5 space-y-1">
                <div className="text-xs font-bold text-theme-primary">3. Archive</div>
                <div className="text-[10px] text-theme-muted leading-tight">Film Wall</div>
              </div>
            </div>

            <div className="text-xs font-mono text-theme-muted flex items-center justify-between pt-1">
              <span>Continuous Live Studio</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00e054]" />
            </div>
          </div>

          {/* TILE 5: Sideloading & Fast Distribution (Span 3 cols) */}
          <div className="md:col-span-2 lg:col-span-3 bg-theme-surface p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                Release
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-semibold text-theme-primary">
                Direct Distribution
              </h3>
              <p className="text-xs text-theme-secondary leading-relaxed">
                Optimized signed release APK with zero third-party telemetry.
              </p>
            </div>

            <button
              onClick={() => triggerDownload('bento_tile_quick_download')}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-theme-elevated hover:border-[#00e054] border border-theme-subtle text-xs font-semibold text-theme-primary transition-all active:scale-95 cursor-pointer font-mono"
            >
              <Download className="w-3.5 h-3.5 text-[#00e054]" />
              <span>Get APK (1.6 MB)</span>
            </button>
          </div>

        </div>
      </main>

      {/* Minimal Condensed Footer with App Repo Link */}
      <footer className="py-5 px-4 sm:px-8 border-t border-theme-subtle w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-theme-muted">
        <div>© {new Date().getFullYear()} Dayboxd. Treat every day like a feature film.</div>
        <div>
          <a 
            href="https://github.com/parthpatyl/dayboxd-app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-theme-primary transition-colors underline underline-offset-4"
          >
            github.com/parthpatyl/dayboxd-app
          </a>
        </div>
      </footer>
    </div>
  );
};
