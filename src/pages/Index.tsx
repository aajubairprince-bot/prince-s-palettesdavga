import { MeshBackground } from "@/components/portfolio/MeshBackground";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Leadership } from "@/components/portfolio/Leadership";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Intro } from "@/components/portfolio/Intro";
import { Chatbot } from "@/components/portfolio/Chatbot";

const Index = () => (
  <div className="relative min-h-screen bg-background text-foreground">
    <Intro />
    <MeshBackground />
    <Navbar />
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Leadership />
      <Education />
      <Contact />
    </main>
    <Footer />
    <Chatbot />
  </div>
);

export default Index;
