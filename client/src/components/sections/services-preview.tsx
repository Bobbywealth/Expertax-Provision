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
    <section className="py-20 bg-background" data-testid="services-preview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-services-preview-title">
            Our Core Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-services-preview-description">
            From individual returns to complex business tax strategies, we provide comprehensive solutions for all your tax needs.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {featuredServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="bg-card border border-border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                data-testid={`card-service-preview-${index}`}
              >
                <div className={`w-16 h-16 ${service.colorClasses.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-8 w-8 ${service.colorClasses.text}`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-200" data-testid={`text-service-preview-title-${index}`}>
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6" data-testid={`text-service-preview-description-${index}`}>
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground" data-testid={`text-service-preview-feature-${index}-${featureIndex}`}>
                      <div className={`w-1.5 h-1.5 ${service.colorClasses.dot} rounded-full mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href="/services" data-testid={`link-service-preview-${index}`}>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <Link href="/services" data-testid="link-view-all-services">
            <Button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 group">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}