import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/portfolio";

const links = [
  { href: "#about", id: "about", label: "About", num: "01" },
  { href: "#experience", id: "experience", label: "Experience", num: "02" },
  { href: "#projects", id: "projects", label: "Selected Work", num: "03" },
  { href: "#skills", id: "skills", label: "Toolkit", num: "04" },
  { href: "#leadership", id: "leadership", label: "Extras", num: "05" },
  { href: "#education", id: "education", label: "Education", num: "06" },
  { href: "#contact", id: "contact", label: "Contact", num: "07" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["contact", "education", "leadership", "skills", "projects", "experience", "about"];
      const scrollPosition = window.scrollY + 180;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
      if (window.scrollY < 180) {
        setActiveSection("");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3 shadow-lg shadow-black/50"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl 2xl:max-w-[1536px]">
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
            aria-label="Prince Portfolio Home"
          >
            <img
              src="/logo.png"
              alt="Prince Logo"
              className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-card/60 border border-border/40 p-1.5 rounded-full backdrop-blur-md">
            {links.map((l) => {
              const isActive = activeSection === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative px-3.5 lg:px-4 py-1.5 text-xs font-mono tracking-wider transition-colors duration-200 rounded-full ${
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 bg-primary/20 border border-primary/40 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-foreground bg-secondary/80 hover:bg-secondary border border-border/60 hover:border-primary/40 px-4 py-2 rounded-full transition-all duration-200"
            >
              <span>Get in touch</span>
              <span className="text-primary">→</span>
            </a>

            {/* Touch-first Mobile Hamburger */}
            <div className="md:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg h-10 w-10 border border-border/60 bg-card/80 text-foreground active:scale-95 transition-transform"
                    aria-label="Open Navigation Menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-background/98 backdrop-blur-2xl border-l border-border/80 w-[300px] p-6 flex flex-col justify-between overflow-y-auto"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-border/50">
                      <div>
                        <SheetTitle className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                          // NAVIGATE
                        </SheetTitle>
                        <p className="text-[11px] font-mono text-muted-foreground">Abdullah Al Jubair Prince</p>
                      </div>
                    </div>

                    {/* Links List with 48px min touch targets */}
                    <div className="flex flex-col gap-1.5 mt-6">
                      {links.map((l) => {
                        const isActive = activeSection === l.id;
                        return (
                          <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-between min-h-[46px] px-3.5 py-2.5 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-primary/15 border border-primary/40 text-primary font-semibold"
                                : "text-foreground/80 hover:bg-card hover:text-foreground border border-transparent"
                            }`}
                          >
                            <span className="font-display text-sm tracking-tight">{l.label}</span>
                            <span className="font-mono text-xs text-muted-foreground">{l.num}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="pt-6 border-t border-border/50 space-y-4">
                    <a
                      href="/Abdullah Al Jubair Prince Resume.pdf"
                      download="Abdullah_Al_Jubair_Prince_Resume.pdf"
                      onClick={() => setMobileOpen(false)}
                      className="w-full inline-flex items-center justify-center font-mono text-xs bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/20"
                    >
                      Download Resume (.PDF)
                    </a>

                    <div className="flex items-center justify-around pt-2">
                      <a
                        href={`mailto:${personal.email}`}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Email Prince"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <a
                        href={personal.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={personal.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};