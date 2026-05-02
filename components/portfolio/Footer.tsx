export function Footer() {
  return (
    <footer className="bg-[var(--foreground)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-lg font-medium text-white">ANNANDA JACOBS</p>
            <p className="text-sm text-white/50">Desenvolvedora de Software</p>
          </div>

          <div className="h-px w-full bg-white/10 md:hidden" />

          {/* <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              Privacidade
            </a>
            <a
              href="#"
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              Termos
            </a>
          </div> */}

          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
