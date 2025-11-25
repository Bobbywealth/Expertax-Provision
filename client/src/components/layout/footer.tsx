import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" data-testid="footer">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground/95"></div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 400">
          <defs>
            <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>
      
      {/* Decorative Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="relative">
        {/* Top Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="https://iili.io/KEcaJUX.th.png" 
                  alt="Provision ExperTax Services Logo" 
                  className="h-10 w-auto"
                  data-testid="img-footer-logo"
                />
                <div className="text-2xl font-bold text-white tracking-tight">Provision ExperTax</div>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed text-lg font-medium" data-testid="text-company-description">
                Your trusted partner for comprehensive tax solutions. We're committed to maximizing your returns and minimizing your tax burden through expert preparation and strategic planning.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 hover:scale-110 transform duration-300" data-testid="link-facebook" title="Facebook">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 hover:scale-110 transform duration-300" data-testid="link-twitter" title="Twitter">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-3.915 9.964 9.964 0 01-2.866.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 hover:scale-110 transform duration-300" data-testid="link-linkedin" title="LinkedIn">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                </a>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm" data-testid="text-services-heading">Services</h4>
              <ul className="space-y-3 text-white/70">
                <li><Link href="/services" data-testid="link-individual-tax"><span className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform duration-300">Individual Tax Prep</span></Link></li>
                <li><Link href="/services" data-testid="link-business-tax"><span className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform duration-300">Business Tax Services</span></Link></li>
                <li><Link href="/services" data-testid="link-tax-planning"><span className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform duration-300">Tax Planning</span></Link></li>
                <li><Link href="/services" data-testid="link-irs-representation"><span className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform duration-300">IRS Representation</span></Link></li>
                <li><Link href="/services" data-testid="link-tax-resolution"><span className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform duration-300">Tax Resolution</span></Link></li>
              </ul>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm" data-testid="text-quick-links-heading">Quick Links</h4>
              <ul className="space-y-3 text-white/70">
                <li><Link href="/" data-testid="link-footer-home"><span className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform duration-300">Home</span></Link></li>
                <li><Link href="/pricing" data-testid="link-footer-pricing"><span className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform duration-300">Pricing</span></Link></li>
                <li><Link href="/agents" data-testid="link-footer-team"><span className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform duration-300">Our Team</span></Link></li>
                <li><Link href="/contact" data-testid="link-footer-contact"><span className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform duration-300">Contact</span></Link></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform duration-300" data-testid="link-privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <div className="text-white/60 text-sm font-medium">Email Us</div>
                <a href="mailto:info@experttax.com" className="text-white font-semibold hover:text-primary transition-colors duration-300">info@experttax.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <div className="text-white/60 text-sm font-medium">Call Us</div>
                <a href="tel:+1234567890" className="text-white font-semibold hover:text-secondary transition-colors duration-300">(123) 456-7890</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <div className="text-white/60 text-sm font-medium">Visit Us</div>
                <p className="text-white font-semibold">123 Tax Street, Suite 100<br/>Your City, ST 12345</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-sm">
            <p data-testid="text-copyright">&copy; 2025 Provision ExperTax Services. All rights reserved. | Licensed Tax Professionals</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
