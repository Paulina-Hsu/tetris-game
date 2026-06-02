export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export type Cell = string | null;
export type Board = Cell[][];

export const EMPTY_CELL: Cell = null;

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(EMPTY_CELL));
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}
