import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Appointments() {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  // Fetch Calendly user info to get the correct URL
  const { data: calendlyUser, isLoading: userLoading } = useQuery({
    queryKey: ['/api/calendly/user'],
    retry: false,
  });

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setCalendlyLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Extract scheduling URL from user data
  const calendlyUrl = (calendlyUser as any)?.resource?.scheduling_url || 'https://calendly.com/provisionexpertax';

  return (
    <div className="min-h-screen bg-background" data-testid="page-appointments">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-appointments-title">
            Schedule Your Tax Consultation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-appointments-description">
            Book an appointment with one of our expert tax professionals. Choose a convenient time that works for your schedule.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Calendly Widget */}
          <div className="lg:col-span-2">
            <Card data-testid="card-calendly-booking">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Book Your Appointment
                </CardTitle>
                <CardDescription>
                  Select your preferred date and time from the available slots below
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {/* Calendly inline widget */}
                {userLoading || !calendlyLoaded ? (
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                ) : (
                  <div 
                    className="calendly-inline-widget" 
                    data-url={calendlyUrl}
                    style={{ minWidth: '320px', height: '700px' }}
                    data-testid="calendly-widget"
                  ></div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Information */}
          <div className="space-y-6">
            {/* Services Information */}
            <Card data-testid="card-services-info">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Our Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Individual Tax Preparation</span>
                    <span className="text-muted-foreground">60 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Business Tax Services</span>
                    <span className="text-muted-foreground">90 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax Planning Consultation</span>
                    <span className="text-muted-foreground">45 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>IRS Audit Defense</span>
                    <span className="text-muted-foreground">60 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax Resolution Services</span>
                    <span className="text-muted-foreground">75 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estate Planning</span>
                    <span className="text-muted-foreground">90 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Bookkeeping Services</span>
                    <span className="text-muted-foreground">45 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>General Consultation</span>
                    <span className="text-muted-foreground">30 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Information */}
            <Card data-testid="card-office-info">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Office Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Address</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Provision ExperTax Services</p>
                    <p>6250 W Oakland Park Blvd, Suite 9</p>
                    <p>Sunrise, FL 33313</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Contact</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href="tel:+17863522038" className="hover:text-primary transition-colors">
                        786-352-2038
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <a
                        href="mailto:Isaacalexandra.ststaxrepair@gmail.com"
                        className="hover:text-primary transition-colors"
                      >
                        Isaacalexandra.ststaxrepair@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Office Hours</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What to Bring */}
            <Card data-testid="card-preparation-info">
              <CardHeader>
                <CardTitle>What to Bring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Tax documents from previous year</p>
                  <p>• W-2s and 1099 forms</p>
                  <p>• Business receipts and expenses</p>
                  <p>• Bank statements</p>
                  <p>• Any relevant financial documents</p>
                  <p className="mt-4 text-xs">
                    <strong>Note:</strong> A detailed list will be sent via email after booking.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}