import React, { useEffect, useState } from "react";
import "../styles/loader.css";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          // Slow down progress as it gets closer to 100
          const increment = Math.max(0.5, (100 - prev) / 20);
          return Math.min(100, prev + increment);
        }
        return prev;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-[600px] h-[400px] flex flex-col items-center justify-center">
        {/* Music Visualizer */}
        <div className="music-visualizer mb-12">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="visualizer-bar"
              style={{
                animationDelay: `${i * 0.1}s`,
                height: `${Math.random() * 40 + 10}px`,
                backgroundColor: `hsl(${i * 18}, 100%, 50%)`
              }}
            />
          ))}
        </div>

        {/* JUGNU Logo */}
        <div className="relative mb-8">
          <h1 className="text-8xl font-bold tracking-wider animate-pulse">
            <span className="neon-text-orange">J</span>
            <span className="neon-text-pink">U</span>
            <span className="neon-text-cyan">G</span>
            <span className="neon-text-orange">N</span>
            <span className="neon-text-pink">U</span>
          </h1>
          <div className="absolute -bottom-4 left-0 right-0 h-[2px] loading-line" 
               style={{ 
                 width: `${progress}%`,
                 boxShadow: `0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff`
               }} />
        </div>

        {/* Loading Progress */}
        <div className="flex items-center space-x-2">
          <div className="text-white/80 text-lg font-medium tracking-wider">
            Loading Experience
          </div>
          <div className="text-jugnu-cyan text-lg font-bold">
            {progress}%
          </div>
        </div>

        {/* Animated Glow Behind Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <div className="logo-glow" />
        </div>

        {/* Morphing SVG Blobs */}
        {[...Array(3)].map((_, i) => (
          <svg
            key={"morph-blob-" + i}
            className={`morphing-blob morphing-blob-${i}`}
            width={180 + i * 30}
            height={140 + i * 20}
            viewBox="0 0 200 200"
            style={{
              position: 'absolute',
              top: `${30 + i * 10}%`,
              left: `${15 + i * 30}%`,
              zIndex: 1,
              opacity: 0.17 + i * 0.07,
              filter: 'blur(2px) saturate(1.3) drop-shadow(0 2px 32px #fff3)'
            }}
          >
            <path className="morphing-path" />
          </svg>
        ))}

        {/* Floating Music Icons */}
        {[...Array(4)].map((_, i) => (
          <div
            key={"music-icon-" + i}
            className={`floating-music-icon music-icon-${i}`}
            style={{
              zIndex: 4
            }}
          >
            {i === 0 && (
              <svg width="38" height="38" viewBox="0 0 24 24" fill="#ff4d4d" opacity="0.7"><path d="M9 17.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7-2V5h3V3h-5v12.5a2.5 2.5 0 1 0 2 2.45z"/></svg>
            )}
            {i === 1 && (
              <svg width="38" height="38" viewBox="0 0 24 24" fill="#00ffff" opacity="0.7"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>
            )}
            {i === 2 && (
              <svg width="38" height="38" viewBox="0 0 24 24" fill="#ff00ff" opacity="0.7"><path d="M17 10.5V6.41l-7.29 7.3a1 1 0 0 1-1.42-1.42l7.3-7.29H13.5a1 1 0 0 1 0-2h7a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V8.91l-7.3 7.29a1 1 0 0 1-1.42-1.42l7.29-7.3z"/></svg>
            )}
            {i === 3 && (
              <svg width="38" height="38" viewBox="0 0 24 24" fill="#fff200" opacity="0.7"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default Loader;
