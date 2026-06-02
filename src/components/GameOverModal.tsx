interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  lines: number;
  level: number;
  onRestart: () => void;
}

export default function GameOverModal({ isOpen, score, lines, level, onRestart }: GameOverModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>Game Over</h2>
        <p>遊戲結束，謝謝挑戰！</p>
        <div className="modal-stats">
          <p>分數：{score}</p>
          <p>消除行數：{lines}</p>
          <p>等級：{level}</p>
        </div>
        <button type="button" onClick={onRestart}>
          重新開始
        </button>
      </div>
    </div>
  );
}
