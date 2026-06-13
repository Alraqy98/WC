import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sticker,
  Gift,
  Trophy,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Globe2,
  CalendarDays,
  Layers,
  Repeat,
  CheckCircle2,
  Ticket,
  ClipboardList,
  Palette,
  Star,
  Coffee,
} from 'lucide-react';
import { CONTENT } from './constants';

const SLIDES = [
  'hero',
  'overview',
  'offer',
  'groups',
  'rewards',
  'journey',
  'requirements',
  'rules',
  'approve',
  'thanks',
] as const;

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isPdfMode =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('pdf');

  const paginate = useCallback((newDirection: number) => {
    const next = currentSlide + newDirection;
    if (next >= 0 && next < SLIDES.length) {
      setCurrentSlide(next);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(-1);
      if (e.key === 'ArrowLeft') paginate(1);
      if (e.key === ' ') paginate(1);
      if (e.key === 'Backspace') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  if (isPdfMode) {
    return (
      <div className="pdf-deck bg-brand-light text-brand-dark font-sans rtl">
        {SLIDES.map((slideId, index) => (
          <section key={`${slideId}-${index}`} className="pdf-page" data-pdf-slide={slideId}>
            <div className="pdf-slide-shell">
              <div className="pdf-scale">{renderSlide(index)}</div>
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-brand-light text-brand-dark overflow-hidden selection:bg-brand-orange selection:text-white font-sans flex flex-col rtl">
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      <div className="fixed -top-24 -right-24 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <main
        className="relative flex-grow overflow-hidden cursor-pointer"
        onClick={(e) => {
          if (
            (e.target as HTMLElement).closest('button') ||
            (e.target as HTMLElement).closest('a')
          )
            return;
          paginate(1);
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
          <div className="w-full h-full max-w-7xl flex items-center justify-center">
            {renderSlide(currentSlide)}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50 p-12 flex justify-between items-end pointer-events-none">
        <div className="flex gap-4 pointer-events-auto">
          <button
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center opacity-30 hover:opacity-100 hover:bg-slate-50 disabled:opacity-30 border border-slate-100"
          >
            <ArrowRight size={24} className="text-brand-blue" />
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={currentSlide === SLIDES.length - 1}
            className="w-14 h-14 rounded-2xl bg-brand-blue shadow-xl shadow-brand-blue/20 flex items-center justify-center opacity-30 hover:opacity-100 disabled:opacity-30 border border-brand-blue"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
        </div>
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase">
            Slide {currentSlide + 1} / {SLIDES.length}
          </span>
        </div>
      </footer>
    </div>
  );
}

function renderSlide(index: number) {
  switch (SLIDES[index]) {
    case 'hero':
      return <SlideHero />;
    case 'overview':
      return <SlideOverview />;
    case 'offer':
      return <SlideOffer />;
    case 'groups':
      return <SlideGroups />;
    case 'rewards':
      return <SlideRewards />;
    case 'journey':
      return <SlideJourney />;
    case 'requirements':
      return <SlideRequirements />;
    case 'rules':
      return <SlideRules />;
    case 'approve':
      return <SlideApprove />;
    case 'thanks':
      return <SlideThanks />;
    default:
      return null;
  }
}

function SlideHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="shrink-0 text-right border-b-2 border-slate-100 pb-3 lg:pb-4 mb-4 lg:mb-6">
      <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-black text-brand-blue leading-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1 text-base lg:text-xl font-bold text-slate-500">{subtitle}</p>
      ) : null}
      <div className="mt-2 h-1 w-16 lg:w-24 bg-amber-400 rounded-full mr-0 ml-auto" />
    </div>
  );
}

const SlideHero = () => {
  const { brand, subtitle, consultant } = CONTENT.hero;

  return (
    <div className="presentation-slide hero-cover flex items-center justify-center relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] select-none flex items-center justify-center"
        aria-hidden
      >
        <Trophy className="text-brand-blue" style={{ width: '26rem', height: '26rem' }} strokeWidth={1} />
      </div>

      <div className="relative w-full max-w-3xl mx-auto">
        <div className="absolute -inset-px rounded-[2rem] lg:rounded-[2.75rem] bg-gradient-to-br from-amber-200/60 via-white to-brand-blue/20" />
        <div className="relative bg-white/90 backdrop-blur-sm rounded-[2rem] lg:rounded-[2.75rem] shadow-[0_24px_80px_-20px_rgba(52,74,146,0.18)] border border-white px-10 py-14 lg:px-16 lg:py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-10 lg:mb-12">
            <span className="h-px w-12 lg:w-16 bg-gradient-to-l from-transparent to-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/90 shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
            <span className="h-px w-12 lg:w-16 bg-gradient-to-r from-transparent to-brand-blue/30" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-blue tracking-tight leading-tight mb-5 lg:mb-6">
            {brand}
          </h1>

          <p className="text-xl md:text-2xl lg:text-[1.875rem] font-bold text-brand-blue/75 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="mt-10 lg:mt-12 pt-8 lg:pt-10 border-t border-slate-100/90">
            <p className="text-base lg:text-lg font-semibold text-slate-600 tracking-wide">{consultant}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OVERVIEW_ICONS = [TrendingUp, Sparkles, Globe2, ShieldCheck];

const SlideOverview = () => {
  const { title, subtitle, intro, objectives, note } = CONTENT.overview;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <p className="text-sm lg:text-lg font-bold text-slate-600 mb-4 lg:mb-5 text-right leading-relaxed">
        {intro}
      </p>
      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 content-center">
        {objectives.map((obj, i) => {
          const Icon = OVERVIEW_ICONS[i] ?? Sparkles;
          return (
            <div
              key={obj.title}
              className="flex flex-col p-4 lg:p-5 bg-white rounded-2xl border-2 border-slate-100 shadow-sm text-right"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-3">
                <Icon size={22} strokeWidth={2.25} />
              </div>
              <p className="text-base lg:text-lg font-black text-brand-blue mb-1.5">{obj.title}</p>
              <p className="text-xs lg:text-sm font-semibold text-slate-600 leading-relaxed">{obj.desc}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-4 lg:mt-5 p-4 lg:p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm lg:text-base font-bold text-emerald-800 text-right leading-relaxed">
        {note}
      </p>
    </div>
  );
};

const SlideOffer = () => {
  const { title, subtitle, bundle, options, note } = CONTENT.offer;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <div className="flex-1 flex flex-col gap-4 lg:gap-5 justify-center min-h-0">
        <div className="flex items-center gap-4 lg:gap-5 p-5 lg:p-6 bg-brand-blue text-white rounded-2xl shadow-lg shadow-brand-blue/20 text-right">
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
            <Coffee size={30} strokeWidth={2.25} />
          </div>
          <div>
            <p className="text-2xl lg:text-4xl font-black leading-none mb-1.5">{bundle.price}</p>
            <p className="text-sm lg:text-lg font-bold text-white/85 leading-relaxed">{bundle.desc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
          {options.map((opt) => (
            <div
              key={opt.tag}
              className="flex flex-col p-4 lg:p-5 bg-white rounded-2xl border-2 border-slate-100 shadow-sm text-right"
            >
              <span className="self-start px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs lg:text-sm font-black mb-3">
                {opt.tag}
              </span>
              <p className="text-base lg:text-lg font-black text-brand-blue mb-1.5">{opt.title}</p>
              <p className="text-xs lg:text-sm font-semibold text-slate-600 leading-relaxed">{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 lg:mt-5 p-4 lg:p-5 rounded-xl bg-brand-blue/5 border border-brand-blue/10 text-sm lg:text-base font-bold text-brand-blue text-right leading-relaxed">
        {note}
      </p>
    </div>
  );
};

const SlideGroups = () => {
  const { title, subtitle, intro, groups, note } = CONTENT.groups;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 items-center min-h-0">
        <div className="md:col-span-2 flex items-center justify-center h-full">
          <img
            src="/wc-collection-map.png"
            alt="بطاقة جمع الملصقات — ست مجموعات"
            className="max-h-[56vh] w-auto rounded-2xl shadow-xl border border-slate-100 object-contain"
          />
        </div>
        <div className="md:col-span-3 flex flex-col gap-3 lg:gap-4">
          <p className="text-sm lg:text-lg font-bold text-slate-600 text-right leading-relaxed">
            {intro}
          </p>
          <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
            {groups.map((group, i) => (
              <div
                key={group}
                className="flex items-center gap-2.5 lg:gap-3 p-3 lg:p-3.5 bg-white rounded-xl lg:rounded-2xl border-2 border-slate-100 shadow-sm text-right"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 font-black text-sm lg:text-base">
                  {i + 1}
                </div>
                <span className="flex-1 text-xs lg:text-base font-black text-brand-blue leading-snug">
                  {group}
                </span>
                <Sticker size={18} className="text-amber-400 shrink-0" strokeWidth={2.25} />
              </div>
            ))}
          </div>
          <p className="p-3.5 lg:p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs lg:text-sm font-bold text-slate-600 text-right leading-relaxed">
            {note}
          </p>
        </div>
      </div>
    </div>
  );
};

const REWARD_ICONS = [Gift, Layers, Star, Trophy];
const REWARD_STYLES = [
  'bg-emerald-100 text-emerald-600',
  'bg-brand-blue/10 text-brand-blue',
  'bg-amber-100 text-amber-600',
  'bg-amber-400 text-brand-dark',
];

const SlideRewards = () => {
  const { title, subtitle, intro, tiers, note } = CONTENT.rewards;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <p className="text-sm lg:text-lg font-bold text-slate-600 mb-4 lg:mb-5 text-right leading-relaxed">
        {intro}
      </p>
      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 content-center">
        {tiers.map((tier, i) => {
          const Icon = REWARD_ICONS[i] ?? Gift;
          return (
            <div
              key={tier.tag}
              className="flex flex-col p-4 lg:p-5 bg-white rounded-2xl border-2 border-slate-100 shadow-sm text-right"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${REWARD_STYLES[i]}`}>
                <Icon size={22} strokeWidth={2.25} />
              </div>
              <span className="text-[11px] lg:text-xs font-black text-slate-400 mb-1">{tier.tag}</span>
              <p className="text-sm lg:text-base font-black text-brand-blue mb-1.5">{tier.title}</p>
              <p className="text-xs lg:text-sm font-semibold text-slate-600 leading-relaxed">{tier.desc}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 lg:mt-5 flex items-start gap-4 p-4 lg:p-5 rounded-xl bg-amber-50 border-2 border-amber-200 text-right">
        <Sparkles size={22} className="text-amber-500 shrink-0 mt-0.5" strokeWidth={2.25} />
        <p className="text-sm lg:text-base font-bold text-amber-800 leading-relaxed">{note}</p>
      </div>
    </div>
  );
};

const SlideJourney = () => {
  const { title, subtitle, steps } = CONTENT.journey;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <div className="flex-1 flex flex-col gap-4 lg:gap-5 justify-center min-h-0">
        <img
          src="/wc-journey-banner.png"
          alt="رحلة العميل — اشترِ الباقة، خذ الملصق، أكمل المجموعة، افتح المكافأة"
          className="w-full max-h-[38vh] object-contain rounded-2xl shadow-lg border border-slate-100"
        />
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 lg:gap-3 list-none m-0 p-0">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-2.5 lg:gap-3 p-3 lg:p-3.5 bg-white rounded-xl border border-slate-100 shadow-sm text-right"
            >
              <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-lg bg-brand-blue text-white flex items-center justify-center shrink-0 font-black text-xs lg:text-sm">
                {i + 1}
              </div>
              <span className="flex-1 text-[11px] lg:text-sm font-bold text-slate-700 leading-snug">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SlideRequirements = () => {
  const { title, subtitle, materials, design, note } = CONTENT.requirements;
  const materialIcons = [Globe2, Palette, ClipboardList, Ticket, ClipboardList, Sparkles];

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 content-center min-h-0">
        <div className="flex flex-col gap-2 lg:gap-2.5">
          <p className="text-[11px] lg:text-xs font-black text-slate-400 uppercase tracking-wide text-right">
            المواد المطلوبة
          </p>
          {materials.map((item, i) => {
            const Icon = materialIcons[i] ?? CheckCircle2;
            return (
              <div
                key={item}
                className="flex items-center gap-3 p-2.5 lg:p-3 bg-white rounded-xl border border-slate-100 shadow-sm text-right"
              >
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                  <Icon size={16} strokeWidth={2.25} />
                </div>
                <span className="text-xs lg:text-sm font-bold text-slate-700 leading-snug">{item}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2.5 lg:gap-3">
          <p className="text-[11px] lg:text-xs font-black text-slate-400 uppercase tracking-wide text-right">
            طبقتا الملصقات
          </p>
          <img
            src="/wc-stickers.png"
            alt="ورقة ملصقات الدول — إصدار محدود"
            className="w-full max-h-[26vh] object-contain rounded-2xl border border-slate-100 shadow-md bg-white"
          />
          {design.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-2.5 p-2.5 lg:p-3 bg-white rounded-xl border border-amber-200/70 shadow-sm text-right"
            >
              <Sticker size={16} className="text-amber-500 shrink-0" strokeWidth={2.25} />
              <p className="text-xs lg:text-sm font-black text-brand-blue shrink-0">{item.title}</p>
              <span className="text-[11px] lg:text-xs font-semibold text-slate-600 leading-snug">{item.desc}</span>
            </div>
          ))}
          <p className="p-2.5 lg:p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] lg:text-xs font-bold text-emerald-800 text-right leading-relaxed">
            {note}
          </p>
        </div>
      </div>
    </div>
  );
};

const SlideRules = () => {
  const { title, subtitle, items } = CONTENT.rules;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <ul className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2.5 lg:gap-3 list-none m-0 p-0 content-center">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 p-3.5 lg:p-4 bg-white rounded-xl border border-slate-100 shadow-sm text-right"
          >
            <CheckCircle2 size={20} className="text-emerald-500 shrink-0" strokeWidth={2.5} />
            <span className="flex-1 text-xs lg:text-base font-bold text-slate-700 leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const REASON_ICONS = [TrendingUp, Repeat, CalendarDays];

const SlideApprove = () => {
  const { title, subtitle, reasons, recommendation, finalStatement } = CONTENT.approve;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 content-center min-h-0">
        <div className="flex flex-col gap-2 lg:gap-2.5">
          <p className="text-[11px] lg:text-xs font-black text-slate-400 uppercase tracking-wide text-right">
            لماذا نعتمده
          </p>
          {reasons.map((reason, i) => {
            const Icon = REASON_ICONS[i] ?? CheckCircle2;
            return (
              <div
                key={reason.title}
                className="flex items-center gap-3 p-3 lg:p-3.5 bg-white rounded-xl border border-slate-100 shadow-sm text-right"
              >
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Icon size={18} strokeWidth={2.25} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs lg:text-base font-black text-brand-blue">{reason.title}</p>
                  <p className="text-[11px] lg:text-sm font-semibold text-slate-600 leading-snug">{reason.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 lg:gap-2.5">
          <p className="text-[11px] lg:text-xs font-black text-slate-400 uppercase tracking-wide text-right">
            النسخة الموصى بها
          </p>
          {recommendation.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 p-2.5 lg:p-3 bg-white rounded-xl border border-slate-100 shadow-sm text-right"
            >
              <Star size={16} className="text-amber-400 shrink-0" strokeWidth={2.5} />
              <span className="text-[11px] lg:text-sm font-bold text-slate-700 leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 lg:mt-5 flex items-start gap-4 p-4 lg:p-6 bg-brand-blue text-white rounded-2xl shadow-xl shadow-brand-blue/25 text-right">
        <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 size={24} strokeWidth={2.25} />
        </div>
        <p className="text-sm lg:text-xl font-black leading-relaxed">{finalStatement}</p>
      </div>
    </div>
  );
};

const SlideThanks = () => {
  const content = CONTENT.thanks;

  return (
    <div className="presentation-slide flex flex-col items-center justify-center text-center space-y-10 lg:space-y-16 py-8 lg:py-12">
      <div className="space-y-4 lg:space-y-8">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-brand-blue tracking-tighter leading-none italic">
          {content.title}
        </h2>
        <p className="text-lg md:text-2xl lg:text-3xl font-bold text-brand-orange italic max-w-4xl mx-auto leading-relaxed px-4">
          {content.subtitle}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 pt-4 lg:pt-8">
        <div className="h-px w-16 bg-brand-orange/30" />
        <span className="thanks-contact-name text-xl md:text-2xl lg:text-3xl font-semibold text-brand-blue/80 italic">
          {content.contact}
        </span>
        <div className="h-px w-16 bg-brand-orange/30" />
      </div>
    </div>
  );
};
