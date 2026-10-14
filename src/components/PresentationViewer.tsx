import React, { useState, useEffect, useRef } from 'react';
import { SlideItem, PRESENTATION_METADATA } from '../data/presentationData';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  FileSpreadsheet,
  MessageSquare,
  Sparkles,
  AlertTriangle,
  Layers,
  Wrench,
  Compass,
  Play,
  Pause,
} from 'lucide-react';

import QRCode from 'qrcode';

interface PresentationViewerProps {
  slides: SlideItem[];
  onOpenGoogleSlidesExport: () => void;
  onOpenPromptLab?: () => void;
}

export const PresentationViewer: React.FC<PresentationViewerProps> = ({
  slides,
  onOpenGoogleSlidesExport,
  onOpenPromptLab,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [showSlideList, setShowSlideList] = useState(false);
  const [copiedPromptKey, setCopiedPromptKey] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speakerQrUrl, setSpeakerQrUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(PRESENTATION_METADATA.speakerBlogUrl || 'https://sundaresh.blog', {
      width: 280,
      margin: 1,
      color: { dark: '#0f3429', light: '#ffffff' },
    })
      .then((url) => setSpeakerQrUrl(url))
      .catch(() => {});
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowSpeakerNotes((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, currentSlideIndex]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleCopyPrompt = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptKey(key);
    setTimeout(() => setCopiedPromptKey(null), 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-slate-950 text-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : 'min-h-[720px]'
      }`}
    >
      {/* Top Deck Control Header */}
      <div className="bg-slate-900/95 backdrop-blur-md px-6 py-3.5 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-black tracking-wider text-amber-400 uppercase">
              {currentSlide.category}
            </span>
          </div>

          <span className="text-slate-600">•</span>

          <span className="text-xs font-semibold text-slate-300">
            Slide {currentSlide.slideNumber} of {totalSlides}
          </span>

          {currentSlide.timeSlot && (
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-[10px] font-bold text-emerald-300">
              {currentSlide.timeSlot}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Slide List Navigator Toggle */}
          <button
            onClick={() => setShowSlideList((prev) => !prev)}
            className={`p-2 rounded-xl text-xs font-medium border transition-colors flex items-center space-x-1.5 ${
              showSlideList
                ? 'bg-emerald-900 text-emerald-200 border-emerald-600'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle Slide Thumbnails"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden md:inline">Index</span>
          </button>

          {/* Speaker Notes Toggle */}
          <button
            onClick={() => setShowSpeakerNotes((prev) => !prev)}
            className={`p-2 rounded-xl text-xs font-medium border transition-colors flex items-center space-x-1.5 ${
              showSpeakerNotes
                ? 'bg-amber-950 text-amber-300 border-amber-600'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle Presenter Speaker Notes (Shortcut: N)"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden md:inline">Speaker Notes</span>
          </button>

          {/* Autoplay Slideshow */}
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors"
            title={isPlaying ? 'Pause slideshow' : 'Auto-play slideshow (7s interval)'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors"
            title="Fullscreen Mode (Shortcut: F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Export to Google Slides CTA */}
          <button
            onClick={onOpenGoogleSlidesExport}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 transition-all hover:scale-[1.02]"
            title="Export full deck to Google Slides"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export to Google Slides</span>
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="flex-1 relative flex flex-col justify-between p-6 sm:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 overflow-y-auto">
        {/* Accent Banner Top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-700"></div>

        {/* Slide Content Header */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-900/80 text-emerald-300 border border-emerald-700/60">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{PRESENTATION_METADATA.organization}</span>
            </span>

            {currentSlide.recommendedTool && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/60">
                <Wrench className="w-3.5 h-3.5" />
                <span>Tool: {currentSlide.recommendedTool}</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            {currentSlide.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-4xl">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* Slide Body Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto">
          {/* Left Column: Why it matters + Action Steps */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                <span>The Exporter's Strategic Rationale</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {currentSlide.whyItMatters}
              </p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Step-by-Step Implementation:
              </h4>
              <ul className="space-y-2.5">
                {currentSlide.howToDoIt.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700/80 text-emerald-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Prompts, Tables, or Key Takeaways */}
          <div className="lg:col-span-6 space-y-4">
            {/* Special QR code display for Speaker Profile Slide */}
            {currentSlide.id === 'slide-speaker-profile' && (
              <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 border-2 border-amber-400/50 rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-center gap-5">
                <div className="p-2.5 bg-white rounded-xl shadow-md shrink-0">
                  {speakerQrUrl ? (
                    <img
                      src={speakerQrUrl}
                      alt="QR Code for sundaresh.blog"
                      className="w-32 h-32 object-contain"
                    />
                  ) : (
                    <div className="w-32 h-32 flex items-center justify-center text-xs text-slate-400">
                      QR Code
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Scan With Smartphone Camera</span>
                  </div>
                  <h4 className="text-base font-black text-white">sundaresh.blog</h4>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">
                    Access keynote slides, prompt libraries, and export transformation articles.
                  </p>
                  <a
                    href="https://sundaresh.blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-amber-400 hover:text-amber-300 underline font-semibold pt-1"
                  >
                    <span>Open https://sundaresh.blog directly →</span>
                  </a>
                </div>
              </div>
            )}

            {currentSlide.prompts && currentSlide.prompts.length > 0 ? (
              <div className="space-y-3">
                {currentSlide.prompts.map((p, idx) => {
                  const key = `prompt-${currentSlide.id}-${idx}`;
                  const isCopied = copiedPromptKey === key;

                  return (
                    <div
                      key={idx}
                      className="bg-emerald-950/40 border border-emerald-700/50 rounded-2xl p-5 shadow-xl relative group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-amber-400 flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>{p.title}</span>
                        </span>
                        <button
                          onClick={() => handleCopyPrompt(p.text, key)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            isCopied
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-200" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-slate-950/90 rounded-xl p-3.5 font-mono text-xs text-emerald-100/90 leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap border border-slate-800">
                        {p.text}
                      </div>

                      {onOpenPromptLab && (
                        <div className="mt-2 text-right">
                          <button
                            onClick={onOpenPromptLab}
                            className="text-[11px] text-emerald-400 hover:text-emerald-300 underline font-medium"
                          >
                            Customize placeholders with your product →
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* Table layout if present */}
            {currentSlide.tableData && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-700 text-amber-400 font-bold">
                      {currentSlide.tableData.headers.map((h, i) => (
                        <th key={i} className="py-2 px-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {currentSlide.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/50">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2.5 px-3">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Important Rule Alert Box */}
            {currentSlide.importantRule && (
              <div className="bg-amber-950/40 border border-amber-600/50 rounded-2xl p-4 flex items-start space-x-3 text-amber-200 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 block mb-0.5">
                    Critical Verification Rule
                  </span>
                  <span>{currentSlide.importantRule}</span>
                </div>
              </div>
            )}

            {/* Key Takeaways if no prompt/table */}
            {!currentSlide.prompts?.length && !currentSlide.tableData && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Key Takeaways
                </h4>
                <ul className="space-y-2">
                  {currentSlide.keyTakeaways.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Slide Footer Info */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
          <div>
            <strong className="text-slate-200">{PRESENTATION_METADATA.speaker}</strong>, {PRESENTATION_METADATA.speakerRole} • {PRESENTATION_METADATA.caseStudy}
          </div>
          <div className="flex items-center space-x-2">
            <span>Date: {PRESENTATION_METADATA.date}</span>
          </div>
        </div>
      </div>

      {/* Speaker Notes Drawer (if opened) */}
      {showSpeakerNotes && (
        <div className="bg-amber-950/90 border-t border-amber-700/60 p-5 text-amber-100 text-xs sm:text-sm animate-in slide-in-from-bottom-5 duration-200">
          <div className="max-w-4xl mx-auto flex items-start space-x-3">
            <MessageSquare className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider text-amber-300 text-xs block mb-1">
                Presenter Speaker Notes (Slide {currentSlide.slideNumber})
              </span>
              <p className="leading-relaxed text-amber-100/90">
                {currentSlide.speakerNotes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Slide Thumbnails Drawer (if opened) */}
      {showSlideList && (
        <div className="bg-slate-900 border-t border-slate-800 p-4 max-h-48 overflow-y-auto animate-in slide-in-from-bottom-5 duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setShowSlideList(false);
                }}
                className={`p-2 rounded-xl text-left border transition-all text-[11px] truncate ${
                  idx === currentSlideIndex
                    ? 'bg-emerald-800 text-white border-amber-400 font-bold'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <div className="text-[10px] text-amber-400 font-mono">#{s.slideNumber}</div>
                <div className="truncate font-semibold">{s.title}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation Toolbar */}
      <div className="bg-slate-900 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={prevSlide}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all hover:scale-[1.02]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Slide</span>
        </button>

        {/* Progress Dots / Slider */}
        <div className="hidden sm:flex items-center space-x-2">
          <div className="w-48 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentSlideIndex + 1) / totalSlides) * 100}%`,
              }}
            ></div>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {currentSlideIndex + 1}/{totalSlides}
          </span>
        </div>

        <button
          onClick={nextSlide}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md shadow-emerald-950 transition-all hover:scale-[1.02]"
        >
          <span>Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
