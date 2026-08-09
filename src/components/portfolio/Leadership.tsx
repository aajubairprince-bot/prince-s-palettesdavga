import { useState, useRef, useEffect } from "react";
import { Section } from "./Section";
import { leadership } from "@/data/portfolio";
import { Award, ChevronLeft, ChevronRight, Compass, Film, Radio, Users, Video } from "lucide-react";

export const Leadership = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const icons = [Video, Award, Compass, Radio, Users, Radio];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const newIndex = Math.round(scrollLeft / (offsetWidth * 0.85));
    if (newIndex >= 0 && newIndex < leadership.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const targetCard = scrollRef.current.children[index] as HTMLElement;
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setActiveIndex(index);
    }
  };

  return (
    <Section 
      id="leadership" 
      eyebrow="05 / EXTRAS & PRODUCTION" 
      title="Beyond the keyboard." 
      subtitle="Leading high-stakes nationwide media productions, brand activations, creative campaigns, and community non-profits."
    >
      <div className="mt-8 sm:mt-12">
        
        {/* ========================================================= */}
        {/* MOBILE VIEW: APP-LIKE SWIPEABLE PRODUCTION REEL CAROUSEL   */}
        {/* ========================================================= */}
        <div className="sm:hidden space-y-4">
          
          {/* Top Reel Counter & Controls */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <Film className="h-3.5 w-3.5 text-primary" />
              <span className="font-semibold text-foreground">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(leadership.length).padStart(2, "0")} CREDITS</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="p-1.5 rounded-lg border border-border/60 bg-card/60 text-muted-foreground disabled:opacity-30 disabled:pointer-events-none hover:text-foreground active:scale-95 transition-all"
                aria-label="Previous credit"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToIndex(Math.min(leadership.length - 1, activeIndex + 1))}
                disabled={activeIndex === leadership.length - 1}
                className="p-1.5 rounded-lg border border-border/60 bg-card/60 text-muted-foreground disabled:opacity-30 disabled:pointer-events-none hover:text-foreground active:scale-95 transition-all"
                aria-label="Next credit"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Snap Track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3.5 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory no-scrollbar -mx-4 px-4"
          >
            {leadership.map((l, i) => {
              const Icon = icons[i % icons.length];
              const number = String(i + 1).padStart(2, "0");

              return (
                <div
                  key={l.title}
                  className="w-[85vw] xs:w-[80vw] shrink-0 snap-center flex flex-col justify-between rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-md shadow-xl transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-primary">
                        {number}
                      </span>
                      <Icon className="h-4 w-4 text-muted-foreground/80" />
                    </div>

                    <h3 className="font-display text-base font-bold leading-snug text-foreground">
                      {l.title}
                    </h3>

                    <div className="mt-1 font-mono text-xs font-semibold text-primary">
                      {l.role}
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-foreground/80">
                      {l.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-2.5 border-t border-border/30 font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                    <span>Execution & Leadership</span>
                    <span className="text-primary font-semibold">Credit {number}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dot Track */}
          <div className="flex justify-center items-center gap-1.5 pt-1">
            {leadership.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

        {/* ========================================================= */}
        {/* DESKTOP / TABLET VIEW: FULL 3-COLUMN WIDE GRID            */}
        {/* ========================================================= */}
        <div className="hidden sm:grid gap-4 sm:gap-6 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((l, i) => {
            const Icon = icons[i % icons.length];
            const number = String(i + 1).padStart(2, "0");

            return (
              <div
                key={l.title}
                className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 xl:p-8 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card hover:shadow-2xl hover:shadow-black/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="font-mono text-xs xl:text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                      {number}
                    </span>
                    <Icon className="h-4 w-4 xl:h-5 xl:w-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                  </div>

                  <h3 className="font-display text-base sm:text-lg xl:text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {l.title}
                  </h3>

                  <div className="mt-1.5 font-mono text-xs xl:text-sm font-semibold text-primary">
                    {l.role}
                  </div>

                  <p className="mt-3.5 text-xs sm:text-sm xl:text-base leading-relaxed text-foreground/80">
                    {l.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border/30 font-mono text-[10px] xl:text-xs uppercase tracking-wider text-muted-foreground">
                  Execution & Leadership
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </Section>
  );
};