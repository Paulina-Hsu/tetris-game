interface StartScreenProps {
  onStart: () => void;
  highScore?: number;
}

export default function StartScreen({ onStart, highScore = 0 }: StartScreenProps) {
  return (
    <div className="start-screen" role="dialog" aria-modal="true" aria-labelledby="start-title">
      <div className="start-card">
        <p className="modal-kicker">開始遊戲</p>
        <h2 id="start-title">Tetris Game</h2>
        <p>
          使用方向鍵操控方塊，透過 Ghost Piece 先看出落點，清除更多列、打破最高分。
        </p>
        <p className="keyboard-hint">最高分：{highScore}</p>
        <p className="keyboard-hint">可按 Enter 開始，或點擊「開始遊戲」。</p>
        <button type="button" onClick={onStart}>
          開始遊戲
        </button>
      </div>
    </div>
  );
}
