import { PointerEvent, useCallback, useEffect, useRef } from "react";

interface ControlButtonsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onRotate: () => void;
  onSoftDrop: () => void;
  onHardDrop: () => void;
  onPause: () => void;
  onRestart: () => void;
  disabled?: boolean;
}

export default function ControlButtons({
  onMoveLeft,
  onMoveRight,
  onRotate,
  onSoftDrop,
  onHardDrop,
  onPause,
  onRestart,
  disabled = false
}: ControlButtonsProps) {
  const holdDelayId = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const holdIntervalId = useRef<ReturnType<typeof window.setInterval> | null>(null);

  const clearHold = useCallback(() => {
    if (holdDelayId.current !== null) {
      window.clearTimeout(holdDelayId.current);
      holdDelayId.current = null;
    }
    if (holdIntervalId.current !== null) {
      window.clearInterval(holdIntervalId.current);
      holdIntervalId.current = null;
    }
  }, []);

  useEffect(() => clearHold, [clearHold]);

  const fireRepeat = useCallback(
    (action: () => void, e: PointerEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }
      e.preventDefault();
      action();
      clearHold();
      holdDelayId.current = window.setTimeout(() => {
        holdIntervalId.current = window.setInterval(() => {
          action();
        }, 120);
      }, 220);
    },
    [clearHold, disabled]
  );

  const onPointerEnd = useCallback(() => clearHold(), [clearHold]);

  return (
    <div className="control-buttons" role="group" aria-label="control buttons">
      <button
        type="button"
        onPointerDown={(e) => fireRepeat(onMoveLeft, e)}
        onPointerUp={onPointerEnd}
        onPointerLeave={onPointerEnd}
        onPointerCancel={onPointerEnd}
        aria-label="Move left"
        disabled={disabled}
      >
        左移
      </button>
      <button
        type="button"
        onPointerDown={(e) => fireRepeat(onMoveRight, e)}
        onPointerUp={onPointerEnd}
        onPointerLeave={onPointerEnd}
        onPointerCancel={onPointerEnd}
        aria-label="Move right"
        disabled={disabled}
      >
        右移
      </button>
      <button type="button" onPointerDown={onRotate} aria-label="Rotate">
        旋轉
      </button>
      <button
        type="button"
        onPointerDown={(e) => fireRepeat(onSoftDrop, e)}
        onPointerUp={onPointerEnd}
        onPointerLeave={onPointerEnd}
        onPointerCancel={onPointerEnd}
        aria-label="Soft drop"
        disabled={disabled}
      >
        下降
      </button>
      <button type="button" onPointerDown={onHardDrop} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} aria-label="Hard drop" disabled={disabled}>
        直接落下
      </button>
      <button type="button" onPointerDown={onPause} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} aria-label="Pause or resume" disabled={disabled}>
        暫停
      </button>
      <button type="button" onPointerDown={onRestart} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} aria-label="Restart game" disabled={disabled}>
        重新開始
      </button>
    </div>
  );
}
