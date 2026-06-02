import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

export interface UseBackgroundMusicResult {
  isPlaying: boolean;
  volume: number;
  loop: boolean;
  playMusic: () => void;
  pauseMusic: () => void;
  toggleMusic: () => void;
  audioRef: RefObject<HTMLAudioElement>;
}

export default function useBackgroundMusic(): UseBackgroundMusicResult {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const volume = 0.2;
  const loop = true;

  useEffect(() => {
    const audio = new Audio("/audio/tetris-bgm.mp3");
    audio.loop = loop;
    audio.volume = volume;
    audio.preload = "metadata";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
      audioRef.current = null;
    };
  }, [loop, volume]);

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isPlaying) {
      return;
    }

    void audio.play().then(
      () => {
        setIsPlaying(true);
      },
      () => {
        setIsPlaying(false);
      }
    );
  }, [isPlaying]);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }, [isPlaying, pauseMusic, playMusic]);

  return {
    isPlaying,
    volume,
    loop,
    playMusic,
    pauseMusic,
    toggleMusic,
    audioRef
  };
}
