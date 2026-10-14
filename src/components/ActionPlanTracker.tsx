import React, { useState } from 'react';
import { CheckCircle2, Circle, Calendar, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface DayPlan {
  day: number;
  title: string;
  task: string;
  tool: string;
  estimatedMinutes: number;
  outputArtifact: string;
}

const ACTION_DAYS: DayPlan[] = [
  {
    day: 1,
    title: 'Accounts & Core RTCF Formula',
    task: 'Create free accounts on ChatGPT, Claude, and Gemini. Test the R-T-C-F formula with your specific agri/manufactured product parameters.',
    tool: 'ChatGPT, Claude, Gemini',
    estimatedMinutes: 45,
    outputArtifact: 'Validated AI system prompts & account logins',
  },
  {
    day: 2,
    title: 'Product Spec Sheet & SWOT',
    task: 'Draft your buyer-ready 1-page technical product specification sheet with packaging standards, shelf life, and conduct a target country SWOT.',
    tool: 'ChatGPT or Claude',
    estimatedMinutes: 60,
    outputArtifact: '1-page technical spec sheet & SWOT matrix',
  },
  {
    day: 3,
    title: 'Target Markets & Buyer Persona',
    task: 'Shortlist top 3 high-import countries. Extract ideal buyer personas (distributor, supermarket, e-commerce) and 10 search channel queries.',
    tool: 'Claude or Gemini (with web search)',
    estimatedMinutes: 60,
    outputArtifact: 'Top 3 market profiles & 10 search strings',
  },
  {
    day: 4,
    title: 'Export Costing & Multi-Currency Slabs',
    task: 'Build the Ex-Works -> FOB -> CIF pricing calculation sheet. Generate multi-currency price table (USD, EUR, GBP, AED) with 15-day validity.',
    tool: 'Claude (Excel formula builder)',
    estimatedMinutes: 75,
    outputArtifact: 'Export costing model & multi-currency price list',
  },
  {
    day: 5,
    title: 'Brand Name, Tagline & Social Posts',
    task: 'Finalize brand name with linguistic safety checks across 5 languages. Create flat logo concept and 5 B2B LinkedIn/Instagram product posts.',
    tool: 'ChatGPT & Gemini',
    estimatedMinutes: 60,
    outputArtifact: 'Brand identity assets & 5 scheduled social posts',
  },
  {
    day: 6,
    title: 'Pitch Deck, Voice Audio & Website',
    task: 'Generate 10-slide exporter pitch deck, synthesize a 45-second voice overview via NotebookLM, and build a catalog site preview in AI Studio.',
    tool: 'Claude, NotebookLM, Google AI Studio',
    estimatedMinutes: 90,
    outputArtifact: '10-slide deck, audio pitch & live website preview',
  },
  {
    day: 7,
    title: 'Quotation, Checklist & First 10 Emails',
    task: 'Prepare proforma invoice template, pre-shipment document checklist with your CHA, and dispatch 10 personalized cold introduction emails.',
    tool: 'Claude & ChatGPT',
    estimatedMinutes: 90,
    outputArtifact: 'Proforma template, checklist & 10 outreach dispatches',
  },
];

export const ActionPlanTracker: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<number[]>([1]);

  const toggleDay = (day: number) => {
    if (completedDays.includes(day)) {
      setCompletedDays(completedDays.filter((d) => d !== day));
    } else {
      setCompletedDays([...completedDays, day]);
    }
  };

  const progressPercentage = Math.round((completedDays.length / ACTION_DAYS.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-2xl p-6 shadow-lg border border-emerald-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-300 mb-1">
            <Calendar className="w-5 h-5" />
            <span className="text-xs uppercase font-bold tracking-wider">
              Implementation Roadmap
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">Your 7-Day AI Exporter Sprint</h3>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            From zero to sending 10 verified foreign buyer outreach letters in exactly one week.
            Dedicate 60–90 minutes each day.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center min-w-[200px]">
          <span className="text-xs text-emerald-200 block mb-1">Sprint Progress</span>
          <div className="text-2xl font-black text-amber-300">
            {completedDays.length} / {ACTION_DAYS.length} Days
          </div>
          <div className="w-full bg-emerald-950/60 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Days List */}
      <div className="grid grid-cols-1 gap-4">
        {ACTION_DAYS.map((item) => {
          const isDone = completedDays.includes(item.day);

          return (
            <div
              key={item.day}
              onClick={() => toggleDay(item.day)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                isDone
                  ? 'bg-emerald-50/60 border-emerald-300 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <button
                    type="button"
                    className="mt-1 text-emerald-700 hover:scale-110 transition-transform"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                        Day {item.day}
                      </span>
                      <h4
                        className={`text-sm font-bold ${
                          isDone ? 'line-through text-slate-500' : 'text-slate-900'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-medium">
                        (~{item.estimatedMinutes} mins)
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                      {item.task}
                    </p>

                    <div className="pt-2 flex items-center space-x-4 text-[11px] text-slate-500 flex-wrap gap-2">
                      <span className="inline-flex items-center space-x-1 text-emerald-800 font-medium">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Tool: {item.tool}</span>
                      </span>
                      <span className="inline-flex items-center space-x-1 text-slate-600">
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span>Deliverable: <strong>{item.outputArtifact}</strong></span>
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-lg shrink-0 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isDone ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Exporter Safety Warning Callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start space-x-3 text-amber-900">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-amber-950">
            The Golden Rule of AI Trade Safety
          </p>
          <p className="text-amber-800 leading-relaxed">
            AI will not replace exporters. Exporters who use AI will move faster than those who do not.
            However, always verify HS tariff codes, bank routing details, and destination port phytosanitary rules
            with your Customs House Agent (CHA) and Export Promotion Council before signing contracts.
          </p>
        </div>
      </div>
    </div>
  );
};
