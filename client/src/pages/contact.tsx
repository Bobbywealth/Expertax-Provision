import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ContactForm from "@/components/ui/contact-form";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-contact">
      <Navbar />
      
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-contact-title">
              Get Started Today
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-contact-description">
              Ready to maximize your tax savings? Contact us for a consultation and let our experts handle your tax needs.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6" data-testid="text-contact-info-title">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4" data-testid="contact-phone">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium" data-testid="text-phone-label">Phone</p>
                      <p className="text-muted-foreground" data-testid="text-phone-number">(555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4" data-testid="contact-email">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium" data-testid="text-email-label">Email</p>
                      <p className="text-muted-foreground" data-testid="text-email-address">info@provisionexpertax.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4" data-testid="contact-address">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium" data-testid="text-office-label">Office</p>
                      <p className="text-muted-foreground" data-testid="text-office-address">
                        123 Main Street<br />
                        Suite 200<br />
                        Your City, ST 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4" data-testid="text-hours-title">Office Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between" data-testid="hours-weekday">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between" data-testid="hours-saturday">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between" data-testid="hours-sunday">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
