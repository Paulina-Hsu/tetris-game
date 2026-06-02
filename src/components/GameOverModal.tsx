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
        <p className="modal-kicker">{isNewRecord ? "New Record!" : "本局結束"}</p>
        <h2 id="game-over-title">Game Over</h2>
        <div className="modal-stats">
          <p>
            <span>本局分數</span>
            <strong>{score}</strong>
          </p>
          <p>
            <span>最高分</span>
            <strong>{highScore}</strong>
          </p>
          <p>
            <span>消除行數</span>
            <strong>{lines}</strong>
          </p>
          <p>
            <span>等級</span>
            <strong>{level}</strong>
          </p>
        </div>
        <button type="button" onClick={onRestart}>
          重新開始
        </button>
      </div>
    </div>
  );
}
