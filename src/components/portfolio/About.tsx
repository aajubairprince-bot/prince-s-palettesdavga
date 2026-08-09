import { motion } from "framer-motion";
import { Section } from "./Section";
import { Counter } from "./Counter";
import { stats } from "@/data/portfolio";
import { Code, Rocket, ShieldCheck, Zap } from "lucide-react";

export const About = () => {
  const statContexts = [
    { desc: "Scaled viral traffic with zero downtime", icon: Zap },
    { desc: "Earned national TV & press coverage", icon: Rocket },
    { desc: "Shipping production systems & AI workflows", icon: Code },
    { desc: "Leading agency squads & media crews", icon: ShieldCheck },
  ];

  return (
    <Section 
      id="about" 
      eyebrow="01 / ABOUT" 
      title="Driven by delivery." 
      subtitle="Bridging engineering rigor with product design and high-velocity shipping."
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-20 items-start mt-6 sm:mt-10">
        
        {/* LEFT: TEXT CONTENT & PHILOSOPHY */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-6 xl:space-y-8">
          <div className="space-y-4 sm:space-y-5 xl:space-y-6 text-sm sm:text-lg xl:text-xl leading-relaxed text-foreground/85">
            <p>
              I'm a full-stack engineer and creative technologist based in Dhaka — co-founder of <strong className="text-foreground font-semibold">Olayo</strong>, agency lead, and product builder. I bridge technical systems architecture with media production and sharp UI execution.
            </p>
            <p>
              From taking products from a raw Figma frame to massive nationwide launches, I own systems end-to-end: Next.js/React frontends, FastAPI/Python backend microservices, PostgreSQL databases, and edge caching mitigation under heavy load.
            </p>
            <p className="text-muted-foreground text-xs sm:text-base xl:text-lg">
              My philosophy is straightforward: high velocity, disciplined architecture, tasteful interaction design, and building software that genuinely delivers value.
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/40 p-4 sm:p-6 xl:p-7 font-mono text-[11px] sm:text-xs xl:text-sm text-muted-foreground">
            <div className="text-primary font-semibold mb-1.5 xl:mb-2">// CORE PRINCIPLE</div>
            <div className="text-foreground/90 italic leading-relaxed">
              "Great software isn't just clean code — it is reliable infrastructure, intuitive UX, and measurable real-world impact."
            </div>
          </div>
        </div>

        {/* RIGHT: KINETIC STATS 2x2 GRID (Spacious on desktop) */}
        <div className="lg:col-span-6 xl:col-span-6">
          <div className="grid grid-cols-2 gap-3.5 sm:gap-5 xl:gap-6">
            {stats.map((stat, i) => {
              const context = statContexts[i] || statContexts[0];
              const Icon = context.icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-4 sm:p-6 xl:p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card active:scale-[0.98] shadow-lg shadow-black/30"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="font-mono text-[10px] sm:text-xs xl:text-sm text-muted-foreground uppercase tracking-widest truncate">
                      {stat.label}
                    </span>
                    <Icon className="h-4 w-4 xl:h-5 xl:w-5 text-muted-foreground/60 transition-colors group-hover:text-primary shrink-0" />
                  </div>

                  <div className="my-1.5 sm:my-3">
                    <span className="font-display text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      <Counter to={stat.value} duration={1600} />{stat.suffix}
                    </span>
                  </div>

                  <p className="mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] xl:text-xs leading-snug text-muted-foreground">
                    {context.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </Section>
  );
};