"use client";

import { useEffect, useState } from "react";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100"
        style={{
          backgroundImage: "url('/images/hero-background.jpeg')",
          transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />

      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-white/30"
            style={{
              top: `${50 + i * 6}%`,
              opacity: 0.3 - i * 0.03,
            }}
          />
        ))}
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div
          className="transition-all duration-300"
          style={{
            opacity: Math.max(0, 1 - scrollY / 400),
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <p className="mb-4 text-sm tracking-[0.5em] text-gray/90 uppercase">
            Desenvolvedora de Software
          </p>
          <h1 className="mb-6 text-5xl font-medium tracking-wide text-white md:text-7xl lg:text-8xl">
            Annanda Jacobs
          </h1>
          <div className="mx-auto h-px w-24 bg-white/40" />
        </div>

        <div
          className="absolute bottom-12 flex flex-col items-center gap-2 text-white/60 transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <span className="text-black/50 tracking-[0.2em] uppercase">Scroll</span>
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-black/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
