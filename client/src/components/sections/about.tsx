import { Shield, DollarSign, Clock } from "lucide-react";

export default function About() {
  return (
    <section className="py-20 bg-muted" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-about-title">
            Why Choose Provision ExperTax?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-about-description">
            With years of experience and a commitment to excellence, we provide comprehensive tax solutions that put your financial success first.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6" data-testid="card-expert-professionals">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3" data-testid="text-experts-title">Expert Professionals</h3>
            <p className="text-muted-foreground" data-testid="text-experts-description">
              Certified tax professionals with extensive knowledge of current tax laws and regulations.
            </p>
          </div>
          
          <div className="text-center p-6" data-testid="card-maximum-returns">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3" data-testid="text-returns-title">Maximum Returns</h3>
            <p className="text-muted-foreground" data-testid="text-returns-description">
              We identify every deduction and credit to ensure you get the maximum refund possible.
            </p>
          </div>
          
          <div className="text-center p-6" data-testid="card-year-round-support">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3" data-testid="text-support-title">Year-Round Support</h3>
            <p className="text-muted-foreground" data-testid="text-support-description">
              Ongoing tax planning and support throughout the year, not just during tax season.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
