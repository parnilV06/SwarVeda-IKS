import React, { useEffect, useRef } from 'react';

interface CompressionWaveProps {
  frequency: number;
  amplitude: number;
  height?: number;
}

export default function CompressionWave({ frequency, amplitude, height = 150 }: CompressionWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const numParticles = 200;
    const rows = 5;
    
    // Create an array to hold particle positions instead of recalculating
    const particles: { x: number; baseY: number; offset: number }[] = [];
    
    const rowSpacing = height / (rows + 1);
    for (let r = 0; r < rows; r++) {
      for (let i = 0; i < numParticles / rows; i++) {
        particles.push({
          x: (i / (numParticles / rows)) * canvas.width,
          baseY: rowSpacing * (r + 1),
          offset: Math.random() * Math.PI * 2, // Random initial phase for slight noise
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(139, 92, 246, 0.8)'; // Primary color with opacity

      // Adjust particle positions based on a sine wave simulating compression
      const k = frequency * 0.05; // Wave number
      const w = frequency * 0.1; // Angular frequency

      particles.forEach((p) => {
        // Calculate displacement for a longitudinal wave
        // displacement = A * sin(kx - wt)
        const displacement = amplitude * 50 * Math.sin(k * (p.x / 100) - w * time + p.offset * 0.1);
        
        ctx.beginPath();
        ctx.arc(p.x + displacement, p.baseY, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.05;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [frequency, amplitude, height]);

  return (
    <div className="w-full relative py-4">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-lg pointer-events-none" />
      <canvas
        ref={canvasRef}
        width={800}
        height={height}
        className="w-full rounded-lg border border-primary/20 bg-black/40 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
      />
    </div>
  );
}
