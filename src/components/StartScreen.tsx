interface StartScreenProps {
  onStart: () => void;
  highScore?: number;
}

export default function StartScreen({ onStart, highScore = 0 }: StartScreenProps) {
  return (
    <div className="start-screen" role="dialog" aria-modal="true" aria-labelledby="start-title">
      <div className="start-card">
        <p className="modal-kicker">Ready to play</p>
        <h2 id="start-title">Tetris Game</h2>
        <p>
          移動、旋轉與落下方塊，排滿一整行即可消除。Ghost Piece
          會提示目前方塊最後落點，Hard Drop 會直接落到提示位置。
        </p>
        <p className="keyboard-hint">最高分：{highScore}</p>
        <p className="keyboard-hint">按 Enter 或點擊按鈕開始遊戲。</p>
        <button type="button" onClick={onStart}>
          開始遊戲
        </button>
      </div>
    </div>
  );
}
