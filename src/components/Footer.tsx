import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ExternalLink, 
  Lock, 
  ChevronRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenApplyModal: () => void;
  onOpenParentPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenApplyModal, onOpenParentPortal }) => {
  return (
    <footer className="bg-[#061426] text-slate-300 pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: School Identity */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-navy-950 font-black shadow-lg">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  M.P. CONVENT SCHOOL
                </h3>
                <p className="text-xs font-semibold text-amber-400 tracking-wide">
                  BARI, RAISEN (M.P.) • ESTD. 1996
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Affiliated to the Central Board of Secondary Education (CBSE), New Delhi (Affiliation No: 1030760, School Code: 50723). Committed to holistic education, moral integrity, and modern STEM pedagogy for three decades.
            </p>

            <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl space-y-1 text-xs">
              <div className="text-amber-400 font-bold uppercase text-[10px] tracking-wider">
                Managing Society
              </div>
              <div className="text-white font-semibold">
                {SCHOOL_INFO.managingSociety}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400/70" />
                  <span>About School</span>
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400/70" />
                  <span>Academics & Wings</span>
                </a>
              </li>
              <li>
                <a href="#campus" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400/70" />
                  <span>Campus Facilities</span>
                </a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400/70" />
                  <span>School Leadership</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400/70" />
                  <span>Photo Gallery</span>
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400/70" />
                  <span>News & Updates</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: CBSE & Portals */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              CBSE & Student Zone
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#cbse" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400/70" />
                  <span>Mandatory Public Disclosure</span>
                </a>
              </li>
              <li>
                <a href="#student-zone" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400/70" />
                  <span>TC Download & Verify</span>
                </a>
              </li>
              <li>
                <a href="#student-zone" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400/70" />
                  <span>Fee Structure 2026–27</span>
                </a>
              </li>
              <li>
                <a href="#student-zone" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400/70" />
                  <span>Books & Uniform Guide</span>
                </a>
              </li>
              {onOpenParentPortal && (
                <li>
                  <button 
                    onClick={onOpenParentPortal}
                    className="text-amber-400 font-bold hover:underline flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-400" />
                    <span>Parent Portal (Live App)</span>
                  </button>
                </li>
              )}
              <li>
                <a 
                  href={SCHOOL_INFO.erpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 font-medium hover:underline flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>NextERP Web Login</span>
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400/70" />
                  <span>CBSE Board Results</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Admissions */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              School Helpdesk
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-slate-300">{SCHOOL_INFO.address}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${SCHOOL_INFO.primaryPhone}`} className="text-slate-300 hover:text-white font-bold">
                  {SCHOOL_INFO.primaryPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="text-slate-300 hover:text-white truncate">
                  {SCHOOL_INFO.email}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenApplyModal}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-navy-950 font-extrabold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apply for Admission 2026–27</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center md:text-left space-y-1">
            <p>
              © {new Date().getFullYear()} M.P. Convent School, Bari, Raisen (M.P.). All rights reserved.
            </p>
            <p className="text-[11px] text-slate-400">
              Affiliated to CBSE New Delhi (Affiliation No: 1030760 • School Code: 50723)
            </p>
          </div>

          {/* Developer Credit: Savrdh Technologies - Shailendra Choudhary (Savrdh Group) */}
          <div className="text-center md:text-center px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            <p className="text-[11px] text-slate-400">
              Designed & Developed by{' '}
              <span className="text-amber-400 font-extrabold tracking-wide">
                Savrdh Technologies
              </span>
              {' '}—{' '}
              <span className="text-white font-bold">
                Shailendra Choudhary
              </span>
              {' '}
              <span className="text-emerald-400 font-semibold">
                (Savrdh Group)
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              id="admin-portal-link"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 text-xs font-semibold transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Admin / CRM Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
