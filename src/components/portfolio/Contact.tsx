import { motion } from "framer-motion";
import { Section } from "./Section";
import { personal } from "@/data/portfolio";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to send message.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" eyebrow="Contact">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl font-bold tracking-tighter sm:text-5xl md:text-7xl"
          >
            Let's build <br />
            <span className="text-gradient">something.</span>
          </motion.h2>
          <p className="mt-4 max-w-md text-sm text-muted-foreground sm:mt-6 sm:text-lg">
            Got an idea, a brief, or just want to nerd out about products? My inbox is open.
          </p>

          <div className="mt-10 space-y-3">
            <a
              href={`mailto:${personal.email}`}
              className="glass group flex items-center gap-4 rounded-2xl p-4 transition-all hover:border-primary/60 hover:-translate-y-0.5"
            >
              <div className="rounded-xl bg-primary/15 p-2.5 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="text-sm font-medium">{personal.email}</div>
              </div>
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="glass group flex items-center gap-3 rounded-2xl p-4 transition-all hover:border-primary/60 hover:-translate-y-0.5"
              >
                <Linkedin className="h-5 w-5 text-primary" />
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</div>
                  <div className="truncate text-sm font-medium">{personal.linkedin}</div>
                </div>
              </a>
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="glass group flex items-center gap-3 rounded-2xl p-4 transition-all hover:border-primary/60 hover:-translate-y-0.5"
              >
                <Github className="h-5 w-5 text-primary" />
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">GitHub</div>
                  <div className="truncate text-sm font-medium">{personal.github}</div>
                </div>
              </a>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{personal.location}</span>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={onSubmit}
          className="glass relative space-y-4 rounded-3xl p-5 sm:p-7 lg:col-span-5"
        >
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              placeholder="you@domain.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              placeholder="Tell me about it…"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 sm:px-5 sm:py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_-4px_hsl(var(--primary))] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send message"}
            {!isSubmitting && <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
          </button>
        </motion.form>
      </div>
    </Section>
  );
};