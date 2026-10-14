import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { SlideItem } from '../data/presentationData';
import { createGoogleSlidesPresentation } from '../services/slidesApi';
import { googleSignIn, logout } from '../services/firebase';
import { GoogleSignInButton } from './GoogleSignInButton';
import {
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileSpreadsheet,
  X,
  Layers,
  Sparkles,
  RefreshCw,
  LogOut,
} from 'lucide-react';

interface GoogleSlidesExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideItem[];
  user: User | null;
  accessToken: string | null;
  onAuthSuccess: (user: User, token: string) => void;
  onAuthLoggedOut: () => void;
}

export const GoogleSlidesExporterModal: React.FC<GoogleSlidesExporterModalProps> = ({
  isOpen,
  onClose,
  slides,
  user,
  accessToken,
  onAuthSuccess,
  onAuthLoggedOut,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [createdPresentation, setCreatedPresentation] = useState<{
    id: string;
    url: string;
    title: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        onAuthSuccess(res.user, res.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to sign in with Google. Please allow popups and try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      onAuthLoggedOut();
      setCreatedPresentation(null);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleExport = async () => {
    if (!accessToken) {
      setError('Please sign in with Google first.');
      return;
    }

    setIsExporting(true);
    setError(null);
    setCreatedPresentation(null);
    setProgressPercent(5);
    setCurrentStep('Connecting to Google Slides API...');

    try {
      const result = await createGoogleSlidesPresentation(
        slides,
        accessToken,
        (step, pct) => {
          setCurrentStep(step);
          setProgressPercent(pct);
        }
      );

      setCreatedPresentation({
        id: result.presentationId,
        url: result.presentationUrl,
        title: result.title,
      });
    } catch (err: any) {
      console.error('Export error:', err);
      setError(err?.message || 'Failed to export presentation. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-900 to-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Export to Google Slides</h3>
              <p className="text-xs text-emerald-200">
                Generate a ready-to-present deck in your Google Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Google Auth Status Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center space-x-3">
                {user ? (
                  <>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-10 h-10 rounded-full border border-emerald-500"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold text-slate-800 text-sm">
                          {user.displayName || 'Google User'}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                          Connected
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      Connect your Google Account
                    </h4>
                    <p className="text-xs text-slate-500">
                      Sign in to create slides directly in your Google Slides / Drive account.
                    </p>
                  </div>
                )}
              </div>

              <div>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center space-x-1.5 text-xs text-slate-600 hover:text-rose-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <GoogleSignInButton
                    onClick={handleSignIn}
                    disabled={isLoggingIn}
                    label={isLoggingIn ? 'Connecting...' : 'Sign in with Google'}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Presentation Scope & Details */}
          <div className="border border-emerald-100 bg-emerald-50/50 rounded-xl p-4 text-xs space-y-2 text-emerald-900">
            <div className="flex items-center space-x-2 font-semibold text-emerald-950">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Deck Specifications</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-[10px] uppercase text-slate-400 block font-bold">Total Slides</span>
                <span className="text-sm font-bold text-emerald-950">{slides.length} Professional Slides</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-[10px] uppercase text-slate-400 block font-bold">Format</span>
                <span className="text-sm font-bold text-emerald-950">16:9 Widescreen (Google Slides)</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-[10px] uppercase text-slate-400 block font-bold">Branding</span>
                <span className="text-sm font-bold text-emerald-950">Forest Emerald & Amber Gold</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-[10px] uppercase text-slate-400 block font-bold">Content</span>
                <span className="text-sm font-bold text-emerald-950">17 Topics, Prompts & Tables</span>
              </div>
            </div>
          </div>

          {/* Export Status & Progress */}
          {isExporting && (
            <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>{currentStep}</span>
                </span>
                <span className="text-emerald-700 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-500">
                Building slides, formatting typography, setting action steps, and inserting ready prompts...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-3 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Export Failed</p>
                <p className="mt-0.5 text-rose-700">{error}</p>
              </div>
            </div>
          )}

          {/* Success Box */}
          {createdPresentation && (
            <div className="p-5 bg-emerald-50 border-2 border-emerald-500/40 rounded-xl space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">
                    Deck Created Successfully!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Saved directly to your Google Drive account.
                  </p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs text-slate-700">
                <span className="font-semibold text-slate-900 block truncate">
                  {createdPresentation.title}
                </span>
                <span className="text-slate-400 text-[11px]">
                  ID: {createdPresentation.id}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href={createdPresentation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Google Slides</span>
                </a>
                <button
                  onClick={handleExport}
                  title="Re-generate presentation"
                  className="p-2.5 rounded-xl border border-emerald-300 text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            Close
          </button>

          {!createdPresentation && (
            <button
              onClick={handleExport}
              disabled={isExporting || isLoggingIn || !user}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all ${
                !user
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                  : isExporting
                  ? 'bg-emerald-600/70 cursor-wait'
                  : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/20 hover:scale-[1.02]'
              }`}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Deck...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate All 25 Slides</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
