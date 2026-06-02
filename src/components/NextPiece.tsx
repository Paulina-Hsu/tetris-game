import { Tetromino } from "../utils/pieces";

interface NextPieceProps {
  piece: Tetromino;
}

export default function NextPiece({ piece }: NextPieceProps) {
  return (
    <div className="panel">
      <h2>Next Piece</h2>
      <div className="next-piece" aria-label={`Next piece ${piece.type}`}>
        {piece.matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="next-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`preview-cell ${cell === 1 ? "filled" : "empty"}`}
                style={cell === 1 ? { backgroundColor: piece.color } : {}}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
