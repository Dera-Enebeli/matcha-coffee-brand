"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-32 md:px-12 lg:px-24"
      style={{
        background: [
          "radial-gradient(ellipse at 70% 30%, rgba(74,124,89,0.12) 0%, transparent 60%)",
          "radial-gradient(ellipse at 20% 80%, rgba(201,169,110,0.06) 0%, transparent 50%)",
          "linear-gradient(180deg, #0d0805 0%, #1a0f0a 50%, #0d0805 100%)",
        ].join(","),
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span
            className="text-xs font-sans font-light tracking-[0.35em] uppercase"
            style={{ color: "#c9a96e" }}
          >
            The Menu
          </span>
          <div
            className="mx-auto mt-4 h-[1px] w-8"
            style={{ backgroundColor: "#c9a96e", opacity: 0.4 }}
          />
          <h2
            className="mt-6 font-[family-name:var(--font-playfair)] font-light text-4xl sm:text-5xl"
            style={{ color: "white", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            Crafted blends
          </h2>
          <p
            className="mx-auto mt-4 max-w-md font-sans font-light"
            style={{ color: "rgba(255,255,255,0.7)", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            Every drink is hand-crafted with precision — because you deserve
            more than just caffeine.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <div
              key={product.name}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group cursor-pointer rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                className="mb-6 flex aspect-square items-center justify-center overflow-hidden rounded-xl"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 70%)",
                  border: "1px solid rgba(201,169,110,0.1)",
                }}
              >
                <span
                  className="text-2xl font-[family-name:var(--font-playfair)]"
                  style={{ color: "#c9a96e" }}
                >
                  {product.name === "Original Latte" && "M"}
                  {product.name === "Cold Brew Fusion" && "C"}
                  {product.name === "Matcha Shot" && "S"}
                </span>
              </div>
              <h3
                className="text-xl font-[family-name:var(--font-playfair)] font-light"
                style={{ color: "white", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
              >
                {product.name}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed font-sans font-light"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {product.description}
              </p>
              <p
                className="mt-4 text-lg font-sans font-semibold tracking-wide"
                style={{ color: "#c9a96e" }}
              >
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
