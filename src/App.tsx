import { useCallback, useEffect } from "react";
import { useTetris } from "./hooks/useTetris";
import ControlButtons from "./components/ControlButtons";
import GameBoard from "./components/GameBoard";
import GameOverModal from "./components/GameOverModal";
import NextPiece from "./components/NextPiece";
import ScorePanel from "./components/ScorePanel";
import StartScreen from "./components/StartScreen";

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
            <p>Clear lines, chase records, and use the ghost piece to land cleanly.</p>
          </header>

          <GameBoard
            board={board}
            currentPiece={currentPiece}
            ghostPiece={ghostPiece}
            isPaused={isPaused}
          />

          <div className="mobile-controls control-section">
            <h2>Touch Controls</h2>
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
          <ScorePanel score={score} highScore={highScore} lines={lines} level={level} />
          <NextPiece piece={nextPiece} />

          <div className="panel control-section desktop-controls">
            <h2>Controls</h2>
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
            <h2>Keyboard</h2>
            <ul>
              <li>Enter starts the game</li>
              <li>Left / Right moves the piece</li>
              <li>Up rotates</li>
              <li>Down soft drops</li>
              <li>Space hard drops to the ghost piece</li>
              <li>P pauses or resumes</li>
              <li>R restarts</li>
            </ul>
          </div>
        </aside>
      </div>

      {!hasStarted && <StartScreen onStart={startGame} />}

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
