import { useState, useEffect, useRef, useCallback } from 'react';

export function useSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      gainNodeRef.current = audioCtxRef.current.createGain();
      gainNodeRef.current.gain.value = 0.5; // Default volume
      
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      
      gainNodeRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioCtxRef.current.destination);
    }
  }, []);

  const playTone = useCallback((frequency: number, amplitude: number = 0.5, type: OscillatorType = 'sine') => {
    initAudio();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }

    if (!audioCtxRef.current || !gainNodeRef.current) return;

    oscillatorRef.current = audioCtxRef.current.createOscillator();
    oscillatorRef.current.type = type;
    oscillatorRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
    
    // Set amplitude (volume)
    gainNodeRef.current.gain.setValueAtTime(amplitude, audioCtxRef.current.currentTime);

    oscillatorRef.current.connect(gainNodeRef.current);
    oscillatorRef.current.start();
    setIsPlaying(true);
  }, [initAudio]);

  const stopTone = useCallback(() => {
    if (oscillatorRef.current) {
      // Fade out to avoid clicks
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
      }
      setTimeout(() => {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
          oscillatorRef.current = null;
        }
        setIsPlaying(false);
      }, 100);
    }
  }, []);

  const updateFrequency = useCallback((freq: number) => {
    if (oscillatorRef.current && audioCtxRef.current) {
      oscillatorRef.current.frequency.setTargetAtTime(freq, audioCtxRef.current.currentTime, 0.05);
    }
  }, []);

  const updateAmplitude = useCallback((amp: number) => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(amp, audioCtxRef.current.currentTime, 0.05);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return {
    isPlaying,
    playTone,
    stopTone,
    updateFrequency,
    updateAmplitude,
    analyser: analyserRef.current,
  };
}
