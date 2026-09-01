import React, { useState } from 'react';
import { 
  Lock, 
  Users, 
  FileText, 
  Bell, 
  Camera, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Download, 
  Search, 
  Phone, 
  Mail, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  LogOut,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { AdmissionLead, SchoolEvent, GalleryItem } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: AdmissionLead[];
  onUpdateLeadStatus: (leadId: string, status: AdmissionLead['status'], note?: string) => void;
  events: SchoolEvent[];
  onAddEvent: (event: SchoolEvent) => void;
  onDeleteEvent: (id: string) => void;
  gallery: GalleryItem[];
  onAddGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  leads,
  onUpdateLeadStatus,
  events,
  onAddEvent,
  onDeleteEvent,
  gallery,
  onAddGalleryItem,
  onDeleteGalleryItem
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'crm' | 'events' | 'gallery'>('crm');

  // Lead Filters & Actions
  const [searchLeadQuery, setSearchLeadQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [selectedLeadForNote, setSelectedLeadForNote] = useState<AdmissionLead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Event Form State
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Academic' as SchoolEvent['category'],
    description: '',
    fullContent: '',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'
  });

  // Gallery Form State
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [newGalleryData, setNewGalleryData] = useState({
    title: '',
    category: 'Campus' as GalleryItem['category'],
    caption: '',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80'
  });

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === 'mpcs2026') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Filter Leads
  const filteredLeads = leads.filter(lead => {
    const matchesQuery = 
      lead.studentName.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
      lead.parentName.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
      lead.mobile.includes(searchLeadQuery) ||
      lead.classApplying.toLowerCase().includes(searchLeadQuery.toLowerCase());

    const matchesStatus = selectedStatusFilter === 'ALL' || lead.status === selectedStatusFilter;

    return matchesQuery && matchesStatus;
  });

  // CRM Analytics Metrics
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'NEW').length;
  const convertedCount = leads.filter(l => l.status === 'ADMITTED').length;
  const followUpCount = leads.filter(l => l.status === 'CONTACTED' || l.status === 'VISITED').length;

  const handleSaveNote = () => {
    if (!selectedLeadForNote || !newNoteText.trim()) return;
    onUpdateLeadStatus(selectedLeadForNote.id, selectedLeadForNote.status, newNoteText.trim());
    setNewNoteText('');
    setSelectedLeadForNote(null);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Student Name', 'Parent Name', 'Mobile', 'Email', 'Class', 'City', 'Date', 'Status'];
    const rows = leads.map(l => [
      l.id,
      `"${l.studentName}"`,
      `"${l.parentName}"`,
      `"${l.mobile}"`,
      `"${l.email}"`,
      `"${l.classApplying}"`,
      `"${l.city}"`,
      l.date,
      l.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mp_convent_admission_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventData.title.trim()) return;
    const event: SchoolEvent = {
      id: `evt-${Date.now()}`,
      ...newEventData,
      isPublished: true
    };
    onAddEvent(event);
    setIsAddingEvent(false);
    setNewEventData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Academic',
      description: '',
      fullContent: '',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'
    });
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryData.title.trim()) return;
    const item: GalleryItem = {
      id: `gal-${Date.now()}`,
      ...newGalleryData
    };
    onAddGalleryItem(item);
    setIsAddingGallery(false);
    setNewGalleryData({
      title: '',
      category: 'Campus',
      caption: '',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[92vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-[#0a1d37] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-navy-950 font-black flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">
                MP Convent School — Management & Admission CRM
              </h3>
              <p className="text-xs text-amber-300">Staff & Administrative Dashboard (Session 2026–27)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-amber-400" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 mx-auto flex items-center justify-center">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-[#0a1d37]">
                  Administrative Staff Sign In
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Access leads, change statuses, manage events, and export records.
                </p>
              </div>

              {authError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold">
                  Invalid authorization password. Please use <span className="font-mono">admin123</span> or <span className="font-mono">mpcs2026</span>.
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Admin Access Passkey
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter admin password (e.g. admin123)"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm outline-none focus:border-amber-500 text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0a1d37] hover:bg-[#122e54] text-white font-bold text-sm rounded-xl shadow-md transition-colors"
                >
                  Unlock CRM Dashboard
                </button>
              </form>

              <div className="text-[11px] text-slate-400 space-y-1">
                <div>Authorized Personnel Only • MP Convent School Bari</div>
                <div className="text-[10px] text-slate-500 font-medium">
                  Developed by <span className="text-amber-700 font-bold">Savrdh Technologies</span> — Shailendra Choudhary (Savrdh Group)
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
            
            {/* Navigation Tabs Bar */}
            <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shrink-0">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('crm')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTab === 'crm'
                      ? 'bg-[#0a1d37] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admission CRM ({leads.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('events')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTab === 'events'
                      ? 'bg-[#0a1d37] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>News & Circulars CMS ({events.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTab === 'gallery'
                      ? 'bg-[#0a1d37] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Photo Gallery Manager ({gallery.length})</span>
                </button>
              </div>

              {activeTab === 'crm' && (
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Leads (CSV)</span>
                </button>
              )}
            </div>

            {/* TAB 1: ADMISSION CRM */}
            {activeTab === 'crm' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Total Enquiries</span>
                    <div className="text-2xl font-black text-[#0a1d37] mt-0.5">{totalLeads}</div>
                    <span className="text-[10px] text-slate-400">All channels</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs">
                    <span className="text-[11px] font-bold text-blue-800 uppercase">New Leads</span>
                    <div className="text-2xl font-black text-blue-700 mt-0.5">{newLeadsCount}</div>
                    <span className="text-[10px] text-blue-600 font-medium">Pending initial contact</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
                    <span className="text-[11px] font-bold text-amber-800 uppercase">Follow-Ups Active</span>
                    <div className="text-2xl font-black text-amber-700 mt-0.5">{followUpCount}</div>
                    <span className="text-[10px] text-amber-600 font-medium">Contacted / Visited</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase">Admissions Confirmed</span>
                    <div className="text-2xl font-black text-emerald-700 mt-0.5">{convertedCount}</div>
                    <span className="text-[10px] text-emerald-600 font-medium">Enrolled 2026–27</span>
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2 w-full sm:w-80 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search student, parent, phone..."
                      value={searchLeadQuery}
                      onChange={(e) => setSearchLeadQuery(e.target.value)}
                      className="bg-transparent text-xs sm:text-sm outline-none w-full text-slate-800"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                    {['ALL', 'NEW', 'CONTACTED', 'VISITED', 'ADMITTED', 'CLOSED'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatusFilter(status)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          selectedStatusFilter === status
                            ? 'bg-[#0a1d37] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Leads Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3.5">Lead ID / Date</th>
                        <th className="p-3.5">Student Details</th>
                        <th className="p-3.5">Parent / Contact</th>
                        <th className="p-3.5">Class & Location</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Assigned / Follow-up</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80">
                          <td className="p-3.5">
                            <div className="font-mono font-bold text-slate-900">{lead.id}</div>
                            <div className="text-[10px] text-slate-400">{lead.date}</div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 text-sm">{lead.studentName}</div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 italic max-w-xs">
                              "{lead.message}"
                            </div>
                          </td>

                          <td className="p-3.5 space-y-0.5">
                            <div className="font-semibold text-slate-800">{lead.parentName}</div>
                            <a href={`tel:${lead.mobile}`} className="font-bold text-blue-900 hover:underline block">
                              {lead.mobile}
                            </a>
                          </td>

                          <td className="p-3.5">
                            <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                              {lead.classApplying}
                            </span>
                            <div className="text-[11px] text-slate-500 mt-0.5">{lead.city}</div>
                          </td>

                          <td className="p-3.5">
                            <select
                              value={lead.status}
                              onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as AdmissionLead['status'])}
                              className={`px-2.5 py-1 rounded-lg font-bold text-xs border outline-none ${
                                lead.status === 'NEW'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : lead.status === 'CONTACTED'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : lead.status === 'VISITED'
                                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                                  : lead.status === 'ADMITTED'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="VISITED">VISITED</option>
                              <option value="ADMITTED">ADMITTED</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </td>

                          <td className="p-3.5 text-[11px]">
                            <div className="font-medium text-slate-800">{lead.assignedStaff}</div>
                            <div className="text-slate-500">Next: {lead.followUpDate || 'None'}</div>
                          </td>

                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => setSelectedLeadForNote(lead)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs"
                            >
                              Add Note ({lead.notes.length})
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Note Modal */}
                {selectedLeadForNote && (
                  <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h4 className="font-bold text-sm text-[#0a1d37]">
                          Counselor Notes: {selectedLeadForNote.studentName}
                        </h4>
                        <button onClick={() => setSelectedLeadForNote(null)}>
                          <X className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>

                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {selectedLeadForNote.notes.map((n, i) => (
                          <div key={i} className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-700">
                            {n}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Add New Interaction Note</label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Called parent, requested campus tour on Saturday..."
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          className="w-full p-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-amber-500"
                        ></textarea>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setSelectedLeadForNote(null)}
                          className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveNote}
                          className="px-4 py-1.5 text-xs font-bold bg-[#0a1d37] text-white rounded-lg"
                        >
                          Save Note
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: EVENTS CMS */}
            {activeTab === 'events' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-extrabold text-[#0a1d37] text-base">Campus News & Notice Manager</h4>
                    <p className="text-xs text-slate-500">Publish circulars, holiday notices, and photo updates.</p>
                  </div>
                  <button
                    onClick={() => setIsAddingEvent(true)}
                    className="px-4 py-2 bg-[#0a1d37] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Create News Article</span>
                  </button>
                </div>

                {/* New Event Form */}
                {isAddingEvent && (
                  <form onSubmit={handleCreateEvent} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                    <div className="font-bold text-xs text-[#0a1d37] uppercase tracking-wider">Add New Event</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Event Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Science Fair 2026"
                          value={newEventData.title}
                          onChange={(e) => setNewEventData({ ...newEventData, title: e.target.value })}
                          className="w-full p-2 border border-slate-300 rounded-lg outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Category *</label>
                        <select
                          value={newEventData.category}
                          onChange={(e) => setNewEventData({ ...newEventData, category: e.target.value as any })}
                          className="w-full p-2 border border-slate-300 rounded-lg outline-none"
                        >
                          <option value="Academic">Academic</option>
                          <option value="Sports">Sports</option>
                          <option value="Celebration">Celebration</option>
                          <option value="Notice">Notice</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Date *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. October 15, 2026"
                          value={newEventData.date}
                          onChange={(e) => setNewEventData({ ...newEventData, date: e.target.value })}
                          className="w-full p-2 border border-slate-300 rounded-lg outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <label className="font-bold text-slate-700">Short Summary</label>
                      <input
                        type="text"
                        required
                        placeholder="Brief summary for cards"
                        value={newEventData.description}
                        onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingEvent(false)}
                        className="px-3 py-1.5 text-xs text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#0a1d37] text-white font-bold text-xs rounded-lg"
                      >
                        Publish News
                      </button>
                    </div>
                  </form>
                )}

                {/* Events List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map((evt) => (
                    <div key={evt.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex justify-between gap-4">
                      <div className="flex gap-3 items-start">
                        <img src={evt.image} alt={evt.title} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                            {evt.category} • {evt.date}
                          </span>
                          <h5 className="font-bold text-sm text-[#0a1d37] mt-1">{evt.title}</h5>
                          <p className="text-xs text-slate-500 line-clamp-1">{evt.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteEvent(evt.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg self-start"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: GALLERY MANAGER */}
            {activeTab === 'gallery' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-extrabold text-[#0a1d37] text-base">Photo Gallery Manager</h4>
                    <p className="text-xs text-slate-500">Upload and curate campus photographs.</p>
                  </div>
                  <button
                    onClick={() => setIsAddingGallery(true)}
                    className="px-4 py-2 bg-[#0a1d37] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Add Photo</span>
                  </button>
                </div>

                {isAddingGallery && (
                  <form onSubmit={handleCreateGallery} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Photo Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Annual Sports Day 100m Dash"
                          value={newGalleryData.title}
                          onChange={(e) => setNewGalleryData({ ...newGalleryData, title: e.target.value })}
                          className="w-full p-2 border border-slate-300 rounded-lg outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Category *</label>
                        <select
                          value={newGalleryData.category}
                          onChange={(e) => setNewGalleryData({ ...newGalleryData, category: e.target.value as any })}
                          className="w-full p-2 border border-slate-300 rounded-lg outline-none"
                        >
                          <option value="Campus">Campus</option>
                          <option value="Academics">Academics</option>
                          <option value="Sports">Sports</option>
                          <option value="Activities">Activities</option>
                          <option value="Celebrations">Celebrations</option>
                          <option value="Students">Students</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Image URL *</label>
                      <input
                        type="url"
                        required
                        placeholder="https://..."
                        value={newGalleryData.imageUrl}
                        onChange={(e) => setNewGalleryData({ ...newGalleryData, imageUrl: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingGallery(false)}
                        className="px-3 py-1.5 text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#0a1d37] text-white font-bold rounded-lg"
                      >
                        Save Photo
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.map((item) => (
                    <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover" />
                      <div className="p-3">
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <h6 className="font-bold text-xs text-slate-900 mt-1 truncate">{item.title}</h6>
                      </div>
                      <button
                        onClick={() => onDeleteGalleryItem(item.id)}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg hover:bg-rose-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
