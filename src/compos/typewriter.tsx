import React, { useState, useEffect } from 'react';

interface Props { lines: string[]; typingSpeed?: number; pause?: number }

export default function TypewriterText({ lines, typingSpeed = 100, pause = 1500 }: Props) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [text, setText]           = useState('');
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const cur   = lines[lineIndex];
    const speed = deleting ? 50 : typingSpeed;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(cur.substring(0, charIndex + 1));
        setCharIndex(c => c + 1);
        if (charIndex + 1 === cur.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(cur.substring(0, charIndex - 1));
        setCharIndex(c => c - 1);
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setLineIndex(i => (i + 1) % lines.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, deleting, lineIndex, lines, typingSpeed, pause]);

  return (
    <span className="text-[#7bd850] font-semibold text-sm md:text-base after:content-['|'] after:animate-blink after:ml-0.5">
      {text}
    </span>
  );
}
