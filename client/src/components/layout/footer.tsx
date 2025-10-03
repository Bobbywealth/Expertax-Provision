import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://iili.io/KEcaJUX.th.png" 
                alt="Provision ExperTax Services Logo" 
                className="h-8 w-auto"
                data-testid="img-footer-logo"
              />
              <div className="text-xl font-bold">Provision ExperTax</div>
            </div>
            <p className="text-gray-300 mb-4" data-testid="text-company-description">
              Your trusted partner for comprehensive tax solutions. We're committed to maximizing your returns and minimizing your tax burden through expert preparation and strategic planning.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="link-facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="link-twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="link-linkedin">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="text-services-heading">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/services" data-testid="link-individual-tax"><span className="hover:text-white transition-colors duration-200">Individual Tax Prep</span></Link></li>
              <li><Link href="/services" data-testid="link-business-tax"><span className="hover:text-white transition-colors duration-200">Business Tax Services</span></Link></li>
              <li><Link href="/services" data-testid="link-tax-planning"><span className="hover:text-white transition-colors duration-200">Tax Planning</span></Link></li>
              <li><Link href="/services" data-testid="link-irs-representation"><span className="hover:text-white transition-colors duration-200">IRS Representation</span></Link></li>
              <li><Link href="/services" data-testid="link-tax-resolution"><span className="hover:text-white transition-colors duration-200">Tax Resolution</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="text-quick-links-heading">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" data-testid="link-footer-home"><span className="hover:text-white transition-colors duration-200">Home</span></Link></li>
              <li><Link href="/pricing" data-testid="link-footer-pricing"><span className="hover:text-white transition-colors duration-200">Pricing</span></Link></li>
              <li><Link href="/agents" data-testid="link-footer-team"><span className="hover:text-white transition-colors duration-200">Our Team</span></Link></li>
              <li><Link href="/contact" data-testid="link-footer-contact"><span className="hover:text-white transition-colors duration-200">Contact</span></Link></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200" data-testid="link-privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p data-testid="text-copyright">&copy; 2025 Provision ExperTax Services. All rights reserved. | Licensed Tax Professionals</p>
        </div>
      </div>
    </footer>
  );
}
