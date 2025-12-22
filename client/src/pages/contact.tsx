import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ContactForm from "@/components/ui/contact-form";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-contact">
      <Navbar />
      
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-foreground/5 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl hidden md:block"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl hidden md:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-block mb-3 md:mb-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Get In Touch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-3 md:mb-6 tracking-tight" data-testid="text-contact-title">
              Get Started Today
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-contact-description">
              Ready to maximize your tax savings? Contact us for a consultation and let our experts handle your tax needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-6 md:space-y-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 text-foreground tracking-tight" data-testid="text-contact-info-title">
                  Contact Information
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  {/* Phone */}
                  <div className="group relative" data-testid="contact-phone">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="relative flex items-start space-x-4 md:space-x-6 p-4 md:p-6 bg-white border-2 border-border/50 rounded-xl md:rounded-2xl hover:border-primary/30 transition-all duration-300 backdrop-blur-sm hover:shadow-lg">
                      <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 md:h-8 w-6 md:w-8 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-base md:text-lg text-foreground mb-1" data-testid="text-phone-label">Phone</p>
                        <a
                          href="tel:+17863522038"
                          className="text-muted-foreground text-sm md:text-lg font-semibold hover:text-primary transition-colors"
                          data-testid="text-phone-number"
                        >
                          786-352-2038
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="group relative" data-testid="contact-email">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="relative flex items-start space-x-4 md:space-x-6 p-4 md:p-6 bg-white border-2 border-border/50 rounded-xl md:rounded-2xl hover:border-secondary/30 transition-all duration-300 backdrop-blur-sm hover:shadow-lg">
                      <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 md:h-8 w-6 md:w-8 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-base md:text-lg text-foreground mb-1" data-testid="text-email-label">Email</p>
                        <a
                          href="mailto:Isaacalexandra.ststaxrepair@gmail.com"
                          className="text-muted-foreground text-xs sm:text-sm md:text-lg font-semibold truncate hover:text-secondary transition-colors block"
                          data-testid="text-email-address"
                        >
                          Isaacalexandra.ststaxrepair@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="group relative" data-testid="contact-address">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-accent/50 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="relative flex items-start space-x-4 md:space-x-6 p-4 md:p-6 bg-white border-2 border-border/50 rounded-xl md:rounded-2xl hover:border-accent/30 transition-all duration-300 backdrop-blur-sm hover:shadow-lg">
                      <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-accent to-accent/80 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 md:h-8 w-6 md:w-8 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-base md:text-lg text-foreground mb-1" data-testid="text-office-label">Office</p>
                        <p className="text-muted-foreground text-xs sm:text-sm md:text-lg font-semibold leading-tight" data-testid="text-office-address">
                          6250 W Oakland Park Blvd<br />
                          Suite 9<br />
                          Sunrise, FL 33313
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hours */}
              <div className="bg-white border-2 border-border/50 rounded-xl md:rounded-2xl p-5 md:p-8 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground flex items-center gap-2 md:gap-3 tracking-tight" data-testid="text-hours-title">
                  <Clock className="h-5 md:h-6 w-5 md:w-6 text-primary flex-shrink-0" />
                  Office Hours
                </h3>
                <div className="space-y-2 md:space-y-3 text-foreground font-medium text-sm md:text-base">
                  <div className="flex justify-between pb-3 border-b border-border/30" data-testid="hours-weekday">
                    <span>Monday - Friday:</span>
                    <span className="font-bold text-primary">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-border/30" data-testid="hours-saturday">
                    <span>Saturday:</span>
                    <span className="font-bold text-secondary">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between" data-testid="hours-sunday">
                    <span>Sunday:</span>
                    <span className="font-bold text-accent">Closed</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="flex items-center justify-center md:items-start">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
