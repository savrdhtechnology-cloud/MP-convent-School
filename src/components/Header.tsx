import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ExternalLink, 
  GraduationCap, 
  FileText, 
  Users, 
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Bus,
  Radio
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface HeaderProps {
  onOpenApplyModal: () => void;
  onOpenVisitModal: () => void;
  onOpenAdminCRM: () => void;
  onOpenParentPortal: () => void;
  onOpenLiveGps?: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApplyModal,
  onOpenVisitModal,
  onOpenAdminCRM,
  onOpenParentPortal,
  onOpenLiveGps,
  activeSection,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { 
      id: 'about', 
      label: 'About Us',
      dropdown: [
        { id: 'about', label: 'About School & Director' },
        { id: 'leadership', label: 'Leadership & Messages' },
        { id: 'why-choose', label: 'Why Choose MPCS' }
      ]
    },
    { 
      id: 'admissions', 
      label: 'Admission',
      badge: '2026-27'
    },
    { 
      id: 'academics', 
      label: 'Academics',
      dropdown: [
        { id: 'academics', label: 'Academic Programs' },
        { id: 'results', label: 'Board Results & Toppers' },
        { id: 'events', label: 'Academic Calendar' }
      ]
    },
    { id: 'cbse', label: 'MPD' },
    { id: 'campus', label: 'Infrastructure & Facilities' },
    { 
      id: 'student-zone', 
      label: 'School At Glance',
      dropdown: [
        { id: 'student-zone', label: 'NextERP / NLP Portal' },
        { id: 'student-zone', label: 'TC Verification' },
        { id: 'student-zone', label: 'Fee Structure' }
      ]
    },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* 1. TOP BAR (Matching Official School Layout) */}
      <div className={`bg-[#061a33] text-slate-200 text-xs transition-all duration-300 ${isScrolled ? 'py-1 hidden md:block' : 'py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-2">
          
          {/* Address & Direct Phone Links */}
          <div className="flex items-center space-x-4 flex-wrap text-[11px] sm:text-xs">
            <div className="flex items-center space-x-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Ward No. 6, Shaktinagar, Bari, Distt. Raisen, MP - 464665</span>
            </div>

            <div className="hidden md:flex items-center space-x-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <a href="tel:07582222427" className="hover:text-emerald-400 transition-colors font-medium">
                07582-222427
              </a>
              <span className="text-slate-500">|</span>
              <a href="tel:8989627828" className="hover:text-emerald-400 transition-colors font-medium">
                8989627828, 8989767828
              </a>
            </div>

            <a 
              href={`mailto:${SCHOOL_INFO.email}`} 
              className="hidden xl:flex items-center space-x-1 hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SCHOOL_INFO.email}</span>
            </a>
          </div>

          {/* Social links — account actions live in the main navigation below */}
          <div className="flex items-center space-x-3 text-xs">
            
            {/* Social Icons */}
            <div className="hidden sm:flex items-center space-x-2 text-slate-300 pr-1">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-blue-900/60 hover:bg-blue-600 flex items-center justify-center text-[10px] text-white transition-all font-bold" title="Facebook">
                f
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-pink-900/60 hover:bg-pink-600 flex items-center justify-center text-[10px] text-white transition-all font-bold" title="Instagram">
                📷
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-red-900/60 hover:bg-red-600 flex items-center justify-center text-[10px] text-white transition-all font-bold" title="YouTube">
                ▶
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className={`bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-slate-200/80 shadow-sm ${isScrolled ? 'py-2.5 shadow-md' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & School Branding */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* Authentic Crest Representation */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0a1d37] rounded-xl flex items-center justify-center p-1.5 shadow-md border-2 border-amber-400/80 group-hover:shadow-amber-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1d37] via-[#122e54] to-amber-500/20"></div>
              <div className="text-center relative z-10 flex flex-col items-center justify-center">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 transform group-hover:scale-110 transition-transform" />
                <span className="text-[8px] font-black tracking-wider text-amber-300 uppercase leading-none mt-0.5">MPCS</span>
              </div>
            </div>

            {/* School Text Details */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-2xl text-[#0a1d37] tracking-tight leading-tight group-hover:text-blue-900 transition-colors">
                  M.P. CONVENT SCHOOL
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] sm:text-xs text-slate-600 font-medium">
                <span className="text-amber-700 font-bold">Bari, Raisen (M.P.)</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 hidden xs:inline">Affiliated to CBSE, New Delhi</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-[13px] xl:text-sm font-semibold text-slate-700">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const hasDropdown = item.dropdown && item.dropdown.length > 0;

              return (
                <div 
                  key={item.id} 
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(item.id)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-lg flex items-center space-x-1 transition-all duration-200 ${
                      isActive 
                        ? 'text-navy-950 font-bold bg-amber-50/80 text-amber-700' 
                        : 'hover:text-[#0a1d37] hover:bg-slate-100/80'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] bg-amber-500 text-white font-extrabold px-1.5 py-0.2 rounded-full uppercase ml-1 animate-pulse">
                        {item.badge}
                      </span>
                    )}
                    {hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {hasDropdown && activeDropdown === item.id && (
                    <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {item.dropdown?.map((subItem, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(subItem.id)}
                          className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <a
              href={SCHOOL_INFO.erpUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="nlp-login-desktop-btn"
              className="text-xs font-extrabold text-emerald-800 hover:bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-300 hover:border-emerald-500 transition-all flex items-center gap-1.5 bg-emerald-50/60"
              title="Next Learning Platform (NLP) / NextERP Portal Login"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              <span>NLP Login</span>
            </a>
            <button
              onClick={onOpenParentPortal}
              id="parent-portal-desktop-btn"
              className="text-xs font-extrabold text-[#002147] hover:bg-amber-50 px-3 py-2 rounded-lg border border-amber-300 hover:border-amber-500 transition-all flex items-center gap-1.5 bg-amber-50/50"
            >
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>Parent Portal</span>
            </button>
            <button
              onClick={onOpenVisitModal}
              id="book-visit-header-btn"
              className="text-xs font-bold text-slate-700 hover:text-[#0a1d37] px-3 py-2 rounded-lg border border-slate-300 hover:border-[#0a1d37] transition-all"
            >
              Visit Campus
            </button>
            <button
              onClick={onOpenApplyModal}
              id="apply-online-header-btn"
              className="relative group overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-navy-950 font-bold text-xs xl:text-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-1.5 transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-navy-950" />
              <span>Apply Online</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenApplyModal}
              className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs px-3 py-1.5 rounded-md shadow-sm sm:hidden"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-[#0a1d37] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-OUT / DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto px-5 py-4 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-900">Admissions Open 2026–27</p>
              <p className="text-[11px] text-amber-700">Playgroup / Nursery to Class XII (CBSE)</p>
            </div>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenApplyModal(); }}
              className="bg-amber-500 text-navy-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow"
            >
              Apply Now
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-amber-100/60 text-amber-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] bg-amber-500 text-navy-950 font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenParentPortal(); }}
                className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-navy-950 font-black text-xs py-2.5 rounded-lg shadow"
              >
                <Users className="w-3.5 h-3.5 text-navy-950" />
                <span>Parent Portal</span>
              </button>

              {onOpenLiveGps && (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenLiveGps(); }}
                  className="flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2.5 rounded-lg shadow"
                >
                  <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>Live GPS Bus</span>
                </button>
              )}
            </div>

            <a 
              href={SCHOOL_INFO.erpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white font-bold text-xs py-2 rounded-lg shadow hover:bg-slate-800"
            >
              <span>NextERP Web Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenVisitModal(); }}
                className="w-full text-center py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Book Campus Visit
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdminCRM(); }}
                className="w-full text-center py-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg"
              >
                Admin CRM
              </button>
            </div>

            <div className="flex justify-between items-center pt-2 text-xs text-slate-500">
              <a href={`tel:${SCHOOL_INFO.primaryPhone}`} className="flex items-center space-x-1 text-slate-700 font-bold">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Admission Office</span>
              </a>
              <span className="text-slate-400">CBSE: 1030760</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
