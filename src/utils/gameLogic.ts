import { BOARD_HEIGHT, BOARD_WIDTH, Board, Cell, EMPTY_CELL, cloneBoard } from "./board";

export interface BoardPosition {
  x: number;
  y: number;
}

export interface LineClearResult {
  board: Board;
  lines: number;
}

export function rotateMatrix(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  return Array.from({ length: cols }, (_, col) =>
    Array.from({ length: rows }, (_, row) => matrix[rows - 1 - row][col])
  );
}

export function canPlacePiece(
  board: Board,
  matrix: number[][],
  position: BoardPosition
): boolean {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] !== 1) {
        continue;
      }
      const x = position.x + col;
      const y = position.y + row;
      if (x < 0 || x >= BOARD_WIDTH || y >= BOARD_HEIGHT || y < 0) {
        return false;
      }
      if (board[y][x] !== EMPTY_CELL) {
        return false;
      }
    }
  }
  return true;
}

export function placePiece(
  board: Board,
  matrix: number[][],
  position: BoardPosition,
  color: string
): Board {
  const nextBoard = cloneBoard(board);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 1) {
        const x = position.x + col;
        const y = position.y + row;
        if (x >= 0 && x < BOARD_WIDTH && y >= 0 && y < BOARD_HEIGHT) {
          nextBoard[y][x] = color as Cell;
        }
      }
    }
  }
  return nextBoard;
}

export function getGhostPiecePosition(
  board: Board,
  matrix: number[][],
  position: BoardPosition
): BoardPosition {
  let ghostY = position.y;

  while (canPlacePiece(board, matrix, { x: position.x, y: ghostY + 1 })) {
    ghostY += 1;
  }

  return {
    x: position.x,
    y: ghostY
  };
}

export function clearLines(board: Board): LineClearResult {
  const remainRows = board.filter((row) => row.some((cell) => cell !== EMPTY_CELL));
  const cleared = BOARD_HEIGHT - remainRows.length;
  const emptyRows = Array.from({ length: cleared }, () => Array(BOARD_WIDTH).fill(EMPTY_CELL));
  return {
    board: [...emptyRows, ...remainRows],
    lines: cleared
  };
}
