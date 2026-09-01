import React from 'react';
import { 
  Clock, 
  Award, 
  Monitor, 
  GraduationCap, 
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { HIGHLIGHT_STATS, SCHOOL_INFO } from '../data/schoolData';

export const Highlights: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-6 h-6 text-amber-500" />;
      case 'Award':
        return <Award className="w-6 h-6 text-amber-500" />;
      case 'Monitor':
        return <Monitor className="w-6 h-6 text-amber-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-amber-500" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-amber-500" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {HIGHLIGHT_STATS.map((stat, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center text-center p-2 sm:p-3 transition-transform hover:-translate-y-1 duration-200 ${
                index > 0 ? 'pt-4 sm:pt-2' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mb-3 shadow-xs">
                {getIcon(stat.icon)}
              </div>
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                {stat.label}
              </span>
              <div className="text-xl sm:text-2xl font-black text-[#0a1d37] tracking-tight mt-0.5">
                {stat.value}
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-snug">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
