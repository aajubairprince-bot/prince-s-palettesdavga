import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { ArrowUpRight, ChevronDown, ExternalLink, Flame, FolderGit2, Github, Layers, Newspaper, Sparkles } from "lucide-react";
import { projects } from "@/data/portfolio";

export const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const toggleExpand = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  const flagshipProject = projects[0]; // Biriyani Dibe
  const otherProjects = projects.slice(1);
  const primarySecondaryProjects = otherProjects.slice(0, 2); // CampusIQ & Nirapod Dhaka
  const remainingSecondaryProjects = otherProjects.slice(2); // GhostCMO, BiyeShadi, DEKHoo, HMS

  return (
    <Section 
      id="projects" 
      eyebrow="03 / SELECTED WORK" 
      title="Things I've shipped." 
      subtitle="Production systems, AI platforms, and viral digital products engineered with real-world users, scale, and tradeoffs."
    >
      <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-10">
        
        {/* ========================================================= */}
        {/* 1. FLAGSHIP PROJECT HERO SPOTLIGHT (Biriyani Dibe)        */}
        {/* ========================================================= */}
        {flagshipProject && (
          <div className="relative rounded-2xl xl:rounded-3xl border border-primary/40 bg-gradient-to-b from-card to-card/60 p-5 sm:p-8 lg:p-10 xl:p-12 backdrop-blur-xl shadow-2xl shadow-primary/5 transition-all duration-300 hover:border-primary/60">
            
            {/* Top Eyebrow & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[11px] sm:text-xs xl:text-sm font-bold text-primary tracking-widest uppercase">
                  01 / FLAGSHIP PRODUCT
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] xl:text-xs uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                  <Flame className="h-3 w-3 xl:h-3.5 xl:w-3.5 text-primary animate-pulse" />
                  Viral Scale
                </span>
              </div>

              {/* High impact badges */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs xl:text-sm">
                <span className="rounded-lg bg-secondary/80 border border-border/60 px-3 py-1 text-foreground font-semibold">
                  100k+ Users
                </span>
                <span className="rounded-lg bg-secondary/80 border border-border/60 px-3 py-1 text-foreground font-semibold">
                  5M+ Impressions
                </span>
                <span className="rounded-lg bg-secondary/80 border border-border/60 px-3 py-1 text-foreground font-semibold">
                  Edge Mitigated
                </span>
              </div>
            </div>

            {/* Main Spotlight Body */}
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10 xl:gap-14 items-start pt-5 sm:pt-7">
              
              <div className="lg:col-span-8 xl:col-span-8 space-y-4 xl:space-y-6">
                <div>
                  <h3 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                    {flagshipProject.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-lg xl:text-xl font-medium text-primary leading-snug">
                    {flagshipProject.impact}
                  </p>
                </div>

                <p className="text-xs sm:text-base xl:text-lg leading-relaxed text-foreground/85">
                  {flagshipProject.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {flagshipProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] sm:text-xs xl:text-sm px-3 py-1.5 rounded-lg bg-background/80 border border-border/60 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Verified Media */}
              <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-5 lg:border-l lg:border-border/60 lg:pl-8 xl:pl-10">
                
                <div className="flex flex-col gap-3">
                  {flagshipProject.demo !== "#" && (
                    <a
                      href={flagshipProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-mono text-xs xl:text-sm font-bold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] shadow-lg shadow-primary/20"
                    >
                      <span>LAUNCH LIVE PLATFORM</span>
                      <ArrowUpRight className="h-4 w-4 xl:h-5 xl:w-5" />
                    </a>
                  )}

                  <a
                    href={flagshipProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-6 py-3.5 font-mono text-xs xl:text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-card active:scale-[0.98]"
                  >
                    <Github className="h-4 w-4 xl:h-5 xl:w-5" />
                    <span>VIEW REPOSITORY</span>
                  </a>
                </div>

                {/* National Press Coverage */}
                {/* @ts-expect-error mediaLinks on featured project */}
                {flagshipProject.mediaLinks && (
                  <div className="pt-4 border-t border-border/40">
                    <div className="flex items-center gap-1.5 font-mono text-xs xl:text-sm uppercase tracking-widest text-muted-foreground mb-3">
                      <Newspaper className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-primary" />
                      <span>National Press & Media</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 xl:gap-2">
                      {/* @ts-expect-error mediaLinks mapping */}
                      {flagshipProject.mediaLinks.map((link: { name: string; url: string }) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1 font-mono text-[11px] xl:text-xs bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/40 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:text-foreground active:scale-95 transition-all"
                        >
                          <span>{link.name}</span>
                          <ExternalLink className="h-2.5 w-2.5 xl:h-3 xl:w-3 opacity-60 group-hover:opacity-100 group-hover:text-primary" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* 2. SECONDARY SYSTEMS & AI PRODUCTS GRID                   */}
        {/* ========================================================= */}
        <div className="space-y-4">
          
          {/* Primary Secondary Grid (Always visible: CampusIQ & Nirapod Dhaka on mobile, all on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6 xl:gap-8">
            {otherProjects.map((p, i) => {
              const isExpanded = expandedIndex === i;
              const projectNumber = String(i + 2).padStart(2, "0");
              const isHiddenOnMobile = i >= 2 && !showAllMobile;

              return (
                <div 
                  key={p.title}
                  className={`${isHiddenOnMobile ? "hidden sm:flex" : "flex"} group relative flex-col justify-between rounded-2xl border border-border/60 bg-card/50 p-5 sm:p-6 xl:p-8 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card hover:shadow-2xl hover:shadow-black/50`}
                >
                  <div>
                    {/* Top bar: Number & Tag */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="font-mono text-xs xl:text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                        {projectNumber}
                      </span>
                      <span className="font-mono text-[10px] xl:text-xs uppercase tracking-wider font-semibold text-muted-foreground bg-secondary/60 border border-border/50 px-2.5 py-1 rounded-md">
                        {p.tag}
                      </span>
                    </div>

                    {/* Title & One-line Impact */}
                    <h4 className="font-display text-lg sm:text-2xl xl:text-3xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {p.title}
                    </h4>

                    <p className="mt-2 text-xs sm:text-sm xl:text-base font-medium text-foreground/90 leading-snug">
                      {p.impact}
                    </p>

                    {/* Expandable Architecture Description */}
                    <div className="mt-3.5 text-xs xl:text-sm leading-relaxed text-muted-foreground">
                      <p className={isExpanded ? "" : "line-clamp-3"}>
                        {p.description}
                      </p>

                      {p.description.length > 100 && (
                        <button
                          onClick={() => toggleExpand(i)}
                          className="mt-2.5 inline-flex items-center gap-1 font-mono text-[11px] xl:text-xs text-primary hover:underline"
                        >
                          <span>{isExpanded ? "Show less" : "Read architectural details"}</span>
                          <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Footer: Tech Stack & Action Links */}
                  <div className="mt-6 pt-4 border-t border-border/40">
                    <div className="flex flex-wrap gap-1.5 xl:gap-2 mb-4">
                      {p.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] xl:text-xs px-2.5 py-1 rounded-md bg-background/60 border border-border/40 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {p.stack.length > 4 && (
                        <span className="font-mono text-[10px] xl:text-xs px-1.5 py-1 text-muted-foreground/60">
                          +{p.stack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between font-mono text-xs xl:text-sm pt-1">
                      {p.demo !== "#" ? (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-primary active:scale-95 transition-all py-1"
                        >
                          <span>LIVE PREVIEW</span>
                          <ArrowUpRight className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
                        </a>
                      ) : (
                        <span className="font-mono text-[10px] xl:text-xs text-muted-foreground/50">
                          INTERNAL BUILD
                        </span>
                      )}

                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground active:scale-95 transition-all py-1"
                      >
                        <Github className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
                        <span>CODE</span>
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Mobile Interactive Expandable Dropdown / Accordion Trigger */}
          <div className="sm:hidden pt-2">
            <button
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md text-foreground font-mono text-xs hover:border-primary/50 active:scale-[0.98] transition-all shadow-lg"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <FolderGit2 className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-foreground">
                    {showAllMobile ? "Collapse Project Archive" : `View ${remainingSecondaryProjects.length} More Projects`}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {showAllMobile ? "Showing all projects" : "GhostCMO, BiyeShadi, DEKHoo, HMS"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-primary font-semibold">
                <span className="text-[11px]">{showAllMobile ? "[Less]" : `[+${remainingSecondaryProjects.length}]`}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAllMobile ? "rotate-180" : ""}`} />
              </div>
            </button>
          </div>

        </div>

      </div>
    </Section>
  );
};