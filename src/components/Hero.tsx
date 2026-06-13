"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 240;
const CANVAS_BG = "#f5f5f7";

function pad(n: number): string {
  return n.toString().padStart(3, "0");
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0.6]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];

    if (!canvas || !ctx || !img) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = CANVAS_BG;
    ctx.fillRect(0, 0, width, height);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let renderWidth = width;
    let renderHeight = height;
    let xOffset = 0;
    let yOffset = 0;

    if (canvasRatio > imgRatio) {
      renderWidth = width;
      renderHeight = width / imgRatio;
      yOffset = (height - renderHeight) / 2;
    } else {
      renderHeight = height;
      renderWidth = height * imgRatio;
      xOffset = (width - renderWidth) / 2;
    }

    ctx.drawImage(img, xOffset, yOffset, renderWidth, renderHeight);
  };

  useEffect(() => {
    let loadedCount = 0;
    const imagesArray: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();

      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = imagesArray;
          setImagesLoaded(true);
          renderFrame(0);
        }
      };

      img.src = `/frames-4k/ezgif-frame-${pad(i)}.webp`;
      imagesArray.push(img);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!imagesLoaded) return;

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(latest * TOTAL_FRAMES)
    );

    requestAnimationFrame(() => renderFrame(frameIndex));

    if (latest < 0.2) {
      setCurrentSection(0);
    } else if (latest < 0.45) {
      setCurrentSection(1);
    } else if (latest < 0.75) {
      setCurrentSection(2);
    } else {
      setCurrentSection(3);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      const currentProgress = scrollYProgress.get();
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(currentProgress * TOTAL_FRAMES)
      );
      renderFrame(frameIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollYProgress]);

  const boldText = "font-[family-name:var(--font-playfair)] font-light leading-none text-white";
  const lightText = "font-sans font-light text-white/60";
  const gold = "#c9a96e";

  const ease = [0.22, 1, 0.36, 1] as const;

  const fromLeft = (delay = 0) => ({
    initial: { x: -160, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { delay, duration: 0.7, ease },
  });

  const fromRight = (delay = 0) => ({
    initial: { x: 160, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { delay, duration: 0.7, ease },
  });

  const fadeCenter = (delay = 0) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease },
  });

  const fromBottom = (delay = 0) => ({
    initial: { y: 80, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay, duration: 0.7, ease },
  });

  const sectionExit = { opacity: 0, y: -50 };

  return (
    <div ref={containerRef} className="relative h-[500dvh] w-full bg-[#1a0f0a]">
      <div className="sticky top-0 h-dvh w-full overflow-hidden select-none pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse at 60% 40%, rgba(74,124,89,0.25) 0%, transparent 70%)",
              "radial-gradient(ellipse at 20% 80%, rgba(201,169,110,0.12) 0%, transparent 50%)",
              "linear-gradient(135deg, #2c1810 0%, #1a0f0a 50%, #0d0805 100%)",
            ].join(","),
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(201,169,110,0.15) 0%, transparent 40%)",
          }}
        />

        <canvas ref={canvasRef} className="absolute inset-0 block" style={{ zIndex: 1 }} />

        <motion.div
          className="absolute inset-0"
          style={{ opacity: vignetteOpacity, zIndex: 5 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </motion.div>

        <div className="absolute inset-0 z-10 pointer-events-auto">
          <AnimatePresence mode="wait">
            {currentSection === 0 && (
              <motion.div
                key="sec-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={sectionExit}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                  className="text-lg md:text-3xl leading-none mb-2"
                  style={{ color: gold }}
                >
                  &#9733;
                </motion.span>

                <motion.h1
                  {...fromLeft(0.2)}
                  className={`${boldText} text-[clamp(3rem,20vw,14rem)]`}
                  style={{ textShadow: "0 2px 30px rgba(0,0,0,0.3)" }}
                >
                  MATCHA
                </motion.h1>

                <motion.p
                  {...fromBottom(0.4)}
                  className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] tracking-[0.35em] text-white/80 uppercase font-sans max-w-[280px] sm:max-w-md font-light"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
                >
                  Ceremonial-grade matcha meets single-origin coffee
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease }}
                  className="mt-6 sm:mt-8 h-[1px] w-12 origin-left"
                  style={{ backgroundColor: gold, opacity: 0.4 }}
                />
              </motion.div>
            )}

            {currentSection === 1 && (
              <motion.div
                key="sec-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={sectionExit}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-6 md:px-12 md:max-w-2xl"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "1.5rem" }}
                  transition={{ delay: 0.05, duration: 0.6, ease }}
                  className="h-[2px] mb-6 sm:mb-8"
                  style={{ backgroundColor: gold }}
                />

                <motion.p
                  {...fromLeft(0.15)}
                  className={`${boldText} font-light italic text-[clamp(1.6rem,9vw,5rem)]`}
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
                >
                  Uji, Japan
                </motion.p>

                <motion.p
                  {...fromRight(0.3)}
                  className={`${boldText} font-normal text-[clamp(1.2rem,6vw,3.5rem)] -mt-1 sm:-mt-2 md:-mt-4`}
                  style={{ color: gold, textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
                >
                  Eight Centuries
                </motion.p>

                <motion.p
                  {...fromBottom(0.5)}
                  className="mt-4 sm:mt-5 text-sm md:text-base text-white/85 leading-relaxed font-sans w-full max-w-md font-light"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
                >
                  For over 800 years, matcha has been stone-ground, shade-grown,
                  and perfected with unwavering precision. From mist-covered
                  hills to your morning ritual &mdash; now, reimagined.
                </motion.p>
              </motion.div>
            )}

            {currentSection === 2 && (
              <motion.div
                key="sec-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={sectionExit}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6"
              >
                <motion.p
                  {...fromLeft(0.1)}
                  className={`${boldText} text-[clamp(2.2rem,16vw,10rem)]`}
                  style={{ textShadow: "0 2px 30px rgba(0,0,0,0.3)" }}
                >
                  ANCIENT
                </motion.p>

                <motion.p
                  {...fromRight(0.25)}
                  className={`${boldText} font-normal text-[clamp(2.2rem,16vw,10rem)] -mt-2 sm:-mt-4 md:-mt-6`}
                  style={{ color: gold, opacity: 0.7, textShadow: "0 2px 30px rgba(0,0,0,0.3)" }}
                >
                  MODERN
                </motion.p>

                <motion.p
                  {...fromBottom(0.5)}
                  className="mt-4 sm:mt-6 text-sm md:text-base text-white/85 leading-relaxed font-sans max-w-[260px] sm:max-w-sm font-light"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
                >
                  Eight centuries of tradition, reimagined for today.
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.65, duration: 0.8, ease }}
                  className="mt-6 sm:mt-8 h-[1px] w-12 origin-left"
                  style={{ backgroundColor: gold, opacity: 0.3 }}
                />
              </motion.div>
            )}

            {currentSection === 3 && (
              <motion.div
                key="sec-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={sectionExit}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6"
              >
                <motion.span
                  {...fromBottom(0.15)}
                  className="text-[10px] sm:text-xs md:text-sm tracking-[0.35em] text-white/70 uppercase font-sans font-light"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
                >
                  Taste the
                </motion.span>

                <motion.h2
                  {...fromRight(0.3)}
                  className={`${boldText} text-[clamp(2.4rem,18vw,10rem)]`}
                  style={{ textShadow: "0 2px 30px rgba(0,0,0,0.3)" }}
                >
                  Difference
                </motion.h2>

                <motion.p
                  {...fadeCenter(0.5)}
                  className="mt-3 sm:mt-4 text-sm md:text-base text-white/85 font-sans max-w-[240px] sm:max-w-xs font-light"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
                >
                  Where tradition meets energy. In every cup.
                </motion.p>

                <motion.button
                  {...fromBottom(0.7)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 sm:mt-8 px-8 sm:px-10 py-3 sm:py-4 text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-lg active:scale-95 pointer-events-auto"
                  style={{
                    color: "#1a0f0a",
                    backgroundColor: gold,
                    border: `1px solid ${gold}`,
                    textShadow: "none",
                  }}
                >
                  Buy Now
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
