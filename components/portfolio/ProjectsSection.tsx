"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

// Edite os campos "caseStudy" e "live" com os links reais dos seus projetos/deploys.
const projects = [
  {
    id: 1,
    title: "Book-Recommender",
    // category: "",
    description: "Descubra sua próxima leitura com IA: um sistema de recomendação que utiliza o Llama 3.2:3B para interpretar objetivos de leitura, gerar candidatos semanticamente relevantes e combiná-los com validação via Google Books e ranking determinístico.",
    // impact: "",
    color: "var(--ocean-mid)",
    image: "images/book-capa-2.png",
    tech: ["React", "FastAPI", "Llama 3.2:3B", "Ollama", "Docker", "CI"],
    caseStudy: "https://github.com/annandajacobs/book-recommender",
    live: "https://youtu.be/sEnmRn1ieO0",
  },
  {
    id: 2,
    title: "Gtur",
    // category: "",
    description: "Plataforma web desenvolvida em parceria com uma agência de turismo real para conectar turistas às experiências de Maceió (AL). O site combina guia turístico, geolocalização, favoritos e recomendações personalizadas utilizando NLP para transformar preferências descritas em linguagem natural em sugestões de passeios.",
    // impact: "",
    color: "var(--peach)",
    image: "images/gtur-3.png",
    tech: ["React", "Django", "SentenceTransformers", "PostgreSQL", "Docker", "CI"],
    caseStudy: "https://github.com/annandajacobs/gtur",
    live: "https://youtu.be/b5kZX5nRQLU",
  },
  {
    id: 3,
    title: "Sistema de Reconhecimento Facial",
    // category: "",
    description: "Sistema de reconhecimento facial em tempo real para controle de acesso, combinando Visão Computacional, modelo buffalo_l do InsightFace e processamento de imagens.",
    // impact: "",
    color: "var(--ocean-light)",
    image: "images/recon-2.png",
    tech: ["React", "Flask", "OpenCV", "InsightFace", "ONNX Runtime"],
    caseStudy: "https://github.com/annandajacobs/reconhecimento_facial",
    live: "https://youtu.be/L6ow65ORGmU",
  },
  {
    id: 4,
    title: "Descobrindo Maceió",
    // category: "",
    description: "Aplicação web desenvolvida para auxiliar turistas na exploração dos principais pontos turísticos e culturais de Maceió (AL), permitindo conhecer os locais, favoritar seus pontos de interesse e visualizá-los geograficamente por meio de um mapa interativo.",
    // impact: "",
    color: "var(--sunset)",
    image: "images/descobrindo-maceio.png",
    tech: ["React", "Django", "MongoDB"],
    caseStudy: "https://github.com/annandajacobs/descobrindoMaceio",
    live: "https://descobrindo-maceio-frontend.onrender.com/",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--muted)]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"
            }`}
        />
        {/* Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-60" : "opacity-0"
            }`}
          style={{ backgroundColor: project.color }}
        />

        {/* Hover Content */}
        <a
          href={project.caseStudy}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"
            }`}
        >
          <span className="border border-white px-6 py-3 text-lg tracking-wider text-white transition-colors hover:bg-white hover:text-[var(--ocean-deep)]">
            Ver Projeto
          </span>
        </a>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-6">
        {/* <div className="mb-4 flex items-center justify-between">
          <span
            className="rounded-md px-2.5 py-1 text-xs font-bold tracking-[0.1em] uppercase"
            style={{
              backgroundColor: `${project.color}18`,
              color: project.color,
              border: `1px solid ${project.color}40`,
            }}
          >
            {project.category}
          </span>
        </div> */}

        <h3 className="mb-2 text-3xl font-medium text-[var(--foreground)]">
          {project.title}
        </h3>
        <p className="mb-3 text-lg leading-relaxed text-[var(--muted-foreground)]">
          {project.description}
        </p>
        {/* <p
          className="mb-4 text-sm font-medium"
          style={{ color: project.color }}
        >
          {project.impact}
        </p> */}

        <div className="mb-6 flex flex-wrap gap-2.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-[var(--ocean-mid)]/30 bg-[var(--ocean-mid)]/5 px-3 py-1.5 text-sm font-medium tracking-wide text-[var(--ocean-deep)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 border-t border-[var(--border)] pt-4">
          <a
            href={project.caseStudy}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--peach)]"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--peach)]"
          >
            <ExternalLink className="h-4 w-4" />
            Ver demonstração
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="relative bg-[var(--sky-pale)] px-6 py-24 md:py-32"
    >
      {/* Decorative elements */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--peach)]/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-16 text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <p className="mb-4 text-2xl tracking-[0.4em] text-[var(--ocean-mid)] uppercase font-bold">
            Portfolio
          </p>
          <h2 className="text-3xl font-medium text-[var(--foreground)] md:text-4xl">
            Projetos pessoais e acadêmicos
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`mt-16 text-center transition-all delay-700 duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <a
            href="https://github.com/annandajacobs"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block overflow-hidden border border-[var(--ocean-mid)] px-8 py-3 text-sm tracking-wider text-[var(--ocean-mid)] uppercase transition-colors hover:text-white"
          >
            <span className="relative z-10">Ver Todos os Projetos</span>
            <div className="absolute inset-0 -translate-x-full bg-[var(--ocean-mid)] transition-transform duration-300 group-hover:translate-x-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
