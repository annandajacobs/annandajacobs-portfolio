"use client";

import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    label: "Frontend",
    color: "#008080",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
  },
  {
    label: "Backend",
    color: "#2F4F4F",
    skills: ["Node.js", "Express", "NestJS", "Django", "Laravel"],
  },
  {
    label: "Banco de Dados",
    color: "#CD5C5C",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "Oracle"],
  },
  {
    label: "DevOps & Cloud",
    color: "#FA8072",
    skills: ["Docker", "AWS", "CI/CD", "Linux"],
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background)] px-6 py-24 md:py-32"
    >
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--ocean-mid)]/20 to-transparent" />

      <div className="mx-auto max-w-4xl">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-4 text-2xl tracking-[0.4em] text-[var(--ocean-mid)] uppercase font-bold">
            Sobre
          </p>

          <h2 className="mb-12 text-3xl font-medium leading-relaxed text-[var(--foreground)] md:text-4xl lg:text-5xl">
            Criando experiências visuais que{" "}
            <span className="text-[var(--ocean-mid)]">conectam</span> marcas e
            pessoas através do design.
          </h2>
        </div>

        <div
          className={`grid gap-12 transition-all delay-300 duration-1000 md:grid-cols-2 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Texto bio — mantido igual */}
          <div>
            <p className="mb-6 text-lg leading-relaxed text-[var(--muted-foreground)]">
              Desenvolvedora full-stack com foco em criar produtos digitais
              robustos e experiências de usuário refinadas, do banco de dados à
              interface.
            </p>
            <p className="text-lg leading-relaxed text-[var(--muted-foreground)]">
              Minha abordagem une código limpo com atenção ao detalhe visual,
              garantindo que cada solução seja eficiente, escalável e agradável
              de usar.
            </p>
          </div>

          {/* Grid de skills por categoria */}
          <div className="space-y-6">
            {skillGroups.map((group, groupIndex) => (
              <div
                key={group.label}
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${300 + groupIndex * 120}ms` }}
              >
                <p
                  className="mb-3 text-base tracking-[0.3em] uppercase font-bold"
                  style={{ color: group.color }}
                >
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border px-3 py-1 text-sm tracking-wide text-[var(--foreground)] transition-colors duration-300 hover:border-[var(--ocean-mid)]/50"
                      style={{ borderColor: `${group.color}60` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}