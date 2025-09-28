import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
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
      
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-pricing-title">
              Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-pricing-description">
              No hidden fees. No surprises. Just honest, upfront pricing for quality tax services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 relative ${
                  tier.popular ? 'ring-2 ring-secondary' : ''
                }`}
                data-testid={`card-pricing-${index}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold" data-testid="badge-most-popular">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2" data-testid={`text-tier-name-${index}`}>
                    {tier.name}
                  </h3>
                  <div className="text-3xl font-bold text-primary mb-2" data-testid={`text-tier-price-${index}`}>
                    {tier.price}
                  </div>
                  <p className="text-sm text-muted-foreground" data-testid={`text-tier-description-${index}`}>
                    {tier.description}
                  </p>
                </div>
                <ul className="space-y-2 text-sm">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center" data-testid={`text-feature-${index}-${featureIndex}`}>
                      <Check className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6" data-testid="text-custom-quote">
              Need a custom quote? Contact us for specialized services and enterprise solutions.
            </p>
            <Link href="/contact" data-testid="link-custom-quote">
              <Button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200">
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
