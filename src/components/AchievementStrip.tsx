import React from 'react';
import { 
  Award, 
  GraduationCap, 
  BookCheck, 
  ShieldCheck, 
  Building2, 
  Sparkles 
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export const AchievementStrip: React.FC = () => {
  const verifiedStats = [
    {
      icon: Award,
      metric: "30 Years",
      label: "Educational Heritage",
      desc: "Serving Bari & Raisen Since 1996"
    },
    {
      icon: ShieldCheck,
      metric: "CBSE No. 1030760",
      label: "Affiliation Status",
      desc: "Up to Senior Secondary (Code: 50723)"
    },
    {
      icon: GraduationCap,
      metric: "100% Pass",
      label: "CBSE Board Success",
      desc: "Consistent 1st Division Results"
    },
    {
      icon: Building2,
      metric: "NextERP",
      label: "Smart Campus",
      desc: "100% Digital Classrooms & App"
    },
    {
      icon: BookCheck,
      metric: "50+ Mentors",
      label: "Expert Educators",
      desc: "Child-Centric Caring Faculty"
    }
  ];

  return (
    <section className="bg-gradient-to-r from-[#061426] via-[#0a1d37] to-[#0d274a] text-white py-14 border-y border-white/10 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Verification Subtitle */}
        <div className="flex items-center justify-center gap-2 mb-10 text-center">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs sm:text-sm font-bold text-amber-300 tracking-wider uppercase">
            Official Accreditations & Verified Institutional Benchmarks
          </span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {verifiedStats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {item.metric}
                </div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wide mt-1">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
