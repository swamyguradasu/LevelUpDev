'use client';

import React, { useEffect, useState, useRef } from 'react';

export function LoginCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const targetPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const dotElRef = useRef<HTMLDivElement>(null);
  const ringElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fall back to system cursor on touch devices or reduced motion
    const hasTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasTouch || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest(
          'button, input, a, textarea, select, [role="button"]'
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animFrameId: number;

    const animate = () => {
      // Lerp ring position towards mouse coordinates for a smooth trailing feel
      ringPos.current.x += (targetPos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (targetPos.current.y - ringPos.current.y) * 0.15;

      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Hide default system cursor on login page */}
      <style jsx global>{`
        body,
        button,
        input,
        a,
        select,
        textarea,
        label {
          cursor: none !important;
        }
      `}</style>

      {/* Small Gold Dot (#C98A3E) at exact cursor position */}
      <div
        ref={dotElRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#C98A3E] pointer-events-none z-[9999] transition-opacity duration-300 shadow-[0_0_6px_rgba(201,138,62,0.6)] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Larger Soft Trailing Ring */}
      <div
        ref={ringElRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isHovered
            ? 'w-10 h-10 border-2 border-[#C98A3E] bg-transparent shadow-[0_0_14px_rgba(201,138,62,0.35)]'
            : 'w-7 h-7 border border-[#C98A3E]/60 bg-[#C98A3E]/5 shadow-[0_0_8px_rgba(201,138,62,0.2)]'
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  );
}
