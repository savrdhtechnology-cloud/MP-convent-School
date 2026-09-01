import React, { useState } from 'react';
import { 
  Building2, 
  Monitor, 
  FlaskConical, 
  Cpu, 
  BookOpen, 
  Trophy, 
  Gamepad2, 
  Music, 
  Bus, 
  ShieldAlert,
  Check,
  X,
  Sparkles
} from 'lucide-react';
import { CAMPUS_FACILITIES } from '../data/schoolData';
import { FacilityItem } from '../types';

export const CampusInfrastructure: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor':
        return <Monitor className="w-5 h-5 text-amber-500" />;
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5 text-amber-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-amber-500" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-amber-500" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-amber-500" />;
      case 'Music':
        return <Music className="w-5 h-5 text-amber-500" />;
      case 'Bus':
        return <Bus className="w-5 h-5 text-amber-500" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section id="campus" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-extrabold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Infrastructure & Amenities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Explore Our Campus
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Modern, student-centric facilities designed to spark scientific curiosity, athletic vitality, artistic expression, and uncompromised safety.
          </p>
        </div>

        {/* 9 Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CAMPUS_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col group"
            >
              {/* Photo */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={facility.imageUrl}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md">
                  {getIcon(facility.icon)}
                </div>
                <h3 className="absolute bottom-3 left-3 right-3 text-white font-extrabold text-base leading-tight">
                  {facility.title}
                </h3>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {facility.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {facility.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedFacility(facility)}
                    className="w-full py-2 text-xs font-bold text-[#0a1d37] bg-slate-50 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 rounded-xl transition-colors text-center"
                  >
                    View Facility Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facility Detail Modal */}
        {selectedFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-6">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                    {getIcon(selectedFacility.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0a1d37]">
                      {selectedFacility.title}
                    </h3>
                    <p className="text-xs text-slate-500">MP Convent School Campus, Bari</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <img
                  src={selectedFacility.imageUrl}
                  alt={selectedFacility.title}
                  className="w-full h-56 object-cover rounded-xl border border-slate-200"
                />

                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedFacility.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Facility Highlights</h4>
                  <div className="space-y-1.5">
                    {selectedFacility.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
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
