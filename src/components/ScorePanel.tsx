interface ScorePanelProps {
  score: number;
  lines: number;
  level: number;
}

export default function ScorePanel({ score, lines, level }: ScorePanelProps) {
  return (
    <div className="panel">
      <h2>狀態</h2>
      <div className="stat-grid">
        <p>分數</p>
        <p className="stat-value">{score}</p>
        <p>消除行數</p>
        <p className="stat-value">{lines}</p>
        <p>等級</p>
        <p className="stat-value">{level}</p>
      </div>
    </div>
  );
}
