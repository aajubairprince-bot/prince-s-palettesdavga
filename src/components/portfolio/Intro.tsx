import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Intro = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background pointer-events-none select-none"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-sm sm:text-base text-muted-foreground flex flex-col items-center gap-4"
          >
            <div>
              <span className="text-primary">$</span> init
            </div>
            <div className="flex gap-1 items-center">
              <span className="h-2 w-2 rounded-full bg-syntax-amber animate-pulse" />
              Loading workspace...
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};