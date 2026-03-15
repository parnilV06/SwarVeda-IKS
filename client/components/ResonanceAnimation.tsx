import React, { useEffect, useRef, useState } from 'react';

interface ResonanceAnimationProps {
  isPlaying: boolean;
  frequency: number;
}

export default function ResonanceAnimation({ isPlaying, frequency }: ResonanceAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // To simulate the 'second string' gaining energy from resonance
  const energyRef = useRef(0);
  const targetEnergyRef = useRef(0);

  useEffect(() => {
    // If we're playing a sound close to a "resonant frequency" (let's pick 240Hz as standard for this demo), 
    // the secondary object gains energy.
    const isResonating = isPlaying && (Math.abs(frequency - 240) < 5 || Math.abs(frequency - 480) < 5);
    targetEnergyRef.current = isResonating ? 1 : 0.1; // 0.1 is resting/ambient vibration
  }, [isPlaying, frequency]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smoothly transition energy
      energyRef.current += (targetEnergyRef.current - energyRef.current) * 0.05;
      
      const width = canvas.width;
      const height = canvas.height;
      const stringLength = width * 0.8;
      const startX = (width - stringLength) / 2;
      
      // Draw String 1 (The source - driven by the user)
      const sourceAmplitude = isPlaying ? 20 : 2;
      ctx.beginPath();
      ctx.moveTo(startX, height * 0.3);
      for (let x = 0; x <= stringLength; x++) {
        // A standing wave pattern
        const y = height * 0.3 + Math.sin((x / stringLength) * Math.PI) * Math.sin(time * frequency * 0.05) * sourceAmplitude;
        ctx.lineTo(startX + x, y);
      }
      ctx.strokeStyle = '#8B5CF6'; // Primary color
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw String 2 (The resonator - driven by sympathetic vibration)
      const resonatingAmplitude = 20 * energyRef.current;
      ctx.beginPath();
      ctx.moveTo(startX, height * 0.7);
      for (let x = 0; x <= stringLength; x++) {
        const y = height * 0.7 + Math.sin((x / stringLength) * Math.PI) * Math.sin(time * 240 * 0.05 - Math.PI / 4) * resonatingAmplitude;
        ctx.lineTo(startX + x, y);
      }
      ctx.strokeStyle = `rgba(212, 175, 55, ${Math.max(0.3, energyRef.current)})`; // Gold accent
      ctx.lineWidth = 3;
      ctx.stroke();

      // Labels
      ctx.font = '14px Inter, sans-serif';
      ctx.fillStyle = '#9CA3AF'; // text-gray-400
      ctx.fillText('Driven String (Source)', startX, height * 0.3 - 25);
      
      ctx.fillStyle = energyRef.current > 0.5 ? '#D4AF37' : '#9CA3AF';
      ctx.fillText(
        energyRef.current > 0.5 ? 'Sympathetic String (Resonating!)' : 'Sympathetic String (At Rest)', 
        startX, 
        height * 0.7 - 25
      );

      // Energy particles transferring if resonating
      if (energyRef.current > 0.3) {
        ctx.fillStyle = `rgba(139, 92, 246, ${energyRef.current * 0.5})`;
        for(let i=0; i<3; i++) {
           const px = startX + stringLength * (0.2 + Math.random() * 0.6);
           const py = height * 0.3 + Math.random() * (height * 0.4);
           ctx.beginPath();
           ctx.arc(px, py, 2, 0, Math.PI * 2);
           ctx.fill();
        }
      }

      time += 0.05;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, frequency]);

  return (
    <div className="w-full relative py-4">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-lg pointer-events-none" />
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="w-full rounded-lg border border-primary/20 bg-black/40 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
      />
    </div>
  );
}
