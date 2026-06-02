interface ScorePanelProps {
  score: number;
  highScore: number;
  lines: number;
  level: number;
}

export default function ScorePanel({ score, highScore, lines, level }: ScorePanelProps) {
  return (
    <div className="panel">
      <h2>Score</h2>
      <div className="stat-grid">
        <p>Current Score</p>
        <p className="stat-value">{score}</p>
        <p>High Score</p>
        <p className="stat-value">{highScore}</p>
        <p>Level</p>
        <p className="stat-value">{level}</p>
        <p>Cleared Lines</p>
        <p className="stat-value">{lines}</p>
      </div>
    </div>
  );
}
