import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AcademicPrograms } from './components/AcademicPrograms';
import { AchievementStrip } from './components/AchievementStrip';
import { AboutSection } from './components/AboutSection';
import { LeadershipSection } from './components/LeadershipSection';
import { CampusInfrastructure } from './components/CampusInfrastructure';
import { AdmissionSection } from './components/AdmissionSection';
import { NewsEventsSection } from './components/NewsEventsSection';
import { GallerySection } from './components/GallerySection';
import { CBSEDisclosure } from './components/CBSEDisclosure';
import { StudentZone } from './components/StudentZone';
import { ResultsSection } from './components/ResultsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { CampusVisitModal } from './components/CampusVisitModal';
import { ParentPortal } from './components/ParentPortal';
import { LiveGpsTrackerModal } from './components/LiveGpsTrackerModal';

import { 
  INITIAL_LEADS, 
  SCHOOL_EVENTS, 
  GALLERY_ITEMS, 
  SCHOOL_INFO 
} from './data/schoolData';
import { AdmissionLead, SchoolEvent, GalleryItem } from './types';
import { Phone, MessageCircle, Sparkles, ArrowUp, Users, Radio, Bus } from 'lucide-react';

export default function App() {
  // State for dynamic features
  const [leads, setLeads] = useState<AdmissionLead[]>(INITIAL_LEADS);
  const [events, setEvents] = useState<SchoolEvent[]>(SCHOOL_EVENTS);
  const [gallery, setGallery] = useState<GalleryItem[]>(GALLERY_ITEMS);

  // Modals
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isParentPortalOpen, setIsParentPortalOpen] = useState(false);
  const [isGpsTrackerOpen, setIsGpsTrackerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handlers
  const handleNewLead = (newLead: AdmissionLead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (leadId: string, status: AdmissionLead['status'], note?: string) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        const updatedNotes = note ? [...lead.notes, `${new Date().toLocaleDateString()}: ${note}`] : lead.notes;
        return { ...lead, status, notes: updatedNotes };
      }
      return lead;
    }));
  };

  const handleAddEvent = (newEvent: SchoolEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const handleAddGalleryItem = (newItem: GalleryItem) => {
    setGallery(prev => [newItem, ...prev]);
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const scrollToAdmissions = () => {
    const el = document.getElementById('admissions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-400 selection:text-navy-950">
      
      {/* 1. Sticky Two-Level Header with ERP Login & Parent Portal */}
      <Header 
        onOpenApplyModal={scrollToAdmissions}
        onOpenVisitModal={() => setIsVisitModalOpen(true)}
        onOpenAdminCRM={() => setIsAdminOpen(true)}
        onOpenParentPortal={() => setIsParentPortalOpen(true)}
        onOpenLiveGps={() => setIsGpsTrackerOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main>
        {/* 2. Hero Slider with CTAs */}
        <Hero 
          onOpenApplyModal={scrollToAdmissions}
          onOpenVisitModal={() => setIsVisitModalOpen(true)}
        />

        {/* 3. Floating Institutional Statistics */}
        <Highlights />

        {/* 4. Why Choose Us */}
        <WhyChooseUs />

        {/* 5. Academic Programs (Wings) */}
        <AcademicPrograms onOpenApplyModal={scrollToAdmissions} />

        {/* 6. Dark Navy Achievement & Accreditation Strip */}
        <AchievementStrip />

        {/* 7. Institutional Profile & Heritage */}
        <AboutSection />

        {/* 8. Leadership Messages (Manager & Principal) */}
        <LeadershipSection />

        {/* 9. Campus Infrastructure & Facilities */}
        <CampusInfrastructure />

        {/* 10. Admission Center & Online Enquiry CRM Hook */}
        <AdmissionSection 
          onNewLead={handleNewLead}
          onOpenVisitModal={() => setIsVisitModalOpen(true)}
        />

        {/* 11. News & Events with Category Filtering */}
        <NewsEventsSection events={events} />

        {/* 12. Life at MP Convent Photo Gallery with Lightbox */}
        <GallerySection items={gallery} />

        {/* 13. CBSE Mandatory Public Disclosure (MPD) Center */}
        <CBSEDisclosure />

        {/* 14. Student & Parent Zone (NextERP, TC Verify, Fee, Books, Calendar, GPS) */}
        <StudentZone 
          onOpenParentPortal={() => setIsParentPortalOpen(true)} 
          onOpenLiveGps={() => setIsGpsTrackerOpen(true)}
        />

        {/* 15. Results & Accolades */}
        <ResultsSection />

        {/* 16. Contact Details, Quick Action Strip & Embedded Map */}
        <ContactSection 
          onOpenApplyModal={scrollToAdmissions}
          onOpenVisitModal={() => setIsVisitModalOpen(true)}
        />
      </main>

      {/* 17. Comprehensive School Footer */}
      <Footer 
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenApplyModal={scrollToAdmissions}
        onOpenParentPortal={() => setIsParentPortalOpen(true)}
      />

      {/* Floating Quick Action Buttons on Mobile / Desktop */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        
        {/* Floating Live Bus GPS Tracker Trigger */}
        <button
          onClick={() => setIsGpsTrackerOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-full font-black text-xs shadow-2xl hover:scale-105 transition-all border border-emerald-300/50 group"
          title="Open Live GPS School Bus Tracker"
        >
          <Radio className="w-4 h-4 text-white animate-pulse" />
          <span className="hidden sm:inline">Live GPS Bus</span>
        </button>

        {/* Floating Parent Portal Quick Trigger */}
        <button
          onClick={() => setIsParentPortalOpen(true)}
          className="flex items-center gap-2 bg-[#002147] hover:bg-[#0a2f5e] text-white px-4 py-2.5 rounded-full font-black text-xs shadow-2xl hover:scale-105 transition-all border border-amber-400/40"
          title="Open Parent & Student Portal"
        >
          <Users className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Parent Portal</span>
        </button>

        {/* Floating WhatsApp */}
        <a
          href={`https://wa.me/919893461015?text=Hello%20MP%20Convent%20School%20Bari,%20I%20have%20an%20admission%20enquiry`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 flex items-center justify-center transition-transform hover:scale-110"
          title="Chat on WhatsApp"
          aria-label="WhatsApp School Helpdesk"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Floating Call Button */}
        <a
          href={`tel:${SCHOOL_INFO.primaryPhone}`}
          className="w-12 h-12 rounded-full bg-[#0a1d37] text-white shadow-xl hover:bg-[#122e54] flex items-center justify-center transition-transform hover:scale-110"
          title="Call School Reception"
          aria-label="Call MP Convent School"
        >
          <Phone className="w-5 h-5 text-amber-400" />
        </a>

        {/* Floating Admission Pill */}
        <button
          onClick={scrollToAdmissions}
          className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 px-4 py-2.5 rounded-full font-black text-xs shadow-2xl hover:scale-105 transition-transform"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Admissions 2026–27</span>
        </button>

      </div>

      {/* Admin CRM & CMS Modal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        leads={leads}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        events={events}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
        gallery={gallery}
        onAddGalleryItem={handleAddGalleryItem}
        onDeleteGalleryItem={handleDeleteGalleryItem}
      />

      {/* Campus Visit Walkthrough Scheduler Modal */}
      <CampusVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        onNewLead={handleNewLead}
      />

      {/* Parent & Student Interactive Portal Modal */}
      <ParentPortal 
        isOpen={isParentPortalOpen}
        onClose={() => setIsParentPortalOpen(false)}
      />

      {/* Standalone Live GPS Bus Tracker Modal */}
      <LiveGpsTrackerModal
        isOpen={isGpsTrackerOpen}
        onClose={() => setIsGpsTrackerOpen(false)}
      />

    </div>
  );
}
