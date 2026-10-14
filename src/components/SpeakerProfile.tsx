import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { PRESENTATION_METADATA } from '../data/presentationData';
import {
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Download,
  QrCode as QrCodeIcon,
  Sparkles,
  Award,
  BookOpen,
  Building,
  Upload,
  UserCheck,
  Share2,
} from 'lucide-react';

export const SpeakerProfile: React.FC = () => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBio, setCopiedBio] = useState(false);
  const [avatarImage, setAvatarImage] = useState<string | null>(() => {
    return localStorage.getItem('speaker_avatar_custom') || null;
  });

  const blogUrl = PRESENTATION_METADATA.speakerBlogUrl || 'https://sundaresh.blog';
  const speakerEmail = PRESENTATION_METADATA.speakerEmail || 'ka.sundaresh@gmail.com';

  useEffect(() => {
    // Generate high resolution QR Code with emerald styling
    QRCode.toDataURL(blogUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0f3429', // Deep emerald dark
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        setQrCodeDataUrl(url);
      })
      .catch((err) => {
        console.error('Failed to generate QR code', err);
      });
  }, [blogUrl]);

  const handleCopy = (text: string, type: 'url' | 'email' | 'bio') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedBio(true);
      setTimeout(() => setCopiedBio(false), 2000);
    }
  };

  const handleDownloadQr = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement('a');
    a.href = qrCodeDataUrl;
    a.download = `sundaresh-kamaraj-blog-qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setAvatarImage(result);
        localStorage.setItem('speaker_avatar_custom', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const emceeScript = `Sundaresh Kamaraj is an Indian entrepreneur, author, technologist and founder and CEO of Elysium Group of Companies, based in Madurai, Tamil Nadu. He founded Elysium Technologies in 1999 and has over 25 years of experience in the IT industry. He studied Electronics and Communication Engineering and Information Technology. He is known for his contributions to IT education, software development, skill training and entrepreneurship. His vision is to empower young people through technology, innovation and education. Please welcome Sundaresh Kamaraj!`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Executive Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-800/60 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Speaker Bio & Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Portrait Image Container */}
            <div className="relative group shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-slate-900 flex items-center justify-center">
                {avatarImage ? (
                  <img
                    src={avatarImage}
                    alt={PRESENTATION_METADATA.speaker}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-emerald-950 via-slate-900 to-emerald-800 flex flex-col items-center justify-center p-3 text-center">
                    <UserCheck className="w-12 h-12 text-amber-400 mb-1" />
                    <span className="font-black text-sm text-white">Sundaresh</span>
                    <span className="text-[10px] text-emerald-300">Founder & CEO</span>
                  </div>
                )}
              </div>

              {/* Upload photo trigger */}
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg cursor-pointer transition-all hover:scale-105"
                title="Upload or change portrait photo"
              >
                <Upload className="w-3.5 h-3.5" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 flex-wrap gap-1.5">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Entrepreneur & Author
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-800/80 text-emerald-200 border border-emerald-600/50">
                  Technologist
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800/80 text-slate-300 border border-slate-700">
                  25+ Years in IT (Est. 1999)
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {PRESENTATION_METADATA.speaker}
              </h2>

              <p className="text-sm sm:text-base text-emerald-200 font-medium">
                Founder & CEO, Elysium Group of Companies • Madurai, Tamil Nadu
              </p>

              <div className="flex items-center space-x-4 text-xs text-slate-300 pt-1 flex-wrap gap-2">
                <span className="flex items-center space-x-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{PRESENTATION_METADATA.speakerLocation}</span>
                </span>

                <a
                  href={`mailto:${speakerEmail}`}
                  className="flex items-center space-x-1.5 text-emerald-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{speakerEmail}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <Globe className="w-4 h-4" />
              <span>Visit sundaresh.blog</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            <button
              onClick={() => handleCopy(blogUrl, 'url')}
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Blog URL Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy sundaresh.blog Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: QR Code Hub & Full Bio Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Live Scannable QR Code Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl flex flex-col items-center text-center space-y-5">
            <div className="flex items-center space-x-2 text-emerald-800">
              <QrCodeIcon className="w-5 h-5 text-emerald-700" />
              <h3 className="font-black text-slate-900 text-base">
                Scan to Visit sundaresh.blog
              </h3>
            </div>

            <p className="text-xs text-slate-500 max-w-xs">
              Point your smartphone camera at this QR code to instantly open Sundaresh Kamaraj’s
              official blog and articles.
            </p>

            {/* Generated QR Code Canvas */}
            <div className="p-4 bg-emerald-50/60 rounded-2xl border-2 border-dashed border-emerald-300 shadow-inner group relative">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt="QR Code for sundaresh.blog"
                  className="w-56 h-56 rounded-xl object-contain shadow-sm bg-white p-2"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-slate-400 text-xs">
                  Generating QR code...
                </div>
              )}
            </div>

            <div className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs font-mono text-emerald-900 font-bold truncate">
              {blogUrl}
            </div>

            {/* QR Download & Sharing CTAs */}
            <div className="flex items-center space-x-3 w-full">
              <button
                onClick={handleDownloadQr}
                className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                <span>Download QR (PNG)</span>
              </button>

              <button
                onClick={() => handleCopy(blogUrl, 'url')}
                className="p-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                title="Copy link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] text-slate-400">
              High-resolution PNG suitable for projector slides, stage banners, and printed event handouts.
            </div>
          </div>
        </div>

        {/* Right Column: Keynote Themes & Executive Biography */}
        <div className="lg:col-span-7 space-y-6">
          {/* Biography & Mission Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 text-emerald-800">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-base">Executive Biography</h3>
            </div>

            {/* User's Exact Content */}
            <div className="p-4 sm:p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              <p>
                <strong>Sundaresh Kamaraj</strong> is an Indian entrepreneur, author, technologist and founder and CEO of <strong>Elysium Group of Companies</strong>, based in Madurai, Tamil Nadu. He founded <strong>Elysium Technologies in 1999</strong> and has over <strong>25 years of experience</strong> in the IT industry. He studied <strong>Electronics and Communication Engineering and Information Technology</strong>. He is known for his contributions to <strong>IT education, software development, skill training and entrepreneurship</strong>. His vision is to <strong>empower young people through technology, innovation and education</strong>.
              </p>
            </div>

            {/* Key Milestone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-start space-x-3">
                <Building className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 text-xs block">Elysium Group of Companies</span>
                  <span className="text-[11px] text-slate-500">
                    Founded Elysium Technologies in 1999 • 25+ Years IT Industry Leader
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-start space-x-3">
                <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 text-xs block">Engineering & IT Credentials</span>
                  <span className="text-[11px] text-slate-500">
                    Electronics & Communication Engineering & Information Technology
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-start space-x-3">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 text-xs block">Key Contributions</span>
                  <span className="text-[11px] text-slate-500">
                    IT Education, Software Development, Skill Training & Entrepreneurship
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-start space-x-3">
                <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 text-xs block">Visionary Mission</span>
                  <span className="text-[11px] text-slate-500">
                    Empowering young people through technology, innovation and education
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Keynote Themes */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Keynote & Advisory Domains</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: 'Applied AI for Export',
                  desc: 'R-T-C-F prompting, automated market research, buyer persona synthesis, and quotation drafting.',
                },
                {
                  title: 'Agritech & Origin Storytelling',
                  desc: 'Positioning Tamil Nadu agricultural commodities (Moringa, Spices, Coir) for European and Middle Eastern markets.',
                },
                {
                  title: 'Digital Exporter Branding',
                  desc: 'Clean B2B visual identity, carton-ready packaging, video storyboarding, and website architecture.',
                },
                {
                  title: 'Operational Risk & Compliance',
                  desc: 'Incoterms (Ex-Works, FOB, CIF), currency fluctuation hedging, and pre-shipment customs checklists.',
                },
              ].map((domain, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1"
                >
                  <h4 className="font-bold text-xs text-slate-900">{domain.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{domain.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emcee Introduction Script Card */}
          <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 border border-slate-800 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Host / Emcee Introduction Script (60-Seconds)
              </span>
              <button
                onClick={() => handleCopy(emceeScript, 'bio')}
                className="inline-flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                {copiedBio ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              "{emceeScript}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
