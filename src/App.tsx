import { useCallback, useEffect } from "react";
import { useTetris } from "./hooks/useTetris";
import ControlButtons from "./components/ControlButtons";
import GameBoard from "./components/GameBoard";
import GameOverModal from "./components/GameOverModal";
import NextPiece from "./components/NextPiece";
import ScorePanel from "./components/ScorePanel";

export default function App() {
  const {
    board,
    currentPiece,
    nextPiece,
    score,
    lines,
    level,
    isPaused,
    isGameOver,
    moveLeft,
    moveRight,
    rotate,
    softDrop,
    hardDrop,
    togglePause,
    restart
  } = useTetris();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.code === "Space" ||
        event.code === "ArrowLeft" ||
        event.code === "ArrowRight" ||
        event.code === "ArrowDown" ||
        event.code === "ArrowUp"
      ) {
        event.preventDefault();
      }

      switch (event.code) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowDown":
          softDrop();
          break;
        case "ArrowUp":
          rotate();
          break;
        case "Space":
          hardDrop();
          break;
        case "KeyP":
          togglePause();
          break;
        case "KeyR":
          restart();
          break;
        default:
          break;
      }
    },
    [hardDrop, moveLeft, moveRight, rotate, softDrop, restart, togglePause]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="tetris-app">
      <div className="layout">
        <section className="game-zone panel">
          <header className="title-row">
            <h1>Tetris Game</h1>
            <p>俄羅斯方塊小遊戲</p>
          </header>

          <GameBoard board={board} currentPiece={currentPiece} isPaused={isPaused} />

          <div className="mobile-controls control-section">
            <h2>控制按鈕</h2>
            <ControlButtons
              onMoveLeft={moveLeft}
              onMoveRight={moveRight}
              onRotate={rotate}
              onSoftDrop={softDrop}
              onHardDrop={hardDrop}
              onPause={togglePause}
              onRestart={restart}
            />
          </div>
        </section>

        <aside className="side-zone">
          <ScorePanel score={score} lines={lines} level={level} />
          <NextPiece piece={nextPiece} />

          <div className="panel control-section">
            <h2>控制按鈕</h2>
            <ControlButtons
              onMoveLeft={moveLeft}
              onMoveRight={moveRight}
              onRotate={rotate}
              onSoftDrop={softDrop}
              onHardDrop={hardDrop}
              onPause={togglePause}
              onRestart={restart}
            />
          </div>

          <div className="panel instructions">
            <h2>操作說明</h2>
            <ul>
              <li>← 向左</li>
              <li>→ 向右</li>
              <li>↑ 旋轉</li>
              <li>↓ 加速下降</li>
              <li>Space 直接落下</li>
              <li>P 暫停 / 繼續</li>
              <li>R 重新開始</li>
            </ul>
          </div>
        </aside>
      </div>

      <GameOverModal
        isOpen={isGameOver}
        score={score}
        lines={lines}
        level={level}
        onRestart={restart}
      />
    </div>
  );
}
