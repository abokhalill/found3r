"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Brain, Palette, Terminal } from "lucide-react";

export function F3HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 300; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2,
        size: Math.random() * 2 + 0.5
      });
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let rotation = 0;

    // Connection lines
    const connections: Array<{
      from: { x: number; y: number };
      to: { x: number; y: number };
      progress: number;
      speed: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      const particle = particles[Math.floor(Math.random() * particles.length)];
      connections.push({
        from: { x: particle.x, y: particle.y },
        to: { x: centerX, y: centerY },
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(11, 12, 14, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha * 0.6})`;
        ctx.fill();
      });

      // Update and draw connections
      connections.forEach((conn) => {
        conn.progress += conn.speed;

        if (conn.progress >= 1) {
          const particle = particles[Math.floor(Math.random() * particles.length)];
          conn.from = { x: particle.x, y: particle.y };
          conn.to = { x: centerX + (Math.random() - 0.5) * 80, y: centerY + (Math.random() - 0.5) * 80 };
          conn.progress = 0;
        }

        const currentX = conn.from.x + (conn.to.x - conn.from.x) * conn.progress;
        const currentY = conn.from.y + (conn.to.y - conn.from.y) * conn.progress;

        const gradient = ctx.createLinearGradient(conn.from.x, conn.from.y, currentX, currentY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.6)');

        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw central wireframe structure
      rotation += 0.0003;
      ctx.save();
      ctx.translate(centerX, centerY);

      const scale = 0.8 + Math.sin(rotation * 2) * 0.05;
      ctx.scale(scale, scale);

      const drawWireframeRect = (x: number, y: number, w: number, h: number, alpha: number) => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);
      };

      drawWireframeRect(-120, -80, 240, 160, 0.08);
      drawWireframeRect(-90, -60, 180, 120, 0.06);
      drawWireframeRect(-60, -40, 120, 80, 0.05);

      for (let i = 0; i < 4; i++) {
        const offset = Math.sin(rotation + i) * 15;
        drawWireframeRect(-50 + offset, -20 + i * 12, 100, 8, 0.04);
      }

      const pulseAlpha = 0.08 + Math.sin(rotation * 8) * 0.05;
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha})`;
      ctx.fill();

      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden" style={{ backgroundColor: '#0B0C0E' }}>
      
      {/* Canvas Visualization - Genesis Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Massive Radial Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/5 blur-[150px] rounded-full" />

      {/* Bottom Fog Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0B0C0E 0%, transparent 100%)'
        }}
      />
      
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[12px] text-zinc-400">Introducing Found3r v1.0</span>
          </div>
        </motion.div>

        {/* H1 Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-8xl font-medium mb-6 leading-[1.1]"
          style={{
            letterSpacing: '-0.03em',
            background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0.5) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Build at the speed<br />of thought.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-[#8A8F98] max-w-xl mx-auto leading-relaxed"
        >
          The deterministic AI architecture that turns raw ideas into validated, deployed startups.
        </motion.p>

      </div>
    </section>
  );
}
