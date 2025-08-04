import { useEffect, useState } from "react";
import useSwipeVertical from "../customHooks/useSwipeVertical";

export default function SwipeVerticalSection({ children }) {
  const { onTouchStart, onTouchEnd, direction } = useSwipeVertical({
    threshold: 60,
  });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (direction === "up") {
      setExpanded(true);
    } else if (direction === "down") {
      setExpanded(false);
    }
  }, [direction]);

  return (
    <div
      className={`swipe-panel ${expanded ? "expanded" : "collapsed"}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
}
