import { motion } from "framer-motion";

export const MeshBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 mesh-bg animate-mesh" />
    <motion.div
      className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-primary/20 blur-[140px]"
      animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-secondary/15 blur-[140px]"
      animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,hsl(var(--background))_70%)]" />
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);