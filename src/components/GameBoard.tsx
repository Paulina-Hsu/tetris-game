import { ActivePiece } from "../hooks/useTetris";
import { Board, Cell, EMPTY_CELL } from "../utils/board";

interface GameBoardProps {
  board: Board;
  currentPiece: ActivePiece | null;
  isPaused: boolean;
}

function getCellValue(board: Board, piece: ActivePiece | null): Cell[][] {
  const rendered = board.map((row) => [...row]);

  if (!piece) return rendered;

  for (let row = 0; row < piece.matrix.length; row++) {
    for (let col = 0; col < piece.matrix[row].length; col++) {
      if (piece.matrix[row][col] !== 1) continue;
      const x = piece.x + col;
      const y = piece.y + row;
      if (y >= 0 && y < board.length && x >= 0 && x < board[0].length) {
        rendered[y][x] = piece.color;
      }
    }
  }

  return rendered;
}

export default function GameBoard({ board, currentPiece, isPaused }: GameBoardProps) {
  const renderedBoard = getCellValue(board, currentPiece);

  return (
    <div className="game-board-wrapper">
      <div className="game-board">
        {renderedBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isEmpty = cell === EMPTY_CELL;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`board-cell ${isEmpty ? "empty" : "filled"}`}
                style={isEmpty ? {} : { backgroundColor: cell as string }}
                aria-label={isEmpty ? "empty" : "block"}
                role="gridcell"
              />
            );
          })
        )}
      </div>
      {isPaused && <div className="pause-overlay">已暫停</div>}
    </div>
  );
}
