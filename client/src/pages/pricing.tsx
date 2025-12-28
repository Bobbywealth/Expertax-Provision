import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
  const startingPrice = "$150";
  const includedItems = [
    "Transparent, upfront pricing quotes",
    "No hidden fees or surprises",
    "Professional expert guidance",
    "E-File included",
    "Free audit support",
    "Personalized tax planning",
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-pricing">
      <Navbar />
      
      <section className="py-24 bg-gradient-to-br from-background via-background to-foreground/5 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Pricing Plans</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight" data-testid="text-pricing-title">
              Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-pricing-description">
              No hidden fees. No surprises. Just honest, upfront pricing for quality tax services tailored to your needs.
            </p>
          </div>
          
          {/* Pricing hero card (high-conversion, matches screenshot-style content) */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative rounded-3xl border-2 border-primary/20 bg-white/70 backdrop-blur-sm shadow-2xl overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

              <div className="relative p-8 md:p-12 text-center">
                <div className="inline-flex items-center justify-center mb-6">
                  <span className="bg-yellow-400 text-foreground px-6 py-2 rounded-xl font-black tracking-tight">
                    Starting Price
                      </span>
                    </div>
                  
                <div className="text-6xl md:text-7xl font-black text-green-600 mb-4" data-testid="text-starting-price">
                  {startingPrice}
                </div>

                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10" data-testid="text-starting-price-description">
                  Our pricing starts at {startingPrice} for simple returns. We'll provide a detailed quote based on your specific tax situation.
                </p>

                <div className="h-px bg-border/60 max-w-2xl mx-auto mb-10" />

                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8" data-testid="text-whats-included">
                  What's Included
                </h2>

                <div className="grid sm:grid-cols-2 gap-6 text-left max-w-4xl mx-auto mb-10">
                  {includedItems.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div className="text-base md:text-lg text-foreground font-medium">{item}</div>
                    </div>
                  ))}
                  </div>
                  
                <Link href="/contact" data-testid="link-free-quote">
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-foreground px-10 py-6 rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg">
                    Get Your Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
