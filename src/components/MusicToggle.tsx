interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicToggle({ isPlaying, onToggle }: MusicToggleProps) {
  return (
    <div className="music-toggle-wrap">
      <button type="button" className="music-toggle" onClick={onToggle}>
        {isPlaying ? "音樂關" : "音樂開"}
      </button>
    </div>
  );
}
