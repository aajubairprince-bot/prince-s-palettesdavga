import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Intro = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl font-bold tracking-tight md:text-5xl"
          >
            <span className="text-gradient">Abdullah Al Jubair Prince</span>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-1/3 h-[2px] max-w-md bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};