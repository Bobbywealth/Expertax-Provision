import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const pricingTiers = [
  {
    name: "Basic Individual",
    price: "$149",
    description: "Simple 1040 returns",
    features: [
      "Form 1040",
      "Standard deduction",
      "W-2 income",
      "Electronic filing",
      "One state return"
    ],
    popular: false
  },
  {
    name: "Complex Individual",
    price: "$299",
    description: "Itemized deductions & investments",
    features: [
      "Everything in Basic",
      "Itemized deductions",
      "Investment income",
      "Rental property",
      "Schedule C business"
    ],
    popular: true
  },
  {
    name: "Small Business",
    price: "$499",
    description: "LLC, S-Corp, Partnership",
    features: [
      "Business tax return",
      "K-1 preparation",
      "Payroll tax forms",
      "Quarterly estimates",
      "Tax planning consultation"
    ],
    popular: false
  },
  {
    name: "Corporate",
    price: "$899",
    description: "C-Corp tax returns",
    features: [
      "Form 1120",
      "Financial statements",
      "Tax provision work",
      "Multi-state returns",
      "Ongoing consultation"
    ],
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-pricing">
      <Navbar />
      
      <section className="py-24 bg-gradient-to-br from-background via-background to-foreground/5 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Pricing Plans</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight" data-testid="text-pricing-title">
              Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-pricing-description">
              No hidden fees. No surprises. Just honest, upfront pricing for quality tax services tailored to your needs.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`group relative ${tier.popular ? 'lg:scale-105' : ''}`}
                data-testid={`card-pricing-${index}`}
              >
                {/* Premium Gradient Border */}
                {tier.popular && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl opacity-100 blur"></div>
                )}
                <div className={`relative bg-card rounded-2xl p-8 border-2 ${
                  tier.popular 
                    ? 'border-primary/50 shadow-2xl' 
                    : 'border-border/50 hover:border-primary/30'
                } backdrop-blur-sm transition-all duration-500 hover:shadow-2xl h-full flex flex-col`}>
                  
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg" data-testid="badge-most-popular">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-3 tracking-tight" data-testid={`text-tier-name-${index}`}>
                      {tier.name}
                    </h3>
                    <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-5xl font-black mb-3" data-testid={`text-tier-price-${index}`}>
                      {tier.price}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium" data-testid={`text-tier-description-${index}`}>
                      {tier.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-4 text-sm mb-8 flex-grow">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center group/item" data-testid={`text-feature-${index}-${featureIndex}`}>
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" />
                        <span className="text-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/contact">
                    <Button className={`w-full font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 group/btn ${
                      tier.popular
                        ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                        : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                    }`}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm border-2 border-border/50 rounded-2xl p-12 text-center">
            <p className="text-foreground mb-8 text-lg font-medium" data-testid="text-custom-quote">
              Need a custom quote? Contact us for specialized services and enterprise solutions.
            </p>
            <Link href="/contact" data-testid="link-custom-quote">
              <Button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                Get Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
