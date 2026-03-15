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

      if (analyser) {
        // Draw real-time audio waveform
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        const sliceWidth = width * 1.0 / bufferLength;
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
        // Fallback: draw simulated sine wave based on frequency and amplitude props
        const wavelength = 2000 / frequency; // adjust scale for visuals
        const speed = frequency / 100;

        for (let x = 0; x < width; x++) {
          // Adjust amplitude visual multiplier based on prop (0.0 to 1.0 range typical for audio, we map it back)
          // Default old param was ~40, now we treat amplitude as 0-1 if connected to volume
          const visualAmp = Math.min(centerY * 0.9, amplitude * 100); 
          
          const y = centerY + Math.sin((x + offsetRef.current) / wavelength) * visualAmp;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        offsetRef.current += speed;
      }

      ctx.stroke();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequency, amplitude, color, analyser]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={height}
      className="w-full border border-primary/30 rounded-lg bg-gradient-to-b from-background/20 to-transparent"
    />
  );
}
