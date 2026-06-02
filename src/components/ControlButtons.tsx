interface ControlButtonsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onRotate: () => void;
  onSoftDrop: () => void;
  onHardDrop: () => void;
  onPause: () => void;
  onRestart: () => void;
}

export default function ControlButtons({
  onMoveLeft,
  onMoveRight,
  onRotate,
  onSoftDrop,
  onHardDrop,
  onPause,
  onRestart
}: ControlButtonsProps) {
  return (
    <div className="control-buttons">
      <button type="button" onPointerDown={onMoveLeft}>
        左移
      </button>
      <button type="button" onPointerDown={onMoveRight}>
        右移
      </button>
      <button type="button" onPointerDown={onRotate}>
        旋轉
      </button>
      <button type="button" onPointerDown={onSoftDrop}>
        下降
      </button>
      <button type="button" onPointerDown={onHardDrop}>
        直接落下
      </button>
      <button type="button" onPointerDown={onPause}>
        暫停/繼續
      </button>
      <button type="button" onPointerDown={onRestart}>
        重新開始
      </button>
    </div>
  );
}
