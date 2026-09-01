import React from 'react';
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  GraduationCap 
} from 'lucide-react';
import { BOARD_RESULTS_DATA } from '../data/schoolData';

export const ResultsSection: React.FC = () => {
  return (
    <section id="results" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>Academic Excellence & Accolades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Achievements & Results
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Celebrating consistent 100% CBSE board pass records, district toppers, and multifaceted athletic triumphs.
          </p>
        </div>

        {/* Board Examination Results Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {BOARD_RESULTS_DATA.map((res, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 transform hover:-translate-y-1.5 shadow-sm hover:shadow-xl ${
                idx === 0 
                  ? 'border-amber-400/80 ring-2 ring-amber-400/20' 
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <span className="text-xs font-black text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg">
                  CBSE Batch {res.year}
                </span>
                {idx === 0 && (
                  <span className="text-[11px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>Latest Session</span>
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Class X Pass</span>
                    <div className="text-2xl font-black text-emerald-600">{res.classXPass}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Class XII Pass</span>
                    <div className="text-2xl font-black text-emerald-600">{res.classXIIPass}</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Class X Highest Score:</span>
                    <span className="font-extrabold text-slate-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{res.classXTopper}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Class XII Highest Score:</span>
                    <span className="font-extrabold text-slate-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{res.classXIITopper}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Students with Distinction:</span>
                    <span className="font-bold text-blue-900">{res.distinctions} of Batch</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Co-Curricular & Sports Triumphs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#0a1d37]">
                Sports, Olympiads & Cultural Distinctions
              </h3>
              <p className="text-xs text-slate-500">District & State Level Recognitions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-700">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Inter-School Cricket Championship</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Senior Boys Cricket Team clinched 1st position in the Raisen District Inter-School Tournament.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>State Science Exhibition Winner</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Class IX student innovators won the Gold Model Award for solar-powered automated irrigation prototype.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>National Cyber Olympiad (NCO)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                8 students secured School Gold Medals and State Rank under top 50 in computer reasoning.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
