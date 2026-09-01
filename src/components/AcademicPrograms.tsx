import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  GraduationCap, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '../data/schoolData';

interface AcademicProgramsProps {
  onOpenApplyModal: () => void;
}

export const AcademicPrograms: React.FC<AcademicProgramsProps> = ({ onOpenApplyModal }) => {
  const [selectedProgram, setSelectedProgram] = useState<typeof ACADEMIC_PROGRAMS[0] | null>(null);

  return (
    <section id="academics" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-extrabold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
              <span>CBSE Curriculum Structure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
              Our Academic Programs
            </h2>
            <p className="text-base text-slate-600 font-medium">
              Structured progressive learning paths from early foundational exploration to Senior Secondary CBSE board excellence.
            </p>
          </div>

          <div>
            <button
              onClick={onOpenApplyModal}
              className="inline-flex items-center gap-2 bg-[#0a1d37] hover:bg-[#122e54] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
            >
              <span>Admissions 2026–27 Open</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* 4 Large Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {ACADEMIC_PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col group"
            >
              {/* Image with Class Badge */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-3 left-3 bg-amber-500 text-navy-950 font-black text-xs px-2.5 py-1 rounded-md shadow-md">
                  {program.ageGroup}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">{program.classes}</div>
                  <h3 className="text-lg font-extrabold leading-tight text-white">{program.name}</h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-blue-900 bg-blue-50/70 p-2 rounded-lg border border-blue-100/80">
                    "{program.tagline}"
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="w-full flex items-center justify-between text-xs font-bold text-[#0a1d37] hover:text-amber-700 transition-colors py-1 group-hover:translate-x-0.5"
                  >
                    <span>Explore Curriculum Details</span>
                    <span className="text-amber-600 font-extrabold text-sm">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Program Modal */}
        {selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {selectedProgram.classes}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0a1d37] mt-1">
                    {selectedProgram.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedProgram.ageGroup} • {selectedProgram.curriculum}</p>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Pedagogical Overview</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedProgram.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Key Highlights & Methodologies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProgram.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Admissions for Session 2026–27 Open</span>
                  </div>
                  <p>
                    Seats are allotted on a first-come, first-served basis following CBSE age eligibility norms. Registration kits available at school office.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedProgram(null);
                    onOpenApplyModal();
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-sm py-3 rounded-xl shadow text-center"
                >
                  Apply Online for {selectedProgram.name}
                </button>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-5 py-3 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
