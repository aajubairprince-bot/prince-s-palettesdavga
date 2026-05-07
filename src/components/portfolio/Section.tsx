import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ id, eyebrow, title, subtitle, children, className = "" }: SectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} ref={ref} className={`relative py-16 sm:py-20 md:py-24 ${className}`}>
      <div className="container mx-auto px-5 sm:px-6">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 max-w-3xl sm:mb-16"
          >
            {eyebrow && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-4xl md:text-6xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-sm text-muted-foreground sm:mt-5 sm:text-lg md:text-xl">{subtitle}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};