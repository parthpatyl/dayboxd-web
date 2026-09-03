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
  Github,
  MessageSquarePlus,
  Send,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Bug,
  Palette,
  Star,
  ArrowLeft
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

const SUGGESTION_CATEGORIES = [
  { id: 'feature', label: 'Feature Idea', icon: Lightbulb, color: '#00e054' },
  { id: 'bug', label: 'Bug Report', icon: Bug, color: '#ff5577' },
  { id: 'design', label: 'Design & Themes', icon: Palette, color: '#ffbb00' },
  { id: 'general', label: 'General Thoughts', icon: MessageSquarePlus, color: '#4080ff' },
];

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentView, setCurrentView] = useState<'home' | 'suggestions'>('home');
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Form State
  const [category, setCategory] = useState('feature');
  const [suggestionText, setSuggestionText] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [ratingVal, setRatingVal] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const activePoster = POSTER_THEMES[selectedDayIndex];

  // Initialize Route
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('sugest') || path.includes('suggest')) {
      setCurrentView('suggestions');
    }

    const handlePopState = () => {
      const p = window.location.pathname.toLowerCase();
      if (p.includes('sugest') || p.includes('suggest')) {
        setCurrentView('suggestions');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: 'home' | 'suggestions') => {
    setCurrentView(view);
    const targetPath = view === 'suggestions' ? '/suggestions' : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const handleSubmitSuggestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestionText.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/parthpatyl@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🎬 Dayboxd Suggestion [${category.toUpperCase()}]: ${suggestionText.slice(0, 40)}...`,
          category: category,
          suggestion: suggestionText,
          senderContact: senderContact || 'Anonymous Cinephile',
          rating: ratingVal ? `${ratingVal} Stars` : 'Not Rated',
          submittedAt: new Date().toISOString(),
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSuggestionText('');
        setSenderContact('');
        setRatingVal(null);
        try {
          track('suggestion_submitted', { category, rating: ratingVal ?? 0 });
        } catch {
          // Ignore
        }
      } else {
        throw new Error('Server returned error response');
      }
    } catch (err: any) {
      console.error('Submission failed', err);
      // Fallback: direct mailto
      setSubmitStatus('error');
      setErrorMessage('Could not deliver directly. You can email suggestions directly to parthpatyl@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary font-sans antialiased selection:bg-[#00e054] selection:text-black transition-colors duration-200 flex flex-col justify-between">
      <Analytics />

      {/* Top Header */}
      <header className="w-full border-b border-theme-subtle bg-theme-primary/80 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 h-15 flex items-center justify-between">
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
          >
            <img 
              src="/app-icon.png" 
              alt="Dayboxd Logo" 
              className="w-8 h-8 object-contain" 
            />
            <span className="font-bold tracking-tight text-base sm:text-lg text-theme-primary">
              Dayboxd
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Suggestions Nav Tab */}
            <button
              onClick={() => navigateTo(currentView === 'suggestions' ? 'home' : 'suggestions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 border transition-all active:scale-95 text-xs font-mono cursor-pointer ${
                currentView === 'suggestions'
                  ? 'border-[#00e054] bg-[#00e054]/10 text-[#00e054] font-semibold'
                  : 'border-theme-subtle bg-theme-surface hover:border-theme-strong text-theme-secondary hover:text-theme-primary'
              }`}
              title="Submit feedback or suggestions"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Suggestions</span>
            </button>

            {/* GitHub App Link */}
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

            {/* Top Download Button */}
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

      {/* VIEW: SUGGESTIONS PAGE */}
      {currentView === 'suggestions' ? (
        <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex-1 flex flex-col justify-center">
          <div className="border border-theme-subtle bg-theme-surface p-6 sm:p-10 shadow-sm relative">
            
            {/* Back Button */}
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-theme-muted hover:text-theme-primary mb-6 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Showcase</span>
            </button>

            {/* Header */}
            <div className="mb-8 space-y-2 border-b border-theme-subtle pb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00e054] uppercase tracking-widest font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Director's Cut Mailbox</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-theme-primary">
                Send a Suggestion
              </h1>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed max-w-2xl">
                Have an idea for Dayboxd? Request a feature, propose a cinema poster theme, report an Android bug, or drop direct feedback. Every submission is delivered directly to the creator.
              </p>
            </div>

            {/* Submission Status Alerts */}
            {submitStatus === 'success' && (
              <div className="mb-8 p-6 border border-[#00e054]/40 bg-[#00e054]/10 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center gap-2.5 text-[#00e054] font-semibold text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>🎬 Cut! Scene Logged Successfully</span>
                </div>
                <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                  Thank you for contributing to Dayboxd! Your suggestion has been dispatched directly to our mailbox and will help direct future releases.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-4 py-2 bg-[#00e054] text-black text-xs font-semibold cursor-pointer active:scale-95"
                  >
                    Submit Another Suggestion
                  </button>
                  <button
                    onClick={() => navigateTo('home')}
                    className="px-4 py-2 border border-theme-subtle bg-theme-elevated text-xs text-theme-primary cursor-pointer active:scale-95"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 border border-[#ff5577]/40 bg-[#ff5577]/10 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#ff5577] shrink-0 mt-0.5" />
                <div className="text-xs text-theme-secondary space-y-1">
                  <div className="font-semibold text-[#ff5577]">Submission could not be completed</div>
                  <div>{errorMessage}</div>
                  <a 
                    href={`mailto:parthpatyl@gmail.com?subject=Dayboxd Suggestion: ${category}&body=${encodeURIComponent(suggestionText)}`}
                    className="text-[#00e054] underline inline-block pt-1 font-mono"
                  >
                    Click here to send via Email client →
                  </a>
                </div>
              </div>
            )}

            {/* Suggestion Form */}
            {submitStatus !== 'success' && (
              <form onSubmit={handleSubmitSuggestion} className="space-y-6">
                
                {/* 1. Category Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-theme-muted font-semibold">
                    1. Select Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SUGGESTION_CATEGORIES.map((cat) => {
                      const IconComp = cat.icon;
                      const isSelected = category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={`p-3 border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#00e054] bg-[#00e054]/10 text-theme-primary shadow-xs'
                              : 'border-theme-subtle bg-theme-elevated hover:border-theme-strong text-theme-secondary'
                          }`}
                        >
                          <IconComp 
                            className="w-4 h-4" 
                            style={{ color: isSelected ? '#00e054' : cat.color }} 
                          />
                          <span className="text-xs font-semibold">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Suggestion Text */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono uppercase tracking-wider text-theme-muted font-semibold">
                      2. Your Suggestion or Feedback <span className="text-[#00e054]">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-theme-muted">
                      {suggestionText.length}/1000
                    </span>
                  </div>
                  <textarea
                    required
                    rows={5}
                    maxLength={1000}
                    value={suggestionText}
                    onChange={(e) => setSuggestionText(e.target.value)}
                    placeholder="Describe your feature idea, report an issue, or tell us what you'd like to see next in Dayboxd..."
                    className="w-full p-3.5 border border-theme-subtle bg-theme-elevated text-theme-primary text-sm focus:outline-none focus:border-[#00e054] transition-colors resize-y leading-relaxed font-sans placeholder:text-theme-muted"
                  />
                </div>

                {/* 3. Optional Contact & Rating Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sender Contact */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-theme-muted font-semibold">
                      3. Email or Handle <span className="text-theme-muted font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={senderContact}
                      onChange={(e) => setSenderContact(e.target.value)}
                      placeholder="e.g. name@email.com or @twitter"
                      className="w-full p-3 border border-theme-subtle bg-theme-elevated text-theme-primary text-xs focus:outline-none focus:border-[#00e054] transition-colors placeholder:text-theme-muted font-mono"
                    />
                  </div>

                  {/* App Rating Pill */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-theme-muted font-semibold">
                      4. Rate Dayboxd <span className="text-theme-muted font-normal">(Optional)</span>
                    </label>
                    <div className="flex items-center gap-1.5 h-11 px-3 border border-theme-subtle bg-theme-elevated">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingVal(ratingVal === star ? null : star)}
                          className="p-1 text-theme-muted hover:text-[#00e054] transition-colors cursor-pointer"
                          title={`Rate ${star} Stars`}
                        >
                          <Star 
                            className={`w-4 h-4 ${
                              ratingVal && star <= ratingVal 
                                ? 'fill-[#00e054] text-[#00e054]' 
                                : 'text-theme-muted'
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-[11px] font-mono text-theme-muted ml-2">
                        {ratingVal ? `${ratingVal}.0 ★` : 'Select'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-theme-subtle">
                  <div className="text-[11px] font-mono text-theme-muted">
                    ⚡ Submissions go directly to the creator's inbox.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !suggestionText.trim()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#00e054] hover:bg-[#00c048] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-xs tracking-wide transition-all active:scale-95 cursor-pointer shadow-xs uppercase font-mono"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Suggestion'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      ) : (
        /* VIEW: HOME BENTO SHOWCASE */
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
      )}

      {/* Footer */}
      <footer className="py-5 px-4 sm:px-8 border-t border-theme-subtle w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-theme-muted">
        <div>© {new Date().getFullYear()} Dayboxd. Treat every day like a feature film.</div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('suggestions')}
            className="hover:text-theme-primary transition-colors cursor-pointer flex items-center gap-1"
          >
            <MessageSquarePlus className="w-3 h-3 text-[#00e054]" />
            <span>Submit a Suggestion</span>
          </button>
          <span>•</span>
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
