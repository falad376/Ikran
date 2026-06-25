/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit3, Check, Upload, Award, GraduationCap, School, FileText, Sparkles, BookOpen } from 'lucide-react';
import { GraduateProfile } from '../types';

interface GraduateCardProps {
  profile: GraduateProfile;
  onUpdateProfile: (newProfile: GraduateProfile) => void;
}

export default function GraduateCard({ profile, onUpdateProfile }: GraduateCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<GraduateProfile>({ ...profile });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTriggerConfetti = (e: React.MouseEvent) => {
    // Dispatch custom event to trigger confetti at mouse coordinates
    const event = new CustomEvent('trigger-confetti', {
      detail: { x: e.clientX, y: e.clientY, count: 35 }
    });
    window.dispatchEvent(event);
  };

  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
    // Trigger big celebratory confetti burst!
    const event = new CustomEvent('trigger-confetti', {
      detail: { x: window.innerWidth / 2, y: window.innerHeight / 3, count: 60 }
    });
    window.dispatchEvent(event);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  // Convert uploaded image to Base64
  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setEditedProfile(prev => ({ ...prev, photoUrl: e.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto" id="graduate-card-container">
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="display-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="pointer-events-auto flex items-center gap-1 text-slate-400 hover:text-amber-400 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/40 px-3.5 py-1.5 rounded-full transition-all text-xs font-medium active:scale-95"
                id="btn-edit-graduate"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Wax ka beddel Xogta
              </button>
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
        ) : (
          <motion.div
            key="edit-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            id="graduate-edit-form"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <Edit3 className="w-5 h-5" /> Wax ka Beddel Macluumaadka Ardayga
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 border border-slate-800 transition"
                id="btn-cancel-edit"
              >
                Ka laabo
              </button>
            </div>

            <div className="space-y-5">
              {/* Image Drag and Drop */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Sawirka Qofka (Photo)
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                    dragActive
                      ? 'border-amber-400 bg-amber-500/5'
                      : 'border-slate-800 hover:border-amber-500/30 hover:bg-slate-850/50'
                  }`}
                  id="drag-drop-zone"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="photo-file-input"
                  />
                  {editedProfile.photoUrl ? (
                    <div className="flex items-center gap-4 text-left w-full max-w-md">
                      <img
                        src={editedProfile.photoUrl}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-xl border border-slate-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-200 truncate">Sawirka waa la habeeyay</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Riix ama ku soo jiid sawir kale si aad u beddesho</p>
                      </div>
                      <Upload className="w-5 h-5 text-amber-500 animate-pulse shrink-0" />
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-500 mb-2" />
                      <p className="text-xs text-slate-300 font-medium">Sawirka ku soo tuur halkan ama riix si aad u soo geliso</p>
                      <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, ama GIF (1:1 baa ugu fiican)</p>
                    </>
                  )}
                </div>
              </div>

              {/* Grid Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Magaca oo Buuxa
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    placeholder="Tusaale: Khadar Cabdi Yuusuf"
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                    required
                    id="input-name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Magaca Dugsiga (School)
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={editedProfile.schoolName}
                    onChange={handleInputChange}
                    placeholder="Tusaale: Dugsiga Sare ee Ifye"
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                    required
                    id="input-school"
                  />
                </div>
              </div>

              {/* Year Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Sanadka Qalin-jabinta
                </label>
                <input
                  type="number"
                  name="graduationYear"
                  value={editedProfile.graduationYear}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                  required
                  id="input-year"
                />
              </div>

              {/* Honors / Achievements */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Maamuus / Kaalinta (Honors & Honors)
                </label>
                <input
                  type="text"
                  name="honors"
                  value={editedProfile.honors}
                  onChange={handleInputChange}
                  placeholder="Tusaale: Kaalinta Koowaad ee Sayniska iyo Hal-abuurka"
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                  id="input-honors"
                />
              </div>

              {/* Motto */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Murtida Ardayga (Motto / Quote)
                </label>
                <textarea
                  name="motto"
                  value={editedProfile.motto}
                  onChange={handleInputChange}
                  placeholder="Oraah ama murtida uu aaminsan yahay qofku..."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition resize-none"
                  id="input-motto"
                />
              </div>

              {/* Save Button */}
              <button
                type="button"
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg transition duration-200 active:scale-95 flex items-center justify-center gap-2 text-sm mt-2"
                id="btn-save-graduate"
              >
                <Check className="w-5 h-5" /> Keydi Isbeddelada
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
