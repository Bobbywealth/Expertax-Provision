import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, CheckCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden" data-testid="cta-section">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground/95"></div>
      
      {/* Premium Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 400">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Decorative Gradient Blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold text-primary-foreground/80 uppercase tracking-widest">Next Steps</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black mb-8 text-white tracking-tight leading-tight" data-testid="text-cta-title">
            Ready to Maximize Your Tax Savings?
          </h2>
          <p className="text-xl lg:text-2xl text-white/85 max-w-4xl mx-auto leading-relaxed font-medium" data-testid="text-cta-description">
            Don't leave money on the table. Let our expert team help you navigate taxes and secure every deduction you deserve.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Calendar, title: "Free Consultation", desc: "Schedule a complimentary 30-minute consultation to discuss your tax situation" },
            { icon: Phone, title: "Expert Support", desc: "Direct access to certified tax professionals throughout the process" },
            { icon: Mail, title: "Maximum Refund", desc: "We guarantee to find every deduction and credit you're entitled to" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="group relative" data-testid={`card-cta-${idx}`}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-300 hover:shadow-2xl">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-12 mb-12 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Why Choose Provision ExperTax?</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                "Maximum Refund Guarantee",
                "Year-Round Professional Support",
                "Proactive Tax Planning",
                "Audit Representation Included"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/contact" data-testid="link-cta-contact">
            <Button className="bg-white text-foreground px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl">
              Get Started Today
            </Button>
          </Link>
          <Link href="/appointments" data-testid="link-cta-appointment">
            <Button className="bg-gradient-to-r from-primary to-secondary text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
