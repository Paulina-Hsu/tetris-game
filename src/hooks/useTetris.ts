import { useCallback, useEffect, useState } from "react";
import { BOARD_WIDTH, Board, createEmptyBoard } from "../utils/board";
import {
  BoardPosition,
  clearLines,
  canPlacePiece,
  placePiece,
  rotateMatrix
} from "../utils/gameLogic";
import { Tetromino, getRandomTetromino } from "../utils/pieces";

export interface ActivePiece extends Tetromino {
  x: number;
  y: number;
}

export const SCORE_TABLE: Record<number, number> = {
  1: 100,
  2: 300,
  3: 500,
  4: 800
};

function getSpawnX(matrix: number[][]): number {
  return Math.floor((BOARD_WIDTH - matrix[0].length) / 2);
}

function getDropInterval(level: number): number {
  return Math.max(100, 800 - (level - 1) * 60);
}

export function useTetris() {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [currentPiece, setCurrentPiece] = useState<ActivePiece | null>(null);
  const [nextPiece, setNextPiece] = useState<Tetromino>(getRandomTetromino);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const spawnInitialPiece = useCallback((piece: Tetromino): ActivePiece => {
    return {
      ...piece,
      x: getSpawnX(piece.matrix),
      y: 0
    };
  }, []);

  const startGame = useCallback(() => {
    const emptyBoard = createEmptyBoard();
    const firstPiece = getRandomTetromino();
    const queuedPiece = getRandomTetromino();
    const nextCurrentPiece = spawnInitialPiece(firstPiece);
    const canSpawn = canPlacePiece(emptyBoard, nextCurrentPiece.matrix, {
      x: nextCurrentPiece.x,
      y: nextCurrentPiece.y
    });

    setBoard(emptyBoard);
    setCurrentPiece(canSpawn ? nextCurrentPiece : null);
    setNextPiece(queuedPiece);
    setScore(0);
    setLines(0);
    setLevel(1);
    setIsPaused(false);
    setIsGameOver(!canSpawn);
  }, [spawnInitialPiece]);

  const lockCurrentPiece = useCallback(
    (piece: ActivePiece) => {
      if (!piece) return;

      const merged = placePiece(board, piece.matrix, { x: piece.x, y: piece.y }, piece.color);
      const { board: compactBoard, lines: clearedCount } = clearLines(merged);
      const addScore = SCORE_TABLE[clearedCount] ?? 0;
      const nextLines = lines + clearedCount;
      const nextLevel = Math.floor(nextLines / 10) + 1;

      const queued = nextPiece;
      const nextQueued = getRandomTetromino();
      const spawned = spawnInitialPiece(queued);
      const canSpawn = canPlacePiece(compactBoard, spawned.matrix, {
        x: spawned.x,
        y: spawned.y
      });

      setBoard(compactBoard);
      setScore((prev) => prev + addScore);
      setLines(nextLines);
      setLevel(nextLevel);
      setNextPiece(nextQueued);
      setCurrentPiece(canSpawn ? spawned : null);
      setIsGameOver(!canSpawn);
    },
    [board, lines, nextPiece, spawnInitialPiece]
  );

  const moveDown = useCallback(() => {
    if (!currentPiece || isPaused || isGameOver) return;

    const nextPos: BoardPosition = {
      x: currentPiece.x,
      y: currentPiece.y + 1
    };

    if (canPlacePiece(board, currentPiece.matrix, nextPos)) {
      setCurrentPiece({ ...currentPiece, y: currentPiece.y + 1 });
      return;
    }

    lockCurrentPiece(currentPiece);
  }, [board, currentPiece, isPaused, isGameOver, lockCurrentPiece]);

  const moveLeft = useCallback(() => {
    if (!currentPiece || isPaused || isGameOver) return;
    const nextPos: BoardPosition = {
      x: currentPiece.x - 1,
      y: currentPiece.y
    };
    if (canPlacePiece(board, currentPiece.matrix, nextPos)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x - 1 });
    }
  }, [board, currentPiece, isPaused, isGameOver]);

  const moveRight = useCallback(() => {
    if (!currentPiece || isPaused || isGameOver) return;
    const nextPos: BoardPosition = {
      x: currentPiece.x + 1,
      y: currentPiece.y
    };
    if (canPlacePiece(board, currentPiece.matrix, nextPos)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x + 1 });
    }
  }, [board, currentPiece, isPaused, isGameOver]);

  const rotate = useCallback(() => {
    if (!currentPiece || isPaused || isGameOver) return;
    const rotated = rotateMatrix(currentPiece.matrix);

    const kickTests = [0, -1, 1, -2, 2];
    for (const kick of kickTests) {
      const tryPos: BoardPosition = {
        x: currentPiece.x + kick,
        y: currentPiece.y
      };
      if (canPlacePiece(board, rotated, tryPos)) {
        setCurrentPiece({ ...currentPiece, matrix: rotated, x: tryPos.x });
        return;
      }
    }
  }, [board, currentPiece, isPaused, isGameOver]);

  const softDrop = useCallback(() => {
    moveDown();
  }, [moveDown]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || isPaused || isGameOver) return;

    let dropY = currentPiece.y;
    while (canPlacePiece(board, currentPiece.matrix, { x: currentPiece.x, y: dropY + 1 })) {
      dropY += 1;
    }

    const landed: ActivePiece = {
      ...currentPiece,
      y: dropY
    };
    lockCurrentPiece(landed);
  }, [board, currentPiece, isPaused, isGameOver, lockCurrentPiece]);

  const togglePause = useCallback(() => {
    if (isGameOver) return;
    setIsPaused((prev) => !prev);
  }, [isGameOver]);

  const restart = useCallback(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      moveDown();
    }, getDropInterval(level));
    return () => window.clearInterval(timerId);
  }, [level, moveDown]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  return {
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
  };
}
