"use client";

import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 px-6 py-4 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--background)]/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="#"
            className={`text-lg font-medium tracking-wide transition-colors ${
              scrolled ? "text-[var(--foreground)]" : "text-black"
            }`}
          >
            ANNANDA JACOBS
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {["Sobre", "Projetos", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative text-sm font-bold tracking-wide transition-colors ${
                  scrolled
                    ? "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    : "text-black/90 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`h-px w-6 transition-all ${
                scrolled ? "bg-[var(--foreground)]" : "bg-black"
              } ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 transition-all ${
                scrolled ? "bg-[var(--foreground)]" : "bg-black"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-6 transition-all ${
                scrolled ? "bg-[var(--foreground)]" : "bg-black"
              } ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-[var(--background)] transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {["Sobre", "Projetos", "Contato"].map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium text-[var(--foreground)] transition-all"
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
