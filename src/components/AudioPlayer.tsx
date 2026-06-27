import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const playerRef = useRef<any>(null);
  const containerId = "youtube-player-container";

  useEffect(() => {
    // Load YouTube IFrame Player API asynchronously
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    // Set callback for when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    // If API is already loaded, initialize player immediately
    if ((window as any).YT && (window as any).YT.Player) {
      initializePlayer();
    }

    // Automatically hide tooltip after 7 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error("Error destroying YouTube player", e);
        }
        playerRef.current = null;
      }
    };
  }, []);

  const initializePlayer = () => {
    if (playerRef.current) return;
    try {
      playerRef.current = new (window as any).YT.Player(containerId, {
        height: '200',
        width: '200',
        videoId: '8SIOA2xe0YY', // The YouTube video ID requested
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          playlist: '8SIOA2xe0YY', // required for loop
          start: 8, // Start at 0:08 (8 seconds
        },
        events: {
          onReady: () => {
            setIsPlayerReady(true);
            try {
              playerRef.current.unMute();
              playerRef.current.setVolume(100);
            } catch (e) {
              console.error("Error setting volume on ready", e);
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING is 1
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            }
          },
        },
      });
    } catch (error) {
      console.error("YouTube Player failed to initialize", error);
    }
  };

  const handlePlayToggle = () => {
    if (!isPlayerReady || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
      } catch (e) {
        console.error("Error unmuting/setting volume", e);
      }
      playerRef.current.playVideo();
      setIsPlaying(true);
      setShowTooltip(false);
    }
  };

  const handleMuteToggle = () => {
    if (!isPlayerReady || !playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Tiny YouTube Player container embedded directly on-screen to avoid browser/SDK viewability blocks */}
      <div 
        className="fixed pointer-events-none overflow-hidden" 
        style={{ bottom: '24px', right: '24px', width: '1px', height: '1px', opacity: 0.02, zIndex: 9999 }}
      >
        <div id={containerId} />
      </div>

      {/* Beautiful Floating Player Controller */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2" id="floating-audio-controller">
        
        {/* Tooltip hint to play */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-amber-500/30 text-amber-100 text-xs py-2 px-3 rounded-xl shadow-2xl flex items-center gap-1.5 backdrop-blur-md max-w-xs text-right leading-tight"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
              <span>Guji halkaan si aad u furto heesta qalin-jabinta! 🎵</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="bg-slate-900/95 hover:bg-slate-900 border border-slate-800/80 hover:border-amber-500/40 rounded-full p-2.5 flex items-center gap-3.5 shadow-2xl backdrop-blur-lg transition-colors group"
          layout
        >
          {/* Animated vinyl/music disc icon */}
          <div className="relative">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { repeat: Infinity, duration: 6, ease: "linear" } : { duration: 0.5 }}
              className={`w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center border ${isPlaying ? 'border-amber-500 shadow-lg shadow-amber-500/20' : 'border-slate-800'} relative`}
            >
              <Music className={`w-4 h-4 ${isPlaying ? 'text-amber-400' : 'text-slate-500'}`} />
              
              {/* Spinning visual cue */}
              {isPlaying && (
                <span className="absolute inset-0 rounded-full border border-dashed border-amber-400/40 animate-ping pointer-events-none" />
              )}
            </motion.div>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-2 pr-1.5">
            <div className="text-right flex flex-col justify-center select-none">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">Heesta Gadaasha</span>
              <span className="text-xs font-bold text-slate-200 mt-0.5 truncate max-w-[120px] leading-tight font-sans">
                Astaanta Guusha
              </span>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayToggle}
              disabled={!isPlayerReady}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isPlaying 
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/35 hover:scale-105' 
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:scale-105'
              } active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label="Togle play background music"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current translate-x-0.5" />
              )}
            </button>

            {/* Mute Button */}
            <button
              onClick={handleMuteToggle}
              disabled={!isPlayerReady || !isPlaying}
              className="w-8 h-8 rounded-full bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800 flex items-center justify-center transition-colors disabled:opacity-30"
              aria-label="Toggle mute"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
