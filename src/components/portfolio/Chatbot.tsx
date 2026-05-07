import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import Groq from "groq-sdk";
import { personal, experiences, projects, skills, education } from "@/data/portfolio";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || "YOUR_GROQ_API_KEY",
  dangerouslyAllowBrowser: true,
});

const GREETINGS = [
  "You want the tea on Prince? Ask away. I've got his whole portfolio memorized and zero ability to keep a secret.",
  "Welcome to the inside scoop. I know everything about Prince's skills, projects, and work ethic. What do you want to know?",
  "Looking for the dirt on Prince? Well, I only have his professional highlights, but I'm happy to spill all of them. What are we looking for?",
  "Hi, I'm Prince's AI assistant. He made me memorize his entire portfolio so he could take a nap. How can I help you?",
  "Welcome! I’m the bot that does all of Prince’s talking so he can focus on coding/designing. What do you need to know about him?"
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
- Featured Project: Biriyani Dibe (Viral map with 100k+ users).

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
    // Show chatbot after intro (1.6s)
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
      // Start of cycle: wait 3s before first show
      timeoutId = setTimeout(() => {
        setShowTooltip(true);
        // Stay for 5s
        timeoutId = setTimeout(() => {
          setShowTooltip(false);
          // Hide for 15s then repeat
          timeoutId = setTimeout(runCycle, 15000);
        }, 5000);
      }, 3000);
    };

    runCycle();
    return () => clearTimeout(timeoutId);
  }, [isVisible, isOpen]);

  useEffect(() => {
    // Pick a random greeting on mount
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
          className="fixed bottom-6 right-6 z-[100] flex flex-col items-end"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="mb-4 w-[350px] sm:w-[400px] h-[500px] flex flex-col rounded-3xl glass card-shadow overflow-hidden border border-white/10"
              >
                {/* Header */}
                <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <Bot className="w-6 h-6 text-primary" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight">Prince.exe</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Online</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-5" ref={scrollRef}>
                  <div className="flex flex-col gap-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                          <div className={`mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
                            msg.role === "user" 
                              ? "bg-primary border-primary/20 text-white" 
                              : "bg-white/10 border-white/10 text-muted-foreground"
                          }`}>
                            {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>
                          <div className={`p-3.5 rounded-2xl text-[13px] leading-relaxed ${
                            msg.role === "user" 
                              ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20" 
                              : "bg-white/5 border border-white/10 rounded-tl-none backdrop-blur-sm"
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[85%]">
                          <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-muted-foreground">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className="p-3.5 rounded-2xl text-[13px] bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-2 backdrop-blur-sm">
                            <div className="flex gap-1">
                              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                            </div>
                            <span className="text-muted-foreground italic">Spilling the tea...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-5 border-t border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me something cheeky..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      className="bg-white/5 border-white/10 rounded-xl focus-visible:ring-primary/50 text-sm h-11"
                    />
                    <Button 
                      onClick={handleSend} 
                      disabled={isLoading} 
                      size="icon" 
                      className="rounded-xl shrink-0 w-11 h-11 shadow-lg shadow-primary/20"
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
                  className="absolute bottom-full right-0 mb-4 whitespace-nowrap px-4 py-2 rounded-2xl glass text-[11px] font-bold border border-white/10 shadow-2xl text-primary"
                >
                  Talk to me, I know Prince better than he does!
                  <div className="absolute top-full right-6 w-2 h-2 bg-white/5 backdrop-blur-md border-r border-b border-white/10 rotate-45 -translate-y-1"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`w-15 h-15 rounded-full flex items-center justify-center transition-all duration-500 relative overflow-hidden ${
                isOpen 
                  ? "bg-white/10 border border-white/20 text-white backdrop-blur-2xl" 
                  : "bg-white/5 border border-white/10 text-primary backdrop-blur-xl hover:border-primary/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/5 opacity-50 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
              
              {isOpen ? <X className="w-7 h-7 relative z-10" /> : <MessageCircle className="w-7 h-7 relative z-10 fill-primary/10" />}
              
              {!isOpen && (
                <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
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


