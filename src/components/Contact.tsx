"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    if (!section || !form) return;

    const inputs = form.querySelectorAll("input, textarea, button");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inputs,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden px-6 py-32 md:px-12 lg:px-24"
      style={{
        background: [
          "radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.06) 0%, transparent 60%)",
          "radial-gradient(ellipse at 70% 80%, rgba(74,124,89,0.08) 0%, transparent 50%)",
          "linear-gradient(180deg, #1a0f0a 0%, #0d0805 100%)",
        ].join(","),
      }}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <span
            className="text-xs font-sans font-light tracking-[0.35em] uppercase"
            style={{ color: "#c9a96e" }}
          >
            Get in touch
          </span>
          <div
            className="mx-auto mt-4 h-[1px] w-8"
            style={{ backgroundColor: "#c9a96e", opacity: 0.4 }}
          />
          <h2
            className="mt-6 font-[family-name:var(--font-playfair)] font-light text-4xl sm:text-5xl"
            style={{ color: "white", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            Let&apos;s collaborate
          </h2>
          <p
            className="mx-auto mt-4 max-w-md font-sans font-light"
            style={{ color: "rgba(255,255,255,0.7)", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            Interested in carrying MATCHA or partnering with us? Drop us a
            message.
          </p>
        </div>

        <form ref={formRef} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="w-full rounded-xl border px-5 py-4 text-sm font-sans font-light transition-all duration-300 focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  boxShadow: "0 0 0 1px transparent",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#c9a96e";
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(201,169,110,0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "0 0 0 1px transparent";
                }}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border px-5 py-4 text-sm font-sans font-light transition-all duration-300 focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  boxShadow: "0 0 0 1px transparent",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#c9a96e";
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(201,169,110,0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "0 0 0 1px transparent";
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full resize-none rounded-xl border px-5 py-4 text-sm font-sans font-light transition-all duration-300 focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.1)",
                color: "white",
                boxShadow: "0 0 0 1px transparent",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#c9a96e";
                e.currentTarget.style.boxShadow = "0 0 0 2px rgba(201,169,110,0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.boxShadow = "0 0 0 1px transparent";
              }}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-block rounded-full px-10 py-4 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-lg active:scale-95"
              style={{
                color: "#1a0f0a",
                backgroundColor: "#c9a96e",
                border: "1px solid #c9a96e",
              }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
