import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import { agents } from "@/data/agents";

export default function Agents() {

  return (
    <div className="min-h-screen bg-background" data-testid="page-agents">
      <Navbar />
      
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-agents-title">
              Meet Our Expert Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-agents-description">
              Our certified tax professionals bring years of experience and dedication to your financial success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agents.map((agent, index) => (
                <div 
                  key={agent.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  data-testid={`card-agent-${index}`}
                >
                  <div className="w-full h-[400px] overflow-hidden bg-gray-100">
                    <img 
                      src={agent.imageUrl} 
                      alt={agent.name}
                      className="w-full h-full object-cover object-top"
                      data-testid={`img-agent-${index}`}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2" data-testid={`text-agent-name-${index}`}>
                      {agent.name}
                    </h3>
                    <p className="text-primary font-medium mb-3" data-testid={`text-agent-title-${index}`}>
                      {agent.title}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4" data-testid={`text-agent-bio-${index}`}>
                      {agent.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.credentials.map((credential, credIndex) => (
                        <Badge 
                          key={credIndex} 
                          variant="secondary" 
                          data-testid={`badge-credential-${index}-${credIndex}`}
                        >
                          {credential}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      <span data-testid={`text-agent-email-${index}`}>{agent.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
