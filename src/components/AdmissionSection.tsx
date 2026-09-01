import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  PhoneCall, 
  ShieldCheck, 
  Download,
  AlertCircle
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { AdmissionLead } from '../types';

interface AdmissionSectionProps {
  onNewLead: (lead: AdmissionLead) => void;
  onOpenVisitModal: () => void;
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({
  onNewLead,
  onOpenVisitModal
}) => {
  // Form State
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    mobile: '',
    email: '',
    classApplying: 'Class I',
    city: 'Bari',
    message: '',
    captchaAnswer: ''
  });

  const [captchaNum1, setCaptchaNum1] = useState(4);
  const [captchaNum2, setCaptchaNum2] = useState(7);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 8) + 2);
    setCaptchaNum2(Math.floor(Math.random() * 8) + 1);
    setFormData(prev => ({ ...prev, captchaAnswer: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.parentName.trim() || !formData.studentName.trim() || !formData.mobile.trim()) {
      setErrorMessage('Please fill in all mandatory fields (Parent Name, Student Name, Mobile Number).');
      return;
    }

    if (parseInt(formData.captchaAnswer) !== (captchaNum1 + captchaNum2)) {
      setErrorMessage('Incorrect Security CAPTCHA answer. Please try again.');
      resetCaptcha();
      return;
    }

    setIsSubmitting(true);

    // Generate Lead
    const newId = `MPC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: AdmissionLead = {
      id: newId,
      parentName: formData.parentName.trim(),
      studentName: formData.studentName.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim() || 'Not Provided',
      classApplying: formData.classApplying,
      city: formData.city.trim() || 'Bari',
      message: formData.message.trim() || 'Admission enquiry submitted via website form.',
      date: new Date().toISOString().split('T')[0],
      source: 'Website Enquiry Form',
      status: 'NEW',
      assignedStaff: 'Admission Desk',
      followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      notes: [`Online admission enquiry registered successfully on ${new Date().toLocaleDateString()}.`]
    };

    setTimeout(() => {
      onNewLead(newLead);
      setIsSubmitting(false);
      setSubmittedLeadId(newId);
      setFormData({
        parentName: '',
        studentName: '',
        mobile: '',
        email: '',
        classApplying: 'Class I',
        city: 'Bari',
        message: '',
        captchaAnswer: ''
      });
      resetCaptcha();
    }, 600);
  };

  const steps = [
    {
      num: "01",
      title: "Online / Offline Enquiry",
      desc: "Submit the admission form online or collect the registration kit from the school reception."
    },
    {
      num: "02",
      title: "Campus Visit & Interaction",
      desc: "Meet academic counselors, tour smart classrooms and science labs, and explore our campus."
    },
    {
      num: "03",
      title: "Document Verification",
      desc: "Submit student birth certificate, previous report card, transfer certificate (TC), and Aadhaar."
    },
    {
      num: "04",
      title: "Enrollment & Welcome",
      desc: "Complete fee formalities, receive NextERP portal access credentials, books list, and uniform guide."
    }
  ];

  return (
    <section id="admissions" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Admissions Session 2026–27</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Begin Your Child's Journey With Us
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Open for Playgroup, Nursery, LKG, UKG, and Class I to Class XII. Limited seats per section to preserve personalized teacher attention.
          </p>
        </div>

        {/* 4-Step Flow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs relative flex flex-col justify-between group hover:border-amber-400/80 transition-colors"
            >
              <div>
                <span className="text-3xl font-black text-amber-500/80 mb-3 block">
                  {step.num}
                </span>
                <h3 className="text-base font-extrabold text-[#0a1d37] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Two-Column Form & Quick Help Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-[#0a1d37]">
                  Online Admission Enquiry Form
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Session 2026–27 • Direct Desk Review</p>
              </div>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Portal</span>
              </span>
            </div>

            {/* Success Notification */}
            {submittedLeadId && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Enquiry Submitted Successfully!</span>
                </div>
                <p className="text-xs text-emerald-800">
                  Your admission enquiry has been assigned Reference ID: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-950">{submittedLeadId}</strong>. Our school admission counselor will contact you within 24 hours.
                </p>
                <div className="pt-1">
                  <button 
                    onClick={() => setSubmittedLeadId(null)}
                    className="text-xs font-bold text-emerald-700 underline"
                  >
                    Submit another query
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Parent / Guardian Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98934 61015"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="parent@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Class Applying For <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.classApplying}
                    onChange={(e) => setFormData({ ...formData, classApplying: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-800 font-medium"
                  >
                    <option value="Playgroup">Playgroup (Age 2.5+)</option>
                    <option value="Nursery">Nursery (Age 3+)</option>
                    <option value="LKG">LKG (Age 4+)</option>
                    <option value="UKG">UKG (Age 5+)</option>
                    <option value="Class I">Class I</option>
                    <option value="Class II">Class II</option>
                    <option value="Class III">Class III</option>
                    <option value="Class IV">Class IV</option>
                    <option value="Class V">Class V</option>
                    <option value="Class VI">Class VI</option>
                    <option value="Class VII">Class VII</option>
                    <option value="Class VIII">Class VIII</option>
                    <option value="Class IX">Class IX</option>
                    <option value="Class X">Class X (CBSE)</option>
                    <option value="Class XI (Science)">Class XI (Science - PCM/PCB)</option>
                    <option value="Class XI (Commerce)">Class XI (Commerce)</option>
                    <option value="Class XII (Science)">Class XII (Science)</option>
                    <option value="Class XII (Commerce)">Class XII (Commerce)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    City / Residential Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bari, Shaktinagar, Raisen"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  Questions / Specific Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Enquire about bus routes, timing, subject choices or fee details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-800"
                ></textarea>
              </div>

              {/* Anti-Spam Math Security CAPTCHA */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-300 font-mono text-sm">
                    {captchaNum1} + {captchaNum2} = ?
                  </span>
                  <span>Security Code:</span>
                </div>
                <input
                  type="number"
                  required
                  placeholder="Sum"
                  value={formData.captchaAnswer}
                  onChange={(e) => setFormData({ ...formData, captchaAnswer: e.target.value })}
                  className="w-24 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-center font-bold text-slate-900 outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                id="submit-enquiry-btn"
                className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-navy-950 font-extrabold text-sm sm:text-base py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting to School CRM...' : 'Submit Admission Enquiry'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Admission Guidelines & Help Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-[#0a1d37] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Admission Helpdesk
                </span>
                <h4 className="text-xl font-extrabold text-white">
                  Speak with Our Counselors
                </h4>
                <p className="text-xs text-slate-300">
                  Monday to Saturday: 08:30 AM to 03:30 PM
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <a 
                  href={`tel:${SCHOOL_INFO.primaryPhone}`}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/15 p-3 rounded-xl border border-white/10 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-400 text-navy-950 flex items-center justify-center font-bold shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-300 text-[11px]">Primary Admission Line</div>
                    <div className="font-bold text-white text-sm">{SCHOOL_INFO.primaryPhone}</div>
                  </div>
                </a>

                <a 
                  href={`https://wa.me/919893461015?text=Hello%20MP%20Convent%20School,%20I%20want%20to%20enquire%20about%20admissions%20for%20session%202026-27`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-emerald-600/30 hover:bg-emerald-600/40 p-3 rounded-xl border border-emerald-500/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0">
                    💬
                  </div>
                  <div>
                    <div className="text-emerald-300 text-[11px]">WhatsApp Enquiry Chat</div>
                    <div className="font-bold text-white text-sm">+91 98934 61015</div>
                  </div>
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={onOpenVisitModal}
                  className="w-full bg-white text-[#0a1d37] font-bold text-xs py-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Schedule Campus Walkthrough</span>
                </button>
              </div>
            </div>

            {/* Document Checklist Pill Box */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-extrabold text-[#0a1d37] uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>Documents for Admission</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Student Birth Certificate (Municipal / Gram Panchayat)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Previous School Marksheet & Transfer Certificate (TC)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Aadhaar Card copies of Student & Parents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>4 Passport-size Color Photographs</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
