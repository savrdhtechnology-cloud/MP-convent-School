import React, { useState } from 'react';
import { 
  Users, 
  Quote, 
  ArrowRight, 
  X, 
  Award, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { LEADERSHIP } from '../data/schoolData';
import { LeadershipMember } from '../types';
import directorImg from '../assets/images/mahindra_pratap_dubey_original-v2.jpg';

export const LeadershipSection: React.FC = () => {
  const [selectedLeader, setSelectedLeader] = useState<LeadershipMember | null>(null);

  const getLeaderPhoto = (leader: LeadershipMember) => {
    if (leader.name.includes('Dubey') && leader.designation.toLowerCase().includes('director')) {
      return directorImg;
    }
    return leader.image;
  };

  return (
    <section id="leadership" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span>Guiding Visionaries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Leadership at MP Convent
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Meet the experienced educational leaders steering academic excellence, institutional integrity, and holistic student growth.
          </p>
        </div>

        {/* 2 Leadership Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {LEADERSHIP.map((leader, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
            >
              {/* Leader Photo Column */}
              <div className="md:w-5/12 relative h-64 md:h-auto bg-slate-200 overflow-hidden shrink-0">
                <img
                  src={getLeaderPhoto(leader)}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a1d37]/80 via-[#0a1d37]/30 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white md:hidden">
                  <h3 className="font-extrabold text-lg">{leader.name}</h3>
                  <p className="text-xs text-amber-300 font-medium">{leader.designation}</p>
                </div>
              </div>

              {/* Leader Message Details */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="hidden md:block">
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                      {leader.qualification}
                    </span>
                    <h3 className="text-xl font-extrabold text-[#0a1d37] mt-1">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      {leader.designation}
                    </p>
                  </div>

                  <div className="relative pt-2">
                    <Quote className="w-8 h-8 text-amber-300/80 mb-1" />
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                      "{leader.message}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/70">
                  <button
                    onClick={() => setSelectedLeader(leader)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a1d37] hover:text-amber-700 transition-colors group-hover:translate-x-1"
                  >
                    <span>Read Full Message</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Full Message Modal */}
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={getLeaderPhoto(selectedLeader)} 
                    alt={selectedLeader.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-amber-400"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0a1d37]">
                      {selectedLeader.name}
                    </h3>
                    <p className="text-xs text-amber-700 font-bold">{selectedLeader.designation}</p>
                    <p className="text-xs text-slate-500">{selectedLeader.qualification}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-slate-800 italic text-sm font-medium">
                  "{selectedLeader.message}"
                </div>

                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  {selectedLeader.fullMessage.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-[#0a1d37] hover:bg-[#122e54] rounded-xl shadow"
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
