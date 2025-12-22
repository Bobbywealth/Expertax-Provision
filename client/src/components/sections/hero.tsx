import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Hero() {
  // New hero/team image (direct image URL from Freeimage.host)
  const heroImageSrc = "https://iili.io/f1kXgRe.jpg";
  const heroImageFallback = "https://iili.io/Kw9hibf.png";

  return (
    <section className="hero-gradient text-white py-16 md:py-32 lg:py-40 relative overflow-hidden md:min-h-screen" data-testid="hero-section">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse hidden md:block"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse hidden md:block"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl hidden lg:block"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-center lg:text-left pt-8 md:pt-0 relative">
            {/* Subtle overlay for extra text readability */}
            <div className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 bg-gradient-to-b from-black/0 via-black/25 to-black/0 blur-2xl opacity-80"></div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-tight mb-3 md:mb-4 tracking-tight text-white animate-in fade-in slide-in-from-bottom-4 duration-700" data-testid="text-hero-title">
              Your Taxes,<br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Simplified.
              </span>
            </h1>

            <p className="text-white/90 text-xs sm:text-sm md:text-base font-semibold tracking-wide mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100" data-testid="text-hero-trust">
              Licensed • Secure • Fast turnaround
            </p>

            {/* Mobile Founder Image - After Headline */}
            <div className="md:hidden mb-8 flex flex-col items-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-2xl blur-xl"></div>
                <img 
                  src={heroImageSrc}
                  alt="Provision ExperTax Team"
                  className="rounded-2xl shadow-2xl w-full h-72 object-cover object-center relative"
                  data-testid="img-hero-mobile"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = heroImageFallback;
                  }}
                />
                
                {/* Floating Stats Cards for Mobile */}
                <div className="absolute -bottom-3 -left-3 bg-white text-gray-800 p-2 rounded-lg shadow-lg animate-bounce text-xs">
                  <div className="font-bold text-primary text-sm">$2.5M+</div>
                  <div className="text-xs text-gray-600">Refunds</div>
                </div>
                
                <div className="absolute -top-3 -right-3 bg-white text-gray-800 p-2 rounded-lg shadow-lg animate-pulse text-xs">
                  <div className="font-bold text-secondary text-sm">99%</div>
                  <div className="text-xs text-gray-600">On-Time</div>
                </div>
              </div>
            </div>
            
            <p className="text-base md:text-lg lg:text-2xl mb-6 md:mb-8 opacity-90 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150" data-testid="text-hero-description">
              Professional tax preparation, planning, and consultation services tailored to maximize your returns and minimize your stress.
            </p>
            
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 mb-6 md:mb-8 justify-center lg:justify-start gap-4 md:gap-0">
              <div className="flex items-center">
                <CheckCircle className="h-4 md:h-5 w-4 md:w-5 mr-2 text-green-300 flex-shrink-0" />
                <span className="text-xs md:text-sm">Maximum Refund Guarantee</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 md:h-5 w-4 md:w-5 mr-2 text-green-300 flex-shrink-0" />
                <span className="text-xs md:text-sm">Year-Round Support</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto md:flex-row justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              <div className="w-full md:w-auto">
                <Link href="/contact" data-testid="link-get-started" className="block w-full md:w-auto">
                  <Button className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-orange-300 text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-xl font-extrabold hover:from-yellow-200 hover:via-yellow-200 hover:to-orange-200 transition-all duration-300 transform hover:scale-[1.03] shadow-[0_18px_40px_-20px_rgba(253,224,71,0.85)] ring-1 ring-white/20 group text-base md:text-lg w-full md:w-auto">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
                <div className="mt-2 text-xs text-white/80 font-medium text-center md:text-left" data-testid="text-cta-microcopy">
                  Takes less than 2 minutes
                </div>
              </div>

              <Link href="/services" data-testid="link-view-services" className="w-full md:w-auto">
                <Button variant="outline" className="border-2 border-white/90 text-white bg-transparent px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold md:font-semibold hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 text-base md:text-lg backdrop-blur-sm w-full md:w-auto">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-2xl blur-2xl"></div>
              <img 
                src={heroImageSrc}
                alt="Provision ExperTax Team"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover object-center relative transform hover:scale-105 transition-transform duration-500"
                data-testid="img-hero"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = heroImageFallback;
                }}
              />
              
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-800 p-4 rounded-xl shadow-xl animate-bounce">
                <div className="text-2xl font-bold text-primary">$2.5M+</div>
                <div className="text-xs text-gray-600">Refunds Secured</div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white text-gray-800 p-4 rounded-xl shadow-xl animate-pulse">
                <div className="text-2xl font-bold text-secondary">99%</div>
                <div className="text-xs text-gray-600">On-Time Filing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
