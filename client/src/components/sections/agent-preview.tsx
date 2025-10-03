import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowRight } from "lucide-react";
import { agents } from "@/data/agents";

export default function AgentPreview() {
  const previewAgents = agents.slice(0, 3);

  return (
    <section className="py-20 bg-background" data-testid="agent-preview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-team-preview-title">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-team-preview-description">
            Our certified tax professionals bring decades of combined experience to help you achieve your financial goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
            {previewAgents.map((agent, index) => (
              <div 
                key={agent.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                data-testid={`card-preview-agent-${index}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={agent.imageUrl} 
                    alt={agent.name}
                    className="w-full h-[400px] object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    data-testid={`img-preview-agent-${index}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200" data-testid={`text-preview-agent-name-${index}`}>
                    {agent.name}
                  </h3>
                  <p className="text-primary font-medium mb-3" data-testid={`text-preview-agent-title-${index}`}>
                    {agent.title}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3" data-testid={`text-preview-agent-bio-${index}`}>
                    {agent.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.credentials.slice(0, 2).map((credential, credIndex) => (
                      <Badge 
                        key={credIndex} 
                        variant="secondary" 
                        className="text-xs"
                        data-testid={`badge-preview-credential-${index}-${credIndex}`}
                      >
                        {credential}
                      </Badge>
                    ))}
                    {agent.credentials.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.credentials.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    <span data-testid={`text-preview-agent-email-${index}`}>{agent.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        <div className="text-center">
          <Link href="/agents" data-testid="link-view-all-agents">
            <Button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 group">
              View All Team Members
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}