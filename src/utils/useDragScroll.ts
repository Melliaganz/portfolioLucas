import { useCallback, useRef, useState } from "react";

// Drag-to-scroll horizontal partagé par TechStack et Projects : suit le
// pointeur (souris/tactile) et écrit scrollLeft dans un requestAnimationFrame
// pour éviter les reflows en rafale. `enabled` permet de désactiver le drag
// (ex. Projects quand il y a trop peu de cartes pour défiler).
export const useDragScroll = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ startX: 0, scrollLeft: 0, active: false, rafId: 0 });

  const start = useCallback(
    (clientX: number) => {
      if (!enabled || !scrollRef.current) return;
      drag.current.active = true;
      drag.current.startX = clientX - scrollRef.current.offsetLeft;
      drag.current.scrollLeft = scrollRef.current.scrollLeft;
      setIsDragging(true);
    },
    [enabled]
  );

  const move = useCallback((clientX: number) => {
    if (!drag.current.active || !scrollRef.current) return;
    cancelAnimationFrame(drag.current.rafId);
    drag.current.rafId = requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const x = clientX - scrollRef.current.offsetLeft;
      const walk = (x - drag.current.startX) * 1.5;
      scrollRef.current.scrollLeft = drag.current.scrollLeft - walk;
    });
  }, []);

  const stop = useCallback(() => {
    cancelAnimationFrame(drag.current.rafId);
    drag.current.active = false;
    setIsDragging(false);
  }, []);

  const handlers = {
    onMouseDown: (e: React.MouseEvent) => start(e.pageX),
    onMouseMove: (e: React.MouseEvent) => {
      if (drag.current.active) e.preventDefault();
      move(e.pageX);
    },
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: (e: React.TouchEvent) => start(e.touches[0].pageX),
    onTouchMove: (e: React.TouchEvent) => move(e.touches[0].pageX),
    onTouchEnd: stop,
  };

  return { scrollRef, isDragging, handlers };
};
