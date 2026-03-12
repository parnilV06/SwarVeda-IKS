import { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  frequency: number;
  amplitude?: number;
  color?: string;
  height?: number;
}

export default function WaveformVisualizer({
  frequency,
  amplitude = 40,
  color = 'rgb(139, 92, 246)',
  height = 120,
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const centerY = canvas.height / 2;

    const animate = () => {
      ctx.clearRect(0, 0, width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const wavelength = 40;
      const speed = frequency / 100;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin((x + offsetRef.current) / wavelength) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      offsetRef.current += speed;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequency, amplitude, color]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={height}
      className="w-full border border-primary/30 rounded-lg bg-gradient-to-b from-background/20 to-transparent"
    />
  );
}
