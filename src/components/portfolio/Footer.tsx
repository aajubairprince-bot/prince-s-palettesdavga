import { Github, Linkedin, Mail } from "lucide-react";
import { personal } from "@/data/portfolio";

export const Footer = () => (
  <footer className="border-t border-border/60 py-10">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
      <div>© {new Date().getFullYear()} {personal.name}. All rights reserved.</div>
      <div className="text-xs">
        Designed & built by <span className="text-foreground">{personal.name}</span>
      </div>
      <div className="flex gap-3">
        <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-border p-2 transition-colors hover:border-primary/60 hover:text-foreground" aria-label="GitHub"><Github className="h-4 w-4" /></a>
        <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-border p-2 transition-colors hover:border-primary/60 hover:text-foreground" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
        <a href={`mailto:${personal.email}`} className="rounded-lg border border-border p-2 transition-colors hover:border-primary/60 hover:text-foreground" aria-label="Email"><Mail className="h-4 w-4" /></a>
      </div>
    </div>
  </footer>
);