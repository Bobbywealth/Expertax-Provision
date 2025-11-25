import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowRight, Star } from "lucide-react";
import { agents } from "@/data/agents";

export default function AgentPreview() {
  const previewAgents = agents.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-foreground/5 relative overflow-hidden" data-testid="agent-preview-section">
      {/* Decorative Elements */}
      <div className="absolute top-0 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl hidden md:block"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block mb-3 md:mb-4">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Our Experts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 md:mb-6 tracking-tight" data-testid="text-team-preview-title">
            Meet Our Expert Team
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-team-preview-description">
            Our certified tax professionals bring decades of combined experience to help you achieve your financial goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16 lg:max-w-4xl lg:mx-auto">
            {previewAgents.map((agent, index) => (
              <div 
                key={agent.id}
                className="group relative"
                data-testid={`card-preview-agent-${index}`}
              >
                {/* Premium Gradient Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                
                {/* Card */}
                <div className="relative bg-card border-2 border-border/50 rounded-xl md:rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl backdrop-blur-sm">
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-56 sm:h-64 md:h-72 lg:h-80">
                    <img 
                      src={agent.imageUrl} 
                      alt={agent.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                      data-testid={`img-preview-agent-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Premium Badge */}
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/95 backdrop-blur-md rounded-full px-3 md:px-4 py-1 md:py-2 flex items-center gap-2 shadow-lg">
                      <Star className="h-3 md:h-4 w-3 md:w-4 text-primary fill-primary" />
                      <span className="text-xs font-bold text-foreground">Expert</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 md:p-8">
                    <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 group-hover:text-primary transition-colors duration-200 tracking-tight" data-testid={`text-preview-agent-name-${index}`}>
                      {agent.name}
                    </h3>
                    <p className="text-primary font-bold mb-3 md:mb-4 text-base md:text-lg" data-testid={`text-preview-agent-title-${index}`}>
                      {agent.title}
                    </p>
                    <p className="text-muted-foreground text-base mb-6 leading-relaxed line-clamp-2" data-testid={`text-preview-agent-bio-${index}`}>
                      {agent.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {agent.credentials.slice(0, 2).map((credential, credIndex) => (
                        <Badge 
                          key={credIndex} 
                          className="bg-primary/10 text-primary font-semibold border border-primary/30 text-xs px-3 py-1"
                          data-testid={`badge-preview-credential-${index}-${credIndex}`}
                        >
                          {credential}
                        </Badge>
                      ))}
                      {agent.credentials.length > 2 && (
                        <Badge className="bg-secondary/10 text-secondary font-semibold border border-secondary/30 text-xs px-3 py-1">
                          +{agent.credentials.length - 2} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center text-muted-foreground mb-6 pb-6 border-b border-border/50">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm font-medium" data-testid={`text-preview-agent-email-${index}`}>{agent.email}</span>
                    </div>
                    
                    <Link href="/agents" data-testid={`link-agent-${index}`}>
                      <Button className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold rounded-xl hover:shadow-xl group/btn transition-all duration-300">
                        View Full Profile
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        <div className="text-center">
          <Link href="/agents" data-testid="link-view-all-agents">
            <Button className="bg-gradient-to-r from-primary via-secondary to-primary text-primary-foreground px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group shadow-lg">
              View Our Complete Team
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
