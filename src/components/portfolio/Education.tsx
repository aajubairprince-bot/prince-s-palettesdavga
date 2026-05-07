import { motion } from "framer-motion";
import { Section } from "./Section";
import { education } from "@/data/portfolio";
import { GraduationCap } from "lucide-react";

export const Education = () => (
  <Section id="education" eyebrow="Education" title="Foundations.">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="glass relative overflow-hidden rounded-3xl p-5 sm:p-8 md:p-12"
    >
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="mb-4 inline-flex rounded-xl border border-primary/30 bg-primary/10 p-3 text-primary">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold sm:text-2xl md:text-3xl">{education.degree}</h3>
          <div className="mt-2 text-primary">{education.school}</div>
          <div className="mt-1 text-sm text-muted-foreground">{education.date}</div>
        </div>
        <div className="md:col-span-5">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Coursework
          </div>
          <div className="flex flex-wrap gap-2">
            {education.coursework.map((c) => (
              <span
                key={c}
                className="rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs font-medium text-foreground/80"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </Section>
);