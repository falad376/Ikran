/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, GraduationCap, Award, MessageSquare, Heart, Share2 } from 'lucide-react';
import { DEFAULT_GRADUATE } from './data';
import { GraduateProfile } from './types';
import ConfettiEffect from './components/ConfettiEffect';
import GraduateCard from './components/GraduateCard';
import PoetrySection from './components/PoetrySection';
import Guestbook from './components/Guestbook';

export default function App() {
  const [profile, setProfile] = useState<GraduateProfile>(DEFAULT_GRADUATE);
  const [selectedPoemText, setSelectedPoemText] = useState('');
  const [totalLikesCount, setTotalLikesCount] = useState(41); // Initial mock-live likes sum

  // Load profile from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('graduate_profile_data');
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch (e) {
        setProfile(DEFAULT_GRADUATE);
      }
    }
  }, []);

  const handleUpdateProfile = (newProfile: GraduateProfile) => {
    setProfile(newProfile);
    localStorage.setItem('graduate_profile_data', JSON.stringify(newProfile));
  };

  const handleSelectPoem = (content: string) => {
    setSelectedPoemText(content);
  };

  const handleTriggerCelebration = (e: React.MouseEvent) => {
    const event = new CustomEvent('trigger-confetti', {
      detail: { x: e.clientX, y: e.clientY, count: 40 }
    });
    window.dispatchEvent(event);
    setTotalLikesCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200" id="app-root-container">
      
      {/* Interactive Confetti Background Canvas */}
      <ConfettiEffect />

      {/* Main Top Header Section */}
      <header className="relative py-12 md:py-16 text-center border-b border-slate-900 bg-radial-at-t from-slate-900 via-slate-950 to-slate-950 px-4" id="app-header">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Floating cap graphic */}
        <div className="inline-flex justify-center items-center bg-slate-900 border border-amber-500/35 rounded-full p-4 mb-4 shadow-xl shadow-amber-500/5 animate-bounce relative group" id="hero-graphic">
          <GraduationCap className="w-10 h-10 text-amber-400 group-hover:scale-110 transition-transform" />
          <Sparkles className="w-4 h-4 text-emerald-400 absolute -top-1 -right-1 animate-pulse" />
        </div>

        {/* Primary Typography titles */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto uppercase mt-2" id="hero-title">
          <span className="block text-slate-300 text-sm sm:text-base font-mono tracking-widest font-semibold text-emerald-400 mb-2">
            Aqoontu Waa Iftiin iyo Hogoamiye
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-400">
            Hambalyo Qalin-jabinta!
          </span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed font-medium" id="hero-subtitle">
          U dabaal-deg dadaalkii, dhabar-adaygii, iyo guushii weyneyd ee uu gaaray ardaygeena qaaliga ah ee dugsiga sare ka qalin-jabisay!
        </p>

        {/* Live Celebration Counter */}
        <div className="flex items-center justify-center gap-6 mt-8 max-w-md mx-auto bg-slate-900/60 border border-slate-800/80 px-6 py-3.5 rounded-full backdrop-blur-md shadow-lg" id="celebration-counters">
          <div className="text-center">
            <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Duco & Fariimo</span>
            <span className="text-base font-bold text-white font-mono mt-0.5 block">Guuleyste</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <button
            onClick={handleTriggerCelebration}
            className="flex flex-col items-center hover:scale-105 transition-transform active:scale-95 group/btn"
            id="btn-click-celebration"
          >
            <span className="block text-[10px] text-amber-500 group-hover/btn:text-amber-400 uppercase tracking-widest font-extrabold flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" /> Guji & Hambalyee
            </span>
            <span className="text-base font-bold text-emerald-400 font-mono mt-0.5 block">
              +{totalLikesCount} Shiddo
            </span>
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto py-10 px-4 space-y-12 relative z-20" id="main-content">
        
        {/* SECTION 1: Profile Showcasing Card */}
        <section className="space-y-4" aria-labelledby="graduate-card-heading">
          <div className="text-center mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500" id="graduate-card-heading">Astaanta Guusha</span>
            <h2 className="text-xl font-extrabold text-white mt-1">Diiwaanka Qalin-jabiyaha</h2>
          </div>
          <GraduateCard
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        </section>

        {/* SECTION 2: Preset Poetry & Quotes */}
        <section className="border-t border-slate-900/60 pt-6">
          <PoetrySection onSelectPoem={handleSelectPoem} />
        </section>

        {/* SECTION 3: Live interactive Guestbook for family & friends */}
        <section className="border-t border-slate-900/60 pt-6">
          <div className="text-center mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-500">Munaasabadda</span>
            <h2 className="text-2xl font-extrabold text-white mt-1">Buugga Hambalyada ee Qoyska & Saaxiibada</h2>
          </div>
          <Guestbook
            externalMessage={selectedPoemText}
            onClearExternalMessage={() => setSelectedPoemText('')}
          />
        </section>

      </main>

      {/* Elegant Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 px-4 text-center text-xs text-slate-500 relative z-20" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-slate-400 font-mono">Dabaal-degga Dugsiga Sare {profile.graduationYear}</span>
          </div>
          <p className="text-slate-500">
            Waxaa lagu habeeyay kalgacal iyo tixgelin loogu talagalay dhammaan ardayda Soomaaliyeed ee dadaalka keenay.
          </p>
          <div className="text-[10px] font-mono text-emerald-500 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
            Aqoontu waa Iftiin ● {new Date().getFullYear()}
          </div>
        </div>
      </footer>

    </div>
  );
}
