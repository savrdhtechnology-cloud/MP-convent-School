import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation, 
  ExternalLink, 
  MessageCircle, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface ContactSectionProps {
  onOpenApplyModal: () => void;
  onOpenVisitModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenApplyModal,
  onOpenVisitModal
}) => {
  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-900 text-xs font-extrabold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-blue-700" />
            <span>Connect & Visit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Contact MP Convent School
          </h2>
          <p className="text-base text-slate-600 font-medium">
            We look forward to welcoming you to our campus in Bari, Raisen. Reach out via phone, email, WhatsApp, or schedule a campus walkthrough.
          </p>
        </div>

        {/* 4 Action Buttons Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          <a
            href={`tel:${SCHOOL_INFO.primaryPhone}`}
            id="call-now-btn"
            className="flex items-center justify-center gap-2 bg-[#0a1d37] hover:bg-[#122e54] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all text-center"
          >
            <Phone className="w-4 h-4 text-amber-400 shrink-0" />
            <span>CALL NOW</span>
          </a>

          <a
            href={`https://wa.me/919893461015?text=Hello%20MP%20Convent%20School%20Bari,%20I%20am%20enquiring%20about%20admissions`}
            target="_blank"
            rel="noopener noreferrer"
            id="whatsapp-contact-btn"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all text-center"
          >
            <MessageCircle className="w-4 h-4 text-white shrink-0" />
            <span>WHATSAPP</span>
          </a>

          <a
            href="https://maps.google.com/?q=MP+Convent+School+Bari+Raisen+Madhya+Pradesh"
            target="_blank"
            rel="noopener noreferrer"
            id="get-directions-btn"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all text-center"
          >
            <Navigation className="w-4 h-4 text-white shrink-0" />
            <span>GET DIRECTIONS</span>
          </a>

          <button
            onClick={onOpenApplyModal}
            id="enquire-now-btn"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-navy-950 font-black text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all text-center"
          >
            <Sparkles className="w-4 h-4 text-navy-950 shrink-0" />
            <span>ENQUIRE NOW</span>
          </button>
        </div>

        {/* Two Columns: Contact Details & Google Map Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Address */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-amber-800" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-sm text-[#0a1d37]">School Campus Address</h4>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {SCHOOL_INFO.address}
                </p>
                <p className="text-[11px] text-slate-500">Landmark: {SCHOOL_INFO.landmark}</p>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-blue-800" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-[#0a1d37]">Contact Telephone Numbers</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                  {SCHOOL_INFO.phones.map((ph, idx) => (
                    <a 
                      key={idx} 
                      href={`tel:${ph.replace(/\s+/g, '')}`}
                      className="font-bold text-slate-800 hover:text-amber-700"
                    >
                      {ph}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Email & Timings */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-emerald-800" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-sm text-[#0a1d37]">Official Email Address</h4>
                <a 
                  href={`mailto:${SCHOOL_INFO.email}`}
                  className="text-xs font-bold text-blue-900 hover:underline block"
                >
                  {SCHOOL_INFO.email}
                </a>
                <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Office: Mon–Sat (08:30 AM – 04:00 PM)</span>
                </div>
              </div>
            </div>

            {/* Campus Visit Banner */}
            <div className="bg-[#0a1d37] text-white p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-amber-300">Planning a campus visit?</p>
                <p className="text-[11px] text-slate-300">Book in advance for dedicated staff guidance.</p>
              </div>
              <button
                onClick={onOpenVisitModal}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs rounded-xl shadow shrink-0"
              >
                Book Walkthrough
              </button>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Frame */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-lg min-h-[320px] relative">
            <iframe
              title="MP Convent School Bari Location Map"
              src="https://maps.google.com/maps?q=Bari+Raisen+Madhya+Pradesh+464665&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[360px] border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-[#0a1d37]">M.P. Convent School, Shaktinagar, Bari (Raisen)</span>
              </div>
              <a
                href="https://maps.google.com/?q=MP+Convent+School+Bari+Raisen+Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
              >
                <span>Full Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
