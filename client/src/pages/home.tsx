import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown, Phone } from "lucide-react";
import Footer from "@/components/layout/footer";
import SidebarStats from "@/components/layout/sidebar-stats";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import ServicesPreview from "@/components/sections/services-preview";
import AgentPreview from "@/components/sections/agent-preview";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/cta";

export default function Home() {
  const [location] = useLocation();
  const loginUrl = "https://ststaxrepair.org/client-login?_office=provisionexpertax";
  // Keep in sync with footer until you confirm a final business number
  const callHref = "tel:+17863522038";
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/agents", label: "Our Team" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      {/* Premium Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl border-b border-primary/10 shadow-lg" data-testid="top-bar">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-12 sm:h-13 md:h-16 flex items-center justify-between gap-2">
          <Link href="/" data-testid="link-home" className="group hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src="https://iili.io/KEcaJUX.th.png" 
                  alt="Provision ExperTax Services Logo" 
                  className="h-6 sm:h-7 md:h-10 w-auto relative"
                  data-testid="img-logo"
                />
              </div>
              <div className="text-xs sm:text-base md:text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                Provision ExperTax
              </div>
            </div>
          </Link>

          {/* Desktop navigation links */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`topbar-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <span
                  className={`text-sm font-semibold transition-colors ${
                    location === item.href ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <a href={callHref} data-testid="link-call-now" className="inline-flex">
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground shadow-sm font-bold px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base"
              >
                <Phone className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Call Now</span>
              </Button>
            </a>
            <a
              href={loginUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="link-login"
              className="hidden sm:inline-flex"
            >
              <Button variant="secondary" className="shadow-md font-bold px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base">
                Login
              </Button>
            </a>
            <Link href="/appointments" data-testid="link-book-appointment" className="flex-shrink-0">
              <Button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-xl hover:scale-105 shadow-lg font-bold px-3 sm:px-5 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl transition-all duration-300 group text-xs sm:text-sm md:text-base">
                Book Now
                <ChevronDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-y-0.5 transition-transform duration-300 hidden sm:block" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Stats */}
      <SidebarStats />

      {/* Main Content - with top margin for fixed header */}
      <div className="pt-12 sm:pt-13 md:pt-16 lg:pr-32">
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
