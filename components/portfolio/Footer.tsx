import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--foreground)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-lg font-medium text-white">ANNANDA JACOBS</p>
            <p className="text-sm text-white/50">Desenvolvedora Full-Stack</p>
          </div>

          <div className="h-px w-full bg-white/10 md:hidden" />

          <div className="flex items-center gap-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=annandajacobs@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="text-white/50 transition-colors hover:text-[var(--peach)]"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/annanda-jacobs-166649278"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/50 transition-colors hover:text-[var(--peach)]"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/annandajacobs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/50 transition-colors hover:text-[var(--peach)]"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          <p className="text-sm text-white/90">
            &copy; {new Date().getFullYear()} Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
