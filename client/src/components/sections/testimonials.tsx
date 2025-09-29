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
    <section className="py-20 bg-muted" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-testimonials-description">
            Don't just take our word for it. Here's what our satisfied clients have to say about our services.
          </p>
        </div>
        
        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                data-testid={`card-testimonial-${testimonial.id}`}
              >
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className="h-4 w-4 text-yellow-400 fill-current" 
                      data-testid={`star-${testimonial.id}-${starIndex}`}
                    />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic" data-testid={`text-testimonial-content-${testimonial.id}`}>
                  "{testimonial.testimonialText}"
                </p>
                
                <div className="flex items-center">
                  <img 
                    src={defaultAvatars[index % defaultAvatars.length]} 
                    alt={testimonial.clientName}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    data-testid={`img-testimonial-${testimonial.id}`}
                  />
                  <div>
                    <div className="font-semibold text-foreground" data-testid={`text-testimonial-name-${testimonial.id}`}>
                      {testimonial.clientName}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-service-${testimonial.id}`}>
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