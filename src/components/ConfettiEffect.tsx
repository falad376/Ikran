/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'cap';
  velocityX: number;
  velocityY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export default function ConfettiEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const colors = [
      '#FBBF24', // Amber/Gold
      '#F59E0B', // Amber-Dark
      '#10B981', // Emerald
      '#3B82F6', // Blue
      '#EF4444', // Red
      '#8B5CF6', // Purple
      '#EC4899', // Pink
    ];

    const shapes: ('circle' | 'square' | 'triangle' | 'star' | 'cap')[] = [
      'circle',
      'square',
      'triangle',
      'star',
      'cap',
    ];

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create a particle
    const createParticle = (x: number, y: number, isBurst = false): Particle => {
      const angle = isBurst ? Math.random() * Math.PI * 2 : Math.PI / 2 + (Math.random() * 0.5 - 0.25);
      const speed = isBurst ? Math.random() * 12 + 4 : Math.random() * 3 + 1;
      return {
        x,
        y,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        velocityX: Math.cos(angle) * speed,
        velocityY: isBurst ? Math.sin(angle) * speed - 2 : Math.sin(angle) * speed,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1,
      };
    };

    // Initialize with some background falling confetti
    if (isActive) {
      for (let i = 0; i < 40; i++) {
        particles.push({
          ...createParticle(Math.random() * canvas.width, Math.random() * -canvas.height),
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
    }

    // Drawing helpers
    const drawStar = (c: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      c.stroke();
      c.beginPath();
      c.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(cx, cy - outerRadius);
      c.closePath();
      c.fill();
    };

    const drawGradCap = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      // Draw cap diamond/rhombus
      c.moveTo(x, y - size / 4);
      c.lineTo(x + size / 2, y);
      c.lineTo(x, y + size / 4);
      c.lineTo(x - size / 2, y);
      c.closePath();
      c.fill();

      // Draw skullcap base underneath
      c.beginPath();
      c.moveTo(x - size / 4, y + size / 10);
      c.lineTo(x - size / 4, y + size / 3);
      c.bezierCurveTo(x - size / 4, y + size / 2, x + size / 4, y + size / 2, x + size / 4, y + size / 3);
      c.lineTo(x + size / 4, y + size / 10);
      c.closePath();
      c.fill();

      // Draw tassel hanging on the side
      c.beginPath();
      c.lineWidth = 1.5;
      c.strokeStyle = '#D97706'; // Golden tassel line
      c.moveTo(x, y);
      c.lineTo(x - size * 0.4, y + size / 4);
      c.stroke();

      c.fillStyle = '#D97706';
      c.beginPath();
      c.arc(x - size * 0.4, y + size / 4, size / 10, 0, Math.PI * 2);
      c.fill();
    };

    // Animation Loop
    const update = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Periodically spawn slow-falling background confetti
      if (isActive && Math.random() < 0.08 && particles.filter(p => p.velocityY > 0 && p.velocityY < 5).length < 50) {
        particles.push(createParticle(Math.random() * canvas.width, -10));
      }

      particles.forEach((p, index) => {
        // Physics update
        p.x += p.velocityX;
        p.y += p.velocityY;
        p.velocityY += 0.12; // Gravity
        p.velocityX *= 0.99; // Air resistance
        p.rotation += p.rotationSpeed;

        if (p.velocityY > 0) {
          p.opacity -= 0.005; // Fade out as it falls
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'square') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.shape === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'star') {
          drawStar(ctx, 0, 0, 5, p.size / 2, p.size / 4);
        } else if (p.shape === 'cap') {
          drawGradCap(ctx, 0, 0, p.size * 1.5);
        }

        ctx.restore();

        // Remove out of bounds or invisible particles
        if (p.y > canvas.height + 20 || p.opacity <= 0 || p.x < -20 || p.x > canvas.width + 20) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    // Custom event listener for on-demand bursts
    const handleBurst = (e: Event) => {
      if (!isActive) return;
      const customEvent = e as CustomEvent<{ x: number; y: number; count?: number }>;
      const { x, y, count = 50 } = customEvent.detail || { x: window.innerWidth / 2, y: window.innerHeight / 2 };

      for (let i = 0; i < count; i++) {
        particles.push(createParticle(x, y, true));
      }
    };

    window.addEventListener('trigger-confetti', handleBurst);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('trigger-confetti', handleBurst);
    };
  }, [isActive]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <button
        onClick={() => setIsActive(!isActive)}
        className="absolute bottom-4 left-4 pointer-events-auto bg-slate-900/80 hover:bg-slate-900 text-xs text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm transition-all shadow-lg active:scale-95"
        title="Toggle animations"
        id="btn-toggle-animations"
      >
        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
        {isActive ? 'Dami Kicinta (ON)' : 'Daar Kicinta (OFF)'}
      </button>
    </div>
  );
}
