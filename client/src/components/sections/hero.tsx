import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-gradient text-white py-20 lg:py-32 relative overflow-hidden" data-testid="hero-section">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Trusted by 500+ Clients</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text" data-testid="text-hero-title">
              Expert Tax Solutions for Your{" "}
              <span className="text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                Success
              </span>
            </h1>

            {/* Mobile Founder Image - After Headline */}
            <div className="lg:hidden mb-8 flex flex-col items-center">
              <div className="relative w-64">
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-2xl blur-xl"></div>
                <img 
                  src="https://iili.io/Kw9hibf.png" 
                  alt="Alexandra - Founder of Provision ExperTax" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover object-center relative"
                  data-testid="img-hero-mobile"
                />
              </div>
              <p className="text-white text-base font-semibold mt-4" data-testid="text-founder-caption-mobile">
                CEO & Founder Alexandra Isaac
              </p>
            </div>
            
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed" data-testid="text-hero-description">
              Professional tax preparation, planning, and consultation services tailored to maximize your returns and minimize your stress.
            </p>
            
            <div className="flex items-center space-x-8 mb-8 justify-center lg:justify-start">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span className="text-sm">Maximum Refund Guarantee</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span className="text-sm">Year-Round Support</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contact" data-testid="link-get-started">
                <Button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl group text-lg">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
              <Link href="/services" data-testid="link-view-services">
                <Button variant="outline" className="border-2 border-white text-white bg-transparent px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 text-lg backdrop-blur-sm">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-2xl blur-2xl"></div>
              <img 
                src="https://iili.io/Kw9hibf.png" 
                alt="Alexandra - Founder of Provision ExperTax" 
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover object-center relative transform hover:scale-105 transition-transform duration-500"
                data-testid="img-hero"
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
            <div className="text-center mt-6">
              <p className="text-white text-lg font-semibold" data-testid="text-founder-caption">
                CEO & Founder Alexandra Isaac
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
