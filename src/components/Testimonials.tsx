"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
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
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-32 md:px-12 lg:px-24"
      style={{
        background: [
          "radial-gradient(ellipse at 50% 20%, rgba(201,169,110,0.08) 0%, transparent 60%)",
          "radial-gradient(ellipse at 80% 80%, rgba(74,124,89,0.1) 0%, transparent 50%)",
          "linear-gradient(180deg, #0d0805 0%, #1a0f0a 100%)",
        ].join(","),
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span
            className="text-xs font-sans font-light tracking-[0.35em] uppercase"
            style={{ color: "#c9a96e" }}
          >
            Testimonials
          </span>
          <div
            className="mx-auto mt-4 h-[1px] w-8"
            style={{ backgroundColor: "#c9a96e", opacity: 0.4 }}
          />
          <h2
            className="mt-6 font-[family-name:var(--font-playfair)] font-light text-4xl sm:text-5xl"
            style={{ color: "white", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            What they say
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="relative rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(4px)",
              }}
            >
              <svg
                className="mb-4 h-8 w-8"
                style={{ color: "rgba(201,169,110,0.3)" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p
                className="leading-relaxed font-sans font-light"
                style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                className="mt-6 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p
                  className="font-sans font-semibold"
                  style={{ color: "#c9a96e" }}
                >
                  {t.author}
                </p>
                <p
                  className="mt-0.5 text-sm font-sans font-light"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
