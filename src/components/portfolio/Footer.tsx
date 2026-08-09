import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { personal } from "@/data/portfolio";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/60 bg-card/20 py-12 sm:py-16">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl 2xl:max-w-[1536px] md:flex-row">
        
        <div className="flex flex-col sm:flex-row items-center gap-3 text-xs xl:text-sm font-mono text-muted-foreground">
          <span className="uppercase tracking-widest">© {new Date().getFullYear()} {personal.name}</span>
          <span className="hidden sm:inline text-border">·</span>
          <span>All systems operational</span>
        </div>
        
        <div className="text-xs xl:text-sm font-mono text-muted-foreground flex items-center gap-2">
          <span>Engineered with Next-gen frontend craft</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href={personal.githubUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="text-muted-foreground transition-colors hover:text-primary p-2 rounded-lg hover:bg-card" 
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4 xl:h-5 xl:w-5" />
          </a>
          <a 
            href={personal.linkedinUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="text-muted-foreground transition-colors hover:text-primary p-2 rounded-lg hover:bg-card" 
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-4 w-4 xl:h-5 xl:w-5" />
          </a>
          <a 
            href={`mailto:${personal.email}`} 
            className="text-muted-foreground transition-colors hover:text-primary p-2 rounded-lg hover:bg-card" 
            aria-label="Send Email"
          >
            <Mail className="h-4 w-4 xl:h-5 xl:w-5" />
          </a>

          <button
            onClick={scrollToTop}
            className="ml-2 inline-flex items-center gap-1.5 font-mono text-xs xl:text-sm text-muted-foreground hover:text-foreground bg-secondary/60 hover:bg-secondary border border-border/50 px-3.5 py-1.5 rounded-lg active:scale-95 transition-all"
            aria-label="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};