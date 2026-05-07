import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Section } from "./Section";
import { projects } from "@/data/portfolio";

export const Projects = () => (
  <Section id="projects" eyebrow="Selected Work" title="Things I've shipped." subtitle="A small set of products with real users, real impact, and real tradeoffs.">
    <div className="grid auto-rows-[minmax(280px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <motion.article
          key={p.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className={`group glass relative flex flex-col overflow-hidden rounded-3xl p-5 sm:p-7 transition-all hover:border-primary/50 hover:shadow-[0_0_60px_-15px_hsl(var(--primary)/0.5)] ${
            p.size === "lg" ? "lg:col-span-2 lg:row-span-2" : ""
          }`}
        >
          <div className="pointer-events-none absolute -top-1/2 -right-1/2 h-full w-full bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative flex items-start justify-between">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {p.tag}
            </span>
            <div className="flex gap-2">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} GitHub`}
                className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} demo`}
                className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <h3
            className={`relative mt-6 font-display font-bold tracking-tight ${
              p.size === "lg" ? "text-3xl sm:text-4xl md:text-6xl" : "text-xl sm:text-2xl md:text-3xl"
            }`}
          >
            {p.title}
          </h3>

          <p
            className={`relative mt-3 font-medium ${
              p.size === "lg" ? "text-base sm:text-lg text-foreground/90" : "text-sm text-foreground/80"
            }`}
          >
            {p.impact}
          </p>

          <p
            className={`relative mt-3 text-muted-foreground ${
              p.size === "lg" ? "max-w-2xl text-sm sm:text-base leading-relaxed" : "text-sm leading-relaxed"
            }`}
          >
            {p.description}
          </p>

          {/* Media Links */}
          {/* @ts-expect-error - mediaLinks might not be present on all inferred project types */}
          {p.mediaLinks && p.mediaLinks.length > 0 && (
            <div className="relative mt-5 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Featured on:</span>
              {p.mediaLinks.map((link: { name: string; url: string }) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/40"
                >
                  {link.name}
                  <ArrowUpRight className="h-3 w-3 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
              <span className="text-[10px] font-medium text-muted-foreground/60 italic ml-1">
                & many more...
              </span>
            </div>
          )}

          <div className="relative mt-auto flex flex-wrap gap-1.5 pt-6">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-background/50 px-2 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  </Section>
);