import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { Suspense, lazy, useState } from "react";
import SidebarStats from "@/components/layout/sidebar-stats";
import Hero from "@/components/sections/hero";
const About = lazy(() => import("@/components/sections/about"));
const ServicesPreview = lazy(() => import("@/components/sections/services-preview"));
const AgentPreview = lazy(() => import("@/components/sections/agent-preview"));
const Testimonials = lazy(() => import("@/components/sections/testimonials"));
const CTA = lazy(() => import("@/components/sections/cta"));
const Footer = lazy(() => import("@/components/layout/footer"));

export default function Home() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-12 md:h-16 flex items-center justify-between gap-2">
          <Link href="/" data-testid="link-home" className="group hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src="https://iili.io/KEcaJUX.th.png" 
                  alt="Provision ExperTax Services Logo" 
                  className="h-7 sm:h-7 md:h-10 w-auto relative"
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
            {/* Mobile: keep Book primary, move Login into hamburger, remove Call */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link href="/appointments" data-testid="link-book-appointment" className="flex-shrink-0">
                <Button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg font-extrabold px-4 h-11 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] min-w-[112px]">
                  Book
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-11 w-11 p-0 rounded-xl border-primary/20"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-label="Open menu"
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            {/* Desktop: keep Login + Book; Call stays in sticky bottom bar on mobile only */}
            <div className="hidden lg:flex items-center gap-2">
              <a href={loginUrl} target="_blank" rel="noreferrer" data-testid="link-login" className="inline-flex">
                <Button variant="secondary" className="shadow-md font-bold px-4 md:px-6 h-11 md:h-12 rounded-xl text-sm md:text-base">
                  Login
                </Button>
              </a>
              <Link href="/appointments" data-testid="link-book-appointment-desktop" className="flex-shrink-0">
                <Button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-xl hover:scale-105 shadow-lg font-bold px-4 md:px-8 h-11 md:h-12 rounded-xl transition-all duration-300 group text-sm md:text-base">
                  Book Now
                  <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile hamburger menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-primary/10 bg-white/95 backdrop-blur-xl" data-testid="mobile-menu">
            <div className="max-w-7xl mx-auto px-3 py-3 space-y-2">
              <a
                href={loginUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="mobile-link-login"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="secondary" className="w-full h-11 rounded-xl font-bold">
                  Login
                </Button>
              </a>

              <div className="grid grid-cols-2 gap-2">
                {navItems
                  .filter((i) => i.href !== "/")
                  .slice(0, 4)
                  .map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full h-11 rounded-xl border-primary/15 font-semibold">
                        {item.label}
                      </Button>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom bar (mobile only): Call + Book stays visible while scrolling */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-primary/10 shadow-[0_-10px_30px_-20px_rgba(0,0,0,0.35)]" data-testid="mobile-bottom-bar">
        <div className="max-w-7xl mx-auto px-3 py-2 grid grid-cols-2 gap-2">
          <a href={callHref} className="w-full" data-testid="bottombar-call">
            <Button variant="outline" className="w-full h-12 rounded-xl font-extrabold border-primary/25">
              Call Now
            </Button>
          </a>
          <Link href="/appointments" className="w-full" data-testid="bottombar-book">
            <Button className="w-full h-12 rounded-xl font-extrabold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>

      {/* Sidebar Stats */}
      <SidebarStats />

      {/* Main Content - with top margin for fixed header */}
      <div className="pt-12 md:pt-16 lg:pr-32 pb-20 md:pb-0">
        <Hero />
        <Suspense
          fallback={
            <div className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-6 w-48 bg-muted rounded mb-3" />
                <div className="h-4 w-full max-w-xl bg-muted rounded" />
              </div>
            </div>
          }
        >
          <About />
          <ServicesPreview />
          <AgentPreview />
          <Testimonials />
          <CTA />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
