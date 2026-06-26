/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Maximize2, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

import original from '../assets/images/original.jpg';
import ikraanPortrait from '../assets/images/ikraan_portrait_1782505483584.jpg';
import ikraanSchool1 from '../assets/images/ikraan_school_1_1782507880611.jpg';
import ikraanSchool2 from '../assets/images/ikraan_school_2_1782507894486.jpg';

interface PhotoItem {
  id: string;
  url: string;
  title: string;
  description: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    url: original,
    title: 'Wajiga Rasmiga ah',
    description: 'Sawirka rasmiga ah ee Ikraan Abdi Ali.'
  },
  {
    id: 'photo-2',
    url: ikraanPortrait,
    title: 'Ikraan Abdi Ali',
    description: 'Sawir kale oo qurux badan oo ku dhex jira albumka qalin-jabinta.'
  },
  {
    id: 'photo-3',
    url: ikraanSchool1,
    title: 'Xusuusta Dugsiga Sare',
    description: 'Xusuustii qaaliga ahayd ee maalmihii diyaarinta qalin-jabinta.'
  },
  {
    id: 'photo-4',
    url: ikraanSchool2,
    title: 'Maalintii Qalin-jabinta',
    description: 'Farxadda iyo guusha weyn ee dugsiga sare.'
  }
];

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % GALLERY_PHOTOS.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4" id="photo-gallery-section">
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 flex items-center justify-center gap-1.5" id="gallery-subheading">
          <Camera className="w-3.5 h-3.5 text-amber-400" /> Albunka Xusuusta
        </span>
        <h2 className="text-2xl font-extrabold text-white mt-1" id="gallery-heading">
          Masawirrada Maalinta Guusha
        </h2>
        <p className="text-slate-400 text-xs mt-1.5 max-w-md mx-auto">
          Guji sawir kasta si aad si buuxda ugu daawato faahfaahintiisa iyo animations-ka u gaarka ah.
        </p>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2">
        {GALLERY_PHOTOS.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -8 }}
            onClick={() => setSelectedPhotoIndex(index)}
            className="group relative bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-amber-500/5 transition-all duration-300"
            id={`gallery-item-${photo.id}`}
          >
            {/* Shimmer overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Photo Container with 3:4 Aspect Ratio */}
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Floating Zoom Icon */}
              <div className="absolute top-4 right-4 bg-slate-900/80 border border-slate-700/50 p-2.5 rounded-full text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 backdrop-blur-md">
                <Maximize2 className="w-4 h-4 text-amber-400" />
              </div>

              {/* Text Caption Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-left">
                <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full w-fit mb-3">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] font-mono tracking-wider font-semibold text-amber-300 uppercase">Xusuus Dahabi ah</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-slate-300 text-xs mt-1.5 font-medium leading-relaxed opacity-90">
                  {photo.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6"
            id="lightbox-modal"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/50 p-3 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer backdrop-blur-md z-50 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/50 p-3 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer backdrop-blur-md z-50 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/50 p-3 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer backdrop-blur-md z-50 active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Content */}
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col backdrop-blur-md"
            >
              {/* Image Aspect ratio container */}
              <div className="relative aspect-[3/4] bg-slate-950 max-h-[70vh] overflow-hidden">
                <img
                  src={GALLERY_PHOTOS[selectedPhotoIndex].url}
                  alt={GALLERY_PHOTOS[selectedPhotoIndex].title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text Area */}
              <div className="p-6 sm:p-8 border-t border-slate-800 text-left bg-slate-900/90">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Sawirka {selectedPhotoIndex + 1} ee {GALLERY_PHOTOS.length}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {GALLERY_PHOTOS[selectedPhotoIndex].title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium leading-relaxed">
                  {GALLERY_PHOTOS[selectedPhotoIndex].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
