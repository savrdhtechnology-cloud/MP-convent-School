import React from 'react';
import { 
  Users, 
  Laptop, 
  FlaskConical, 
  Trophy, 
  ShieldCheck, 
  Smartphone,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { WHY_CHOOSE_CARDS } from '../data/schoolData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-6 h-6 text-amber-600" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-amber-600" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-amber-600" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-amber-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-amber-600" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-amber-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <section id="why-choose" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-48 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300/60 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>The MP Convent Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Why Choose MP Convent School?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Holistic Education for a Better Tomorrow — Nurturing academic brilliance, ethical character, and innovative skills since 1996.
          </p>
        </div>

        {/* 6 Premium Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_CHOOSE_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                {/* Icon with Glowing Badge */}
                <div className="w-14 h-14 rounded-xl bg-amber-50 group-hover:bg-amber-500/15 border border-amber-200 group-hover:border-amber-400 flex items-center justify-center mb-6 transition-colors duration-300">
                  {getIcon(card.icon)}
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#0a1d37] group-hover:text-blue-900 transition-colors mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {card.description}
                </p>
              </div>

              {/* Highlights Pill Tags */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {card.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center text-xs text-slate-700 font-medium gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
