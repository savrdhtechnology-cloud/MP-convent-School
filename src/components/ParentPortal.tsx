import React, { useState } from 'react';
import { 
  User, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  FileText, 
  Truck, 
  Bell, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Printer, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  X, 
  Send, 
  Plus, 
  LogOut, 
  Sparkles, 
  Check, 
  Eye, 
  QrCode, 
  ExternalLink,
  Award,
  Compass,
  GraduationCap,
  Lock,
  Radio,
  Navigation,
  Bus
} from 'lucide-react';
import { ParentStudentData, SAMPLE_STUDENTS } from '../data/parentData';
import { SCHOOL_INFO } from '../data/schoolData';
import { LiveGpsTrackerModal } from './LiveGpsTrackerModal';

interface ParentPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({ isOpen, onClose }) => {
  // Authentication & Selected Student State
  const [students, setStudents] = useState<ParentStudentData[]>(SAMPLE_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(SAMPLE_STUDENTS[0].id);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [loginPhone, setLoginPhone] = useState<string>('');
  const [loginOtp, setLoginOtp] = useState<string>('');
  const [loginStep, setLoginStep] = useState<'phone' | 'otp'>('phone');

  // Active Portal Navigation Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'fees' | 'academics' | 'homework' | 'transport' | 'notices' | 'communication'>('overview');

  // Modal States inside Parent Portal
  const [showFeePaymentModal, setShowFeePaymentModal] = useState<boolean>(false);
  const [selectedInstallmentId, setSelectedInstallmentId] = useState<string>('');
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const [showReportCardModal, setShowReportCardModal] = useState<boolean>(false);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [showPtmModal, setShowPtmModal] = useState<boolean>(false);
  const [showLiveGpsModal, setShowLiveGpsModal] = useState<boolean>(false);
  const [paymentSuccessToast, setPaymentSuccessToast] = useState<string | null>(null);

  // Leave Form State
  const [leaveForm, setLeaveForm] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
    type: 'Medical' as 'Medical' | 'Family' | 'Casual' | 'Emergency',
    reason: ''
  });

  // Message Form State
  const [messageText, setMessageText] = useState('');
  const [messageSentNotification, setMessageSentNotification] = useState(false);

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('parent@upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isOpen) return null;

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Handler: Switch student profile
  const handleSelectStudent = (id: string) => {
    setSelectedStudentId(id);
  };

  // Handler: Toggle homework completion
  const handleToggleHomework = (hwId: string) => {
    setStudents(prev => prev.map(student => {
      if (student.id !== currentStudent.id) return student;
      return {
        ...student,
        homework: student.homework.map(hw => {
          if (hw.id === hwId) return { ...hw, isCompleted: !hw.isCompleted };
          return hw;
        })
      };
    }));
  };

  // Handler: Submit Leave Application
  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveForm.reason.trim()) return;

    const newLeave = {
      id: `LV-${Math.floor(1000 + Math.random() * 9000)}`,
      from: leaveForm.from,
      to: leaveForm.to,
      days: Math.max(1, Math.round((new Date(leaveForm.to).getTime() - new Date(leaveForm.from).getTime()) / (1000 * 3600 * 24)) + 1),
      type: leaveForm.type,
      reason: leaveForm.reason,
      appliedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'PENDING' as const,
      remarks: 'Application submitted to Class Teacher'
    };

    setStudents(prev => prev.map(student => {
      if (student.id !== currentStudent.id) return student;
      return {
        ...student,
        leaveApplications: [newLeave, ...student.leaveApplications]
      };
    }));

    setShowLeaveModal(false);
    setLeaveForm({
      from: new Date().toISOString().split('T')[0],
      to: new Date().toISOString().split('T')[0],
      type: 'Medical',
      reason: ''
    });
  };

  // Handler: Process Online Fee Payment Simulation
  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const generatedReceiptNo = `MPCS/2026/REC-${Math.floor(3000 + Math.random() * 6000)}`;
      const targetInst = currentStudent.fees.installments.find(i => i.id === selectedInstallmentId) || currentStudent.fees.installments.find(i => i.status === 'DUE');
      
      if (!targetInst) {
        setIsProcessingPayment(false);
        return;
      }

      const paidAmount = targetInst.amount;
      const receiptData = {
        receiptNo: generatedReceiptNo,
        title: targetInst.title,
        amount: paidAmount,
        paidOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        paymentMode: paymentMethod === 'upi' ? `UPI (${upiId})` : paymentMethod === 'card' ? 'Online Debit Card' : 'Net Banking',
        transactionId: `TXN${Date.now()}`
      };

      setStudents(prev => prev.map(student => {
        if (student.id !== currentStudent.id) return student;
        return {
          ...student,
          fees: {
            ...student.fees,
            paidAmount: student.fees.paidAmount + paidAmount,
            dueAmount: Math.max(0, student.fees.dueAmount - paidAmount),
            installments: student.fees.installments.map(inst => {
              if (inst.id === targetInst.id) {
                return {
                  ...inst,
                  status: 'PAID',
                  paidOn: receiptData.paidOn,
                  receiptNo: receiptData.receiptNo,
                  paymentMode: receiptData.paymentMode,
                  transactionId: receiptData.transactionId
                };
              }
              return inst;
            })
          }
        };
      }));

      setIsProcessingPayment(false);
      setShowFeePaymentModal(false);
      setSelectedReceipt(receiptData);
      setPaymentSuccessToast(`Payment of ₹${paidAmount.toLocaleString('en-IN')} successful! Receipt #${generatedReceiptNo} generated.`);
      setTimeout(() => setPaymentSuccessToast(null), 6000);
    }, 1200);
  };

  // Handler: Send Teacher Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSentNotification(true);
    setMessageText('');
    setTimeout(() => setMessageSentNotification(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Portal Outer Frame */}
      <div className="bg-white w-full max-w-6xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] border border-slate-200">
        
        {/* 1. PORTAL HEADER BAR (Navy & Gold Vibrant Palette) */}
        <div className="bg-[#002147] text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/30">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-navy-950 flex items-center justify-center font-black text-lg shadow-md">
              MP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                  <span>Parent & Student Portal</span>
                  <span className="text-[10px] bg-amber-400 text-navy-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    NextERP Live
                  </span>
                </h2>
              </div>
              <p className="text-[11px] text-slate-300">
                M.P. Convent School, Bari (CBSE Affiliation No: {SCHOOL_INFO.affiliationNo})
              </p>
            </div>
          </div>

          {/* Student Switcher & Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn && (
              <div className="flex items-center bg-[#0a2f5e] rounded-xl p-1 border border-white/10">
                <span className="text-[11px] text-slate-300 px-2 hidden sm:inline font-medium">Student:</span>
                <select
                  value={selectedStudentId}
                  onChange={(e) => handleSelectStudent(e.target.value)}
                  className="bg-white text-navy-950 text-xs font-bold py-1 px-2.5 rounded-lg outline-none cursor-pointer"
                >
                  {students.map(stu => (
                    <option key={stu.id} value={stu.id}>
                      {stu.name} ({stu.classGrade}-{stu.section})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title="Close Portal"
              aria-label="Close Parent Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Toast Notification */}
        {paymentSuccessToast && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
              <span>{paymentSuccessToast}</span>
            </div>
            <button 
              onClick={() => setPaymentSuccessToast(null)}
              className="text-emerald-200 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 2. STUDENT QUICK SUMMARY BANNER */}
        <div className="bg-gradient-to-r from-slate-50 via-amber-50/40 to-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img 
              src={currentStudent.photoUrl} 
              alt={currentStudent.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-[#002147]">{currentStudent.name}</h3>
                <span className="text-[11px] font-bold bg-[#002147] text-white px-2 py-0.5 rounded-md">
                  {currentStudent.classGrade} - {currentStudent.section}
                </span>
                <span className="text-[11px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                  Roll #{currentStudent.rollNo}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Scholar No: <strong className="text-slate-800">{currentStudent.scholarNo}</strong> | House: <span className="font-medium text-slate-700">{currentStudent.house}</span> | Parent: {currentStudent.fatherName}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-xs">
            <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-center">
              <span className="text-[10px] text-emerald-700 font-bold block uppercase">Today's Attendance</span>
              <span className="font-extrabold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {currentStudent.attendance.todayStatus} ({currentStudent.attendance.percentage}%)
              </span>
            </div>

            <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-center">
              <span className="text-[10px] text-amber-800 font-bold block uppercase">Fee Due</span>
              <span className="font-extrabold text-amber-900">
                {currentStudent.fees.dueAmount === 0 ? 'All Cleared' : `₹${currentStudent.fees.dueAmount.toLocaleString('en-IN')}`}
              </span>
            </div>

            <button
              onClick={() => setShowLeaveModal(true)}
              className="bg-[#002147] hover:bg-[#0a2f5e] text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Apply Leave</span>
            </button>
          </div>
        </div>

        {/* 3. HORIZONTAL TAB NAVIGATION */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 flex overflow-x-auto gap-1 scrollbar-none py-2 text-xs font-bold text-slate-600">
          {[
            { id: 'overview', label: 'Dashboard', icon: Sparkles },
            { id: 'attendance', label: 'Attendance & Leaves', icon: Calendar },
            { id: 'fees', label: 'Fees & Receipts', icon: CreditCard },
            { id: 'academics', label: 'Report Card', icon: Award },
            { id: 'homework', label: 'Homework Diary', icon: BookOpen },
            { id: 'transport', label: 'GPS Bus Tracking', icon: Truck },
            { id: 'notices', label: 'School Circulars', icon: Bell },
            { id: 'communication', label: 'Teacher & PTM', icon: MessageSquare }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#002147] text-white shadow-sm font-black' 
                    : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4. TAB CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 space-y-6">

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Top Quick Status Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Attendance Snapshot */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Attendance Rate</p>
                      <h4 className="text-2xl font-black text-[#002147] mt-1">{currentStudent.attendance.percentage}%</h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{currentStudent.attendance.attendedDays} / {currentStudent.attendance.totalDays} Days</span>
                    <span className="text-emerald-600 font-bold">Present Today</span>
                  </div>
                </div>

                {/* Card 2: Fee Balance */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fee Balance</p>
                      <h4 className="text-2xl font-black text-[#002147] mt-1">
                        {currentStudent.fees.dueAmount === 0 ? '₹0 Due' : `₹${currentStudent.fees.dueAmount.toLocaleString('en-IN')}`}
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Next Due: {currentStudent.fees.nextDueOn}</span>
                    {currentStudent.fees.dueAmount > 0 ? (
                      <button 
                        onClick={() => {
                          const dueInst = currentStudent.fees.installments.find(i => i.status === 'DUE');
                          if (dueInst) setSelectedInstallmentId(dueInst.id);
                          setShowFeePaymentModal(true);
                        }}
                        className="text-amber-700 font-extrabold hover:underline"
                      >
                        Pay Online →
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-bold">Cleared</span>
                    )}
                  </div>
                </div>

                {/* Card 3: Homework Pending */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Homework Due</p>
                      <h4 className="text-2xl font-black text-[#002147] mt-1">
                        {currentStudent.homework.filter(h => !h.isCompleted).length} Tasks
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{currentStudent.homework.length} Assigned this week</span>
                    <button onClick={() => setActiveTab('homework')} className="text-blue-700 font-bold hover:underline">
                      View →
                    </button>
                  </div>
                </div>

                {/* Card 4: GPS Bus Status */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Live Bus Status</p>
                      <h4 className="text-sm font-black text-[#002147] mt-1 truncate">
                        {currentStudent.busTracker.status === 'ON_ROUTE' ? `ETA ${currentStudent.busTracker.etaMinutes} min` : 'At School'}
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate">{currentStudent.busTracker.busNo}</span>
                    <button onClick={() => setActiveTab('transport')} className="text-purple-700 font-bold hover:underline">
                      Track Live →
                    </button>
                  </div>
                </div>

              </div>

              {/* Two-Column Grid: Notice Board & Classwork Snapshot */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2 Columns: Homework & Academic Feed */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Today's Homework Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-500" />
                        <h4 className="font-extrabold text-sm text-[#002147]">Today's Class Diary & Homework</h4>
                      </div>
                      <button 
                        onClick={() => setActiveTab('homework')} 
                        className="text-xs text-[#002147] font-bold hover:underline"
                      >
                        See All ({currentStudent.homework.length})
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {currentStudent.homework.map(hw => (
                        <div 
                          key={hw.id}
                          className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
                            hw.isCompleted ? 'bg-slate-50/70 border-slate-200' : 'bg-amber-50/30 border-amber-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button 
                              onClick={() => handleToggleHomework(hw.id)}
                              className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                hw.isCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white hover:border-amber-500'
                              }`}
                            >
                              {hw.isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-xs text-[#002147]">{hw.subject}</span>
                                <span className="text-[10px] text-slate-400">• Due: {hw.dueDate}</span>
                              </div>
                              <p className="font-bold text-xs text-slate-800 mt-0.5">{hw.title}</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">{hw.description}</p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            hw.isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                          }`}>
                            {hw.isCompleted ? 'Done' : 'Pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic Progress Summary */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-amber-400 text-navy-950 flex flex-col items-center justify-center font-black shadow-md shrink-0">
                        <span className="text-base leading-none">{currentStudent.reportCards[0]?.overallPercentage}%</span>
                        <span className="text-[9px] uppercase font-extrabold tracking-tight mt-0.5">Term 1</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                          Rank: {currentStudent.reportCards[0]?.rank}
                        </span>
                        <h4 className="font-extrabold text-sm text-[#002147] mt-1">
                          {currentStudent.reportCards[0]?.term} ({currentStudent.reportCards[0]?.session})
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          Remarks: "{currentStudent.reportCards[0]?.remarks}"
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowReportCardModal(true)}
                      className="bg-[#002147] hover:bg-[#0a2f5e] text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap shadow-sm"
                    >
                      <Printer className="w-4 h-4 text-amber-400" />
                      <span>View & Print Marksheet</span>
                    </button>
                  </div>

                </div>

                {/* Right Column: Important Notices & Teacher Contact */}
                <div className="space-y-6">
                  
                  {/* Urgent Notice Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-amber-600" />
                        <h4 className="font-extrabold text-sm text-[#002147]">Latest Circulars</h4>
                      </div>
                      <button onClick={() => setActiveTab('notices')} className="text-xs text-[#002147] font-bold hover:underline">
                        View All
                      </button>
                    </div>

                    <div className="space-y-3">
                      {currentStudent.notices.slice(0, 2).map(notice => (
                        <div key={notice.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.2 rounded">
                              {notice.category}
                            </span>
                            <span className="text-[10px] text-slate-400">{notice.date}</span>
                          </div>
                          <h5 className="font-bold text-xs text-slate-900">{notice.title}</h5>
                          <p className="text-[11px] text-slate-600 line-clamp-2">{notice.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Class Teacher Card */}
                  <div className="bg-gradient-to-br from-[#002147] to-[#0a2f5e] text-white p-5 rounded-2xl shadow-md space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Class Teacher</p>
                        <h5 className="font-bold text-sm text-white">{currentStudent.classTeacher}</h5>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 text-xs text-slate-200 space-y-1">
                      <p className="flex items-center justify-between">
                        <span className="text-slate-400">Upcoming PTM:</span>
                        <strong className="text-amber-300">{currentStudent.ptmSchedule.upcomingDate}</strong>
                      </p>
                      <p className="flex items-center justify-between">
                        <span className="text-slate-400">Slot:</span>
                        <span>{currentStudent.ptmSchedule.timeSlot}</span>
                      </p>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setActiveTab('communication')}
                        className="flex-1 bg-amber-400 hover:bg-amber-500 text-navy-950 font-bold py-2 rounded-xl text-xs text-center transition-colors"
                      >
                        Send Message
                      </button>
                      <a
                        href={`tel:${SCHOOL_INFO.primaryPhone}`}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white flex items-center justify-center transition-colors"
                        title="Call School Desk"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: ATTENDANCE & LEAVE MANAGEMENT */}
          {activeTab === 'attendance' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Attendance Summary */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="font-extrabold text-sm text-[#002147] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>Academic Attendance Summary</span>
                  </h4>

                  <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-4xl font-black text-[#002147]">{currentStudent.attendance.percentage}%</div>
                    <p className="text-xs text-slate-500 mt-1">Total Academic Days: {currentStudent.attendance.totalDays}</p>
                    <p className="text-xs text-emerald-600 font-bold">Present: {currentStudent.attendance.attendedDays} Days | Leave: {currentStudent.attendance.totalDays - currentStudent.attendance.attendedDays} Days</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-700">Monthly Attendance Breakdown (2026–27):</p>
                    <div className="space-y-1.5 text-xs">
                      {currentStudent.attendance.monthlyBreakdown.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                          <span className="font-medium text-slate-700">{m.month}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#002147]">{m.present}/{m.total} Days</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                              {Math.round((m.present / m.total) * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RFID Live Logs */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="font-extrabold text-sm text-[#002147] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Recent Daily Logs (Smart RFID)</span>
                  </h4>

                  <div className="space-y-2.5">
                    {currentStudent.attendance.recentLogs.map((log, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-slate-800">{log.date}</strong>
                            <span className="text-slate-400">({log.day})</span>
                          </div>
                          <span className="text-[11px] text-slate-500">{log.remarks || 'Standard Day'}</span>
                        </div>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          log.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leave Applications */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-[#002147]">Leave History</h4>
                      <button 
                        onClick={() => setShowLeaveModal(true)}
                        className="bg-amber-400 hover:bg-amber-500 text-navy-950 font-bold px-2.5 py-1 rounded-lg text-xs flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Apply</span>
                      </button>
                    </div>

                    {currentStudent.leaveApplications.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 text-xs">
                        No previous leave applications recorded for this session.
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {currentStudent.leaveApplications.map(lv => (
                          <div key={lv.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#002147]">{lv.type} Leave ({lv.days} day)</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                lv.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                              }`}>
                                {lv.status}
                              </span>
                            </div>
                            <p className="text-slate-600 text-[11px]">{lv.from} to {lv.to}</p>
                            <p className="text-slate-500 italic text-[11px]">"{lv.reason}"</p>
                            {lv.approvedBy && (
                              <p className="text-[10px] text-emerald-700 font-medium pt-1 border-t border-slate-200">
                                Verified by: {lv.approvedBy}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setShowLeaveModal(true)}
                    className="w-full py-2.5 bg-[#002147] text-white font-bold rounded-xl text-xs hover:bg-[#0a2f5e] transition-colors"
                  >
                    Submit New Leave Application
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: FEES & RECEIPTS */}
          {activeTab === 'fees' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Fee Top Summary Banner */}
              <div className="bg-gradient-to-r from-[#002147] to-[#0a2f5e] text-white p-6 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">Session 2026–27 Fee Ledger</span>
                  <h3 className="text-2xl font-black text-white mt-0.5">
                    Total Annual Fee: ₹{currentStudent.fees.totalAnnualFee.toLocaleString('en-IN')}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    CBSE Comprehensive Academic, IT, Smart Lab, Sports & Activity Fee included
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-white/10 p-3.5 rounded-2xl backdrop-blur-xs border border-white/10 text-xs">
                  <div>
                    <span className="text-slate-300 block text-[10px] uppercase">Paid Amount</span>
                    <strong className="text-emerald-300 text-base font-black">₹{currentStudent.fees.paidAmount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="w-px h-8 bg-white/20"></div>
                  <div>
                    <span className="text-slate-300 block text-[10px] uppercase">Balance Due</span>
                    <strong className="text-amber-400 text-base font-black">₹{currentStudent.fees.dueAmount.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              {/* Installments Table & Online Payment */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-[#002147]">Quarterly Installment Schedule (2026–27)</h4>
                  <span className="text-xs text-slate-500">Official NextERP Payment Gateway</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {currentStudent.fees.installments.map((inst) => (
                    <div key={inst.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-[#002147]">{inst.title}</h5>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            inst.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' :
                            inst.status === 'DUE' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {inst.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Due Date: <strong className="text-slate-700">{inst.dueDate}</strong>
                          {inst.paidOn && ` • Paid on ${inst.paidOn} via ${inst.paymentMode}`}
                          {inst.receiptNo && ` • Receipt #${inst.receiptNo}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="text-base font-black text-[#002147]">
                          ₹{inst.amount.toLocaleString('en-IN')}
                        </span>

                        {inst.status === 'PAID' ? (
                          <button
                            onClick={() => setSelectedReceipt(inst)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#002147] font-bold text-xs rounded-xl border border-slate-200 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Receipt</span>
                          </button>
                        ) : inst.status === 'DUE' ? (
                          <button
                            onClick={() => {
                              setSelectedInstallmentId(inst.id);
                              setShowFeePaymentModal(true);
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 font-black text-xs rounded-xl shadow-md hover:scale-105 transition-transform"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Pay Online Now</span>
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium px-3 py-1.5">Upcoming</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: ACADEMICS & REPORT CARD */}
          {activeTab === 'academics' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {currentStudent.reportCards.map((rc, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-6">
                  
                  {/* Marksheet Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded uppercase">
                        CBSE Continuous Comprehensive Evaluation
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-[#002147] mt-1">
                        {rc.term} — Academic Session {rc.session}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Class: {currentStudent.classGrade} ({currentStudent.section}) | Overall Percentage: <strong className="text-emerald-700">{rc.overallPercentage}% (Grade {rc.grade})</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => setShowReportCardModal(true)}
                      className="flex items-center gap-2 bg-[#002147] hover:bg-[#0a2f5e] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm"
                    >
                      <Printer className="w-4 h-4 text-amber-400" />
                      <span>Print Marksheet (PDF)</span>
                    </button>
                  </div>

                  {/* Subject Scores Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                        <tr>
                          <th className="p-3">Code</th>
                          <th className="p-3">Subject Name</th>
                          <th className="p-3 text-center">Max Marks</th>
                          <th className="p-3 text-center">Theory</th>
                          <th className="p-3 text-center">Internal / Pract.</th>
                          <th className="p-3 text-center">Total Obtained</th>
                          <th className="p-3 text-center">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {rc.subjects.map((sub, sIdx) => (
                          <tr key={sIdx} className="hover:bg-amber-50/30">
                            <td className="p-3 text-slate-400 font-mono">{sub.code}</td>
                            <td className="p-3 font-bold text-slate-800">{sub.name}</td>
                            <td className="p-3 text-center text-slate-500">{sub.maxMarks}</td>
                            <td className="p-3 text-center text-slate-700">{sub.theory}</td>
                            <td className="p-3 text-center text-slate-700">{sub.practical}</td>
                            <td className="p-3 text-center font-bold text-[#002147] text-sm">{sub.total}</td>
                            <td className="p-3 text-center">
                              <span className="font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px]">
                                {sub.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Remarks & Class Position */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-700">Teacher's Observations: </span>
                      <span className="text-slate-600 italic">"{rc.remarks}"</span>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-slate-500">Class Position: </span>
                      <strong className="text-[#002147] font-extrabold">{rc.rank}</strong>
                    </div>
                  </div>

                </div>
              ))}

            </div>
          )}

          {/* TAB 5: HOMEWORK DIARY */}
          {activeTab === 'homework' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#002147]">Daily Classwork & Homework Diary</h4>
                    <p className="text-xs text-slate-500">Updated daily by subject teachers on NextERP</p>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-lg">
                    {currentStudent.homework.filter(h => !h.isCompleted).length} Pending Tasks
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStudent.homework.map(hw => (
                    <div 
                      key={hw.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        hw.isCompleted ? 'bg-slate-50 border-slate-200 opacity-80' : 'bg-white border-amber-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black bg-[#002147] text-white px-2 py-0.5 rounded-md">
                            {hw.subject}
                          </span>
                          <span className="text-[11px] text-slate-400">Assigned: {hw.assignedDate}</span>
                        </div>

                        <button
                          onClick={() => handleToggleHomework(hw.id)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                            hw.isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                          }`}
                        >
                          {hw.isCompleted ? <Check className="w-3.5 h-3.5" /> : null}
                          <span>{hw.isCompleted ? 'Completed' : 'Mark Done'}</span>
                        </button>
                      </div>

                      <h5 className="font-bold text-sm text-slate-900 mt-2">{hw.title}</h5>
                      <p className="text-xs text-slate-600 mt-1">{hw.description}</p>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Teacher: {hw.assignedBy}</span>
                        <span className="text-amber-800 font-bold">Due: {hw.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: GPS BUS TRACKING */}
          {activeTab === 'transport' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Live GPS Visual Card */}
              <div className="bg-[#0b1322] rounded-2xl border border-slate-800 text-white p-5 sm:p-6 shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
                      <Bus className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="text-[10px] font-mono uppercase text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          Live Satellite GPS Active
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base text-white mt-1">
                        {currentStudent.busTracker.routeNumber}: {currentStudent.busTracker.routeName}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Bus: <strong className="text-amber-300 font-mono">{currentStudent.busTracker.busNo}</strong> • Speed: <strong className="text-emerald-400 font-mono">{currentStudent.busTracker.speedKmH} km/h</strong> • ETA: <strong className="text-amber-400 font-mono">{currentStudent.busTracker.etaMinutes} mins</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowLiveGpsModal(true)}
                      className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all transform hover:scale-105"
                    >
                      <Radio className="w-4 h-4 text-slate-950 animate-pulse" />
                      <span>Open Live Interactive GPS Map</span>
                    </button>
                    <a
                      href={`tel:${currentStudent.busTracker.driverContact}`}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5 fill-current" />
                      <span>Call Driver</span>
                    </a>
                  </div>
                </div>

                {/* Road Preview Graphic */}
                <div 
                  onClick={() => setShowLiveGpsModal(true)}
                  className="mt-5 p-4 rounded-xl bg-[#070e1b] border border-slate-800 cursor-pointer hover:border-amber-400/50 transition-all group relative"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="text-[11px] font-mono uppercase text-slate-400">Road Telemetry (Click to expand live map)</span>
                    <span className="text-amber-400 font-bold text-[11px] group-hover:underline flex items-center gap-1">
                      <span>Expand Satellite View</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Route progress line */}
                  <div className="relative h-12 flex items-center justify-between px-4">
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-2 bg-slate-800 rounded-full">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full w-[65%]"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow"></div>
                      <span className="text-[10px] text-slate-400 mt-1">Pickup Stop</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg border border-white animate-bounce">
                        <Bus className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span className="text-[10px] text-amber-300 font-bold mt-1">Bus (38 km/h)</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow animate-ping"></div>
                      <span className="text-[10px] text-rose-300 font-bold mt-1">MPCS Campus</span>
                    </div>
                  </div>
                </div>

                {/* Stops List */}
                <div className="mt-5 space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-300 uppercase tracking-wider">Scheduled Stops & Live Location:</h4>
                  
                  <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                    {currentStudent.busTracker.stops.map((stop, sIdx) => (
                      <div key={sIdx} className="relative flex items-center justify-between gap-4 text-xs">
                        <div className={`absolute -left-6 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          stop.passed 
                            ? 'bg-emerald-600 border-white text-white shadow-xs' 
                            : 'bg-slate-900 border-amber-500 text-amber-500'
                        }`}>
                          {stop.passed ? <Check className="w-3 h-3 stroke-[3]" /> : <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>}
                        </div>

                        <div>
                          <p className={`font-bold ${stop.passed ? 'text-slate-300' : 'text-amber-300 font-extrabold'}`}>
                            {stop.name}
                          </p>
                          <p className="text-[11px] text-slate-400">Scheduled: {stop.scheduledTime} {stop.actualTime ? `• Crossed at ${stop.actualTime}` : ''}</p>
                        </div>

                        <div>
                          {stop.passed ? (
                            <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold px-2 py-0.5 rounded">Passed</span>
                          ) : (
                            <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded shadow animate-pulse">
                              Approaching (ETA {currentStudent.busTracker.etaMinutes}m)
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>All school buses are equipped with live GPS tracking, CCTV surveillance cameras, speed governors, and verified drivers.</span>
                </div>

              </div>

            </div>
          )}

          {/* TAB 7: SCHOOL NOTICES & CIRCULARS */}
          {activeTab === 'notices' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-[#002147]">Official School Circulars & Notices</h4>
                  <span className="text-xs text-slate-500">M.P. Convent School Notice Desk</span>
                </div>

                <div className="space-y-3">
                  {currentStudent.notices.map(nt => (
                    <div key={nt.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            nt.urgent ? 'bg-rose-100 text-rose-800' : 'bg-[#002147] text-white'
                          }`}>
                            {nt.category}
                          </span>
                          {nt.urgent && (
                            <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded-full uppercase">
                              Urgent
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">{nt.date}</span>
                      </div>
                      <h5 className="font-bold text-sm text-slate-900">{nt.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">{nt.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: TEACHER COMMUNICATION & PTM */}
          {activeTab === 'communication' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Direct Message Form */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="font-extrabold text-sm text-[#002147] flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <span>Send Message to Class Teacher</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Recipient: <strong className="text-[#002147]">{currentStudent.classTeacher}</strong> (Class {currentStudent.classGrade}-{currentStudent.section})
                  </p>

                  {messageSentNotification && (
                    <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Message transmitted securely to teacher's NextERP inbox!</span>
                    </div>
                  )}

                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your enquiry, academic question, or notes for the teacher..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full p-3 text-xs border border-slate-300 rounded-xl outline-none focus:border-amber-500 resize-none font-medium"
                    ></textarea>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#002147] hover:bg-[#0a2f5e] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                      <span>Transmit Message</span>
                    </button>
                  </form>
                </div>

                {/* PTM Schedule & Helpdesk */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-sm text-[#002147] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span>Parent-Teacher Meeting (PTM) Appointment</span>
                    </h4>

                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-900">Term 1 Evaluation PTM</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          {currentStudent.ptmSchedule.status}
                        </span>
                      </div>
                      <p className="text-slate-700">Date: <strong>{currentStudent.ptmSchedule.upcomingDate}</strong></p>
                      <p className="text-slate-700">Allocated Slot: <strong>{currentStudent.ptmSchedule.timeSlot}</strong></p>
                      <p className="text-slate-700">Venue: <strong>{currentStudent.ptmSchedule.venue}</strong></p>
                    </div>

                    <div className="text-xs text-slate-500 space-y-1">
                      <p className="font-bold text-slate-700">Need special consultation or reschedule?</p>
                      <p>Call the school reception desk directly during working hours (08:30 AM – 03:00 PM).</p>
                    </div>
                  </div>

                  <a
                    href={`tel:${SCHOOL_INFO.primaryPhone}`}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#002147] font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-200 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>Call School Reception ({SCHOOL_INFO.primaryPhone})</span>
                  </a>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Portal Footer with Developer Credit */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>NextERP Cloud Sync Active • Session 2026–27</span>
          </div>
          <div className="text-[10px] text-slate-500">
            Powered by <strong className="text-amber-700 font-bold">Savrdh Technologies</strong> — Shailendra Choudhary (Savrdh Group)
          </div>
        </div>

      </div>

      {/* 5. ONLINE FEE PAYMENT MODAL */}
      {showFeePaymentModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-navy-950 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#002147]">Online Fee Payment</h4>
                  <p className="text-[11px] text-slate-500">M.P. Convent School NextERP Gateway</p>
                </div>
              </div>
              <button 
                onClick={() => setShowFeePaymentModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Amount to Pay */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 block">Quarter Installment Fee:</span>
              <div className="text-3xl font-black text-[#002147] mt-1">
                ₹{(currentStudent.fees.installments.find(i => i.id === selectedInstallmentId)?.amount || currentStudent.fees.dueAmount).toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Student: {currentStudent.name} (Class {currentStudent.classGrade}-{currentStudent.section})
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Select Payment Method:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR' },
                  { id: 'card', label: 'Debit/Credit' },
                  { id: 'netbanking', label: 'NetBanking' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === m.id 
                        ? 'bg-[#002147] text-white border-[#002147]' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* UPI ID Input or Card Simulation */}
            {paymentMethod === 'upi' && (
              <div className="space-y-2 text-xs">
                <label className="font-bold text-slate-700">Enter UPI ID (Google Pay / PhonePe / Paytm):</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-amber-500 font-medium"
                />
              </div>
            )}

            <button
              onClick={handleProcessPayment}
              disabled={isProcessingPayment}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-navy-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Confirming with Bank Gateway...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-navy-950" />
                  <span>Authorize Secure Payment</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-slate-400">
              256-Bit SSL Encrypted NextERP School Gateway
            </div>
          </div>
        </div>
      )}

      {/* 6. OFFICIAL PRINTABLE FEE RECEIPT MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 text-slate-800">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500">Official Fee Receipt</span>
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Receipt Paper */}
            <div className="border-2 border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50/50">
              
              {/* Header */}
              <div className="text-center space-y-1 border-b border-slate-200 pb-3">
                <h3 className="font-black text-base text-[#002147]">M.P. CONVENT HIGHER SECONDARY SCHOOL</h3>
                <p className="text-[11px] text-slate-500">Shaktinagar, Bari, Distt. Raisen (M.P.) - 464665</p>
                <p className="text-[10px] font-bold text-amber-800">CBSE Affiliation No: {SCHOOL_INFO.affiliationNo} | School Code: {SCHOOL_INFO.schoolCode}</p>
                <div className="inline-block bg-[#002147] text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider mt-1">
                  E-FEE RECEIPT (2026–27)
                </div>
              </div>

              {/* Receipt Details */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Receipt Number:</span>
                  <strong>{selectedReceipt.receiptNo}</strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">Date of Payment:</span>
                  <strong>{selectedReceipt.paidOn}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Student Name:</span>
                  <strong>{currentStudent.name}</strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">Class & Section:</span>
                  <strong>{currentStudent.classGrade} - {currentStudent.section} (Roll #{currentStudent.rollNo})</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Scholar No:</span>
                  <strong>{currentStudent.scholarNo}</strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">Father's Name:</span>
                  <strong>{currentStudent.fatherName}</strong>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="border-t border-b border-slate-200 py-2.5 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>{selectedReceipt.title}</span>
                  <strong className="text-[#002147]">₹{selectedReceipt.amount?.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Mode of Payment:</span>
                  <span>{selectedReceipt.paymentMode || 'Online'}</span>
                </div>
                {selectedReceipt.transactionId && (
                  <div className="flex justify-between text-slate-400 text-[10px]">
                    <span>Txn Ref:</span>
                    <span className="font-mono">{selectedReceipt.transactionId}</span>
                  </div>
                )}
              </div>

              {/* Total & Seal */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase block">Status: PAID</span>
                  <span className="text-sm font-black text-emerald-800">₹{selectedReceipt.amount?.toLocaleString('en-IN')} Paid</span>
                </div>
                <div className="text-center text-[10px] text-slate-400">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-0.5" />
                  <span>Digitally Verified</span>
                </div>
              </div>

            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-[#002147] hover:bg-[#0a2f5e] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Fee Receipt</span>
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 7. PRINTABLE CBSE MARKSHEET MODAL */}
      {showReportCardModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 text-slate-800 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500">Official CBSE Evaluation Card</span>
              <button 
                onClick={() => setShowReportCardModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Marksheet Body */}
            <div className="border-2 border-slate-300 rounded-2xl p-6 space-y-5 bg-white">
              
              <div className="text-center space-y-1 border-b-2 border-slate-800 pb-4">
                <h2 className="font-black text-lg text-[#002147]">M.P. CONVENT SCHOOL, BARI</h2>
                <p className="text-xs text-slate-600">Affiliated to Central Board of Secondary Education (CBSE), New Delhi</p>
                <p className="text-[11px] font-bold text-amber-800">Affiliation No: {SCHOOL_INFO.affiliationNo} | School Code: {SCHOOL_INFO.schoolCode}</p>
                <h4 className="font-black text-xs uppercase tracking-widest bg-slate-100 py-1 rounded-md mt-2">
                  Academic Performance & Evaluation Record (2026–27)
                </h4>
              </div>

              {/* Student Header */}
              <div className="grid grid-cols-2 gap-2 text-xs border-b border-slate-200 pb-3">
                <p><strong>Student Name:</strong> {currentStudent.name}</p>
                <p className="text-right"><strong>Scholar No:</strong> {currentStudent.scholarNo}</p>
                <p><strong>Father's Name:</strong> {currentStudent.fatherName}</p>
                <p className="text-right"><strong>Class & Section:</strong> {currentStudent.classGrade} - {currentStudent.section}</p>
                <p><strong>Mother's Name:</strong> {currentStudent.motherName}</p>
                <p className="text-right"><strong>Roll No:</strong> {currentStudent.rollNo}</p>
              </div>

              {/* Scores */}
              <table className="w-full text-xs text-left border border-slate-300">
                <thead className="bg-slate-100 font-bold border-b border-slate-300 uppercase text-[10px]">
                  <tr>
                    <th className="p-2 border-r border-slate-300">Code</th>
                    <th className="p-2 border-r border-slate-300">Subject</th>
                    <th className="p-2 border-r border-slate-300 text-center">Max</th>
                    <th className="p-2 border-r border-slate-300 text-center">Theory</th>
                    <th className="p-2 border-r border-slate-300 text-center">Practical</th>
                    <th className="p-2 border-r border-slate-300 text-center">Total</th>
                    <th className="p-2 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {currentStudent.reportCards[0]?.subjects.map((sub, i) => (
                    <tr key={i}>
                      <td className="p-2 border-r border-slate-200 font-mono">{sub.code}</td>
                      <td className="p-2 border-r border-slate-200 font-bold">{sub.name}</td>
                      <td className="p-2 border-r border-slate-200 text-center">{sub.maxMarks}</td>
                      <td className="p-2 border-r border-slate-200 text-center">{sub.theory}</td>
                      <td className="p-2 border-r border-slate-200 text-center">{sub.practical}</td>
                      <td className="p-2 border-r border-slate-200 text-center font-bold">{sub.total}</td>
                      <td className="p-2 text-center font-extrabold text-emerald-800">{sub.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-3 text-center bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Overall Score:</span>
                  <strong className="text-base font-black text-[#002147]">{currentStudent.reportCards[0]?.overallPercentage}%</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Overall Grade:</span>
                  <strong className="text-base font-black text-emerald-700">{currentStudent.reportCards[0]?.grade}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Class Position:</span>
                  <strong className="text-base font-black text-amber-800">{currentStudent.reportCards[0]?.rank}</strong>
                </div>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-3 gap-4 pt-8 text-center text-xs border-t border-slate-200">
                <div>
                  <div className="border-t border-slate-400 pt-1 font-bold text-slate-700">Class Teacher</div>
                </div>
                <div>
                  <div className="border-t border-slate-400 pt-1 font-bold text-slate-700">Examination Controller</div>
                </div>
                <div>
                  <div className="border-t border-slate-400 pt-1 font-bold text-slate-700">Principal / Manager</div>
                </div>
              </div>

            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-[#002147] hover:bg-[#0a2f5e] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Marksheet</span>
              </button>
              <button
                onClick={() => setShowReportCardModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 8. APPLY LEAVE MODAL */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <h4 className="font-extrabold text-sm text-[#002147]">Apply for Leave</h4>
              </div>
              <button 
                onClick={() => setShowLeaveModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLeaveSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">From Date *</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.from}
                    onChange={(e) => setLeaveForm({ ...leaveForm, from: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">To Date *</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.to}
                    onChange={(e) => setLeaveForm({ ...leaveForm, to: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Leave Category</label>
                <select
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value as any })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-amber-500 font-medium"
                >
                  <option value="Medical">Medical / Sick Leave</option>
                  <option value="Family">Family Function / Urgent Work</option>
                  <option value="Casual">Casual Leave</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Reason / Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="State the reason for student absence..."
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-amber-500 resize-none font-medium"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#002147] hover:bg-[#0a2f5e] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Submit Leave to Class Teacher
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Live GPS Tracker Fullscreen Satellite Modal */}
      <LiveGpsTrackerModal
        isOpen={showLiveGpsModal}
        onClose={() => setShowLiveGpsModal(false)}
        studentName={currentStudent.name}
        studentClass={currentStudent.classGrade}
      />

    </div>
  );
};
