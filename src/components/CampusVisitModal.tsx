import React, { useState } from 'react';
import { Calendar, Clock, MapPin, X, CheckCircle2, User, Phone, Sparkles } from 'lucide-react';
import { AdmissionLead } from '../types';
import { SCHOOL_INFO } from '../data/schoolData';

interface CampusVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewLead: (lead: AdmissionLead) => void;
}

export const CampusVisitModal: React.FC<CampusVisitModalProps> = ({
  isOpen,
  onClose,
  onNewLead
}) => {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    mobile: '',
    grade: 'Class I',
    visitDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredSlot: 'Morning (09:30 AM - 11:30 AM)'
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.mobile) return;

    const newLead: AdmissionLead = {
      id: `VISIT-${Math.floor(1000 + Math.random() * 9000)}`,
      parentName: formData.parentName,
      studentName: formData.studentName || 'Prospective Student',
      mobile: formData.mobile,
      email: 'Campus Visit Request',
      classApplying: formData.grade,
      city: 'Bari',
      message: `Campus Visit scheduled on ${formData.visitDate} [${formData.preferredSlot}].`,
      date: new Date().toISOString().split('T')[0],
      source: 'Campus Visit Walkthrough Scheduler',
      status: 'NEW',
      assignedStaff: 'Admission Desk',
      followUpDate: formData.visitDate,
      notes: [`Walkthrough booked for ${formData.visitDate} during ${formData.preferredSlot}.`]
    };

    onNewLead(newLead);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
        
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#0a1d37]">
                Book a Campus Tour
              </h3>
              <p className="text-xs text-slate-500">M.P. Convent School, Shaktinagar, Bari</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-lg text-slate-900">Campus Walkthrough Confirmed!</h4>
            <p className="text-xs text-slate-600">
              We look forward to meeting you on <strong>{formData.visitDate}</strong> during <strong>{formData.preferredSlot}</strong>. Our counselor will send you SMS / WhatsApp directions.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#0a1d37] text-white font-bold text-xs rounded-xl"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Parent / Guardian Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Verma"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91..."
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Grade / Class</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-amber-500 font-medium"
                >
                  <option value="Pre-Primary">Pre-Primary (Nursery/KG)</option>
                  <option value="Class I - V">Primary (Class I - V)</option>
                  <option value="Class VI - VIII">Middle (Class VI - VIII)</option>
                  <option value="Class IX - X">Secondary (Class IX - X)</option>
                  <option value="Class XI - XII">Senior Sec (Class XI - XII)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Select Date *</label>
                <input
                  type="date"
                  required
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Time Window</label>
                <select
                  value={formData.preferredSlot}
                  onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-amber-500 font-medium text-[11px]"
                >
                  <option value="Morning (09:30 AM - 11:30 AM)">Morning (09:30 AM - 11:30 AM)</option>
                  <option value="Noon (12:00 PM - 02:00 PM)">Noon (12:00 PM - 02:00 PM)</option>
                  <option value="Afternoon (02:00 PM - 03:30 PM)">Afternoon (02:00 PM - 03:30 PM)</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Campus: Shaktinagar, Ward 6, Bari, Raisen (M.P.)</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0a1d37] hover:bg-[#122e54] text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
            >
              Confirm Campus Walkthrough
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
