import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { User, Building, TrendingUp, Shield, Calculator, Handshake } from "lucide-react";

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
    color: "primary"
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
    color: "secondary"
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
    color: "accent"
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
    color: "primary"
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
    color: "secondary"
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
    color: "accent"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-services">
      <Navbar />
      
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-6 tracking-tight" data-testid="text-services-title">
              Complete Tax Solutions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-description">
              Comprehensive tax solutions for individuals, families, and businesses of all sizes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border-2 border-foreground/5 rounded-2xl p-8 hover:border-foreground/15 hover:shadow-xl transition-all duration-300 group"
                  data-testid={`card-service-${index}`}
                >
                  <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary group-hover:text-white rounded-xl flex items-center justify-center mb-6 transition-all duration-300">
                    <IconComponent className="h-7 w-7 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-service-description-${index}`}>
                    {service.description}
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} data-testid={`text-feature-${index}-${featureIndex}`} className="flex items-start">
                        <span className="text-primary font-bold mr-3">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
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
