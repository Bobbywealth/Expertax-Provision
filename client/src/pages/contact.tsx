import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ContactForm from "@/components/ui/contact-form";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-contact">
      <Navbar />
      
      <section className="py-24 bg-gradient-to-br from-background via-background to-foreground/5 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Get In Touch</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight" data-testid="text-contact-title">
              Get Started Today
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-contact-description">
              Ready to maximize your tax savings? Contact us for a consultation and let our experts handle your tax needs.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-black mb-10 text-foreground tracking-tight" data-testid="text-contact-info-title">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="group relative" data-testid="contact-phone">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="relative flex items-start space-x-6 p-6 bg-white border-2 border-border/50 rounded-2xl hover:border-primary/30 transition-all duration-300 backdrop-blur-sm hover:shadow-lg">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-foreground mb-1" data-testid="text-phone-label">Phone</p>
                        <p className="text-muted-foreground text-lg font-semibold" data-testid="text-phone-number">(555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="group relative" data-testid="contact-email">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-secondary/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="relative flex items-start space-x-6 p-6 bg-white border-2 border-border/50 rounded-2xl hover:border-secondary/30 transition-all duration-300 backdrop-blur-sm hover:shadow-lg">
                      <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-foreground mb-1" data-testid="text-email-label">Email</p>
                        <p className="text-muted-foreground text-lg font-semibold" data-testid="text-email-address">info@provisionexpertax.com</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="group relative" data-testid="contact-address">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-accent/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="relative flex items-start space-x-6 p-6 bg-white border-2 border-border/50 rounded-2xl hover:border-accent/30 transition-all duration-300 backdrop-blur-sm hover:shadow-lg">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-foreground mb-1" data-testid="text-office-label">Office</p>
                        <p className="text-muted-foreground text-lg font-semibold" data-testid="text-office-address">
                          123 Main Street<br />
                          Suite 200<br />
                          Your City, ST 12345
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hours */}
              <div className="bg-white border-2 border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3 tracking-tight" data-testid="text-hours-title">
                  <Clock className="h-6 w-6 text-primary" />
                  Office Hours
                </h3>
                <div className="space-y-3 text-foreground font-medium">
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
            <div className="flex items-center">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
