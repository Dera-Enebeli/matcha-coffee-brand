export default function Footer() {
  return (
    <footer
      className="px-6 py-12 md:px-12 lg:px-24"
      style={{
        background: "linear-gradient(180deg, #0d0805 0%, #1a0f0a 100%)",
        borderTop: "1px solid rgba(201,169,110,0.1)",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <p className="text-xl font-[family-name:var(--font-playfair)] font-light tracking-wider text-gold">
            MATCHA
          </p>
          <p className="mt-1 text-sm font-sans font-light text-white/40">
            Where matcha meets coffee.
          </p>
        </div>

        <div className="flex gap-8 text-sm font-sans font-light text-white/50">
          <a
            href="#"
            className="transition-all duration-300 hover:text-gold hover:tracking-wider"
          >
            Instagram
          </a>
          <a
            href="#"
            className="transition-all duration-300 hover:text-gold hover:tracking-wider"
          >
            Twitter
          </a>
          <a
            href="#"
            className="transition-all duration-300 hover:text-gold hover:tracking-wider"
          >
            TikTok
          </a>
        </div>

        <p className="text-xs font-sans font-light text-white/25">
          &copy; {new Date().getFullYear()} MATCHA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
