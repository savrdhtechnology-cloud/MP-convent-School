import React, { useState } from 'react';
import { 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ZoomIn, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Campus', 'Academics', 'Sports', 'Activities', 'Celebrations', 'Students'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handleNextPhoto = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
  };

  const handlePrevPhoto = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-amber-700" />
            <span>Campus Photo Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Life at MP Convent School
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Glimpses of daily vibrant academic pursuits, lab sessions, athletic championships, and joyous annual celebrations.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0a1d37] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 cursor-pointer h-64 bg-slate-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
              
              {/* Category Tag */}
              <div className="absolute top-3 left-3 bg-amber-500 text-navy-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded shadow">
                {item.category}
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Title & Caption */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Photo */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox Content */}
            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center text-white text-center space-y-4">
              <img
                src={filteredItems[activeLightboxIndex].imageUrl}
                alt={filteredItems[activeLightboxIndex].title}
                className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
              />
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {filteredItems[activeLightboxIndex].category} • {activeLightboxIndex + 1} of {filteredItems.length}
                </span>
                <h3 className="text-lg sm:text-xl font-bold">
                  {filteredItems[activeLightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {filteredItems[activeLightboxIndex].caption}
                </p>
              </div>
            </div>

            {/* Next Photo */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>
        )}

      </div>
    </section>
  );
};
