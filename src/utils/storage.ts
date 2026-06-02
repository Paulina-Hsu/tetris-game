const HIGH_SCORE_KEY = "tetris-game-high-score";

export function readHighScore(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const storedValue = window.localStorage.getItem(HIGH_SCORE_KEY);
    const parsedValue = storedValue ? Number(storedValue) : 0;

    return Number.isFinite(parsedValue) ? parsedValue : 0;
  } catch {
    return 0;
  }
}

export function saveHighScore(score: number): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    // The game can continue even when browser storage is unavailable.
  }
}
