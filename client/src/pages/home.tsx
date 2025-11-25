import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import SidebarStats from "@/components/layout/sidebar-stats";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import ServicesPreview from "@/components/sections/services-preview";
import AgentPreview from "@/components/sections/agent-preview";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      {/* Top Book Now Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-md" data-testid="top-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center space-x-3">
              <img 
                src="https://iili.io/KEcaJUX.th.png" 
                alt="Provision ExperTax Services Logo" 
                className="h-10 w-auto"
                data-testid="img-logo"
              />
              <div className="text-xl font-bold text-primary hidden sm:block">Provision ExperTax</div>
            </div>
          </Link>
          
          <Link href="/appointments" data-testid="link-book-appointment">
            <Button className="bg-primary text-white hover:bg-primary/90 shadow-md font-semibold">
              Book Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Sidebar Stats */}
      <SidebarStats />

      {/* Main Content - with top margin for fixed header */}
      <div className="pt-16 lg:pr-32">
        <Hero />
        <About />
        <ServicesPreview />
        <AgentPreview />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
