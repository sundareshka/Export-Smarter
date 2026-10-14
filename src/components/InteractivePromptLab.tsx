import React, { useState } from 'react';
import { SLIDES_DATA } from '../data/presentationData';
import {
  Copy,
  Check,
  Sparkles,
  SlidersHorizontal,
  Search,
  RotateCcw,
} from 'lucide-react';

export const InteractivePromptLab: React.FC = () => {
  // Customization variables
  const [product, setProduct] = useState('Organic Moringa Leaf Powder');
  const [company, setCompany] = useState('GreenSource Exports');
  const [origin, setOrigin] = useState('Madurai, Tamil Nadu, India');
  const [country, setCountry] = useState('Germany');
  const [capacity, setCapacity] = useState('2 Tons per month');
  const [packing, setPacking] = useState('25 Kg food-grade drums');
  const [port, setPort] = useState('Tuticorin Port');
  const [moq, setMoq] = useState('500 Kg');

  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract all prompts from slides
  const allPrompts = SLIDES_DATA.flatMap((slide) =>
    slide.prompts.map((p, pIdx) => ({
      ...p,
      uniqueKey: `${slide.id}-${pIdx}`,
      slideTitle: slide.title,
      slideNumber: slide.slideNumber,
      category: slide.category,
      recommendedTool: slide.recommendedTool || 'ChatGPT / Claude / Gemini',
    }))
  );

  const handleReset = () => {
    setProduct('Organic Moringa Leaf Powder');
    setCompany('GreenSource Exports');
    setOrigin('Madurai, Tamil Nadu, India');
    setCountry('Germany');
    setCapacity('2 Tons per month');
    setPacking('25 Kg food-grade drums');
    setPort('Tuticorin Port');
    setMoq('500 Kg');
  };

  const personalizeText = (rawText: string) => {
    return rawText
      .replace(/\[PRODUCT\]/gi, product)
      .replace(/\[MORINGA LEAF POWDER\]/gi, product)
      .replace(/\[MORINGA PRODUCTS\]/gi, `${product} range`)
      .replace(/\[COMPANY NAME\]/gi, company)
      .replace(/\[COMPANY, ADDRESS, IEC NUMBER, GST\]/gi, `${company}, Industrial Estate, Madurai, India. IEC: 0719827364, GSTIN: 33AAAAA0000A1Z5`)
      .replace(/\[PLACE\]/gi, origin)
      .replace(/\[MADURAI\]/gi, origin)
      .replace(/\[MADURAI, INDIA\]/gi, origin)
      .replace(/\[COUNTRY\]/gi, country)
      .replace(/\[GERMANY\]/gi, country)
      .replace(/\[EUROPE AND MIDDLE EAST\]/gi, `${country} & Global Markets`)
      .replace(/\[MONTHLY CAPACITY\]/gi, capacity)
      .replace(/\[PACKING SIZES\]/gi, packing)
      .replace(/\[25 KG BAGS\]/gi, packing)
      .replace(/\[25 KG HDPE DRUMS\]/gi, packing)
      .replace(/\[TUTICORIN PORT\]/gi, port)
      .replace(/\[MOQ\]/gi, moq)
      .replace(/\[CERTIFICATES\]/gi, 'APEDA, Organic NPOP & Spices Board');
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(personalizeText(text));
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredPrompts = allPrompts.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slideTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Parameter Customizer Bar */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-emerald-800/60">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-5 pb-4 border-b border-emerald-800/40">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                <SlidersHorizontal className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-white">Interactive Prompt Customizer</h3>
            </div>
            <p className="text-xs text-emerald-200/80 mt-1">
              Enter your product & company specs below. All 20+ prompts instantly update with your parameters!
            </p>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center space-x-1.5 text-xs text-emerald-300 hover:text-white px-3 py-1.5 rounded-lg bg-emerald-800/40 hover:bg-emerald-800/80 border border-emerald-700/50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Handbook Defaults</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
              Your Product Name
            </label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full bg-slate-900/80 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              placeholder="e.g. Cardamom / Coir Pith / Moringa"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-slate-900/80 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              placeholder="e.g. Tamil Agro Exports"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
              Target Country / Market
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-slate-900/80 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              placeholder="e.g. Germany, UAE, USA"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
              Origin City / State
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-slate-900/80 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              placeholder="e.g. Madurai, Tamil Nadu"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
              Monthly Capacity
            </label>
            <input
              type="text"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full bg-slate-900/80 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              placeholder="e.g. 5 Tons per month"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
              Packaging Standard
            </label>
            <input
              type="text"
              value={packing}
              onChange={(e) => setPacking(e.target.value)}
              className="w-full bg-slate-900/80 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              placeholder="e.g. 25 Kg HDPE Bags"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
              Loading Port
            </label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full bg-slate-900/80 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              placeholder="e.g. Tuticorin Port / Chennai Port"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
              Minimum Order Qty (MOQ)
            </label>
            <input
              type="text"
              value={moq}
              onChange={(e) => setMoq(e.target.value)}
              className="w-full bg-slate-900/80 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              placeholder="e.g. 500 Kg or 1 Ton"
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompt templates..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 shadow-sm"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1">
          {['All', 'Market & Money', 'Brand & Marketing', 'Daily Operations', 'Safety & Action Plan'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrompts.map((p) => {
          const personalized = personalizeText(p.text);
          const isCopied = copiedIndex === p.uniqueKey;

          return (
            <div
              key={p.uniqueKey}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    Slide {p.slideNumber} • {p.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Tool: <strong className="text-slate-700">{p.recommendedTool}</strong>
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{p.title}</span>
                </h4>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                  {personalized}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {personalized.length} characters
                </span>
                <button
                  onClick={() => handleCopy(p.text, p.uniqueKey)}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-white hover:bg-emerald-800 shadow-sm'
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
                      <span>Copy Customized Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
