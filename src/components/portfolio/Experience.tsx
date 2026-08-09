import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { experiences } from "@/data/portfolio";
import { Briefcase, Calendar, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export const Experience = () => {
  const [[active, direction], setActiveState] = useState([0, 0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectJob = (newIndex: number) => {
    if (newIndex === active) return;
    const dir = newIndex > active ? 1 : -1;
    setActiveState([newIndex, dir]);
  };

  const handleNext = () => {
    const nextIndex = (active + 1) % experiences.length;
    selectJob(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (active - 1 + experiences.length) % experiences.length;
    selectJob(prevIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  const activeJob = experiences[active];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 16 : -16,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -16 : 16,
      opacity: 0,
    }),
  };

  return (
    <Section
      id="experience"
      eyebrow="02 / EXPERIENCE"
      title="A non-linear path."
      subtitle="From co-founding ventures and building client systems to leading media production crews — the throughline is shipping."
    >
      <div className="mt-8 sm:mt-12 flex flex-col gap-5 sm:gap-6">
        
        {/* Mobile quick controls bar & counter */}
        <div className="flex items-center justify-between sm:hidden font-mono text-xs text-muted-foreground pb-1">
          <span className="flex items-center gap-1.5 text-primary font-semibold">
            <span>Role 0{active + 1}</span>
            <span className="text-muted-foreground font-normal">/ 0{experiences.length}</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-md border border-border/60 bg-card/80 text-foreground active:scale-95 transition-transform"
              aria-label="Previous experience"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-md border border-border/60 bg-card/80 text-foreground active:scale-95 transition-transform"
              aria-label="Next experience"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* HORIZONTAL EXPERIENCE SELECTOR TRACK */}
        <div 
          ref={scrollRef}
          role="tablist"
          aria-label="Professional Experience selector"
          className="flex gap-2.5 sm:gap-3 xl:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 sm:overflow-visible"
        >
          {experiences.map((job, i) => {
            const isActive = active === i;
            const isCurrent = job.date.toLowerCase().includes("present");
            
            return (
              <button
                key={job.company}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectJob(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={`group relative flex flex-col flex-shrink-0 min-w-[170px] sm:min-w-0 text-left p-3.5 sm:p-4 xl:p-5 rounded-xl xl:rounded-2xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background snap-center active:scale-[0.98] ${
                  isActive
                    ? "border-primary/80 bg-card shadow-lg shadow-primary/5"
                    : "border-border/60 bg-card/40 hover:border-border hover:bg-card/70"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeJobIndicator"
                    className="absolute inset-0 border-2 border-primary rounded-xl xl:rounded-2xl pointer-events-none -m-[1px]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}

                <div className="flex justify-between items-center mb-2 xl:mb-3">
                  <span className={`font-mono text-xs xl:text-sm font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    0{i + 1}
                  </span>
                  {isCurrent ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] xl:text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Active
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] xl:text-xs text-muted-foreground/70">
                      {job.date.split("–")[0].trim().slice(-4)}
                    </span>
                  )}
                </div>
                
                <h4 className={`font-display font-bold text-sm sm:text-base xl:text-lg leading-snug truncate transition-colors ${
                  isActive ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                }`}>
                  {job.company}
                </h4>

                <div className={`text-xs xl:text-sm font-medium truncate mt-0.5 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}>
                  {job.role}
                </div>
                
                <div className="mt-2.5 pt-2 xl:mt-3.5 xl:pt-2.5 border-t border-border/40 font-mono text-[10px] xl:text-xs text-muted-foreground flex items-center gap-1 truncate">
                  <Calendar className="h-3 w-3 xl:h-3.5 xl:w-3.5 shrink-0 text-muted-foreground/60" />
                  <span className="truncate">{job.date}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* DETAIL PANEL WORKSPACE (Expansive 2-Column Split on Desktop) */}
        <div className="rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
          
          {/* Header Bar */}
          <div className="border-b border-border/60 bg-muted/20 px-4 sm:px-6 xl:px-8 py-2.5 sm:py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 xl:h-2.5 xl:w-2.5 rounded-full bg-border" />
                <div className="h-2 w-2 xl:h-2.5 xl:w-2.5 rounded-full bg-border" />
                <div className="h-2 w-2 xl:h-2.5 xl:w-2.5 rounded-full bg-border" />
              </div>
              <span className="ml-2 font-mono text-[11px] sm:text-xs xl:text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-none">
                workspace://experience/<span className="text-foreground">{activeJob.company.toLowerCase().replace(/[^a-z0-9]/g, "_")}</span>.md
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px] xl:text-xs text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-primary shrink-0" />
              <span className="text-foreground/90 font-medium truncate">{activeJob.company}</span>
            </div>
          </div>
          
          {/* Main Detail Body with Directional Animations & 2-Column Desktop Architecture */}
          <div className="p-4 sm:p-8 xl:p-10 min-h-[260px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-6 lg:grid-cols-12 lg:gap-10 xl:gap-14 items-start"
              >
                {/* Left Column: Role Metadata & Timeline */}
                <div className="lg:col-span-4 xl:col-span-4 space-y-4">
                  <div>
                    <h3 className="font-display text-xl sm:text-3xl xl:text-4xl font-bold tracking-tight text-foreground leading-tight">
                      {activeJob.role}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-semibold mt-1 text-sm sm:text-base xl:text-lg">
                      <span>@ {activeJob.company}</span>
                    </div>
                  </div>

                  <div className="font-mono text-[11px] sm:text-xs xl:text-sm text-muted-foreground bg-secondary/40 px-3 py-1.5 rounded-lg border border-border/50 inline-block">
                    {activeJob.date}
                  </div>

                  <div className="hidden lg:block pt-4 border-t border-border/40 font-mono text-xs text-muted-foreground space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-primary font-bold">
                      // ROLE SUMMARY
                    </div>
                    <p className="text-foreground/80 leading-relaxed">
                      Leading technical execution, system architecture, and production delivery for {activeJob.company}.
                    </p>
                  </div>
                </div>
                
                {/* Right Column: Deliverables / Bullets */}
                <div className="lg:col-span-8 xl:col-span-8 lg:border-l lg:border-border/50 lg:pl-8 xl:pl-10 space-y-3.5">
                  <div className="font-mono text-[11px] sm:text-xs xl:text-sm uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <span>Key Deliverables & Responsibilities</span>
                    <span className="h-px flex-1 bg-border/40" />
                  </div>

                  <ul className="space-y-3.5 xl:space-y-4">
                    {activeJob.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 sm:gap-3.5 text-foreground/85 text-xs sm:text-base xl:text-lg leading-relaxed">
                        <span className="mt-1 shrink-0 text-primary">
                          <CheckCircle2 className="h-4 w-4 xl:h-5 xl:w-5" />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Navigation Hints */}
          <div className="border-t border-border/40 bg-muted/10 px-4 sm:px-6 xl:px-8 py-2.5 sm:py-3 font-mono text-[10px] sm:text-[11px] xl:text-xs text-muted-foreground flex items-center justify-between">
            <span className="hidden sm:inline">Use arrow keys or click role cards to inspect</span>
            <span className="text-primary font-medium ml-auto">
              Role {active + 1} of {experiences.length}
            </span>
          </div>

        </div>

      </div>
    </Section>
  );
};