import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Stats from "@/components/sections/stats";
import ServicesPreview from "@/components/sections/services-preview";
import AgentPreview from "@/components/sections/agent-preview";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <ServicesPreview />
      <AgentPreview />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
