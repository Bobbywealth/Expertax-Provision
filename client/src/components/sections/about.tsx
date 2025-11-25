import { Shield, DollarSign, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <section className="py-24 relative overflow-hidden" data-testid="about-section">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-background/50"></div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Why Us</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight" data-testid="text-about-title">
            Why Choose Provision ExperTax?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-about-description">
            With years of experience and a commitment to excellence, we provide comprehensive tax solutions that put your financial success first.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-16">
          {[
            {
              icon: Shield,
              title: "Expert Professionals",
              description: "Certified tax professionals with extensive knowledge of current tax laws and regulations.",
              testId: "card-expert-professionals",
              titleId: "text-experts-title",
              descId: "text-experts-description"
            },
            {
              icon: DollarSign,
              title: "Maximum Returns",
              description: "We identify every deduction and credit to ensure you get the maximum refund possible.",
              testId: "card-maximum-returns",
              titleId: "text-returns-title",
              descId: "text-returns-description"
            },
            {
              icon: Clock,
              title: "Year-Round Support",
              description: "Ongoing tax planning and support throughout the year, not just during tax season.",
              testId: "card-year-round-support",
              titleId: "text-support-title",
              descId: "text-support-description"
            }
          ].map((item, index) => {
            const IconComponent = item.icon;
            const colors = ["from-primary", "from-secondary", "from-accent"];
            return (
              <div key={index} className="group relative" data-testid={item.testId}>
                {/* Premium Gradient Border */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br from-${colors[index]}/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur`}></div>
                
                {/* Card */}
                <div className="relative bg-white border-2 border-border/50 rounded-xl md:rounded-2xl p-6 md:p-10 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-14 md:w-20 h-14 md:h-20 rounded-lg md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl ${index === 0 ? 'bg-primary/15 text-primary' : index === 1 ? 'bg-secondary/15 text-secondary' : 'bg-accent/15 text-accent'}`}>
                    <IconComponent className="h-10 w-10" />
                  </div>
                  
                  <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-foreground group-hover:text-primary transition-colors duration-200 tracking-tight" data-testid={item.titleId}>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow text-lg" data-testid={item.descId}>
                    {item.description}
                  </p>
                  
                  <div className="mt-6 pt-6 border-t-2 border-border/30">
                    <div className="inline-flex items-center text-primary font-bold text-sm uppercase tracking-widest group-hover:gap-3 transition-all duration-300 gap-2">
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center pt-8 border-t-2 border-border/30">
          <p className="text-muted-foreground mb-6 text-lg">Ready to experience the Provision ExperTax difference?</p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group shadow-lg">
              Schedule Your Free Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
