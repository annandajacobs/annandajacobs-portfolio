"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Serenity Spa",
    category: "Branding",
    description: "Identidade visual completa para spa de luxo",
    color: "var(--ocean-mid)",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
    tech: ["Figma", "React", "Django"],
  },
  {
    id: 2,
    title: "Horizon Coffee",
    category: "Packaging",
    description: "Design de embalagens artesanais",
    color: "var(--peach)",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
    tech: ["React", "Django", "MongoDB"],
  },
  {
    id: 3,
    title: "Wave Studio",
    category: "Web Design",
    description: "Website minimalista para estúdio criativo",
    color: "var(--ocean-light)",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    tech: ["React", "Django", "MongoDB"],
  },
  {
    id: 4,
    title: "Bloom Botanicals",
    category: "Identity",
    description: "Marca para produtos naturais",
    color: "var(--sunset)",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=600&fit=crop",
    tech: ["React", "Django", "MongoDB"],
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
      className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--muted)] rounded-xl">
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
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"
            }`}
        >
          <span className="text-lg tracking-wider text-white">Ver Projeto</span>
        </div>
      </div>

      {/* Info */}
      <div className="py-6">
        <p
          className="mb-2 text-md tracking-[0.1em] uppercase font-bold"
          style={{ color: project.color }}
        >
          {project.category}
        </p>
        <h3 className="mb-2 text-3xl font-medium text-[var(--foreground)]">
          {project.title}
        </h3>
        <p className="text-lg text-[var(--muted-foreground)]">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full px-2.5 py-0.5 text-base tracking-wide"
              style={{
                backgroundColor: `${project.color}18`,
                color: project.color,
                border: `1px solid ${project.color}40`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>



      {/* Bottom line animation */}
      <div
        className={`absolute bottom-0 left-0 h-px transition-all duration-500 ${isHovered ? "w-full" : "w-0"
          }`}
        style={{ backgroundColor: project.color }}
      />
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
            Trabalhos Selecionados
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
          <button className="group relative overflow-hidden border border-[var(--ocean-mid)] px-8 py-3 text-sm tracking-wider text-[var(--ocean-mid)] uppercase transition-colors hover:text-white">
            <span className="relative z-10">Ver Todos os Projetos</span>
            <div className="absolute inset-0 -translate-x-full bg-[var(--ocean-mid)] transition-transform duration-300 group-hover:translate-x-0" />
          </button>
        </div>
      </div>
    </section>
  );
}
