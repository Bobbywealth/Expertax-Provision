import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-foreground text-white relative overflow-hidden" data-testid="cta-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Maximize Your Tax Savings?
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8" data-testid="text-cta-description">
            Don't leave money on the table. Let our expert team help you navigate the complex world of taxes and secure every deduction you deserve.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300" data-testid="card-cta-consultation">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Free Consultation</h3>
            <p className="text-white/80 text-sm">Schedule a complimentary 30-minute consultation to discuss your tax situation</p>
          </div>
          
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300" data-testid="card-cta-support">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
            <p className="text-white/80 text-sm">Direct access to certified tax professionals throughout the process</p>
          </div>
          
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300" data-testid="card-cta-guarantee">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Maximum Refund</h3>
            <p className="text-white/80 text-sm">We guarantee to find every deduction and credit you're entitled to</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" data-testid="link-cta-contact">
              <Button className="bg-white text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 text-lg">
                Get Started Today
              </Button>
            </Link>
            <Link href="/pricing" data-testid="link-cta-pricing">
              <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-foreground transition-all duration-200 text-lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}