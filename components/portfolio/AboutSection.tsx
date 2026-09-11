"use client";

import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    label: "Frontend",
    color: "#008080",
    skills: ["React", "React Native", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    color: "#2F4F4F",
    skills: ["Node.js", "Express", "NestJS", "Django", "FastAPI", "Laravel"],
  },
  {
    label: "IA & Machine Learning",
    color: "#8B5CF6",
    skills: [
      "Python",
      "Ollama",
      "LangChain",
      "RAG",
      "Hugging Face",
      "Pinecone",
      "OpenCV"
    ],
  },
  {
    label: "Banco de Dados",
    color: "#CD5C5C",
    skills: ["PostgreSQL", "MongoDB", "Oracle"],
  },
  {
    label: "DevOps & Cloud",
    color: "#FA8072",
    skills: ["Docker", "CI/CD", "Linux"],
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
          className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <p className="mb-4 text-2xl tracking-[0.4em] text-[var(--ocean-mid)] uppercase font-bold">
            Sobre
          </p>

          <h2 className="mb-12 text-2xl font-medium leading-relaxed text-[var(--foreground)] md:text-3xl lg:text-4xl">
            Unindo desenvolvimento e pesquisa para{" "}
            <span className="text-[var(--ocean-mid)]">construir</span>{" "}
            soluções inteligentes com impacto real.
          </h2>
        </div>

        <div
          className={`mb-12 flex flex-col items-center gap-6 transition-all duration-1000 sm:flex-row ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          {/* Foto de perfil — substitua o src abaixo pela sua foto em /public/images */}
          <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-xl border-2 border-[var(--ocean-mid)]/40 shadow-md sm:h-56 sm:w-56">
            <img
              src="images/foto-profissional.jpeg"
              alt="Foto de Annanda Jacobs"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/placeholder-user.jpg";
              }}
            />
          </div>
          <div>
            <p className="text-xl font-medium text-[var(--foreground)]">
              Annanda Jacobs
            </p>
            <p className="text-[var(--muted-foreground)]">
              Desenvolvedora Full-Stack &amp; IA APlicada
            </p>
          </div>
        </div>

        <div
          className={`grid gap-12 transition-all delay-300 duration-1000 md:grid-cols-2 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          {/* Texto bio */}
          <div>
            <p className="mb-6 text-lg leading-relaxed text-[var(--muted-foreground)]">
              Sou estudante de Sistemas de Informação no IFAL - Campus Maceió, desenvolvedora e pesquisadora com interesse crescente em Inteligência Artificial.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-[var(--muted-foreground)]">
              Minha trajetória começou no desenvolvimento de aplicações e APIs. Com o tempo, fui me aproximando da IA e passei a explorar áreas como LLMs, RAG, NLP, visão computacional e sistemas inteligentes.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-[var(--muted-foreground)]">
              A pesquisa científica ocupa um papel central nesse caminho: participo de projetos que investigam o uso de tecnologia para problemas reais, incluindo estudos com Inteligência Artificial, reconhecimento facial e visão computacional aplicados à educação e à segurança institucional. Essa experiência me ensinou a avaliar uma solução não apenas pelo fato de ela funcionar, mas também por seus resultados, limitações e impactos.
            </p>
            <p className="text-lg leading-relaxed text-[var(--muted-foreground)]">
              Gosto de aprender construindo: transformar uma ideia em projeto, investigar o que não funciona e entender como melhorar. É essa combinação entre desenvolvimento, pesquisa e curiosidade por IA que guia minha trajetória.
            </p>
          </div>

          {/* Grid de skills por categoria */}
          <div className="space-y-6">
            {skillGroups.map((group, groupIndex) => (
              <div
                key={group.label}
                className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
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