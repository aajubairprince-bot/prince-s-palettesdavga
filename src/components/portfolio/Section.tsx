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
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id={id} ref={ref} className={`relative py-12 sm:py-20 md:py-28 overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl 2xl:max-w-[1536px]">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 max-w-4xl xl:max-w-5xl sm:mb-14"
          >
            {eyebrow && (
              <div className="mb-3 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-primary sm:text-muted-foreground flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block sm:hidden" />
                <span>{eyebrow}</span>
              </div>
            )}
            {title && (
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2.5 sm:mt-4 text-xs sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};