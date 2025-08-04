import { useState, useRef } from "react";

export default function useSwipeVertical({ threshold = 50 } = {}) {
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const [direction, setDirection] = useState(null);

  function onTouchStart(e) {
    const touch = e.touches[0];
    touchStartY.current = touch.clientY;
    touchStartX.current = touch.clientX;
  }

  function onTouchEnd(e) {
    const touch = e.changedTouches[0];
    const dy = touch.clientY - touchStartY.current;
    const dx = touch.clientX - touchStartX.current;

    // 세로 스와이프 우선 감지
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > threshold) {
      setDirection(dy > 0 ? "down" : "up");
    }
  }

  return { onTouchStart, onTouchEnd, direction };
}
