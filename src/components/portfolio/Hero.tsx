import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Award, Flame, Sparkles } from "lucide-react";
import { personal } from "@/data/portfolio";
import { defaultTransition } from "@/lib/motion";

const ROTATING_TITLES = [
  "Software Developer",
  "AI-Native Full-Stack Developer",
  "Backend Engineer",
  "AI Engineer",
  "Product Builder",
  "Co-Founder",
];

export const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-12 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32"
    >
      <div className="container relative mx-auto grid items-center gap-8 sm:gap-12 lg:gap-14 xl:gap-20 px-4 sm:px-6 lg:px-8 xl:px-12 lg:grid-cols-12 max-w-7xl 2xl:max-w-[1536px]">
        
        {/* LEFT: TYPOGRAPHIC EDITORIAL HERO (Visible first on mobile & left on desktop) */}
        <div className="lg:col-span-7 xl:col-span-7 z-10 flex flex-col justify-center">
          
          {/* Name Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-3 sm:mb-5 font-mono text-xs sm:text-sm xl:text-base text-muted-foreground tracking-wide font-medium"
          >
            <span>{personal.name}</span>
          </motion.div>

          {/* Core Display Heading with Mobile & Desktop Art Direction */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.75rem] 2xl:text-[6.5rem] font-bold leading-[1.08] sm:leading-[1.02] tracking-tight text-foreground"
          >
            Engineer, builder, <br />
            <span className="text-primary">creative.</span>
          </motion.h1>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 sm:mt-6 max-w-2xl xl:max-w-3xl text-sm sm:text-lg md:text-xl xl:text-2xl leading-relaxed text-foreground/80 font-normal"
          >
            {personal.tagline} Shipping resilient web platforms, AI applications, and digital experiences.
          </motion.p>

          {/* CTAs - Side-by-Side on all viewports */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...defaultTransition, delay: 0.4 }}
            className="mt-6 sm:mt-10 flex flex-row items-center flex-wrap gap-2.5 sm:gap-4 font-mono text-xs sm:text-sm xl:text-base"
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-foreground px-4 sm:px-6 py-3 sm:py-3.5 xl:py-4 font-semibold text-background transition-all duration-200 hover:bg-primary hover:text-primary-foreground active:scale-[0.98] shadow-md whitespace-nowrap"
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="/Abdullah Al Jubair Prince Resume.pdf"
              download="Abdullah_Al_Jubair_Prince_Resume.pdf"
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-border/80 bg-card/60 px-4 sm:px-6 py-3 sm:py-3.5 xl:py-4 font-medium text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:text-foreground active:scale-[0.98] whitespace-nowrap"
            >
              <span>Download Resume</span>
              <span className="text-[10px] sm:text-[11px] xl:text-xs text-primary font-mono">[PDF]</span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT: PORTRAIT SHOWCASE (Natural flow on mobile, right column on desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5 xl:col-span-5 flex flex-col items-center"
        >
          <div className="group relative w-full max-w-[380px] xs:max-w-[420px] sm:max-w-[480px] lg:max-w-[460px] xl:max-w-[520px] aspect-[4/5] max-h-[500px] sm:max-h-[560px] lg:max-h-[600px] xl:max-h-[640px] rounded-3xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/60 transition-all duration-500 hover:border-primary/50 hover:shadow-primary/10">
            
            {/* Portrait Photo */}
            <img
              src="/portrait.jpg"
              alt="Abdullah Al Jubair Prince"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="eager"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.indexOf("portrait.jpg") !== -1) {
                  target.src = "/prince.jpg";
                }
              }}
            />
          </div>

          {/* Dynamic Rotating Title Under Image */}
          <div className="mt-2.5 w-full max-w-[380px] xs:max-w-[420px] sm:max-w-[480px] lg:max-w-[460px] xl:max-w-[520px] flex items-center justify-end text-right px-1 h-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING_TITLES[titleIndex]}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -7 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-[10px] sm:text-[11px] text-primary font-medium tracking-wide whitespace-nowrap inline-block"
              >
                {ROTATING_TITLES[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>

      {/* Subtle bottom scroll arrow */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
        aria-label="Scroll down to About"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
          Explore
        </span>
        <ArrowDown className="h-3.5 w-3.5 animate-scroll-bounce text-muted-foreground group-hover:text-primary transition-colors" />
      </motion.a>
    </section>
  );
};