import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { SLIDES_DATA, PRESENTATION_METADATA } from './data/presentationData';
import { initAuth } from './services/firebase';
import { PresentationViewer } from './components/PresentationViewer';
import { GoogleSlidesExporterModal } from './components/GoogleSlidesExporterModal';
import { InteractivePromptLab } from './components/InteractivePromptLab';
import { ActionPlanTracker } from './components/ActionPlanTracker';
import { ExportCostingCalculator } from './components/ExportCostingCalculator';
import { SpeakerProfile } from './components/SpeakerProfile';
import {
  Presentation,
  SlidersHorizontal,
  CalendarCheck2,
  Calculator,
  FileSpreadsheet,
  Globe2,
  Ship,
  Sparkles,
  User as UserIcon,
  QrCode,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'deck' | 'prompts' | 'action-plan' | 'calculator' | 'speaker'>('deck');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Firebase Auth listener
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Presentation Details */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-400 flex items-center justify-center shadow-md">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                  Export Smarter
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                  AI & Digital Marketing
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-xs sm:max-w-md">
                {PRESENTATION_METADATA.speaker} • {PRESENTATION_METADATA.organization}
              </p>
            </div>
          </div>

          {/* Right Header CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a
              href="https://sundaresh.blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors"
              title="Visit official website: sundaresh.blog"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden md:inline">sundaresh.blog</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-800/20 transition-all hover:scale-[1.02]"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Export to Google Slides</span>
              <span className="sm:hidden">Google Slides</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('deck')}
            className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'deck'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>Interactive Deck ({SLIDES_DATA.length} Slides)</span>
          </button>

          <button
            onClick={() => setActiveTab('speaker')}
            className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'speaker'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <UserIcon className="w-4 h-4 text-amber-400" />
            <span>Speaker Profile (QR Code)</span>
          </button>

          <button
            onClick={() => setActiveTab('prompts')}
            className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'prompts'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Prompt Customizer Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('action-plan')}
            className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'action-plan'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CalendarCheck2 className="w-4 h-4" />
            <span>7-Day Exporter Sprint</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>FOB/CIF Costing Simulator</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'deck' && (
          <div className="space-y-4">
            <PresentationViewer
              slides={SLIDES_DATA}
              onOpenGoogleSlidesExport={() => setIsExportModalOpen(true)}
              onOpenPromptLab={() => setActiveTab('prompts')}
            />
          </div>
        )}

        {activeTab === 'speaker' && <SpeakerProfile />}

        {activeTab === 'prompts' && <InteractivePromptLab />}

        {activeTab === 'action-plan' && <ActionPlanTracker />}

        {activeTab === 'calculator' && <ExportCostingCalculator />}
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">Export Smarter</span>
            <span>•</span>
            <span>Handbook for Budding Exporters</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Moringa Leaf Powder Case Study</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Online Session: 16 October 2026</span>
            <span>•</span>
            <span>Madurai, Tamil Nadu</span>
          </div>
        </div>
      </footer>

      {/* Google Slides Exporter Modal */}
      <GoogleSlidesExporterModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        slides={SLIDES_DATA}
        user={currentUser}
        accessToken={accessToken}
        onAuthSuccess={(user, token) => {
          setCurrentUser(user);
          setAccessToken(token);
        }}
        onAuthLoggedOut={() => {
          setCurrentUser(null);
          setAccessToken(null);
        }}
      />
    </div>
  );
}
