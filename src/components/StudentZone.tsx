import React, { useState } from 'react';
import { 
  Users, 
  ExternalLink, 
  Search, 
  FileCheck, 
  CreditCard, 
  BookOpen, 
  Calendar, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertCircle,
  X,
  Sparkles,
  Bus,
  Radio
} from 'lucide-react';
import { SCHOOL_INFO, SAMPLE_TCS } from '../data/schoolData';
import { TransferCertificate } from '../types';

interface StudentZoneProps {
  onOpenParentPortal?: () => void;
  onOpenLiveGps?: () => void;
}

export const StudentZone: React.FC<StudentZoneProps> = ({ onOpenParentPortal, onOpenLiveGps }) => {
  const [activeTab, setActiveTab] = useState<'erp' | 'tc' | 'fees' | 'books' | 'calendar'>('erp');
  
  // TC Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedTc, setSearchedTc] = useState<TransferCertificate | null>(null);
  const [tcNotFound, setTcNotFound] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleSearchTc = (e: React.FormEvent) => {
    e.preventDefault();
    setTcNotFound(false);
    setSearchedTc(null);

    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = SAMPLE_TCS.find(
      tc => tc.scholarNo.toLowerCase().includes(query) || 
            tc.tcNumber.toLowerCase().includes(query) || 
            tc.studentName.toLowerCase().includes(query)
    );

    if (found) {
      setSearchedTc(found);
    } else {
      setTcNotFound(true);
    }
  };

  const handlePrintTc = () => {
    window.print();
  };

  return (
    <section id="student-zone" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span>Student & Parent Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Student & Parent Zone
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Seamless access to the NextERP Mobile App, TC verification, academic calendar, fee guidelines, and books list.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('erp')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'erp'
                ? 'bg-[#0a1d37] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>NextERP / NLP Login</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </button>

          <button
            onClick={() => setActiveTab('tc')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'tc'
                ? 'bg-[#0a1d37] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>TC Download & Verify</span>
          </button>

          <button
            onClick={() => setActiveTab('fees')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'fees'
                ? 'bg-[#0a1d37] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4 text-blue-600" />
            <span>Fee Structure 2026–27</span>
          </button>

          <button
            onClick={() => setActiveTab('books')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'books'
                ? 'bg-[#0a1d37] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Books & Uniform</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'calendar'
                ? 'bg-[#0a1d37] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>Academic Calendar</span>
          </button>
        </div>

        {/* Tab 1: NextERP / NLP Portal */}
        {activeTab === 'erp' && (
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm animate-in fade-in duration-150">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                  <span>Powered by Next Learning Platform (NextERP)</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
                  Connected Learning for Parents & Students
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  MP Convent School Bari uses the integrated NextERP platform to ensure transparent parent communication, live digital attendance, homework submission, fee receipts, and performance analytics.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Real-time Attendance Alerts</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Daily Homework & Classwork</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Digital Report Cards & Marks</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Online Fee Payment & Invoices</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  {onOpenParentPortal && (
                    <button
                      onClick={onOpenParentPortal}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-navy-950 font-black text-sm px-5 py-3 rounded-xl shadow-md hover:scale-105 transition-all"
                    >
                      <Users className="w-4 h-4 text-navy-950" />
                      <span>Parent Portal</span>
                    </button>
                  )}
                  {onOpenLiveGps && (
                    <button
                      onClick={onOpenLiveGps}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm px-5 py-3 rounded-xl shadow-md hover:scale-105 transition-all"
                    >
                      <Radio className="w-4 h-4 text-white animate-pulse" />
                      <span>Live GPS Bus Tracker</span>
                    </button>
                  )}
                  <a
                    href={SCHOOL_INFO.erpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0a2f5e] text-white font-extrabold text-sm px-5 py-3 rounded-xl shadow-md transition-all"
                  >
                    <span>NextERP Web</span>
                    <ExternalLink className="w-4 h-4 text-amber-400" />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.nexteducation.nexterp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-5 py-3 rounded-xl border border-slate-300 transition-all"
                  >
                    <span>Parent Mobile App</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-extrabold text-[#0a1d37] text-sm uppercase tracking-wider">
                  How to Access Your Account
                </h4>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-black flex items-center justify-center shrink-0">1</span>
                    <p>Enter the student admission number / scholar number provided at the time of admission.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-black flex items-center justify-center shrink-0">2</span>
                    <p>Use the registered mobile number for OTP login or the default password issued by school IT cell.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-black flex items-center justify-center shrink-0">3</span>
                    <p>For password reset or credentials assistance, contact school admin desk at <strong className="text-slate-900">{SCHOOL_INFO.primaryPhone}</strong>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: TC Download & Verification Portal */}
        {activeTab === 'tc' && (
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 animate-in fade-in duration-150">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <h3 className="text-2xl font-extrabold text-[#0a1d37]">
                Online Transfer Certificate (TC) Verification
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                In compliance with CBSE directives, all Transfer Certificates issued by MP Convent School are verifiable online. Enter Scholar Number (e.g. <span className="font-mono font-bold text-slate-800">SCH-3104</span>, <span className="font-mono font-bold text-slate-800">SCH-4219</span>), TC Number, or Student Name.
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearchTc} className="flex gap-2 max-w-md mx-auto pt-2">
                <input
                  type="text"
                  placeholder="Enter Scholar No / Student Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:border-amber-500 font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0a1d37] hover:bg-[#122e54] text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Verify</span>
                </button>
              </form>
            </div>

            {/* TC Not Found */}
            {tcNotFound && (
              <div className="max-w-xl mx-auto p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>No matching TC record found for query: "{searchQuery}". Please verify the Scholar Number with school administration.</span>
              </div>
            )}

            {/* Found TC Result Certificate */}
            {searchedTc && (
              <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <FileCheck className="w-6 h-6 text-emerald-700" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                        CBSE Verified Record
                      </span>
                      <h4 className="text-base font-extrabold text-[#0a1d37]">
                        Transfer Certificate #{searchedTc.tcNumber}
                      </h4>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handlePrintTc}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                      title="Print TC"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* TC Key-Value Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-500">Student Name:</span>
                    <div className="font-bold text-slate-900 text-sm">{searchedTc.studentName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Scholar Number:</span>
                    <div className="font-mono font-bold text-blue-900">{searchedTc.scholarNo}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Father's Name:</span>
                    <div className="font-medium text-slate-800">{searchedTc.fatherName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Mother's Name:</span>
                    <div className="font-medium text-slate-800">{searchedTc.motherName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Date of Birth:</span>
                    <div className="font-medium text-slate-800">{searchedTc.dateOfBirth}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Class at Leaving:</span>
                    <div className="font-bold text-amber-700">{searchedTc.classPassed}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Date of Issue:</span>
                    <div className="font-medium text-slate-800">{searchedTc.dateOfIssue}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Reason for Leaving:</span>
                    <div className="font-medium text-slate-800">{searchedTc.reasonForLeaving}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="text-[11px] text-slate-400">Affiliation No: 1030760 • School Code: 50723</div>
                  <button
                    onClick={() => {
                      setDownloadSuccess(`Downloaded Official TC Copy: ${searchedTc.tcNumber}`);
                      setTimeout(() => setDownloadSuccess(null), 3000);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Signed PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Fee Structure 2026-27 */}
        {activeTab === 'fees' && (
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div className="max-w-3xl space-y-2">
              <h3 className="text-2xl font-extrabold text-[#0a1d37]">
                Fee Structure & Payment Norms (Session 2026–27)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                MP Convent School adheres strictly to transparent, regulated fee guidelines with quarterly installments and online payment options via NextERP.
              </p>
            </div>

            <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#0a1d37] text-white font-bold text-xs uppercase">
                  <tr>
                    <th className="p-4">Wing / Classes</th>
                    <th className="p-4">Admission Fee (One-Time)</th>
                    <th className="p-4">Tuition Fee (Quarterly)</th>
                    <th className="p-4">Smart Class & Lab</th>
                    <th className="p-4">Installment Schedule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">Pre-Primary (Playgroup, Nursery, LKG, UKG)</td>
                    <td className="p-4">₹ 2,500</td>
                    <td className="p-4 font-bold text-blue-900">₹ 3,200 / Qtr</td>
                    <td className="p-4 text-emerald-700">Included</td>
                    <td className="p-4 text-slate-500">4 Equal Terms</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">Primary (Class I – V)</td>
                    <td className="p-4">₹ 3,000</td>
                    <td className="p-4 font-bold text-blue-900">₹ 3,800 / Qtr</td>
                    <td className="p-4 text-emerald-700">Included</td>
                    <td className="p-4 text-slate-500">4 Equal Terms</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">Middle School (Class VI – VIII)</td>
                    <td className="p-4">₹ 3,500</td>
                    <td className="p-4 font-bold text-blue-900">₹ 4,400 / Qtr</td>
                    <td className="p-4 text-emerald-700">Included</td>
                    <td className="p-4 text-slate-500">4 Equal Terms</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">Secondary & Sr. Sec (Class IX – XII)</td>
                    <td className="p-4">₹ 4,500</td>
                    <td className="p-4 font-bold text-blue-900">₹ 5,200 / Qtr</td>
                    <td className="p-4 text-emerald-700">Included</td>
                    <td className="p-4 text-slate-500">4 Equal Terms</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Sibling Concession & Merit Waivers:</strong> Special fee waivers are available for siblings enrolled together and for state/district level sports champions. Enquire at the accounts desk for complete documentation.
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Books & Uniform */}
        {activeTab === 'books' && (
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div className="max-w-3xl space-y-2">
              <h3 className="text-2xl font-extrabold text-[#0a1d37]">
                Books, Uniform & Stationery Standards
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Aligned with CBSE circulars, NCERT prescribed textbooks are utilized across primary to senior secondary sections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0a1d37]">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  <h4>NCERT Textbook Lists 2026–27</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All books for classes I through XII are based on the latest CBSE curriculum. Parents are free to purchase books and stationery from any vendor of their choice.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => {
                      setDownloadSuccess("Downloaded Class-wise Booklist 2026-27");
                      setTimeout(() => setDownloadSuccess(null), 3000);
                    }}
                    className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Class-Wise Book List (PDF)</span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0a1d37]">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h4>School Uniform Guidelines</h4>
                </div>
                <div className="text-xs text-slate-600 space-y-1.5">
                  <p><strong>Regular Days (Mon, Tue, Thu, Fri):</strong> Navy Blue trousers/skirt, white monogrammed shirt, school tie, belt, and black leather shoes.</p>
                  <p><strong>House Activity Days (Wed, Sat):</strong> House T-shirt (Red/Blue/Green/Yellow), white track trousers, and white sports canvas shoes.</p>
                  <p><strong>Winter Season:</strong> Navy blue V-neck pullover and blazer with school crest.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Academic Calendar */}
        {activeTab === 'calendar' && (
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div className="max-w-3xl space-y-2">
              <h3 className="text-2xl font-extrabold text-[#0a1d37]">
                Annual Academic & Holiday Calendar 2026–27
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Key dates for term examinations, unit assessments, parent-teacher meetings, sports tournaments, and gazetted holidays.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase">Term I Assessment</span>
                <h4 className="font-bold text-slate-900 text-sm">Periodic Test 1 (PT-1)</h4>
                <p className="text-xs text-slate-500">July 20 – July 28, 2026</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded uppercase">Mid-Term Exams</span>
                <h4 className="font-bold text-slate-900 text-sm">Half Yearly Examination</h4>
                <p className="text-xs text-slate-500">September 18 – September 30, 2026</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">Annual Sports</span>
                <h4 className="font-bold text-slate-900 text-sm">Athletics & Sports Week</h4>
                <p className="text-xs text-slate-500">October 10 – October 12, 2026</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase">Term II Assessment</span>
                <h4 className="font-bold text-slate-900 text-sm">Periodic Test 2 (PT-2)</h4>
                <p className="text-xs text-slate-500">December 08 – December 16, 2026</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded uppercase">Pre-Board (X & XII)</span>
                <h4 className="font-bold text-slate-900 text-sm">CBSE Mock Pre-Board Series</h4>
                <p className="text-xs text-slate-500">January 10 – January 24, 2027</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded uppercase">Final Exams</span>
                <h4 className="font-bold text-slate-900 text-sm">Annual School Examinations</h4>
                <p className="text-xs text-slate-500">February 20 – March 05, 2027</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
