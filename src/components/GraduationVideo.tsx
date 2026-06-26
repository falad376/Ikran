import React from 'react';
import { Play, Sparkles, Youtube, ExternalLink, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
};

const mediaVariants = {
  hidden: { opacity: 0, scale: 0.95, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 75,
      damping: 16,
      duration: 0.8
    }
  }
};

export default function GraduationVideo() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden" 
      id="graduation-video-section"
    >
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Visual embed of the YouTube video */}
        <motion.div variants={mediaVariants} className="lg:col-span-7 w-full">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 group">
            {/* Real YouTube Embed */}
            <iframe
              src="https://www.youtube.com/embed/8SIOA2xe0YY?autoplay=0&rel=0"
              title="Ikraan Abdi Ali Graduation Song"
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Right Column: Information, Lyrics hook, and instructions */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>HEESTA QALIN-JABINTA</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight uppercase">
              Astaanta Guusha iyo Farxadda
            </h3>
          </motion.div>

          <motion.p variants={itemVariants} className="text-slate-300 text-sm leading-relaxed">
            Dhagayso heesta qaaliga ah ee loogu talagalay munaasabadda qalin-jabinta ee Ikraan Abdi Ali. Muuqaalkan wuxuu xambaarsan yahay dareen sare iyo dhiirigelin weyn!
          </motion.p>

          {/* Somaliland/Somali Patriotic quote & Lyrics preview */}
          <motion.div variants={itemVariants} className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-xl font-medium text-amber-100/90 text-xs italic relative">
            <span className="absolute top-2 right-3 text-[10px] font-mono uppercase text-slate-600 font-bold">Maansada Guusha</span>
            "Dadaalkii la soo maray, maanta waa midho-dhal, guushuna waa mid u ifaysa mustaqbalka ifaya!"
          </motion.div>

          {/* Audio notice helper for iframe preview constraint */}
          <motion.div variants={itemVariants} className="bg-slate-900/80 border border-emerald-500/20 px-4 py-3.5 rounded-xl space-y-2">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="block text-xs font-bold text-slate-200">Haddii codka aad maqli weydo:</span>
                <span className="block text-[11px] text-slate-400 leading-normal">
                  Maadaama aad ku jirto preview-ga AI Studio, browser-ku wuxuu xannibaa codka ifram-yada qarsoon. Fadlan ku riix badanka <strong className="text-amber-400">Play-ga directly</strong> ee muuqaalka sare si uu codka u dhex bilowdo, ama ku fur website-ka tab cusub!
                </span>
              </div>
            </div>
            
            <a 
              href={window.location.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-1 rounded-md transition-colors"
            >
              <span>Ku furi Tab Cusub si aad ugu raaxaysato heesta</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
