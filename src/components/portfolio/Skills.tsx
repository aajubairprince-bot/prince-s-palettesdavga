import { motion } from "framer-motion";
import { Section } from "./Section";
import { skills } from "@/data/portfolio";
import { Code2, Layers, Wrench, Palette } from "lucide-react";

const icons = {
  Languages: Code2,
  Frameworks: Layers,
  Tools: Wrench,
  Creative: Palette,
};

export const Skills = () => (
  <Section id="skills" eyebrow="Toolkit" title="What I build with." subtitle="A pragmatic stack — chosen for speed, scale, and shipping.">
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Object.entries(skills).map(([cat, items], idx) => {
        const Icon = icons[cat as keyof typeof icons];
        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="glass group relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-all hover:border-primary/40"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border border-primary/30 bg-primary/10 p-2.5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base sm:text-lg font-semibold">{cat}</h3>
            </div>
            <ul className="space-y-2.5">
              {items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 + i * 0.05 }}
                  className="group/item relative"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/85 transition-colors group-hover/item:text-foreground">
                      {item}
                    </span>
                  </div>
                  <div className="mt-1.5 h-[2px] w-full overflow-hidden rounded-full bg-border">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${65 + ((i * 17) % 30)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
                    />
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  </Section>
);