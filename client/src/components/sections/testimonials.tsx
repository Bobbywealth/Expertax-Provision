import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Small Business Owner",
    content: "Provision ExperTax saved me thousands on my business taxes. Their expertise in finding deductions I didn't even know existed was incredible.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    content: "Professional, knowledgeable, and always available to answer questions. They made tax season stress-free for the first time in years.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
  },
  {
    name: "Jennifer Rodriguez",
    role: "Real Estate Investor",
    content: "Their tax planning strategies have been a game-changer for my investment portfolio. Highly recommend for anyone with complex tax situations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
  }
];

export default function Testimonials() {
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
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              data-testid={`card-testimonial-${index}`}
            >
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star 
                    key={starIndex} 
                    className="h-4 w-4 text-yellow-400 fill-current" 
                    data-testid={`star-${index}-${starIndex}`}
                  />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 italic" data-testid={`text-testimonial-content-${index}`}>
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  data-testid={`img-testimonial-${index}`}
                />
                <div>
                  <div className="font-semibold text-foreground" data-testid={`text-testimonial-name-${index}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${index}`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}