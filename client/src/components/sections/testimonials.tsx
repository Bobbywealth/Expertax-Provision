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

  return (
    <section className="py-24 bg-foreground/5" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6 tracking-tight" data-testid="text-testimonials-title">
            Trusted by Real Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-testimonials-description">
            See what our clients have to say about their experience with Provision ExperTax
          </p>
        </div>
        
        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="bg-white border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group flex flex-col"
                style={{ height: index % 2 === 0 ? 'auto' : 'auto' }}
                data-testid={`card-testimonial-${testimonial.id}`}
              >
                <div className="mb-4">
                  <Quote className="h-12 w-12 text-primary/10 group-hover:text-primary/20 transition-colors duration-300" />
                </div>
                
                <div className="flex items-center mb-4 gap-1">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className="h-5 w-5 text-yellow-400 fill-current" 
                      data-testid={`star-${testimonial.id}-${starIndex}`}
                    />
                  ))}
                </div>
                
                <p className="text-foreground mb-6 font-medium leading-relaxed flex-grow" data-testid={`text-testimonial-content-${testimonial.id}`}>
                  "{testimonial.testimonialText}"
                </p>
                
                <div className="flex items-center pt-4 border-t border-border">
                  <img 
                    src={defaultAvatars[index % defaultAvatars.length]} 
                    alt={testimonial.clientName}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                    data-testid={`img-testimonial-${testimonial.id}`}
                  />
                  <div>
                    <div className="font-bold text-foreground text-sm" data-testid={`text-testimonial-name-${testimonial.id}`}>
                      {testimonial.clientName}
                    </div>
                    <div className="text-xs text-primary font-medium" data-testid={`text-testimonial-service-${testimonial.id}`}>
                      {testimonial.service || "Tax Services"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
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
        
        <div className="text-center mt-12">
          <Link href="/testimonials/submit">
            <Button variant="outline" className="gap-2" data-testid="button-submit-testimonial">
              <MessageSquare className="h-4 w-4" />
              Share Your Experience
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}