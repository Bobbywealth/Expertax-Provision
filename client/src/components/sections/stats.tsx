import { Users, Award, Calendar, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "500+",
    label: "Happy Clients",
    description: "Satisfied customers trust us with their taxes"
  },
  {
    icon: Award,
    number: "15+",
    label: "Years Experience",
    description: "Proven track record in tax services"
  },
  {
    icon: Calendar,
    number: "99%",
    label: "On-Time Filing",
    description: "We never miss a deadline"
  },
  {
    icon: TrendingUp,
    number: "$2.5M+",
    label: "Refunds Secured",
    description: "Total refunds maximized for our clients"
  }
];

export default function Stats() {
  return (
    <section className="py-20 service-gradient" data-testid="stats-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" data-testid="text-stats-title">
            Trusted by Hundreds of Clients
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto" data-testid="text-stats-description">
            Our results speak for themselves. Here's what we've accomplished together.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                data-testid={`card-stat-${index}`}
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2" data-testid={`text-stat-number-${index}`}>
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2" data-testid={`text-stat-label-${index}`}>
                  {stat.label}
                </h3>
                <p className="text-white/80 text-sm" data-testid={`text-stat-description-${index}`}>
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}