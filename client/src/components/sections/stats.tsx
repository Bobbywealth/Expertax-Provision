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
    <section className="relative py-16 md:py-32 overflow-hidden" data-testid="stats-section">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground/95"></div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <svg className="w-full h-full" viewBox="0 0 1200 400">
          <defs>
            <pattern id="dots" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      
      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse hidden md:block"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse hidden md:block" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block mb-3 md:mb-6">
            <span className="text-xs font-bold text-primary-foreground/80 uppercase tracking-widest">Our Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-8 tracking-tight" data-testid="text-stats-title">
            Trusted by Hundreds of Clients
          </h2>
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed font-medium" data-testid="text-stats-description">
            Our results speak for themselves. Here's what we've accomplished together.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="group relative"
                data-testid={`card-stat-${index}`}
              >
                {/* Premium Gradient Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white/30 via-white/10 to-white/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Card */}
                <div className="relative text-center p-5 md:p-8 bg-white/10 backdrop-blur-xl rounded-lg md:rounded-2xl border-2 border-white/20 hover:border-white/40 group-hover:bg-white/20 transition-all duration-500 hover:shadow-2xl hover:scale-105">
                  {/* Icon Container */}
                  <div className="w-12 md:w-20 h-12 md:h-20 bg-white/20 rounded-lg md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-lg">
                    <IconComponent className="h-6 md:h-10 w-6 md:w-10 text-white" />
                  </div>
                  
                  {/* Number */}
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 md:mb-3 tracking-tight" data-testid={`text-stat-number-${index}`}>
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-3 uppercase tracking-wider" data-testid={`text-stat-label-${index}`}>
                    {stat.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/80 text-xs md:text-base leading-relaxed font-medium" data-testid={`text-stat-description-${index}`}>
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
