import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { personal } from "@/data/portfolio";
import portrait from "@/assets/prince.jpg";

const roles = ["Co-Founder.", "Developer.", "Builder."];

export const Hero = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div className="container relative mx-auto grid items-center gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur sm:mb-8 sm:px-4 sm:text-xs"
        >
          <MapPin className="h-3 w-3" />
          {personal.location}
        </motion.div>

        <div className="relative mb-3 h-[1.4em] overflow-hidden font-display text-lg sm:mb-6 sm:text-2xl md:text-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={roles[idx]}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-gradient font-semibold"
            >
              {roles[idx]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tighter sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
        >
          Abdullah Al <br />
          <span className="text-gradient">Jubair Prince</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl"
        >
          {personal.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_40px_-4px_hsl(var(--primary))] sm:flex-none sm:px-6 sm:py-3.5"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary via-accent to-primary transition-transform duration-700 group-hover:translate-x-0" />
            <span className="relative flex items-center gap-2">
              View Projects
            </span>
          </a>
          <a
            href="/Abdullah Al Jubair Prince Resume.pdf"
            download="Abdullah_Al_Jubair_Prince_Resume.pdf"
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card/40 px-4 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-primary/60 hover:bg-card/70 sm:flex-none sm:px-6 sm:py-3.5"
          >
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            Download CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 grid grid-cols-3 gap-2.5 sm:mt-16 sm:max-w-xl sm:gap-4"
        >
          {[
            { v: "100k+", l: "Users" },
            { v: "5M+", l: "Impressions" },
            { v: "4+ yrs", l: "Building" },
          ].map((s) => (
            <div
              key={s.l}
              className="glass rounded-xl px-2.5 py-3 transition-all hover:-translate-y-1 hover:border-primary/50 sm:rounded-2xl sm:px-4 sm:py-4"
            >
              <div className="font-display text-base font-bold sm:text-2xl">{s.v}</div>
              <div className="text-[10px] text-muted-foreground sm:text-xs">{s.l}</div>
            </div>
          ))}
        </motion.div>
        </div>

        {/* Floating portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-first mx-auto w-full max-w-[240px] sm:max-w-sm lg:order-last lg:col-span-5 lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full">
            {/* Glow rings */}
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 blur-3xl opacity-70 animate-pulse-glow" />
            <div className="absolute inset-0 rounded-[1.75rem] border border-primary/30" />

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full"
            >
              <div className="glass relative h-full w-full overflow-hidden rounded-[1.75rem] p-2">
                <img
                  src={portrait}
                  alt={`${personal.name} — portrait`}
                  width={896}
                  height={1152}
                  className="h-full w-full rounded-[1.4rem] object-cover"
                />
                {/* gradient overlay */}
                <div className="pointer-events-none absolute inset-2 rounded-[1.4rem] bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.7 }}
                  className="glass absolute left-2 top-2 flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-medium sm:left-3 sm:top-3 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse-glow" />
                  Online
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.7 }}
                  className="glass absolute bottom-2.5 left-2.5 right-2.5 rounded-xl p-2 sm:bottom-4 sm:left-4 sm:right-4 sm:rounded-2xl sm:p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-display text-xs font-semibold sm:text-sm">{personal.shortName}</div>
                      <div className="text-[8px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">
                        {personal.title}
                      </div>
                    </div>
                    <div className="rounded-lg border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-[8px] font-semibold text-primary sm:px-2 sm:py-1 sm:text-[10px]">
                      v2026
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating accent chips */}
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -right-3 top-10 hidden rounded-2xl px-3 py-2 text-[11px] font-semibold sm:block"
            >
              <div className="text-secondary">{`</>`}</div>
              <div className="text-muted-foreground">React · TS</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, -4, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -left-4 bottom-24 hidden rounded-2xl px-3 py-2 text-[11px] sm:block"
            >
              <div className="font-display text-base font-bold">100k+</div>
              <div className="text-muted-foreground">users shipped</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground sm:bottom-8"
        aria-label="Scroll to about"
      >
        <ArrowDown className="h-5 w-5 animate-scroll-bounce" />
      </motion.a>
    </section>
  );
};