import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  GraduationCap,
  Award,
  Play
} from 'lucide-react';
import { HERO_SLIDES, SCHOOL_INFO } from '../data/schoolData';

interface HeroProps {
  onOpenApplyModal: () => void;
  onOpenVisitModal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenApplyModal,
  onOpenVisitModal,
  onNavigate
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section 
      id="home" 
      className="relative min-h-[580px] lg:min-h-[680px] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#08182b]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image Carousel with Overlay */}
      {HERO_SLIDES.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
          />
          {/* Multi-stage High-Contrast Overlay for pristine typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071526]/95 via-[#081b33]/85 to-[#0b2447]/60"></div>
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/60"></div>
        </div>
      ))}

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-8 text-white space-y-6">
            
            {/* Top Admission Badge */}
            <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/10 border border-amber-400/40 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
              </span>
              <span className="text-amber-300 font-extrabold text-xs sm:text-sm tracking-wide uppercase">
                {slide.badge || "ADMISSIONS OPEN 2026–27"}
              </span>
              <span className="text-slate-300 text-xs hidden sm:inline">• Pre-Primary to Class XII</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                {currentSlide === 0 ? (
                  <>
                    A Place Where Learning <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">
                      Becomes a Journey.
                    </span>
                  </>
                ) : (
                  slide.title
                )}
              </h1>
              
              <p className="text-amber-200/90 font-medium text-sm sm:text-base tracking-wide flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>M.P. Convent School, Bari (Raisen) • Affiliated to CBSE, New Delhi</span>
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-slate-200 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal">
              {slide.description}
            </p>

            {/* Key Feature Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30 Yrs Academic Legacy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Digital Smart Classes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Composite Science Labs</span>
              </div>
            </div>

            {/* CTA Buttons Group */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onOpenApplyModal}
                id="hero-apply-btn"
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-navy-950 font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-xl hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer"
              >
                <span>Apply Online 2026–27</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenVisitModal}
                id="hero-visit-btn"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Book a Campus Visit</span>
              </button>

              <button
                onClick={() => onNavigate('campus')}
                className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-amber-300 underline underline-offset-4 transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Explore Campus Facilities</span>
              </button>
            </div>
          </div>

          {/* Right Column: Quick CBSE & Admission Highlight Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl text-white space-y-5">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">CBSE Affiliation</h3>
                    <p className="text-xs text-amber-300 font-medium">Affiliation No: 1030760</p>
                  </div>
                </div>
                <span className="text-[11px] bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                  Senior Sec.
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-[#08182b]/60 p-3 rounded-xl border border-white/5 space-y-1">
                  <div className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Managing Society</div>
                  <div className="text-white font-medium">{SCHOOL_INFO.managingSociety}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#08182b]/60 p-3 rounded-xl border border-white/5">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Classes</div>
                    <div className="text-amber-400 font-bold text-sm">Nursery to XII</div>
                  </div>
                  <div className="bg-[#08182b]/60 p-3 rounded-xl border border-white/5">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">School Code</div>
                    <div className="text-amber-400 font-bold text-sm">{SCHOOL_INFO.schoolCode}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('admissions')}
                  className="w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs py-2.5 rounded-xl shadow transition-all"
                >
                  View Admission Criteria & Fees →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators & Navigation Arrows */}
        <div className="flex items-center justify-between pt-10 border-t border-white/10 mt-10">
          <div className="flex items-center space-x-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setIsAutoPlaying(false); setCurrentSlide(idx); }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-8 bg-amber-400 shadow-md' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
