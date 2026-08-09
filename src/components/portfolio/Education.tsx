import { Section } from "./Section";
import { education } from "@/data/portfolio";
import { BookOpen, GraduationCap } from "lucide-react";

export const Education = () => (
  <Section 
    id="education" 
    eyebrow="06 / ACADEMIC FOUNDATIONS" 
    title="Education & Theory." 
    subtitle="Computer science foundation powering practical software engineering and systems architecture."
  >
    <div className="mt-8 rounded-2xl xl:rounded-3xl border border-border/60 bg-card/40 p-6 sm:p-8 xl:p-10 backdrop-blur-sm shadow-xl shadow-black/30">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
        
        <div className="lg:col-span-7 xl:col-span-7">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] xl:text-xs uppercase tracking-wider font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <GraduationCap className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
              Undergraduate Degree
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl xl:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {education.degree}
          </h3>

          <div className="text-foreground/90 font-medium text-base sm:text-lg xl:text-xl mt-1.5">
            {education.school}
          </div>

          <div className="font-mono text-xs xl:text-sm text-muted-foreground mt-3 flex items-center gap-2">
            <span>Duration:</span>
            <span className="text-foreground font-semibold">{education.date}</span>
          </div>
        </div>
        
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-3.5 lg:border-l lg:border-border/50 lg:pl-8 xl:pl-10">
          <div className="flex items-center gap-2 font-mono text-xs xl:text-sm uppercase tracking-widest text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-primary" />
            <span>Core Theoretical Focus</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {education.coursework.map((course) => (
              <span
                key={course}
                className="font-mono text-xs xl:text-sm px-3.5 py-1.5 rounded-lg bg-background/80 border border-border/50 text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary"
              >
                {course}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  </Section>
);