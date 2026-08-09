export const defaultTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

export const springTransition = { type: "spring", stiffness: 300, damping: 30 } as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

