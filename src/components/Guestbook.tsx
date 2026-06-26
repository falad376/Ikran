/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageSquare, PlusCircle, Sparkles, Send, Flame, Filter, ThumbsUp } from 'lucide-react';
import { GuestbookMessage } from '../types';
import { DEFAULT_MESSAGES, BADGE_PRESETS } from '../data';

interface GuestbookProps {
  externalMessage: string;
  onClearExternalMessage: () => void;
}

export default function Guestbook({ externalMessage, onClearExternalMessage }: GuestbookProps) {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState<'family' | 'friend' | 'teacher' | 'other'>('friend');
  const [messageText, setMessageText] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('🎓');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  // Load from local storage or set default messages
  useEffect(() => {
    const stored = localStorage.getItem('graduation_guestbook');
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        setMessages(DEFAULT_MESSAGES);
      }
    } else {
      setMessages(DEFAULT_MESSAGES);
      localStorage.setItem('graduation_guestbook', JSON.stringify(DEFAULT_MESSAGES));
    }
  }, []);

  // Update localStorage when messages state changes
  const saveMessages = (updated: GuestbookMessage[]) => {
    setMessages(updated);
    localStorage.setItem('graduation_guestbook', JSON.stringify(updated));
  };

  // Sync external message (loaded from Poetry section)
  useEffect(() => {
    if (externalMessage) {
      setMessageText(externalMessage);
      onClearExternalMessage();
      // Scroll to the write message form smoothly
      const element = document.getElementById('write-message-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [externalMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !messageText.trim()) return;

    const newMessage: GuestbookMessage = {
      id: `msg-${Date.now()}`,
      senderName: senderName.trim(),
      relationship,
      message: messageText.trim(),
      badge: `${selectedBadge} ${BADGE_PRESETS.find(b => b.emoji === selectedBadge)?.label || ''}`,
      likes: 0,
      createdAt: 'Hada'
    };

    const updated = [newMessage, ...messages];
    saveMessages(updated);

    // Reset Form
    setSenderName('');
    setMessageText('');
    setSelectedBadge('🎓');

    // Trigger big burst of confetti!
    const rect = e.currentTarget.getBoundingClientRect();
    const event = new CustomEvent('trigger-confetti', {
      detail: { x: window.innerWidth / 2, y: window.innerHeight / 2, count: 50 }
    });
    window.dispatchEvent(event);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = messages.map(msg => {
      if (msg.id === id) {
        return { ...msg, likes: msg.likes + 1 };
      }
      return msg;
    });
    saveMessages(updated);

    // Local custom burst at click coordinates
    const event = new CustomEvent('trigger-confetti', {
      detail: { x: e.clientX, y: e.clientY, count: 12 }
    });
    window.dispatchEvent(event);
  };

  const getRelationshipStyles = (rel: string) => {
    switch (rel) {
      case 'family':
        return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
      case 'teacher':
        return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
      case 'friend':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      default:
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
    }
  };

  const getRelationshipLabel = (rel: string) => {
    switch (rel) {
      case 'family': return 'Qoys / Waalid';
      case 'teacher': return 'Macallin';
      case 'friend': return 'Saaxiib';
      default: return 'Aqoon / Kale';
    }
  };

  const sortedMessages = [...messages].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.likes - a.likes;
    }
    // Newest is default (since msg id is time-based mostly, or we keep original order)
    return 0; // Pre-sorted by unshift
  });

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8" id="guestbook-section">
      
      {/* LEFT COLUMN: Input Form */}
      <div className="lg:col-span-5" id="write-message-section">
        <div className="sticky top-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2 relative z-10">
            <PlusCircle className="w-5 h-5 text-amber-400" />
            Reeb Fariin Hambalyo ah
          </h3>
          <p className="text-xs text-slate-400 mb-5 relative z-10">
            U rajee qalin-jabiyaha mustaqbal ifaya iyo dhiirigelin dhab ah.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10" id="message-form">
            {/* Sender Name */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Magacaaga
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Tusaale: Sahra Axmed"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                required
                id="form-sender-name"
              />
            </div>

            {/* Relationship Selection */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Xiriirka aad la leedahay
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['family', 'friend', 'teacher', 'other'] as const).map((rel) => (
                  <button
                    key={rel}
                    type="button"
                    onClick={() => setRelationship(rel)}
                    className={`text-[10px] font-bold py-2 px-1 rounded-xl border transition-all text-center ${
                      relationship === rel
                        ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-md font-extrabold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                    id={`btn-rel-${rel}`}
                  >
                    {getRelationshipLabel(rel)}
                  </button>
                ))}
              </div>
            </div>

            {/* Badge / Badge Emojis */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex justify-between items-center">
                <span>Dooro astaan gaar ah</span>
                <span className="text-[10px] text-amber-500 font-mono font-medium">Badge Preset</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {BADGE_PRESETS.map((badge) => (
                  <button
                    key={badge.emoji}
                    type="button"
                    onClick={() => setSelectedBadge(badge.emoji)}
                    className={`p-2 rounded-xl border flex items-center gap-1 transition-all ${
                      selectedBadge === badge.emoji
                        ? 'bg-amber-500/10 border-amber-500 text-white font-semibold scale-105'
                        : 'bg-slate-950 border-slate-850 hover:border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    id={`badge-choice-${badge.emoji}`}
                  >
                    <span className="text-sm">{badge.emoji}</span>
                    <span className="text-[9px] font-medium">{badge.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex justify-between">
                <span>Fariintaada (Message)</span>
                <span className="text-[10px] text-slate-500">Kala bixi tixaha sare</span>
              </label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Qor ereyo dhiirigelin leh ama nuqul ka qaado tixaha kor ku yaal..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition resize-none"
                required
                id="form-message-text"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl shadow-lg hover:shadow-amber-500/10 transition duration-200 active:scale-95 flex items-center justify-center gap-1.5 text-sm"
              id="btn-submit-message"
            >
              <Send className="w-4 h-4" /> Dir Fariinta Hambalyada
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN: Scrolling Feed */}
      <div className="lg:col-span-7 flex flex-col" id="messages-feed-column">
        {/* Sorting Controls */}
        <div className="flex items-center justify-between mb-5 bg-slate-900/40 border border-slate-800/60 p-3.5 rounded-2xl">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-emerald-450" />
            Buugga Fariimaha ({messages.length})
          </span>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">Kala saar:</span>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800" id="sorting-buttons">
              <button
                onClick={() => setSortBy('newest')}
                className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all ${
                  sortBy === 'newest'
                    ? 'bg-slate-850 text-white'
                    : 'text-slate-500 hover:text-white'
                }`}
                id="sort-btn-newest"
              >
                Ugu dambeeyay
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  sortBy === 'popular'
                    ? 'bg-slate-850 text-amber-400'
                    : 'text-slate-500 hover:text-white'
                }`}
                id="sort-btn-popular"
              >
                <Flame className="w-3 h-3 text-amber-500" /> Ugu jecelyahay
              </button>
            </div>
          </div>
        </div>

        {/* Messages Loop */}
        <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1 custom-scrollbar" id="messages-list-wrapper">
          <AnimatePresence initial={false}>
            {sortedMessages.length === 0 ? (
              <div className="text-center py-12 border border-slate-800/80 rounded-2xl bg-slate-900/30">
                <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400 text-xs">Fariini wali kuma jirto. Noqo qofkii ugu horreeyay ee reeba!</p>
              </div>
            ) : (
              sortedMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:bg-slate-900 transition-colors shadow-lg relative group"
                  id={`message-card-${msg.id}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    {/* Author & Tag */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-slate-100">{msg.senderName}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold tracking-wider ${getRelationshipStyles(msg.relationship)}`}>
                        {getRelationshipLabel(msg.relationship)}
                      </span>
                    </div>

                    {/* Left/Right Floating Custom Badge */}
                    {msg.badge && (
                      <span className="text-xs bg-slate-850 border border-slate-800 px-2 py-1 rounded-xl font-medium text-amber-300 shrink-0">
                        {msg.badge}
                      </span>
                    )}
                  </div>

                  {/* Message body */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium whitespace-pre-line mb-3">
                    {msg.message}
                  </p>

                  {/* Footer (Time & Likes) */}
                  <div className="border-t border-slate-850 pt-2.5 mt-1 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">{msg.createdAt}</span>
                    
                    <button
                      onClick={(e) => handleLike(msg.id, e)}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-amber-400 bg-slate-950/80 hover:bg-slate-950 border border-slate-850 hover:border-amber-500/20 px-2.5 py-1 rounded-full transition-all group/like active:scale-90"
                      id={`btn-like-${msg.id}`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-slate-500 group-hover/like:text-amber-500 group-hover/like:scale-110 transition-all" />
                      <span>Hambalyeey ({msg.likes})</span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
