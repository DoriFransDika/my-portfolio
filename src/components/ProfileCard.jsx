import React, { useRef, useState, useCallback } from 'react';

/**
 * ProfileCard — 3D interactive card with Pop-Out transparent photo effect.
 * The photo (PNG with transparent background) extends above the card boundary,
 * creating a striking "popping out" illusion. No inner card wrapping the photo.
 */
export default function ProfileCard({
  name = 'Dori Frans Dika',
  title = 'S1 Teknik Informatika',
  handle = '@dori.fransdika',
  avatarUrl = '/images/hero-Profile.png',
  enableTilt = true,
  behindGlowColor = 'rgba(245, 158, 11, 0.25)',
  stats = [
    { value: '3.68', label: 'IPK' },
    { value: 'S1', label: 'DEGREE' },
    { value: 'A', label: 'SKRIPSI' },
  ],
  className = '',
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (!enableTilt || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      setTilt({ rotateX, rotateY });
      setGlowPos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    },
    [enableTilt]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlowPos({ x: 50, y: 50 });
  }, []);

  const displayHandle = handle.startsWith('@') ? handle : `@${handle}`;

  return (
    <div
      className={`profile-card-wrapper relative w-full ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Card Body — Glassmorphism gelap (bg-zinc-900/90 border border-zinc-800/80 rounded-3xl p-6 pt-0 backdrop-blur-xl) */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative bg-zinc-900/90 border border-zinc-800/80 rounded-3xl p-6 pt-0 backdrop-blur-xl hover:border-amber-500/40 transition-colors duration-300 shadow-2xl shadow-black/80 cursor-default overflow-visible"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Specular Glare Overlay */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* ─── Pop-Out Photo Section with 3D Backlight Spotlight ─── */}
        <div className="relative flex justify-center overflow-visible select-none">
          {/* 1. Ambient Backlight Glow: absolute bg-amber-500/30 blur-3xl w-56 h-56 */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-amber-500/30 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
          />

          {/* 2. Backlight Inner Ring: border border-amber-500/30 rounded-full w-48 h-48 */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)] pointer-events-none transition-all duration-500 group-hover:scale-105"
          />

          {/* 3. Pop-Out PNG Photo Container (overflow-visible, negative top margin -mt-20) */}
          <div className="relative z-20 overflow-visible -mt-20">
            <img
              src={avatarUrl}
              alt={name}
              className="w-56 h-auto sm:w-64 drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] group-hover:scale-[1.04] transition-transform duration-500 ease-out select-none pointer-events-none"
              draggable="false"
            />
          </div>
        </div>

        {/* ─── Card Content (below the photo) ─── */}
        <div className="relative z-[5] px-6 pb-6 pt-3 flex flex-col items-center text-center gap-4">
          {/* Name & Details — Font Sans (Plus Jakarta Sans) */}
          <div className="space-y-1.5 w-full">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">
              {name}
            </h3>
            <p className="text-sm font-sans font-medium text-amber-400">{title}</p>
            <p className="text-xs font-mono text-zinc-500">{displayHandle}</p>
          </div>

          {/* Decorative Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

          {/* Mini Stats Grid — Font Mono for values & labels */}
          <div className="grid grid-cols-3 gap-2.5 w-full">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="py-2.5 px-1.5 rounded-xl bg-white/[0.03] border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <div className="text-sm font-bold font-mono text-amber-400">{item.value}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5 font-mono">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>
    </div>
  );
}
