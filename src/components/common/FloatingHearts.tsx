import React, { useMemo } from 'react';

interface FloatingHeartsProps {
  count?: number;
  subtle?: boolean;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 12, subtle = true }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 97) % 100}%`,
      animationDuration: `${12 + (i % 7) * 3}s`,
      animationDelay: `${(i % 5) * 1.8}s`,
      size: `${14 + (i % 4) * 8}px`,
      opacity: subtle ? 0.12 + (i % 3) * 0.08 : 0.2 + (i % 3) * 0.12,
      emoji: i % 3 === 0 ? '❤️' : i % 3 === 1 ? '✨' : '🌸',
    }));
  }, [count, subtle]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute -bottom-10 select-none animate-float"
          style={{
            left: p.left,
            fontSize: p.size,
            opacity: p.opacity,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            filter: 'blur(0.5px)',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};
