import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { User, Building, TrendingUp, Shield, Calculator, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
  {
    icon: User,
    title: "Individual Tax Preparation",
    description: "Complete tax preparation for individuals with personalized attention to maximize your refund.",
    features: [
      "Federal and state returns",
      "Electronic filing",
      "Audit protection",
      "Prior year amendments"
    ],
    color: "from-primary to-primary/80"
  },
  {
    icon: Building,
    title: "Business Tax Services",
    description: "Comprehensive business tax preparation and planning for all entity types.",
    features: [
      "Corporate tax returns",
      "Partnership returns",
      "Quarterly estimated payments",
      "Payroll tax compliance"
    ],
    color: "from-secondary to-secondary/80"
  },
  {
    icon: TrendingUp,
    title: "Tax Planning",
    description: "Strategic tax planning to minimize your tax liability and optimize your financial position.",
    features: [
      "Year-round tax strategy",
      "Retirement planning",
      "Investment tax planning",
      "Estate planning coordination"
    ],
    color: "from-accent to-accent/80"
  },
  {
    icon: Shield,
    title: "IRS Representation",
    description: "Professional representation for IRS audits, appeals, and tax resolution matters.",
    features: [
      "Audit representation",
      "Appeals process",
      "Payment plan negotiations",
      "Penalty abatement"
    ],
    color: "from-primary to-primary/80"
  },
  {
    icon: Calculator,
    title: "Bookkeeping Services",
    description: "Professional bookkeeping to keep your financial records accurate and up-to-date.",
    features: [
      "Monthly bookkeeping",
      "Financial statements",
      "Accounts payable/receivable",
      "Bank reconciliations"
    ],
    color: "from-secondary to-secondary/80"
  },
  {
    icon: Handshake,
    title: "Tax Resolution",
    description: "Help resolving tax problems, back taxes, and finding solutions for tax debt.",
    features: [
      "Installment agreements",
      "Offers in compromise",
      "Currently not collectible status",
      "Innocent spouse relief"
    ],
    color: "from-accent to-accent/80"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-services">
      <Navbar />
      
      <section className="py-24 bg-gradient-to-br from-white via-background to-background/95 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Complete Solutions</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight" data-testid="text-services-title">
              Complete Tax Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-services-description">
              Comprehensive tax solutions for individuals, families, and businesses of all sizes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="group relative"
                  data-testid={`card-service-${index}`}
                >
                  {/* Premium Gradient Border */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur`}></div>
                  
                  {/* Card */}
                  <div className="relative bg-white border-2 border-border/50 rounded-2xl p-10 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-200 tracking-tight" data-testid={`text-service-title-${index}`}>
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow" data-testid={`text-service-description-${index}`}>
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <ul className="text-sm text-muted-foreground space-y-3 mb-8 pb-8 border-b-2 border-border/30">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} data-testid={`text-feature-${index}-${featureIndex}`} className="flex items-start group/item">
                          <span className={`text-transparent bg-gradient-to-r ${service.color} bg-clip-text font-bold mr-3 mt-0.5`}>✓</span>
                          <span className="text-foreground font-medium group-hover/item:translate-x-1 transition-transform duration-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA */}
                    <Link href="/contact" className="w-full">
                      <Button className={`w-full bg-gradient-to-r ${service.color} text-white font-bold py-3 rounded-xl hover:shadow-xl group/btn transition-all duration-300`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
