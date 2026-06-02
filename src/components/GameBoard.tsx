import { ActivePiece } from "../hooks/useTetris";
import { Board, Cell, EMPTY_CELL } from "../utils/board";

interface GameBoardProps {
  board: Board;
  currentPiece: ActivePiece | null;
  ghostPiece: ActivePiece | null;
  isPaused: boolean;
}

interface RenderedCell {
  color: Cell;
  isGhost: boolean;
}

function applyPiece(rendered: RenderedCell[][], piece: ActivePiece, isGhost: boolean) {
  for (let row = 0; row < piece.matrix.length; row++) {
    for (let col = 0; col < piece.matrix[row].length; col++) {
      if (piece.matrix[row][col] !== 1) continue;

      const x = piece.x + col;
      const y = piece.y + row;

      if (y < 0 || y >= rendered.length || x < 0 || x >= rendered[0].length) {
        continue;
      }

      if (isGhost && rendered[y][x].color !== EMPTY_CELL) {
        continue;
      }

      rendered[y][x] = {
        color: piece.color,
        isGhost
      };
    }
  }
}

function getRenderedBoard(
  board: Board,
  currentPiece: ActivePiece | null,
  ghostPiece: ActivePiece | null
): RenderedCell[][] {
  const rendered = board.map((row) =>
    row.map((cell) => ({
      color: cell,
      isGhost: false
    }))
  );

  if (ghostPiece) {
    applyPiece(rendered, ghostPiece, true);
  }

  if (currentPiece) {
    applyPiece(rendered, currentPiece, false);
  }

  return rendered;
}

export default function GameBoard({
  board,
  currentPiece,
  ghostPiece,
  isPaused
}: GameBoardProps) {
  const renderedBoard = getRenderedBoard(board, currentPiece, ghostPiece);

  return (
    <div className="game-board-wrapper">
      <div className="game-board" role="grid" aria-label="Tetris board">
        {renderedBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isEmpty = cell.color === EMPTY_CELL;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`board-cell ${isEmpty ? "empty" : cell.isGhost ? "ghost" : "filled"}`}
                style={isEmpty ? {} : { backgroundColor: cell.color as string }}
                aria-label={isEmpty ? "empty" : cell.isGhost ? "ghost block" : "block"}
                role="gridcell"
              />
            );
          })
        )}
      </div>
      {isPaused && <div className="pause-overlay">Paused</div>}
    </div>
  );
}
