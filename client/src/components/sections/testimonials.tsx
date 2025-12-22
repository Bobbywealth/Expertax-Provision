import { Star, Quote, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Testimonial } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Default avatars for testimonials
const defaultAvatars = [
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
];

export default function Testimonials() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  // Hide the entire section until you have real testimonials to display.
  if (!isLoading && testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-foreground/5 via-background to-background relative overflow-hidden" data-testid="testimonials-section">
      {/* Decorative Blobs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Success Stories</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight" data-testid="text-testimonials-title">
            Trusted by Real Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-testimonials-description">
            See what our clients have to say about their experience with Provision ExperTax
          </p>
        </div>
        
        {testimonials.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="group relative"
                data-testid={`card-testimonial-${testimonial.id}`}
              >
                {/* Gradient Border Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Card Content */}
                <div className="relative bg-white border-2 border-border/50 rounded-xl md:rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-2xl flex flex-col h-full">
                  <div className="mb-3 md:mb-4">
                    <Quote className="h-10 md:h-14 w-10 md:w-14 text-primary/15 group-hover:text-primary/25 transition-colors duration-300" />
                  </div>
                  
                  <div className="flex items-center mb-5 gap-1">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star 
                        key={starIndex} 
                        className="h-5 w-5 text-yellow-400 fill-current" 
                        data-testid={`star-${testimonial.id}-${starIndex}`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-foreground mb-8 font-medium leading-relaxed flex-grow text-lg" data-testid={`text-testimonial-content-${testimonial.id}`}>
                    "{testimonial.testimonialText}"
                  </p>
                  
                  <div className="flex items-center pt-6 border-t-2 border-border/30">
                    <img 
                      src={defaultAvatars[index % defaultAvatars.length]} 
                      alt={testimonial.clientName}
                      className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300"
                      data-testid={`img-testimonial-${testimonial.id}`}
                    />
                    <div>
                      <div className="font-bold text-foreground text-base" data-testid={`text-testimonial-name-${testimonial.id}`}>
                        {testimonial.clientName}
                      </div>
                      <div className="text-sm text-primary font-semibold" data-testid={`text-testimonial-service-${testimonial.id}`}>
                        {testimonial.service || "Tax Services Client"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            {isLoading ? (
              <div className="space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">Loading testimonials...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <MessageSquare className="h-16 w-16 text-muted-foreground/50 mx-auto" />
                <p className="text-muted-foreground">No testimonials yet.</p>
              </div>
            )}
          </div>
        )}
        
        {testimonials.length > 0 && (
          <div className="text-center pt-8 border-t border-border/50">
            <Link href="/testimonials/submit">
              <Button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 group" data-testid="button-submit-testimonial">
                <MessageSquare className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Share Your Experience
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
