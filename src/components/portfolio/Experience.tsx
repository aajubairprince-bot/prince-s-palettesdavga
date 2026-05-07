import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Section } from "./Section";
import { experiences } from "@/data/portfolio";

export const Experience = () => {
  const [active, setActive] = useState(0);
  const job = experiences[active];

  return (
    <Section id="experience" eyebrow="Experience" title="A non-linear path." subtitle="From co-founding ventures to leading media production crews — the throughline is shipping.">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4 min-w-0">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible lg:pb-0 no-scrollbar">
            {experiences.map((e, i) => (
              <button
                key={e.company}
                onClick={() => setActive(i)}
                className={`group relative flex-shrink-0 rounded-xl border px-4 py-3 text-left transition-all ${
                  active === i
                    ? "border-primary/60 bg-primary/10 shadow-[0_0_30px_-10px_hsl(var(--primary))]"
                    : "border-border bg-card/30 hover:border-border hover:bg-card/60"
                }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="exp-indicator"
                    className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                  />
                )}
                <div className="text-sm font-semibold">{e.company}</div>
                <div className="text-xs text-muted-foreground">{e.date}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-5 sm:p-8 md:p-10"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold sm:text-2xl md:text-3xl">{job.role}</h3>
                <span className="text-sm text-muted-foreground">{job.date}</span>
              </div>
              <div className="mt-1 text-primary font-medium">@ {job.company}</div>
              <ul className="mt-6 space-y-3">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-muted-foreground">
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm sm:text-base leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};