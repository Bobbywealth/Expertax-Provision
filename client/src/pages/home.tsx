import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
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
      {/* Premium Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl border-b border-primary/10 shadow-lg" data-testid="top-bar">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
          <Link href="/" data-testid="link-home" className="group hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src="https://iili.io/KEcaJUX.th.png" 
                  alt="Provision ExperTax Services Logo" 
                  className="h-8 md:h-10 w-auto relative"
                  data-testid="img-logo"
                />
              </div>
              <div className="text-lg md:text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block tracking-tight">Provision ExperTax</div>
            </div>
          </Link>
          
          <Link href="/appointments" data-testid="link-book-appointment">
            <Button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-xl hover:scale-105 shadow-lg font-bold px-4 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl transition-all duration-300 group text-sm md:text-base">
              Book Now
              <ChevronDown className="ml-1 md:ml-2 h-3 md:h-4 w-3 md:w-4 group-hover:translate-y-0.5 transition-transform duration-300 hidden sm:block" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Sidebar Stats */}
      <SidebarStats />

      {/* Main Content - with top margin for fixed header */}
      <div className="pt-14 md:pt-16 lg:pr-32">
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
