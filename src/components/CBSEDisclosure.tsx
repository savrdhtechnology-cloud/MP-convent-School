import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Building2, 
  ExternalLink,
  Award,
  Sparkles
} from 'lucide-react';
import { MANDATORY_DOCUMENTS, SCHOOL_INFO } from '../data/schoolData';
import { MandatoryDocument } from '../types';

export const CBSEDisclosure: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewDoc, setPreviewDoc] = useState<MandatoryDocument | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = ['All', 'Affiliation', 'Safety', 'Administration', 'Academics', 'Results'];

  const filteredDocs = selectedCategory === 'All'
    ? MANDATORY_DOCUMENTS
    : MANDATORY_DOCUMENTS.filter(doc => doc.category === selectedCategory);

  const handleDownload = (doc: MandatoryDocument) => {
    setDownloadSuccess(`Downloading verified copy of: ${doc.title}`);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4000);
  };

  return (
    <section id="cbse" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-900 text-xs font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>CBSE Mandatory Compliance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Mandatory Public Disclosure (MPD)
          </h2>
          <p className="text-base text-slate-600 font-medium">
            In adherence with CBSE Appendix IX circulars, access all statutory certificates, safety compliances, affiliation records, and governance details.
          </p>
        </div>

        {/* Quick Affiliation Credential Card */}
        <div className="bg-[#0a1d37] text-white p-6 sm:p-8 rounded-3xl mb-12 shadow-xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="space-y-1">
              <span className="text-[11px] text-amber-300 font-bold uppercase">Affiliation Number</span>
              <div className="text-2xl font-black text-white">{SCHOOL_INFO.affiliationNo}</div>
              <p className="text-xs text-slate-300">CBSE Senior Secondary Level</p>
            </div>
            <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
              <span className="text-[11px] text-amber-300 font-bold uppercase">School Code</span>
              <div className="text-2xl font-black text-white">{SCHOOL_INFO.schoolCode}</div>
              <p className="text-xs text-slate-300">Bhopal Region Examination Code</p>
            </div>
            <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
              <span className="text-[11px] text-amber-300 font-bold uppercase">Managing Body</span>
              <div className="text-base font-bold text-white leading-snug">{SCHOOL_INFO.managingSociety}</div>
              <p className="text-xs text-slate-300">Reg. Under MP Societies Act 1996</p>
            </div>
            <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
              <span className="text-[11px] text-amber-300 font-bold uppercase">Campus Address</span>
              <div className="text-sm font-bold text-white">Ward No 6, Shaktinagar</div>
              <p className="text-xs text-slate-300">Bari, Distt. Raisen (M.P.) – 464665</p>
            </div>
          </div>
        </div>

        {/* Download Feedback Banner */}
        {downloadSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{downloadSuccess}</span>
            </div>
            <span className="text-[11px] text-emerald-700">Official CBSE Compliant Format</span>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0a1d37] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Documents Table / Card View */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-800">
                    <FileText className="w-6 h-6 text-blue-700" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {doc.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        Doc No: {doc.documentNumber}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-[#0a1d37]">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {doc.description}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium pt-0.5">
                      <span>Issued: {doc.issueDate}</span>
                      <span>•</span>
                      <span>Validity: {doc.validity}</span>
                      <span>•</span>
                      <span>Size: {doc.fileSize}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0a1d37] hover:bg-[#122e54] text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Preview Modal */}
        {previewDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-900" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded uppercase">
                      {previewDoc.category} Document
                    </span>
                    <h3 className="text-lg font-extrabold text-[#0a1d37] mt-0.5">
                      {previewDoc.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Simulated Certificate Display */}
              <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300 space-y-4 text-xs sm:text-sm text-slate-800 font-serif">
                <div className="text-center space-y-1 border-b border-slate-200 pb-4">
                  <div className="font-sans font-black text-base text-[#0a1d37]">M.P. CONVENT SCHOOL</div>
                  <div className="text-xs font-sans text-slate-600">Bari, Distt. Raisen (Madhya Pradesh) – 464665</div>
                  <div className="text-[11px] font-sans text-amber-800 font-bold">Affiliated to CBSE, New Delhi • Affiliation No: 1030760</div>
                </div>

                <div className="space-y-2 py-2">
                  <div className="font-sans font-bold text-slate-900">Document Verification Certificate</div>
                  <p className="leading-relaxed">
                    This document certifies the formal execution and validity of <strong>{previewDoc.title}</strong> under registration / reference code <strong className="font-mono">{previewDoc.documentNumber}</strong>.
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-sans text-xs bg-white p-3 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-500">Date of Grant / Issue:</span>
                      <div className="font-bold">{previewDoc.issueDate}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Validity Period:</span>
                      <div className="font-bold text-emerald-700">{previewDoc.validity}</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic pt-2">
                    {previewDoc.description}
                  </p>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-slate-200 font-sans text-[11px] text-slate-600">
                  <div>
                    <span className="font-bold">Hari Om Gyan Ganga Shikshan Samiti</span>
                    <div>Authorised Signatory</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">Principal / Manager</span>
                    <div>MP Convent School, Bari</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-400">File size: {previewDoc.fileSize}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleDownload(previewDoc);
                      setPreviewDoc(null);
                    }}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Copy</span>
                  </button>
                  <button
                    onClick={() => setPreviewDoc(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
