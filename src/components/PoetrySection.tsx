/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Quote, Sparkles, BookOpen } from 'lucide-react';
import { PoemPreset } from '../types';
import { SOMALI_POEMS } from '../data';

interface PoetrySectionProps {
  onSelectPoem: (content: string) => void;
}

export default function PoetrySection({ onSelectPoem }: PoetrySectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (poem: PoemPreset) => {
    navigator.clipboard.writeText(poem.content);
    setCopiedId(poem.id);
    
    // Dispatch small confetti at coordinates
    const event = new CustomEvent('trigger-confetti', {
      detail: { x: window.innerWidth / 2, y: window.innerHeight / 2, count: 15 }
    });
    window.dispatchEvent(event);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4" id="poetry-section">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-400" />
          Suugaanta Hambalyada & Dhiirigelinta
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">
          Waa kuwan meerisyo iyo tixno gabayyo ah oo ku habboon munaasabadda. Nuqul ka qaado ama u adeegso fariintaada!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="poetry-grid">
        {SOMALI_POEMS.map((poem, index) => (
          <motion.div
            key={poem.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/30 rounded-2xl p-5 flex flex-col justify-between transition-all hover:bg-slate-900 shadow-xl group"
            id={`poem-card-${poem.id}`}
          >
            {/* Top quote icon decoration */}
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-amber-500/10 transition-colors pointer-events-none">
              <Quote className="w-12 h-12 rotate-180" />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] font-mono font-semibold tracking-wider text-amber-500 uppercase flex items-center gap-1 mb-2">
                <Sparkles className="w-3 h-3 text-amber-400" /> Verse {index + 1}
              </span>
              <h3 className="text-md font-bold text-slate-200 group-hover:text-amber-400 transition-colors mb-3">
                {poem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-medium italic">
                {poem.content}
              </p>
            </div>

            <div className="border-t border-slate-800/80 mt-5 pt-4 flex items-center justify-between relative z-10">
              <span className="text-[10px] text-slate-500 font-mono">
                Tixdii: {poem.author}
              </span>
              
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(poem)}
                  className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-850 rounded-lg transition-all active:scale-90"
                  title="Koobi garee"
                  id={`btn-copy-${poem.id}`}
                >
                  {copiedId === poem.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => onSelectPoem(poem.content)}
                  className="text-[10px] font-semibold bg-slate-850 hover:bg-amber-500 hover:text-slate-950 text-amber-400 px-2.5 py-1.5 rounded-lg border border-slate-700/50 hover:border-amber-500/20 transition-all active:scale-95"
                  id={`btn-use-poem-${poem.id}`}
                >
                  Adeegso
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
