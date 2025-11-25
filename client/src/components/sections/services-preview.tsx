import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { User, Building, TrendingUp, ArrowRight } from "lucide-react";

const featuredServices = [
  {
    icon: User,
    title: "Individual Tax Preparation",
    description: "Complete personal tax preparation with maximum refund guarantee",
    features: ["Federal & State Returns", "Electronic Filing", "Audit Protection"],
    colorClasses: {
      bg: "bg-primary/10",
      text: "text-primary",
      dot: "bg-primary"
    }
  },
  {
    icon: Building,
    title: "Business Tax Services",
    description: "Comprehensive business tax solutions for all entity types",
    features: ["Corporate Returns", "Quarterly Payments", "Tax Compliance"],
    colorClasses: {
      bg: "bg-secondary/10",
      text: "text-secondary",
      dot: "bg-secondary"
    }
  },
  {
    icon: TrendingUp,
    title: "Tax Planning",
    description: "Strategic year-round planning to minimize your tax burden",
    features: ["Investment Planning", "Retirement Strategy", "Estate Planning"],
    colorClasses: {
      bg: "bg-accent/10",
      text: "text-accent",
      dot: "bg-accent"
    }
  }
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-background to-background/95 relative overflow-hidden" data-testid="services-preview-section">
      {/* Decorative Elements */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Professional Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6 tracking-tight" data-testid="text-services-preview-title">
            Tailored Solutions for Every Tax Scenario
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-services-preview-description">
            From individual returns to complex business tax strategies, we provide comprehensive solutions for all your tax needs.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {featuredServices.map((service, index) => {
            const IconComponent = service.icon;
            const staggerClass = index === 1 ? "lg:mt-8" : "";
            return (
              <div 
                key={index}
                className={`group relative ${staggerClass}`}
                data-testid={`card-service-preview-${index}`}
              >
                {/* Premium Gradient Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                
                {/* Card Content */}
                <div className="relative bg-card border-2 border-border/50 rounded-2xl p-8 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
                  {/* Icon Container */}
                  <div className={`w-16 h-16 ${service.colorClasses.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <IconComponent className={`h-8 w-8 ${service.colorClasses.text} group-hover:rotate-12 transition-transform duration-300`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-200 tracking-tight" data-testid={`text-service-preview-title-${index}`}>
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-grow" data-testid={`text-service-preview-description-${index}`}>
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200" data-testid={`text-service-preview-feature-${index}-${featureIndex}`}>
                        <div className={`w-2 h-2 ${service.colorClasses.dot} rounded-full mr-3 group-hover:scale-150 transition-transform duration-200`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/services" data-testid={`link-service-preview-${index}`} className="mt-auto">
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 group/btn">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center pt-8 border-t border-border/50">
          <Link href="/services" data-testid="link-view-all-services">
            <Button className="bg-gradient-to-r from-primary via-secondary to-primary text-primary-foreground px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group shadow-lg">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
