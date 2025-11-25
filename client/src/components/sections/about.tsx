import { Shield, DollarSign, Clock, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <section className="py-24 bg-white" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-primary/20">
            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-foreground">Trusted by 500+ Clients</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6 tracking-tight" data-testid="text-about-title">
            Why Choose Provision ExperTax?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-about-description">
            With years of experience and a commitment to excellence, we provide comprehensive tax solutions that put your financial success first.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 border-2 border-primary/10 rounded-2xl hover:border-primary/40 transition-all duration-300 hover:shadow-lg group" data-testid="card-expert-professionals">
            <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary group-hover:text-white rounded-xl flex items-center justify-center mb-6 transition-all duration-300">
              <Shield className="h-8 w-8 text-primary group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground" data-testid="text-experts-title">Expert Professionals</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-experts-description">
              Certified tax professionals with extensive knowledge of current tax laws and regulations.
            </p>
          </div>
          
          <div className="p-8 border-2 border-secondary/10 rounded-2xl hover:border-secondary/40 transition-all duration-300 hover:shadow-lg group" data-testid="card-maximum-returns">
            <div className="w-16 h-16 bg-secondary/10 group-hover:bg-secondary group-hover:text-white rounded-xl flex items-center justify-center mb-6 transition-all duration-300">
              <DollarSign className="h-8 w-8 text-secondary group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground" data-testid="text-returns-title">Maximum Returns</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-returns-description">
              We identify every deduction and credit to ensure you get the maximum refund possible.
            </p>
          </div>
          
          <div className="p-8 border-2 border-accent/10 rounded-2xl hover:border-accent/40 transition-all duration-300 hover:shadow-lg group" data-testid="card-year-round-support">
            <div className="w-16 h-16 bg-accent/10 group-hover:bg-accent group-hover:text-white rounded-xl flex items-center justify-center mb-6 transition-all duration-300">
              <Clock className="h-8 w-8 text-accent group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground" data-testid="text-support-title">Year-Round Support</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-support-description">
              Ongoing tax planning and support throughout the year, not just during tax season.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
