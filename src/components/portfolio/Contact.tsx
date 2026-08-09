import { useState } from "react";
import { Section } from "./Section";
import { personal } from "@/data/portfolio";
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail, Terminal } from "lucide-react";

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <Section id="contact" eyebrow="07 / CONTACT & ENGAGEMENT">
      <div className="py-10 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20 items-center">
          
          {/* Left Column: Heading, Context & Action Triggers */}
          <div className="lg:col-span-6 xl:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs xl:text-sm text-muted-foreground uppercase tracking-widest mb-6 border border-border/60 bg-card/80 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-syntax-green animate-pulse" />
              <span>Available for High-Impact Roles</span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl xl:text-7xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 leading-[1.04]">
              Let's build <br />
              <span className="text-primary">something real.</span>
            </h2>
            
            <p className="max-w-xl text-sm sm:text-lg xl:text-xl text-foreground/80 leading-relaxed mb-8 sm:mb-10">
              Whether you have a complex technical problem to solve, a platform to ship, or an engineering role to fill — my inbox is always open.
            </p>

            {/* Direct Action Links */}
            <div className="w-full max-w-lg flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-3 font-mono text-xs sm:text-sm xl:text-base">
              <a
                href={`mailto:${personal.email}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] shadow-lg shadow-primary/20"
              >
                <Mail className="h-4 w-4 xl:h-5 xl:w-5" />
                <span>SEND EMAIL DIRECTLY</span>
                <ArrowUpRight className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
              </a>
              
              <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex sm:flex-row">
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-card/60 px-4 py-3.5 font-medium text-foreground hover:border-primary/50 hover:bg-card active:scale-95 transition-all text-xs xl:text-sm"
                >
                  <Linkedin className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-primary" />
                  <span>LINKEDIN</span>
                </a>
                
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-card/60 px-4 py-3.5 font-medium text-foreground hover:border-primary/50 hover:bg-card active:scale-95 transition-all text-xs xl:text-sm"
                >
                  <Github className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-primary" />
                  <span>GITHUB</span>
                </a>

                <a
                  href="/Abdullah Al Jubair Prince Resume.pdf"
                  download="Abdullah_Al_Jubair_Prince_Resume.pdf"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-card/60 px-4 py-3.5 font-medium text-foreground hover:border-primary/50 hover:bg-card active:scale-95 transition-all text-xs xl:text-sm"
                >
                  <FileText className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-primary" />
                  <span>RESUME</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Workspace Card */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="w-full rounded-2xl xl:rounded-3xl border border-border/70 bg-card/90 p-5 sm:p-7 xl:p-8 backdrop-blur-xl shadow-2xl shadow-black/50 text-left">
              
              <div className="flex items-center justify-between border-b border-border/40 pb-3 sm:pb-4 mb-4 sm:mb-5">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 xl:h-5 xl:w-5 text-primary" />
                  <span className="font-mono text-xs xl:text-sm font-semibold text-foreground tracking-wider">
                    contact_protocol.sh
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="group inline-flex items-center gap-1.5 font-mono text-xs xl:text-sm text-muted-foreground hover:text-foreground bg-secondary/60 hover:bg-secondary border border-border/50 px-3.5 py-1.5 rounded-lg active:scale-95 transition-all"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-syntax-green" />
                      <span className="text-syntax-green font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <div className="font-mono text-xs sm:text-sm xl:text-base text-foreground/90 space-y-3">
                <div className="text-muted-foreground flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span>echo $CONTACT_ENDPOINT</span>
                </div>
                <div className="font-semibold text-primary pl-4 select-all break-all bg-background/50 p-3 rounded-lg border border-border/40">
                  {personal.email}
                </div>

                <div className="pt-2 text-muted-foreground flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span>status --channel=inbox</span>
                </div>
                <div className="text-foreground/80 pl-4 text-xs xl:text-sm leading-relaxed">
                  ✓ Inbox active · Avg response time: &lt; 24 hours · Dhaka (UTC+6)
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-border/30 font-mono text-[10px] xl:text-xs text-muted-foreground flex justify-between">
                <span>security: tls_encrypted</span>
                <span className="text-primary font-medium">direct_delivery</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};