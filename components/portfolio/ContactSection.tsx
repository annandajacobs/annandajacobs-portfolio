"use client";

import { useEffect, useRef, useState } from "react";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-32"
      style={{
        background: `linear-gradient(
          180deg,
          var(--sky-pale) 0%,
          var(--blush) 50%,
          var(--ocean-light) 100%
        )`,
      }}
    >
      {/* Decorative horizontal lines - inspired by the ocean image */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${20 + i * 12}%`,
              background: `linear-gradient(90deg, transparent, var(--ocean-mid), transparent)`,
              opacity: 0.3 + i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-6 text-2xl tracking-[0.3em] text-[var(--ocean-deep)] uppercase font-bold">
            Contato
          </p>

           <h2 className="mb-6 text-3xl font-medium leading-relaxed text-[var(--foreground)] md:text-4xl">
            Vamos conversar sobre{" "}
            <span className="text-[var(--ocean-deep)]">o seu projeto</span>?
          </h2>

          <p className="mx-auto mb-12 max-w-xl text-base text-[var(--foreground)]/70">
            Estou aberta a novos projetos, pesquisas e colaborações em
            desenvolvimento e Inteligência Artificial.
          </p>
        </div>

        <div
          className={`flex flex-col items-center gap-6 transition-all delay-300 duration-1000 sm:flex-row sm:justify-center ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=annandajacobs@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-[var(--ocean-deep)] px-8 py-4 text-sm tracking-wider text-white uppercase transition-all hover:shadow-lg"
          >
            <span className="relative z-10">Enviar Email</span>
            <div className="absolute inset-0 -translate-x-full bg-[var(--foreground)] transition-transform duration-300 group-hover:translate-x-0" />
          </a>

          <a
            href="https://www.linkedin.com/in/annanda-jacobs-166649278"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative border border-[var(--ocean-deep)] bg-transparent px-8 py-4 text-sm tracking-wider text-[var(--ocean-deep)] uppercase transition-all hover:text-white"
          >
            <span className="relative z-10">LinkedIn</span>
            <div className="absolute inset-0 -translate-x-full bg-[var(--ocean-deep)] transition-transform duration-300 group-hover:translate-x-0" />
          </a>
        </div>

      </div>
    </section>
  );
}
