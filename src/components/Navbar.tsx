"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.3);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const gold = "#c9a96e";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(13, 8, 5, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(201, 169, 110, 0.1)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-12 lg:px-24">
        <a
          href="#"
          className="text-xl font-[family-name:var(--font-playfair)] font-light tracking-wider"
          style={{ color: gold }}
        >
          MATCHA
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-sans font-light tracking-wider uppercase transition-all duration-300 hover:text-[#c9a96e]"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="rounded-full px-6 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-lg active:scale-95"
            style={{
              color: "#1a0f0a",
              backgroundColor: gold,
            }}
          >
            Buy Now
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-5 transition-all"
            style={{ backgroundColor: gold }}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-[1.5px] w-5 transition-all"
            style={{ backgroundColor: gold }}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-5 transition-all"
            style={{ backgroundColor: gold }}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-16 border-t md:hidden"
            style={{
              backgroundColor: "rgba(13, 8, 5, 0.98)",
              borderColor: "rgba(201, 169, 110, 0.1)",
            }}
          >
            <div className="flex flex-col gap-4 px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="py-2 text-sm font-sans font-light tracking-wider uppercase transition-all duration-300 hover:text-[#c9a96e]"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: navLinks.length * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-4 inline-block self-start rounded-full px-8 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-300"
                style={{
                  color: "#1a0f0a",
                  backgroundColor: gold,
                }}
              >
                Buy Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
