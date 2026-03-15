import { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  frequency: number;
  amplitude?: number;
  color?: string;
  height?: number;
  analyser?: AnalyserNode | null;
}

export default function WaveformVisualizer({
  frequency,
  amplitude = 40,
  color = 'rgb(139, 92, 246)',
  height = 120,
  analyser,
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === canvas) {
          const { width } = entry.contentRect;
          // Set internal canvas resolution to match its display size exactly
          canvas.width = width;
        }
      }
    });
    
    // Initial size setting
    canvas.width = canvas.parentElement?.clientWidth || 400;
    resizeObserver.observe(canvas);

    const animate = () => {
      const centerY = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      if (analyser) {
        // Draw real-time audio waveform
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        const sliceWidth = canvas.width * 1.0 / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = v * centerY;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }
      } else {
        const timeWindow = 0.05; // Show 50ms of audio
        const timeElapsed = performance.now() / 1000;

        for (let x = 0; x < canvas.width; x++) {
          const t = (x / canvas.width) * timeWindow;
          // y = A * sin(2πf * (t - time))
          const phase = 2 * Math.PI * frequency * (t - timeElapsed);
          const y = centerY + Math.sin(phase) * amplitude;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      }

      ctx.stroke();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequency, amplitude, color, analyser]);

  return (
    <canvas
      ref={canvasRef}
      height={height}
      className="w-full border border-primary/30 rounded-lg bg-gradient-to-b from-background/20 to-transparent block"
    />
  );
}
