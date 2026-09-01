import React, { useState } from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  BookOpen, 
  Globe, 
  ShieldCheck, 
  Laptop, 
  Award, 
  Handshake, 
  Landmark, 
  Headphones, 
  User, 
  Quote,
  CheckCircle2,
  Calendar,
  Building,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { SCHOOL_INFO, LEADERSHIP, ABOUT_PILLARS, GUIDING_VALUES, TIMELINE_HISTORY } from '../data/schoolData';
import directorImg from '../assets/images/mahindra_pratap_dubey_original-v2.jpg';

export const AboutSection: React.FC = () => {
  const [showFullHeritageModal, setShowFullHeritageModal] = useState(false);
  const director = LEADERSHIP[0]; // Mr. Mahindra Pratap Dubey (M. P. Dubey), Director

  // Helper for Pillar Icons
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-emerald-600" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-emerald-600" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-emerald-600" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-emerald-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
    }
  };

  // Helper for Value Icons
  const getValueIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-7 h-7 text-emerald-600" />;
      case 'Handshake':
        return <Handshake className="w-7 h-7 text-emerald-600" />;
      case 'Landmark':
        return <Landmark className="w-7 h-7 text-emerald-600" />;
      default:
        return <Sparkles className="w-7 h-7 text-emerald-600" />;
    }
  };

  return (
    <section id="about" className="bg-white relative">
      
      {/* 1. HERO BANNER & BREADCRUMB (Matching Official Header In Poster) */}
      <div className="relative bg-[#061a33] text-white py-16 sm:py-20 overflow-hidden border-b border-slate-200">
        {/* Background Building Overlay */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img 
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80" 
            alt="M.P. Convent School Building Facade" 
            className="w-full h-full object-cover object-center filter brightness-90"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#031326] via-[#061a33]/90 to-[#0a274c]/80 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            
            {/* Title with Teal Bar */}
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-12 bg-teal-400 rounded-full"></div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                About Us
              </h1>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-semibold pl-5">
              <span className="text-slate-300">Home</span>
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span className="text-emerald-400 font-bold">About Us</span>
            </div>

            {/* Subtitle / Philosophy */}
            <p className="text-base sm:text-lg text-slate-200 pl-5 leading-relaxed font-normal pt-1">
              At MP Convent School, we nurture young minds to become confident, responsible and compassionate leaders of tomorrow.
            </p>
          </div>
        </div>
      </div>

      {/* 2. DIRECTOR'S MESSAGE SECTION (Authentic Layout from Poster) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Director's Portrait with Badge Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
              <img 
                src={directorImg} 
                alt="Mr. Mahindra Pratap Dubey (M. P. Dubey) - Director, MP Convent School Bari" 
                className="w-full h-[460px] sm:h-[560px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05162a]/95 via-[#05162a]/20 to-transparent"></div>

              {/* Director Badge Card (Matches bottom-left tag in poster) */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0a1e38]/95 backdrop-blur-md p-4 rounded-xl border border-blue-900/50 shadow-xl flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-[#122b4d] border border-blue-400/40 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white tracking-wide">
                    Mr. Mahindra Pratap Dubey
                  </h4>
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Director · M. P. Dubey
                  </p>
                </div>
              </div>
            </div>

            {/* Affiliation & Society Credential Tag */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">{SCHOOL_INFO.managingSociety}</span>
              </div>
              <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded text-[11px]">
                CBSE Affiliated
              </span>
            </div>
          </div>

          {/* Right Column: Director's Inspiring Philosophy & Official Message */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Large Quote Heading */}
            <div className="relative pl-12 sm:pl-14">
              {/* Green Quote Mark */}
              <div className="absolute left-0 top-0 text-emerald-600 font-serif text-6xl sm:text-7xl leading-none select-none">
                “
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Education is about awakening – awakening to the power and beauty that lies within all of us.
              </h2>
            </div>

            {/* 5 Official Message Paragraphs */}
            <div className="space-y-4 text-slate-700 text-sm sm:text-[15px] leading-relaxed font-normal pl-2 border-l-2 border-slate-100 sm:border-none">
              <p>
                Our mission is to provide positive catalytic impulses to every <strong className="text-slate-950 font-bold">CHILD</strong> to stretch his inherent learning competencies through a self discovery process.
              </p>

              <p>
                At <strong className="text-slate-950 font-bold">M.P. CONVENT School</strong>, the uniqueness of each child is recognized, nurtured and treasured. Emphasis is on <strong className="text-slate-950 font-bold">LEARNING</strong> and not on teaching only.
              </p>

              <p>
                Education is a complete process that leads to the attainment of the full potential of the child. Our endeavor is to equip our students with life-skills to face the real world with planning, organizing, deciding, questioning, reasoning, analyzing, team-building, communicating effectively or dealing with challenges confidently.
              </p>

              <p>
                Our focus is to develop our students as global citizens, with tolerance, respect and appreciation of diverse cultures and religions for a life-time learning experience. They should be self-motivated, independent, confident decision makers to take up a leadership roles in future.
              </p>

              <p>
                At MPCS, we arm our students with technological supremacy and help them integrate it with values, morals and our cultural legacy. The school curriculum has been painstakingly planned on scientific guidelines to provide students with intellectual stimulation, physical robustness, social adaptability, emotional independence and leadership qualities. It is our endeavor to establish a quality - conscious school where.......
              </p>
            </div>

            {/* Quick Heritage & Affiliation Trigger */}
            <div className="pt-3">
              <button
                onClick={() => setShowFullHeritageModal(true)}
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-lg border border-emerald-200 transition-colors"
              >
                <span>View Full 30-Year Milestone Journey (1996–2026)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. SIX CORE PILLARS SECTION (Matching 6 Green Circular Badges In Poster) */}
      <div className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {ABOUT_PILLARS.map((pillar) => (
              <div 
                key={pillar.id}
                className="bg-white rounded-2xl p-5 sm:p-6 text-center border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group"
              >
                {/* Green Circular Badge */}
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300 mb-4 shadow-sm">
                  {getPillarIcon(pillar.icon)}
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 mb-1.5 leading-snug">
                  {pillar.title}
                </h3>
                
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {pillar.subtitle}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 4. OUR COMMITMENT: THE VALUES THAT GUIDE US (3 Cards In Poster) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-black text-emerald-600 tracking-widest uppercase block">
            OUR COMMITMENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            The Values That Guide Us
          </h2>
        </div>

        {/* 3 Commitment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {GUIDING_VALUES.map((val) => (
            <div 
              key={val.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex items-start gap-4 group"
            >
              {/* Green Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <div className="text-white">
                  {val.id === 'excellence' && <Award className="w-7 h-7" />}
                  {val.id === 'integrity' && <Handshake className="w-7 h-7" />}
                  {val.id === 'tradition-modernity' && <Landmark className="w-7 h-7" />}
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {val.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 5. INSPIRING BOTTOM CALLOUT BANNER (Matching Navy/Green Banner in Poster) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="bg-[#002147] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl border border-blue-900/50">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#001733] via-[#002147] to-[#04336c] z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content with Support Icon */}
            <div className="lg:col-span-7 flex items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                <Headphones className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
              </div>
              <div className="space-y-1.5">
                <p className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                  We are dedicated to providing a safe, supportive and inspiring environment for every child.
                </p>
                <p className="text-base sm:text-xl font-black text-emerald-400 tracking-wide">
                  Let's build a brighter future together!
                </p>
              </div>
            </div>

            {/* Right Student Photo in Library */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
                  alt="MP Convent School Students in Uniform" 
                  className="w-full h-44 sm:h-52 object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2.5 left-3 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Empowering Youth of Bari, Raisen (M.P.)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Heritage & 30-Year Timeline Modal */}
      {showFullHeritageModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Chronicle of Growth (1996 – 2026)
                </h3>
                <p className="text-xs text-slate-500">M.P. Convent Higher Secondary School, Bari</p>
              </div>
              <button
                onClick={() => setShowFullHeritageModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {TIMELINE_HISTORY.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white border-4 border-emerald-500"></div>
                  <div>
                    <span className="inline-block text-xs font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      {item.year}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowFullHeritageModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
