export type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

export interface Tetromino {
  type: TetrominoType;
  matrix: number[][];
  color: string;
}

export const TETROMINOES: Tetromino[] = [
  {
    type: "I",
    color: "#00e5ff",
    matrix: [
      [1, 1, 1, 1]
    ]
  },
  {
    type: "O",
    color: "#ffd600",
    matrix: [
      [1, 1],
      [1, 1]
    ]
  },
  {
    type: "T",
    color: "#8e44ff",
    matrix: [
      [0, 1, 0],
      [1, 1, 1]
    ]
  },
  {
    type: "S",
    color: "#00ff6a",
    matrix: [
      [0, 1, 1],
      [1, 1, 0]
    ]
  },
  {
    type: "Z",
    color: "#ff4d4f",
    matrix: [
      [1, 1, 0],
      [0, 1, 1]
    ]
  },
  {
    type: "J",
    color: "#4d7cff",
    matrix: [
      [1, 0, 0],
      [1, 1, 1]
    ]
  },
  {
    type: "L",
    color: "#ffb347",
    matrix: [
      [0, 0, 1],
      [1, 1, 1]
    ]
  }
];

export function getRandomTetromino(): Tetromino {
  const index = Math.floor(Math.random() * TETROMINOES.length);
  const source = TETROMINOES[index];
  return {
    type: source.type,
    color: source.color,
    matrix: source.matrix.map((row) => [...row])
  };
}
