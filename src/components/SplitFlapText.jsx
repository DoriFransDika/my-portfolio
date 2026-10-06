import React, { useState, useEffect, useRef, useCallback } from 'react';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .•—';

/**
 * SplitFlapText — Mechanical flip-board animation component.
 * Cycles through words or displays a single phrase, flipping character tiles independently.
 *
 * Props:
 *  - words: string[] — Array of phrases to cycle through
 *  - tileColor: string — Background color of each tile (default #121212)
 *  - textColor: string — Color of the text (default #f59e0b)
 *  - fontSize: string — CSS font-size (default 'clamp(1.3rem, 3.8vw, 2.6rem)')
 *  - flipDuration: number — ms per character flip step (default 35)
 *  - staggerDelay: number — ms stagger between character start times (default 18)
 *  - holdDuration: number — ms to display completed word before callback (default 400)
 *  - onComplete: () => void — Called after word display and hold complete
 */
export default function SplitFlapText({
  words = ['DORI FRANS DIKA'],
  tileColor = '#121212',
  textColor = '#f59e0b',
  fontSize = 'clamp(1.3rem, 3.8vw, 2.6rem)',
  flipDuration = 35,
  staggerDelay = 18,
  holdDuration = 400,
  onComplete,
}) {
  const maxLen = Math.max(...words.map((w) => w.length));

  // Displayed characters on each tile
  const [tiles, setTiles] = useState(() => Array(maxLen).fill(' '));
  const [flipping, setFlipping] = useState(() => Array(maxLen).fill(false));
  const wordIndexRef = useRef(0);
  const mountedRef = useRef(true);
  const timersRef = useRef([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => {
      clearInterval(t);
      clearTimeout(t);
    });
    timersRef.current = [];
  };

  const flipToWord = useCallback(
    (targetWord, onWordDone) => {
      const padded = targetWord.padEnd(maxLen, ' ');
      setFlipping(Array(maxLen).fill(true));

      let settledTiles = 0;
      const totalTiles = padded.length;

      padded.split('').forEach((targetChar, pos) => {
        const targetUpper = targetChar.toUpperCase();
        const targetIdx = CHARSET.indexOf(targetUpper);
        const effectiveTarget = targetIdx >= 0 ? targetIdx : CHARSET.indexOf(' ');

        // Number of rapid flips before locking onto target character
        const flipsNeeded = targetUpper === ' ' ? 3 : 7 + (pos % 4);

        const startTimer = setTimeout(() => {
          if (!mountedRef.current) return;

          let step = 0;
          const flipInterval = setInterval(() => {
            if (!mountedRef.current) {
              clearInterval(flipInterval);
              return;
            }

            step++;
            if (step < flipsNeeded) {
              // Pick random character during mechanical rotation
              const randomIdx = Math.floor(Math.random() * 26);
              setTiles((prev) => {
                const next = [...prev];
                next[pos] = CHARSET[randomIdx];
                return next;
              });
            } else {
              // Lock on final character
              clearInterval(flipInterval);
              setTiles((prev) => {
                const next = [...prev];
                next[pos] = CHARSET[effectiveTarget] || targetUpper;
                return next;
              });
              setFlipping((prev) => {
                const next = [...prev];
                next[pos] = false;
                return next;
              });

              settledTiles++;
              if (settledTiles === totalTiles) {
                // All tiles have settled. Hold for holdDuration before finishing
                const holdTimer = setTimeout(() => {
                  if (mountedRef.current && onWordDone) {
                    onWordDone();
                  }
                }, holdDuration);
                timersRef.current.push(holdTimer);
              }
            }
          }, flipDuration);

          timersRef.current.push(flipInterval);
        }, pos * staggerDelay);

        timersRef.current.push(startTimer);
      });
    },
    [maxLen, flipDuration, staggerDelay, holdDuration]
  );

  useEffect(() => {
    mountedRef.current = true;
    wordIndexRef.current = 0;

    const playNext = () => {
      if (!mountedRef.current) return;
      if (wordIndexRef.current >= words.length) {
        if (onComplete) onComplete();
        return;
      }

      const currentWord = words[wordIndexRef.current];
      wordIndexRef.current += 1;

      flipToWord(currentWord, () => {
        if (wordIndexRef.current >= words.length) {
          if (onComplete) onComplete();
        } else {
          playNext();
        }
      });
    };

    const initialDelay = setTimeout(playNext, 120);
    timersRef.current.push(initialDelay);

    return () => {
      mountedRef.current = false;
      clearAllTimers();
    };
  }, [words, flipToWord, onComplete]);

  return (
    <div
      className="split-flap-container"
      style={{
        display: 'inline-flex',
        gap: '4px',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        perspective: '600px',
      }}
    >
      {tiles.map((char, i) => (
        <div
          key={i}
          className="split-flap-tile"
          style={{
            width: `clamp(1.5rem, ${fontSize}, 3.4rem)`,
            height: `clamp(2.1rem, calc(${fontSize} * 1.4), 4.8rem)`,
            backgroundColor: tileColor,
            color: textColor,
            fontSize: fontSize,
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: flipping[i]
              ? `0 0 14px rgba(245, 158, 11, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)`
              : `inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.5)`,
            transition: 'box-shadow 0.15s ease',
            transform: flipping[i] ? 'rotateX(5deg)' : 'rotateX(0deg)',
            userSelect: 'none',
          }}
        >
          {/* Mechanical Center divider split */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: 'rgba(0,0,0,0.6)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          <span
            style={{
              position: 'relative',
              zIndex: 1,
              textShadow: '0 1px 3px rgba(0,0,0,0.6)',
              lineHeight: 1,
            }}
          >
            {char}
          </span>
        </div>
      ))}
    </div>
  );
}
