"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        left,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      ).fromTo(
        right,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-32 md:px-12 lg:px-24"
      style={{
        background: [
          "radial-gradient(ellipse at 30% 50%, rgba(74,124,89,0.15) 0%, transparent 60%)",
          "radial-gradient(ellipse at 80% 20%, rgba(201,169,110,0.08) 0%, transparent 50%)",
          "linear-gradient(180deg, #1a0f0a 0%, #0d0805 100%)",
        ].join(","),
      }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <div ref={leftRef} className="space-y-6">
          <span
            className="text-xs font-sans font-light tracking-[0.35em] uppercase"
            style={{ color: "#c9a96e" }}
          >
            Our Story
          </span>
          <div
            className="h-[1px] w-8"
            style={{ backgroundColor: "#c9a96e", opacity: 0.4 }}
          />
          <h2
            className="font-[family-name:var(--font-playfair)] font-light leading-tight text-5xl sm:text-6xl"
            style={{ color: "white", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            Two worlds,
            <br />
            <span style={{ color: "#c9a96e" }}>one cup.</span>
          </h2>
          <p
            className="leading-relaxed font-sans font-light max-w-md"
            style={{ color: "rgba(255,255,255,0.8)", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            MATCHA was born from a simple idea: why choose between the
            meditative calm of matcha and the bold energy of coffee?
            <br />
            <br />
            We source ceremonial-grade matcha from Uji, Japan, and
            single-origin Arabica beans from Ethiopia. Together, they
            create something entirely new — a drink that wakes you up
            and grounds you, all at once.
          </p>
        </div>

        <div
          ref={rightRef}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          style={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.1) 0%, transparent 60%)",
              "linear-gradient(135deg, rgba(201,169,110,0.05) 0%, rgba(74,124,89,0.08) 100%)",
            ].join(","),
            border: "1px solid rgba(201,169,110,0.2)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div
                className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full"
                style={{
                  border: "1.5px solid rgba(201,169,110,0.3)",
                  background: "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 70%)",
                }}
              >
                <span
                  className="text-4xl font-[family-name:var(--font-playfair)]"
                  style={{ color: "#c9a96e" }}
                >
                  禅
                </span>
              </div>
              <p
                className="mt-2 text-sm font-sans font-light tracking-wider"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Zen in every sip
              </p>
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
