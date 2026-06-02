interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  highScore: number;
  lines: number;
  level: number;
  isNewRecord: boolean;
  onRestart: () => void;
}

export default function GameOverModal({
  isOpen,
  score,
  highScore,
  lines,
  level,
  isNewRecord,
  onRestart
}: GameOverModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="game-over-title">
        <p className="modal-kicker">{isNewRecord ? "New Record!" : "Try Again"}</p>
        <h2 id="game-over-title">Game Over</h2>
        <div className="modal-stats">
          <p>
            <span>Score</span>
            <strong>{score}</strong>
          </p>
          <p>
            <span>High Score</span>
            <strong>{highScore}</strong>
          </p>
          <p>
            <span>Cleared Lines</span>
            <strong>{lines}</strong>
          </p>
          <p>
            <span>Level</span>
            <strong>{level}</strong>
          </p>
        </div>
        <button type="button" onClick={onRestart}>
          Restart
        </button>
      </div>
    </div>
  );
}
