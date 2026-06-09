import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  Gauge,
  Coffee,
  Croissant,
  Receipt,
  Package,
  Banknote,
  TrendingUp,
  Target,
  Lightbulb,
  BadgePercent,
  CheckCircle2,
} from 'lucide-react';
import { CONTENT } from './constants';

const SLIDES = [
  'hero',
  'slideCapability',
  'slideAprilThroughput',
  'slideAprilAttach',
  'slideMayBaseline',
  'slideMay27',
  'slideDataMeaning',
  'slideTakeaway',
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
    case 'slideCapability':
      return <SlideCapability />;
    case 'slideAprilThroughput':
      return <SlideAprilThroughput />;
    case 'slideAprilAttach':
      return <SlideAprilAttach />;
    case 'slideMayBaseline':
      return <SlideMayBaseline />;
    case 'slideMay27':
      return <SlideMay27 />;
    case 'slideDataMeaning':
      return <SlideDataMeaning />;
    case 'slideTakeaway':
      return <SlideTakeaway />;
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

const STAT_ICONS = [Receipt, Package, Banknote, Coffee, Croissant];

const SlideHero = () => {
  const { brand, subtitle, consultant } = CONTENT.hero;

  return (
    <div className="presentation-slide hero-cover flex items-center justify-center relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] select-none flex items-center justify-center"
        aria-hidden
      >
        <span className="text-[28rem] font-black text-brand-blue tracking-tighter leading-none">BB</span>
      </div>

      <div className="relative w-full max-w-3xl mx-auto">
        <div className="absolute -inset-px rounded-[2rem] lg:rounded-[2.75rem] bg-gradient-to-br from-amber-200/60 via-white to-brand-blue/20" />
        <div className="relative bg-white/90 backdrop-blur-sm rounded-[2rem] lg:rounded-[2.75rem] shadow-[0_24px_80px_-20px_rgba(52,74,146,0.18)] border border-white px-10 py-14 lg:px-16 lg:py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-10 lg:mb-12">
            <span className="h-px w-12 lg:w-16 bg-gradient-to-l from-transparent to-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/90 shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
            <span className="h-px w-12 lg:w-16 bg-gradient-to-r from-transparent to-brand-blue/30" />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-brand-blue tracking-tight leading-none mb-5 lg:mb-6">
            {brand}
          </h1>

          <p className="text-2xl md:text-3xl lg:text-[2.125rem] font-bold text-brand-blue/75 leading-relaxed max-w-xl mx-auto">
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

const REALITY_STYLES = [
  {
    border: 'border-amber-300/70',
    tagBg: 'bg-amber-100 text-amber-700',
    icon: Gauge,
    iconBg: 'bg-amber-100 text-amber-600',
  },
  {
    border: 'border-brand-blue/20',
    tagBg: 'bg-brand-blue/10 text-brand-blue',
    icon: Activity,
    iconBg: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    border: 'border-emerald-300/70',
    tagBg: 'bg-emerald-100 text-emerald-700',
    icon: Lightbulb,
    iconBg: 'bg-emerald-100 text-emerald-600',
  },
];

const SlideCapability = () => {
  const { title, subtitle, intro, realities, conclusion } = CONTENT.slideCapability;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <p className="text-base lg:text-xl font-bold text-slate-600 mb-4 lg:mb-5 text-right leading-relaxed">
        {intro}
      </p>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 content-center">
        {realities.map((reality, i) => {
          const style = REALITY_STYLES[i];
          const Icon = style.icon;
          return (
            <div
              key={reality.title}
              className={`flex flex-col p-5 lg:p-6 bg-white rounded-2xl border-2 ${style.border} shadow-sm text-right`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${style.iconBg}`}>
                  <Icon size={22} strokeWidth={2.25} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs lg:text-sm font-black ${style.tagBg}`} dir="rtl">
                  {reality.tag}
                </span>
              </div>
              <p className="text-base lg:text-xl font-black text-brand-blue mb-2">{reality.title}</p>
              <p className="text-xs lg:text-sm font-semibold text-slate-600 leading-relaxed">{reality.desc}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-4 lg:mt-5 p-4 lg:p-5 rounded-xl bg-brand-blue text-white text-sm lg:text-lg font-bold text-right leading-relaxed shadow-lg shadow-brand-blue/20">
        {conclusion}
      </p>
    </div>
  );
};

const SlideAprilThroughput = () => {
  const { title, subtitle, avgLabel, peakLabel, stats, body, conclusion } =
    CONTENT.slideAprilThroughput;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <div className="flex-1 flex flex-col gap-3 lg:gap-4 justify-center min-h-0">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 lg:gap-3">
          {stats.map((stat, i) => {
            const Icon = STAT_ICONS[i] ?? Activity;
            return (
              <div
                key={stat.label}
                className="flex flex-col p-3 lg:p-4 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm text-center"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2">
                  <Icon size={18} strokeWidth={2.25} />
                </div>
                <p className="text-[11px] lg:text-xs font-black text-slate-500 mb-1">{stat.label}</p>
                <p className="text-xl lg:text-3xl font-black text-brand-blue leading-none" dir="ltr">
                  {stat.avg}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-center gap-1">
                  <TrendingUp size={13} className="text-emerald-500 shrink-0" />
                  <span className="text-xs lg:text-sm font-black text-emerald-600" dir="ltr">
                    {stat.peak}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-5 lg:gap-8 text-xs lg:text-sm font-bold text-slate-500">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-blue inline-block" />
            {avgLabel}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            {peakLabel}
          </span>
        </div>

        <p className="text-sm lg:text-lg font-bold text-slate-600 text-right leading-relaxed p-4 lg:p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
          {body}
        </p>
      </div>
      <p className="mt-3 lg:mt-4 p-4 lg:p-5 rounded-xl bg-amber-50 border border-amber-200 text-sm lg:text-base font-bold text-amber-800 text-right leading-relaxed">
        {conclusion}
      </p>
    </div>
  );
};

const SlideAprilAttach = () => {
  const { title, subtitle, attachments, highlight, body, conclusion } = CONTENT.slideAprilAttach;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <div className="flex-1 flex flex-col gap-3 lg:gap-4 justify-center min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          {attachments.map((item) => (
            <div
              key={item.label}
              className="p-5 lg:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm text-right"
            >
              <p className="text-sm lg:text-base font-black text-slate-600 mb-3">{item.label}</p>
              <p className="text-4xl lg:text-5xl font-black text-brand-blue mb-4" dir="ltr">
                {item.display}
              </p>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden" dir="ltr">
                <div
                  className="h-full bg-gradient-to-r from-brand-blue to-amber-400 rounded-full"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 p-4 lg:p-5 bg-amber-50 rounded-2xl border-2 border-amber-200 text-right">
          <div className="flex items-center gap-1 shrink-0" dir="ltr">
            {Array.from({ length: 10 }).map((_, i) => (
              <Coffee
                key={i}
                size={20}
                strokeWidth={2.5}
                className={i < 6 ? 'text-amber-500' : 'text-slate-300'}
              />
            ))}
          </div>
          <p className="text-sm lg:text-lg font-black text-amber-800 leading-snug">{highlight}</p>
        </div>

        <p className="text-sm lg:text-base font-bold text-slate-600 text-right leading-relaxed p-4 lg:p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
          {body}
        </p>
      </div>
      <p className="mt-3 lg:mt-4 p-4 lg:p-5 rounded-xl bg-brand-blue/5 border border-brand-blue/10 text-sm lg:text-base font-bold text-brand-blue text-right leading-relaxed">
        {conclusion}
      </p>
    </div>
  );
};

const SlideMayBaseline = () => {
  const { title, subtitle, avgLabel, stats, attachments, body, conclusion } =
    CONTENT.slideMayBaseline;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <div className="flex-1 flex flex-col gap-3 lg:gap-4 justify-center min-h-0">
        <p className="text-xs lg:text-sm font-black text-slate-400 text-right uppercase tracking-wide">
          {avgLabel} — مقارنةً بمتوسط أبريل
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 lg:gap-3">
          {stats.map((stat, i) => {
            const Icon = STAT_ICONS[i] ?? Activity;
            return (
              <div
                key={stat.label}
                className="flex flex-col p-3 lg:p-4 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm text-center"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-2">
                  <Icon size={18} strokeWidth={2.25} />
                </div>
                <p className="text-[11px] lg:text-xs font-black text-slate-500 mb-1">{stat.label}</p>
                <p className="text-xl lg:text-3xl font-black text-brand-blue leading-none" dir="ltr">
                  {stat.value}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-1" dir="ltr">
                    <div
                      className="h-full bg-brand-blue/60 rounded-full"
                      style={{ width: `${stat.ratio}%` }}
                    />
                  </div>
                  <p className="text-[10px] lg:text-[11px] font-bold text-slate-400">
                    أبريل: <span dir="ltr">{stat.aprilAvg}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3">
          {attachments.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3 p-3 lg:p-4 bg-slate-50 rounded-xl border border-slate-100 text-right"
            >
              <span className="text-2xl lg:text-3xl font-black text-brand-blue shrink-0" dir="ltr">
                {item.display}
              </span>
              <span className="text-xs lg:text-sm font-black text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>

        <p className="text-sm lg:text-base font-bold text-slate-600 text-right leading-relaxed p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
          {body}
        </p>
      </div>
      <p className="mt-3 lg:mt-4 p-4 lg:p-5 rounded-xl bg-brand-blue text-white text-sm lg:text-base font-bold text-right leading-relaxed shadow-lg shadow-brand-blue/20">
        {conclusion}
      </p>
    </div>
  );
};

const SlideMay27 = () => {
  const { title, subtitle, bundle, stats, attachments, conclusion } = CONTENT.slideMay27;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <div className="flex-1 flex flex-col gap-3 lg:gap-4 justify-center min-h-0">
        <div className="flex items-center gap-4 lg:gap-5 p-4 lg:p-5 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-600/20 text-right">
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <BadgePercent size={26} strokeWidth={2.25} />
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-black leading-none mb-1">{bundle.price}</p>
            <p className="text-sm lg:text-base font-bold text-white/85">{bundle.desc}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 lg:gap-3">
          {stats.map((stat, i) => {
            const Icon = STAT_ICONS[i] ?? Activity;
            return (
              <div
                key={stat.label}
                className="flex flex-col p-3 lg:p-4 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm text-center"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <Icon size={18} strokeWidth={2.25} />
                </div>
                <p className="text-[11px] lg:text-xs font-black text-slate-500 mb-1">{stat.label}</p>
                <p className="text-xl lg:text-3xl font-black text-brand-blue leading-none" dir="ltr">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3">
          {attachments.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3 p-3 lg:p-4 bg-slate-50 rounded-xl border border-slate-100 text-right"
            >
              <span className="text-2xl lg:text-3xl font-black text-emerald-600 shrink-0" dir="ltr">
                {item.display}
              </span>
              <span className="text-xs lg:text-sm font-black text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 lg:mt-4 p-4 lg:p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm lg:text-base font-bold text-emerald-800 text-right leading-relaxed">
        {conclusion}
      </p>
    </div>
  );
};

const PILLAR_STYLES = [
  { icon: Gauge, bg: 'bg-amber-100 text-amber-600', tag: 'bg-amber-100 text-amber-700', border: 'border-amber-300/70' },
  { icon: Activity, bg: 'bg-brand-blue/10 text-brand-blue', tag: 'bg-brand-blue/10 text-brand-blue', border: 'border-brand-blue/20' },
  { icon: Target, bg: 'bg-emerald-100 text-emerald-600', tag: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-300/70' },
];

const SlideDataMeaning = () => {
  const { title, pillars, body, conclusion } = CONTENT.slideDataMeaning;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <div className="flex-1 flex flex-col gap-4 lg:gap-5 justify-center min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
          {pillars.map((pillar, i) => {
            const style = PILLAR_STYLES[i];
            const Icon = style.icon;
            return (
              <div
                key={pillar.title}
                className={`flex flex-col items-center p-5 lg:p-7 bg-white rounded-2xl border-2 ${style.border} shadow-sm text-center`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${style.bg}`}>
                  <Icon size={28} strokeWidth={2.25} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black mb-3 ${style.tag}`}>
                  {pillar.tag}
                </span>
                <p className="text-lg lg:text-2xl font-black text-brand-blue mb-2">{pillar.title}</p>
                <p className="text-xs lg:text-sm font-semibold text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        <p className="text-sm lg:text-lg font-bold text-slate-600 text-right leading-relaxed p-5 lg:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
          {body}
        </p>
      </div>
      <p className="mt-3 lg:mt-4 p-4 lg:p-5 rounded-xl bg-brand-blue text-white text-sm lg:text-lg font-bold text-right leading-relaxed shadow-lg shadow-brand-blue/20">
        {conclusion}
      </p>
    </div>
  );
};

const SlideTakeaway = () => {
  const { title, blocks, finalStatement } = CONTENT.slideTakeaway;

  return (
    <div className="presentation-slide flex flex-col justify-center">
      <SlideHeader title={title} />
      <div className="flex flex-col gap-4 lg:gap-6">
        {blocks.map((block, i) => (
          <p
            key={i}
            className="text-base lg:text-xl font-semibold text-slate-600 leading-relaxed text-right p-5 lg:p-7 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            {block}
          </p>
        ))}

        <div className="flex items-start gap-4 p-5 lg:p-7 bg-brand-blue text-white rounded-2xl shadow-xl shadow-brand-blue/25 text-right">
          <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 size={24} strokeWidth={2.25} />
          </div>
          <p className="text-base lg:text-xl font-black leading-relaxed">{finalStatement}</p>
        </div>
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
