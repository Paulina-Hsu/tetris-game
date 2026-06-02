interface ScorePanelProps {
  score: number;
  highScore: number;
  lines: number;
  level: number;
}

export default function ScorePanel({ score, highScore, lines, level }: ScorePanelProps) {
  return (
    <div className="panel">
      <h2>分數</h2>
      <div className="stat-grid">
        <p>本局分數</p>
        <p className="stat-value">{score}</p>
        <p>最高分</p>
        <p className="stat-value">{highScore}</p>
        <p>等級</p>
        <p className="stat-value">{level}</p>
        <p>消除行數</p>
        <p className="stat-value">{lines}</p>
      </div>
    </div>
  );
}
