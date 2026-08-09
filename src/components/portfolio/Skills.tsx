import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { skillCategories, SkillCategory } from "@/data/portfolio";
import { Bot, Code, Cpu, Layers, Palette, Sparkles, Terminal, Wrench } from "lucide-react";

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categoryIcons: Record<string, any> = {
    languages: Code,
    engineering: Layers,
    "ai-engineering": Sparkles,
    tools: Wrench,
    creative: Palette,
  };

  const categories = ["All", ...skillCategories.map((c) => c.name)];

  const filteredCategories = activeCategory === "All"
    ? skillCategories
    : skillCategories.filter((c) => c.name === activeCategory);

  return (
    <Section 
      id="skills" 
      eyebrow="04 / TOOLKIT" 
      title="What I build with." 
      subtitle="Engineering systems from raw syntax to full-stack infrastructure and applied artificial intelligence."
    >
      {/* Category Filter Pills with Touch Scroll on Mobile */}
      <div className="mt-6 sm:mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar sm:flex-wrap">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200 shrink-0 active:scale-95 ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary font-semibold shadow-md shadow-primary/20"
                  : "bg-card/60 text-muted-foreground border-border/60 hover:border-border hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 5-Card Grid on Desktop / Snap-friendly Responsive Layout */}
      <div className="mt-5 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 xl:gap-5 items-stretch">
        {filteredCategories.map((category: SkillCategory, idx) => {
          const Icon = categoryIcons[category.id] || Cpu;
          const isAi = category.isAiSpecial;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className={`relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-all duration-300 ${
                isAi
                  ? "border-2 border-primary/60 bg-gradient-to-b from-card via-card to-primary/10 shadow-xl shadow-primary/10 hover:border-primary"
                  : "border border-border/60 bg-card/50 hover:border-border hover:bg-card hover:shadow-xl hover:shadow-black/30"
              }`}
            >
              {/* AI Featured Glow Indicator */}
              {isAi && (
                <div className="absolute -top-3 right-4 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider font-bold text-primary-foreground bg-primary px-2.5 py-0.5 rounded-full shadow-md shadow-primary/30">
                  <Sparkles className="h-2.5 w-2.5" />
                  Applied AI
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-3.5">
                  <div>
                    <span className={`font-mono text-xs xl:text-sm font-bold uppercase tracking-widest ${isAi ? "text-primary" : "text-muted-foreground"}`}>
                      {category.name}
                    </span>
                    <div className="text-[10px] font-mono text-muted-foreground/80 mt-0.5">
                      {category.tag}
                    </div>
                  </div>
                  <div className={`p-1.5 rounded-lg ${isAi ? "bg-primary/20 text-primary" : "bg-muted/40 text-muted-foreground"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* AI Engineering Specialized Sub-sections */}
                {isAi && category.capabilities && category.stack ? (
                  <div className="space-y-3.5">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold mb-2 flex items-center gap-1">
                        <span>// Capabilities</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {category.capabilities.map((item) => (
                          <span
                            key={item}
                            className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-primary/10 border border-primary/30 text-foreground font-medium transition-colors hover:border-primary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/30">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                        // AI Stack & APIs
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {category.stack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] px-2 py-0.5 rounded bg-background/80 border border-border/50 text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard Categories */
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[11px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-background/80 border border-border/50 text-foreground/90 transition-all duration-200 hover:border-primary/50 hover:text-primary active:scale-95"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-border/30 font-mono text-[10px] text-muted-foreground flex justify-between items-center">
                <span>{category.items.length} items</span>
                <span className={isAi ? "text-primary font-semibold" : "text-muted-foreground/80 font-medium"}>
                  {isAi ? "End-to-end" : "Production-ready"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};