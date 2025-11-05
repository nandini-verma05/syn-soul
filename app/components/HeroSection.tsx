"use client";

import React, { useEffect, useRef, useState } from "react";

const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Try to play programmatically (useful in some browsers)
    const tryPlay = async () => {
      const v = videoRef.current;
      if (!v) return;
      try {
        // ensure muted for autoplay policies
        v.muted = true;
        await v.play();
        // play succeeded
      } catch (err) {
        // autoplay may be blocked — leave muted true, user interaction may be required
        // Helpful log for debugging
        // eslint-disable-next-line no-console
        console.warn("Video autoplay blocked or play() failed:", err);
      }
    };
    tryPlay();
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/herosection-poster.jpg" /* optional poster file in public/ */
          onLoadedData={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-40" : "opacity-0"
          }`}
        >
          <source src="/hero.mp4" type="video/mp4" />
          {/* fallback text */}
          Your browser does not support the video tag.
        </video>

        {/* overlay gradient sits on top intentionally */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded grid grid-cols-2 gap-0.5 p-1">
            <div className="bg-black rounded-sm"></div>
            <div className="bg-black rounded-sm"></div>
            <div className="bg-black rounded-sm"></div>
            <div className="bg-black rounded-sm"></div>
          </div>
          <span
            className="text-white text-xl font-normal tracking-wide"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Portfolite
          </span>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-8">
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gray-700/50 bg-black/20 backdrop-blur-md mb-12">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <span className="text-white text-sm font-normal tracking-wide">
            Crafting Unique Brand Identities
          </span>
        </div>

        <h1
          className="text-8xl md:text-9xl text-white text-center mb-6 tracking-wide"
          style={{
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontWeight: 300,
            lineHeight: 1.1,
          }}
        >
          Sync Souls
        </h1>

        <p className="text-gray-400 text-base mb-14 text-center tracking-wider font-light">
          aligning stars , connecting souls
        </p>

        <div className="flex items-center gap-4">
          <button className="px-10 py-4 bg-transparent border-2 border-white/80 text-white rounded-lg font-normal hover:bg-white/10 hover:border-white transition-all text-base tracking-wide backdrop-blur-sm">
            Get Started Now
          </button>
          <button className="px-10 py-4 border-2 border-gray-600/80 text-white rounded-lg font-normal hover:border-gray-400 hover:bg-white/5 transition-all text-base tracking-wide bg-black/30 backdrop-blur-sm">
            See Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
