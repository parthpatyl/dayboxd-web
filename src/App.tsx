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
  ArrowRight
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

      {/* Header with hairline bottom border */}
      <header className="w-full border-b border-theme-subtle bg-theme-primary/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
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
              className="p-2 border border-theme-subtle bg-theme-surface hover:border-theme-strong text-theme-secondary hover:text-theme-primary transition-all active:scale-95 cursor-pointer"
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
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00e054] hover:bg-[#00c048] text-black font-semibold text-xs tracking-wide transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{downloadStarted ? 'Downloading...' : 'Get APK'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Sharp Outline Bento Grid (No gaps, no rounded corners, 1px border outlines) */}
      <main className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex-1 flex flex-col justify-center">
        <div className="border border-theme-subtle bg-theme-subtle grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[1px]">
          
          {/* TILE 1: Main Hero & Direct Download (Span 7 cols on Desktop) */}
          <div className="md:col-span-2 lg:col-span-7 bg-theme-surface p-5 sm:p-7 md:p-8 flex flex-col justify-between">
            {/* Eyebrow / Tag */}
            <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[2px] text-theme-muted uppercase px-2 py-0.5 border border-theme-subtle bg-theme-elevated">
                Personal Cinema
              </span>
              <span className="text-[10px] font-mono text-[#00e054] font-semibold border border-[#00e054]/30 bg-[#00e054]/10 px-2 py-0.5">
                v1.0.0 APK
              </span>
            </div>

            {/* Core Pitch & Branding */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <img 
                  src="/app-icon.png" 
                  alt="Dayboxd 3D Icon" 
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] shrink-0" 
                />
                <div>
                  <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[-1px] text-theme-primary">
                    Every day, <span className="text-[#00e054]">a feature film</span>
                  </h1>
                </div>
              </div>

              <div className="space-y-1 text-xs sm:text-sm md:text-base text-theme-secondary leading-relaxed pt-1">
                <p>
                  Treat every day like a feature film—rate your day in half-stars, log memorable quotes, and collect cinematic posters.
                </p>
                <p className="text-[11px] sm:text-xs text-theme-muted">
                  An offline-first personal sanctuary designed to turn everyday life into a timeless visual archive.
                </p>
              </div>
            </div>

            {/* Download CTA Action */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => triggerDownload('bento_hero_pill')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 bg-[#00e054] hover:bg-[#00c048] text-black font-semibold text-xs sm:text-sm tracking-wide transition-all active:scale-[0.98] cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{downloadStarted ? 'Starting Download...' : 'Download Android APK'}</span>
                <span className="text-[11px] opacity-75 font-mono px-1.5 py-0.5 bg-black/10">1.6 MB</span>
              </button>

              <div className="text-[10px] sm:text-[11px] text-theme-muted flex items-center gap-2 sm:gap-3 flex-wrap font-mono">
                <span>✓ 100% Free</span>
                <span>•</span>
                <span>✓ Local-First IndexedDB</span>
                <span>•</span>
                <span>✓ Android 8.0+</span>
              </div>
            </div>
          </div>

          {/* TILE 2: Interactive Poster Engine (Span 5 cols on Desktop) */}
          <div className="md:col-span-2 lg:col-span-5 bg-theme-surface p-4 sm:p-6 flex flex-col justify-between">
            {/* Header & Day Switcher */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Film className="w-4 h-4 text-[#00e054]" />
                <span className="text-xs font-semibold tracking-wide text-theme-primary">
                  Poster Engine
                </span>
              </div>

              {/* Day Chips */}
              <div className="flex items-center border border-theme-subtle bg-theme-elevated p-0.5">
                {POSTER_THEMES.map((themeItem, idx) => (
                  <button
                    key={themeItem.day}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      selectedDayIndex === idx
                        ? 'bg-[#00e054] text-black'
                        : 'text-theme-muted hover:text-theme-primary'
                    }`}
                  >
                    {themeItem.day}
                  </button>
                ))}
              </div>
            </div>

            {/* 2:3 Vertical Card Preview */}
            <div className="flex items-center justify-center my-2">
              <div className={`w-44 sm:w-48 aspect-[2/3] p-3.5 flex flex-col justify-between text-white border border-white/10 shadow-lg transition-all duration-300 bg-gradient-to-b ${activePoster.bgGradient}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono tracking-widest text-white/50 uppercase font-semibold">
                    {activePoster.tagline}
                  </span>
                  <Heart className="w-3 h-3 fill-[#ff6060] text-[#ff6060]" />
                </div>

                <div className="text-center space-y-1.5 py-1">
                  <div 
                    className="w-8 h-8 mx-auto flex items-center justify-center border"
                    style={{ 
                      backgroundColor: `${activePoster.accentColor}15`,
                      borderColor: `${activePoster.accentColor}40`,
                      color: activePoster.accentColor 
                    }}
                  >
                    <Film className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] font-serif italic text-white/90 line-clamp-3 px-1 leading-tight">
                    &ldquo;{activePoster.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-white/10 pt-2 space-y-0.5">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span>{activePoster.label}</span>
                    <span style={{ color: activePoster.accentColor }}>{activePoster.rating}</span>
                  </div>
                  <div className="text-[8px] font-mono text-white/40">{activePoster.subMeta}</div>
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-theme-muted text-center pt-1">
              Select day chip to inspect fallback themes
            </div>
          </div>

          {/* TILE 3: Offline & Privacy Security (Span 4 cols) */}
          <div className="md:col-span-1 lg:col-span-4 bg-theme-surface p-4 sm:p-5 md:p-6 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <span className="text-[9px] font-mono text-theme-muted uppercase tracking-wider">
                Sanctuary
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-semibold text-theme-primary">
                100% On-Device & Private
              </h3>
              <p className="text-[11px] sm:text-xs text-theme-secondary leading-relaxed">
                IndexedDB on hardware. Zero telemetry, zero accounts, zero trackers. Only you see your cinema.
              </p>
            </div>

            <div className="pt-1">
              <span className="inline-block text-[10px] font-mono text-[#00e054] border border-[#00e054]/30 bg-[#00e054]/10 px-2 py-0.5">
                🔒 Local-First Sandbox
              </span>
            </div>
          </div>

          {/* TILE 4: How It Works 3-Step Flow (Span 5 cols) */}
          <div className="md:col-span-1 lg:col-span-5 bg-theme-surface p-4 sm:p-5 md:p-6 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <span className="text-[9px] font-mono text-theme-muted uppercase tracking-wider">
                Workflow
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center pt-1">
              <div className="bg-theme-elevated/60 border border-theme-subtle p-2 space-y-0.5">
                <div className="text-[11px] font-bold text-theme-primary">1. Rate</div>
                <div className="text-[9px] text-theme-muted leading-tight">0.5–5★ scale</div>
              </div>
              <div className="bg-theme-elevated/60 border border-theme-subtle p-2 space-y-0.5">
                <div className="text-[11px] font-bold text-theme-primary">2. Collect</div>
                <div className="text-[9px] text-theme-muted leading-tight">2:3 posters</div>
              </div>
              <div className="bg-theme-elevated/60 border border-theme-subtle p-2 space-y-0.5">
                <div className="text-[11px] font-bold text-theme-primary">3. Archive</div>
                <div className="text-[9px] text-theme-muted leading-tight">Film Wall</div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-theme-muted flex items-center justify-between pt-1">
              <span>Continuous Live Studio</span>
              <ArrowRight className="w-3 h-3 text-[#00e054]" />
            </div>
          </div>

          {/* TILE 5: Sideloading & Fast Distribution (Span 3 cols) */}
          <div className="md:col-span-2 lg:col-span-3 bg-theme-surface p-4 sm:p-5 md:p-6 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 bg-theme-elevated border border-theme-subtle flex items-center justify-center text-[#00e054]">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <span className="text-[9px] font-mono text-theme-muted uppercase tracking-wider">
                Release
              </span>
            </div>

            <div className="space-y-0.5">
              <h3 className="text-xs sm:text-sm font-semibold text-theme-primary">
                Direct Distribution
              </h3>
              <p className="text-[11px] text-theme-secondary leading-relaxed">
                Clean APK install without store logins or telemetry.
              </p>
            </div>

            <button
              onClick={() => triggerDownload('bento_tile_quick_download')}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2.5 bg-theme-elevated hover:border-[#00e054] border border-theme-subtle text-[11px] font-semibold text-theme-primary transition-all active:scale-95 cursor-pointer font-mono"
            >
              <Download className="w-3 h-3 text-[#00e054]" />
              <span>Get APK (1.6 MB)</span>
            </button>
          </div>

        </div>
      </main>

      {/* Minimal Condensed Footer */}
      <footer className="py-4 px-4 text-center text-[11px] font-mono text-theme-muted border-t border-theme-subtle max-w-6xl mx-auto w-full">
        <div>© {new Date().getFullYear()} Dayboxd. Treat every day like a feature film.</div>
      </footer>
    </div>
  );
};
