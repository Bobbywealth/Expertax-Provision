import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/agents", label: "Our Team" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center space-x-3">
              <img 
                src="https://iili.io/KEcaJUX.th.png" 
                alt="Provision ExperTax Services Logo" 
                className="h-10 w-auto"
                data-testid="img-logo"
              />
              <div className="text-xl font-bold text-primary">Provision ExperTax</div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <span className={`text-foreground hover:text-primary transition-colors duration-200 font-medium ${
                  location === item.href ? 'text-primary' : ''
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/appointments" data-testid="link-book-appointment">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md">
                Book Appointment
              </Button>
            </Link>
            <Link href="/contact" data-testid="link-contact">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Contact Us
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border" data-testid="mobile-menu">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="block py-2 text-foreground hover:text-primary transition-colors duration-200">
                  {item.label}
                </div>
              </Link>
            ))}
            <Link href="/appointments" data-testid="mobile-link-book-appointment">
              <div className="block py-2">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800">
                  Book Appointment
                </Button>
              </div>
            </Link>
            <Link href="/contact" data-testid="mobile-link-contact">
              <div className="block py-2 text-foreground hover:text-primary transition-colors duration-200">
                Contact Us
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
