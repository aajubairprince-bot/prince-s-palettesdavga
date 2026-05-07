import { motion } from "framer-motion";
import { Section } from "./Section";
import { leadership } from "@/data/portfolio";


export const Leadership = () => (
  <Section id="leadership" eyebrow="Leadership & Extras" title="Beyond the keyboard." subtitle="I've actively organized and managed numerous events—from campus hackathons and developer meetups to nationwide brand activations and community initiatives.">
    <div className="grid gap-5 md:grid-cols-3">
      {leadership.map((l, i) => (
        <motion.div
          key={l.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          whileHover={{ y: -4 }}
          className="glass group rounded-2xl p-6 transition-all hover:border-secondary/50 hover:shadow-[0_0_40px_-15px_hsl(var(--secondary)/0.5)]"
        >
          <h3 className="font-display text-lg font-bold leading-tight">{l.title}</h3>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-secondary">
            {l.role}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.description}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);