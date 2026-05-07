import { motion } from "framer-motion";
import { Section } from "./Section";
import { Counter } from "./Counter";
import { stats } from "@/data/portfolio";

const tags = [
  "Full-Stack", "React", "TypeScript", "Node.js", "Python",
  "PostgreSQL", "Cloudflare Edge", "Supabase", "Product", "Media Production",
];

export const About = () => (
  <Section id="about" eyebrow="About" title="Engineer, builder, creative.">
    <div className="grid gap-12 md:grid-cols-12 md:gap-16">
      <div className="md:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
        <p>
          I'm a creative technologist based in Dhaka — co-founder, full-stack developer, and product
          builder. I blend engineering with media production to ship work that's both technically
          sound and visually sharp.
        </p>
        <p>
          I've taken products from a Figma file to <span className="text-foreground font-medium">100k+ users</span>{" "}
          and <span className="text-foreground font-medium">5M+ impressions</span>, owned the stack
          end to end, and survived viral traffic spikes with edge-side mitigation. I care about
          velocity, taste, and building things that actually ship.
        </p>

        <div className="flex flex-wrap gap-2 pt-4">
          {tags.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.05 }}
              className="rounded-full border border-border bg-card/40 px-3 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary/60 hover:text-foreground transition-colors"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="md:col-span-5 grid grid-cols-2 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="glass group relative overflow-hidden rounded-2xl p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 transition-all duration-500 group-hover:from-primary/10 group-hover:to-secondary/10" />
            <div className="relative">
              <div className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                <Counter to={s.value} />{s.suffix}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);