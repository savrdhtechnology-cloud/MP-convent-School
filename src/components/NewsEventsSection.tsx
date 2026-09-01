import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  ArrowRight, 
  X, 
  Sparkles, 
  Tag, 
  Clock 
} from 'lucide-react';
import { SchoolEvent } from '../types';

interface NewsEventsSectionProps {
  events: SchoolEvent[];
}

export const NewsEventsSection: React.FC<NewsEventsSectionProps> = ({ events }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);

  const categories = ['All', 'Academic', 'Sports', 'Celebration', 'Notice'];

  const filteredEvents = selectedCategory === 'All'
    ? events.filter(e => e.isPublished)
    : events.filter(e => e.isPublished && e.category === selectedCategory);

  return (
    <section id="events" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
              <Bell className="w-3.5 h-3.5 text-amber-700" />
              <span>Campus Happenings & Updates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
              News & Events
            </h2>
            <p className="text-base text-slate-600 font-medium">
              Stay informed about upcoming academic schedules, inter-school competitions, celebrations, and circulars.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0a1d37] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col group"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-xs text-amber-300 font-bold text-[11px] px-2.5 py-1 rounded-md border border-amber-400/30">
                  {evt.category}
                </div>
              </div>

              {/* Event Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{evt.date}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#0a1d37] group-hover:text-blue-900 transition-colors leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a1d37] hover:text-amber-700 transition-colors"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {selectedEvent.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0a1d37] mt-1.5">
                    {selectedEvent.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{selectedEvent.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-60 object-cover rounded-xl border border-slate-200"
                />

                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedEvent.description}
                </p>

                {selectedEvent.fullContent && (
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedEvent.fullContent}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 py-2 text-xs font-bold text-white bg-[#0a1d37] hover:bg-[#122e54] rounded-xl shadow"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
