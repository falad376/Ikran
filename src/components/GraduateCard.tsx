/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, School, Sparkles } from 'lucide-react';
import { GraduateProfile } from '../types';

interface GraduateCardProps {
  profile: GraduateProfile;
}

export default function GraduateCard({ profile }: GraduateCardProps) {
  const handleTriggerConfetti = (e: React.MouseEvent) => {
    // Dispatch custom event to trigger confetti at mouse coordinates
    const event = new CustomEvent('trigger-confetti', {
      detail: { x: e.clientX, y: e.clientY, count: 35 }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="w-full max-w-2xl mx-auto" id="graduate-card-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className="relative bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/5 overflow-hidden group cursor-pointer"
        onClick={handleTriggerConfetti}
        id="graduate-display-card"
      >
        {/* Ambient Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-all duration-700" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-700" />
        
        {/* Top Certificate Header Line */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full" id="class-tag">
            <GraduationCap className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="text-xs font-mono tracking-wider font-semibold text-amber-300 uppercase">
              Qalin-jabiyaha {profile.graduationYear}
            </span>
          </div>
        </div>

        {/* Layout Content */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          
          {/* Photo Container */}
          <div className="relative group/avatar" id="photo-frame-container">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500 to-emerald-500 rounded-2xl blur opacity-35 group-hover/avatar:opacity-60 transition duration-500" />
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl bg-slate-850 overflow-hidden border border-slate-700">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-full h-full object-cover transition duration-500 group-hover/avatar:scale-105"
                referrerPolicy="no-referrer"
                id="graduate-profile-photo"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-center pb-2 opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                <span className="text-[10px] text-amber-300 font-mono tracking-wider uppercase flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Guuleyste
                </span>
              </div>
            </div>
            
            {/* Floating academic seal decoration */}
            <div className="absolute -bottom-4 -right-4 bg-amber-500 border-2 border-slate-900 rounded-full p-2 text-slate-950 shadow-lg animate-spin-slow">
              <Award className="w-5 h-5" />
            </div>
          </div>

          {/* Information */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-between h-full space-y-4" id="graduate-info-details">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-400 tracking-tight" id="graduate-name">
                {profile.name}
              </h1>
              <p className="text-slate-400 text-sm mt-1.5 flex items-center justify-center md:justify-start gap-1.5 font-medium" id="graduate-school">
                <School className="w-4 h-4 text-emerald-400" />
                {profile.schoolName}
              </p>
            </div>

            <div className="flex justify-center md:justify-start py-2">
              <div className="bg-slate-850/60 border border-slate-800 rounded-xl px-5 py-3 text-center md:text-left min-w-[120px]">
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Sanadka</span>
                <span className="text-sm font-bold text-amber-400 font-mono mt-0.5 block">{profile.graduationYear}</span>
              </div>
            </div>

            {profile.honors && (
              <div className="bg-slate-850/40 border border-slate-800/80 rounded-xl p-3 flex items-start gap-2.5 text-left" id="honors-box">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-amber-500 font-semibold tracking-wider uppercase">Maamuus Gaar Ah (Honors)</span>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">{profile.honors}</p>
                </div>
              </div>
            )}

            {profile.motto && (
              <div className="relative italic text-slate-300 text-sm pl-4 border-l-2 border-amber-500/40 py-1" id="motto-box">
                <p className="line-clamp-2">“{profile.motto}”</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
