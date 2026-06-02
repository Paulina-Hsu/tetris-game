import { useCallback, useEffect } from "react";
import { useTetris } from "./hooks/useTetris";
import ControlButtons from "./components/ControlButtons";
import GameBoard from "./components/GameBoard";
import GameOverModal from "./components/GameOverModal";
import MusicToggle from "./components/MusicToggle";
import NextPiece from "./components/NextPiece";
import ScorePanel from "./components/ScorePanel";
import StartScreen from "./components/StartScreen";
import useBackgroundMusic from "./hooks/useBackgroundMusic";

export default function App() {
  const {
    board,
    currentPiece,
    ghostPiece,
    nextPiece,
    score,
    highScore,
    lines,
    level,
    isPaused,
    isGameOver,
    hasStarted,
    isNewRecord,
    startGame,
    moveLeft,
    moveRight,
    rotate,
    softDrop,
    hardDrop,
    togglePause,
    restart
  } = useTetris();

  const { isPlaying, toggleMusic } = useBackgroundMusic();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.code === "Space" ||
        event.code === "Enter" ||
        event.code === "ArrowLeft" ||
        event.code === "ArrowRight" ||
        event.code === "ArrowDown" ||
        event.code === "ArrowUp"
      ) {
        event.preventDefault();
      }

      if (event.code === "Enter") {
        if (!hasStarted) {
          startGame();
          return;
        }

        if (isGameOver) {
          restart();
          return;
        }
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
    [
      hardDrop,
      hasStarted,
      isGameOver,
      moveLeft,
      moveRight,
      restart,
      rotate,
      softDrop,
      startGame,
      togglePause
    ]
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
            <p>用鍵盤控制，體驗標準俄羅斯方塊玩法。</p>
          </header>

          <GameBoard
            board={board}
            currentPiece={currentPiece}
            ghostPiece={ghostPiece}
            isPaused={isPaused}
          />

          <div className="mobile-controls control-section">
            <h2>手機操作</h2>
            <ControlButtons
              onMoveLeft={moveLeft}
              onMoveRight={moveRight}
              onRotate={rotate}
              onSoftDrop={softDrop}
              onHardDrop={hardDrop}
              onPause={togglePause}
              onRestart={restart}
              disabled={!hasStarted}
            />
            <MusicToggle isPlaying={isPlaying} onToggle={toggleMusic} />
          </div>
        </section>

        <aside className="side-zone">
          <ScorePanel score={score} highScore={highScore} lines={lines} level={level} />
          <NextPiece piece={nextPiece} />

          <div className="panel control-section desktop-controls">
            <h2>控制按鈕</h2>
            <ControlButtons
              onMoveLeft={moveLeft}
              onMoveRight={moveRight}
              onRotate={rotate}
              onSoftDrop={softDrop}
              onHardDrop={hardDrop}
              onPause={togglePause}
              onRestart={restart}
              disabled={!hasStarted}
            />
            <MusicToggle isPlaying={isPlaying} onToggle={toggleMusic} />
          </div>

          <div className="panel instructions">
            <h2>操作說明</h2>
            <ul>
              <li>Enter: 開始 / 重新開始</li>
              <li>←: 左移</li>
              <li>→: 右移</li>
              <li>↑: 旋轉</li>
              <li>↓: 加速下降</li>
              <li>Space: 直接落下</li>
              <li>P: 暫停 / 繼續</li>
              <li>R: 重開</li>
            </ul>
          </div>
        </aside>
      </div>

      {!hasStarted && <StartScreen onStart={startGame} highScore={highScore} />}

      <GameOverModal
        isOpen={isGameOver}
        score={score}
        highScore={highScore}
        lines={lines}
        level={level}
        isNewRecord={isNewRecord}
        onRestart={restart}
      />
    </div>
  );
}
