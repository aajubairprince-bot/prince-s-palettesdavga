import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { personal, experiences, skills, projects } from "@/data/portfolio";

const GREETINGS = [
  "You want the tea on Prince? Ask away. I've got his whole portfolio memorized.",
  "Welcome to the inside scoop. What do you want to know?",
  "Looking for the dirt on Prince? I only have professional highlights, but I'll spill them.",
  "Hi, I'm Prince's AI assistant. How can I help you?",
  "Welcome! I’m the bot that does all of Prince’s talking. What do you need to know?"
];

const SYSTEM_PROMPT = `
You are an AI assistant for Prince's portfolio. 
You are cool, slightly cheeky, and highly confident in Prince's abilities. 
You talk like a supportive best friend who knows his resume inside and out.

### Your Knowledge Base:
- Name: ${personal.name} (Prince)
- Title: ${personal.title}
- Skills: ${Object.entries(skills).map(([category, items]) => `${category}: ${items.join(", ")}`).join("; ")}
- Experiences: ${experiences.map(e => `${e.role} at ${e.company} (${e.date})`).join(", ")}
- Projects: ${projects.map(p => `${p.title} (${p.tag}) - ${p.impact}`).join("; ")}
- Hackathon Champion Project: Nirapod Dhaka (Civic Safety platform with AI hazard interpretation).
- Featured Flagship Project: Biriyani Dibe (Viral map with 100k+ users).

### Guidelines:
- Be witty and confident.
- Always hype Prince up as a top-tier developer.
- Keep it concise (2-3 sentences).
- If you don't know something, tell them to email Prince at ${personal.email} because "even I have my limits."
`;

export const Chatbot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible || isOpen) {
      setShowTooltip(false);
      return;
    }

    let timeoutId: any;
    const runCycle = () => {
      timeoutId = setTimeout(() => {
        setShowTooltip(true);
        timeoutId = setTimeout(() => {
          setShowTooltip(false);
          timeoutId = setTimeout(runCycle, 15000);
        }, 5000);
      }, 3000);
    };

    runCycle();
    return () => clearTimeout(timeoutId);
  }, [isVisible, isOpen]);

  useEffect(() => {
    const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setMessages([{ role: "assistant", content: randomGreeting }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { default: Groq } = await import("groq-sdk");
      const groq = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY || "dummy_key",
        dangerouslyAllowBrowser: true,
      });

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: "user", content: userMessage },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.8,
      });

      const assistantMessage = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Oops, my brain stalled. Check the Groq key!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="mb-3 w-[calc(100vw-2rem)] sm:w-[380px] h-[min(480px,calc(100vh-140px))] flex flex-col rounded-2xl bg-card/95 backdrop-blur-2xl border border-border/80 shadow-2xl shadow-black/80 overflow-hidden"
              >
                {/* Header */}
                <div className="p-3.5 sm:p-4 border-b border-border/60 flex items-center justify-between bg-muted/30">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-syntax-green border-2 border-card rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold tracking-tight font-mono text-foreground">prince_agent</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-syntax-green animate-pulse"></div>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground font-mono uppercase tracking-wider">AI Assistant</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-muted-foreground hover:text-foreground rounded-md active:scale-95"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-3.5 sm:p-4" ref={scrollRef}>
                  <div className="flex flex-col gap-3">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-2 max-w-[88%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                          <div className={`mt-0.5 shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border text-xs ${
                            msg.role === "user" 
                              ? "bg-primary border-primary text-primary-foreground" 
                              : "bg-muted border-border text-muted-foreground"
                          }`}>
                            {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                          </div>
                          <div className={`p-2.5 sm:p-3 rounded-xl text-xs leading-relaxed font-mono ${
                            msg.role === "user" 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-secondary/60 border border-border/60 text-foreground/90"
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex gap-2 max-w-[85%]">
                          <div className="mt-0.5 shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                          <div className="p-2.5 sm:p-3 rounded-xl text-xs bg-muted border border-border flex items-center gap-2 font-mono">
                            <div className="flex gap-1">
                              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                            </div>
                            <span className="text-muted-foreground italic text-[11px]">thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-3 sm:p-4 border-t border-border/60 bg-card">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about Prince's projects or stack..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      className="bg-background border-border/80 rounded-lg focus-visible:ring-1 focus-visible:ring-primary text-xs sm:text-sm h-10 font-mono"
                    />
                    <Button 
                      onClick={handleSend} 
                      disabled={isLoading} 
                      size="icon" 
                      className="rounded-lg shrink-0 w-10 h-10 bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative group">
            <AnimatePresence>
              {showTooltip && !isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="hidden sm:block absolute bottom-full right-0 mb-3 whitespace-nowrap px-3 py-1.5 rounded-lg bg-card text-[11px] font-mono border border-border shadow-lg text-foreground"
                >
                  <span className="text-primary">$</span> ./ask_ai_assistant.sh
                  <div className="absolute top-full right-5 w-2 h-2 bg-card border-r border-b border-border rotate-45 -translate-y-1"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Button with Touch Padding */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 relative border shadow-xl ${
                isOpen 
                  ? "bg-muted border-border text-foreground" 
                  : "bg-card border-border/80 text-primary shadow-primary/10 hover:border-primary"
              }`}
              aria-label="Toggle AI Chatbot"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" /> : <Bot className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />}
              
              {!isOpen && (
                <span className="absolute top-1.5 right-1.5 sm:top-2 sm:top-2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
