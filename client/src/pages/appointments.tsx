import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, User, CheckCircle } from "lucide-react";
import { format, addDays, startOfDay, isAfter, isWeekend } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import type { Agent } from "@shared/schema";

const appointmentSchema = z.object({
  clientName: z.string().min(1, "Name is required"),
  clientEmail: z.string().email("Please enter a valid email address"),
  clientPhone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  agentId: z.string().optional(),
  appointmentDate: z.date({
    required_error: "Please select a date and time",
  }),
  notes: z.string().optional(),
});

type AppointmentForm = z.infer<typeof appointmentSchema>;

const services = [
  "Individual Tax Preparation",
  "Business Tax Services", 
  "Tax Planning Consultation",
  "IRS Audit Defense",
  "Tax Resolution Services",
  "Estate Planning",
  "Bookkeeping Services",
  "General Consultation"
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
];

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookingStep, setBookingStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<AppointmentForm>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      service: "",
      notes: "",
    },
  });

  // Fetch agents for selection
  const { data: agents = [], isLoading: agentsLoading } = useQuery<Agent[]>({
    queryKey: ['/api/agents'],
    queryFn: async () => {
      const response = await fetch('/api/agents');
      if (!response.ok) {
        throw new Error('Failed to fetch agents');
      }
      return response.json();
    },
  });

  // Create appointment mutation
  const createAppointment = useMutation({
    mutationFn: async (data: AppointmentForm) => {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to book appointment');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Appointment Booked!",
        description: "Your appointment has been scheduled successfully. We'll send you a confirmation email shortly.",
      });
      setBookingStep(4); // Success step
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDateTimeSelect = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    // Parse time and combine with date
    const [time, period] = selectedTime.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    const appointmentDateTime = new Date(selectedDate);
    appointmentDateTime.setHours(hour, parseInt(minutes), 0, 0);
    
    form.setValue('appointmentDate', appointmentDateTime);
    setBookingStep(2);
  };

  const handleServiceSelect = () => {
    if (!form.watch('service')) {
      toast({
        title: "Missing Information", 
        description: "Please select a service for your appointment.",
        variant: "destructive",
      });
      return;
    }
    setBookingStep(3);
  };

  const onSubmit = async (data: AppointmentForm) => {
    // Convert "any" agent selection to undefined for backend
    const submitData = {
      ...data,
      agentId: data.agentId === "any" ? undefined : data.agentId,
    };
    createAppointment.mutate(submitData);
  };

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());
    return !isAfter(date, addDays(today, -1)) || isWeekend(date);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-appointments">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-appointments-title">
            Schedule Your Tax Consultation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-appointments-description">
            Book an appointment with one of our expert tax professionals. Choose a convenient time and we'll handle the rest.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  bookingStep >= step 
                    ? "bg-primary text-white" 
                    : "bg-muted text-muted-foreground"
                )} data-testid={`progress-step-${step}`}>
                  {bookingStep > step ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step
                  )}
                </div>
                {step < 4 && (
                  <div className={cn(
                    "w-12 h-0.5 mx-2",
                    bookingStep > step ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Steps */}
          <div>
            {/* Step 1: Date & Time Selection */}
            {bookingStep === 1 && (
              <Card data-testid="card-datetime-selection">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Select Date & Time
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred appointment date and time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Date</label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={isDateDisabled}
                      className="rounded-md border"
                      data-testid="calendar-date-picker"
                    />
                  </div>
                  
                  {selectedDate && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            data-testid={`button-time-${time.replace(/[:\s]/g, '-')}`}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleDateTimeSelect} 
                    className="w-full"
                    disabled={!selectedDate || !selectedTime}
                    data-testid="button-continue-datetime"
                  >
                    Continue to Service Selection
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Service Selection */}
            {bookingStep === 2 && (
              <Card data-testid="card-service-selection">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Select Service
                  </CardTitle>
                  <CardDescription>
                    What type of tax service do you need help with?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Form {...form}>
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-service-type">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service} value={service} data-testid={`option-service-${service.replace(/\s/g, '-').toLowerCase()}`}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {!agentsLoading && agents.length > 0 && (
                      <FormField
                        control={form.control}
                        name="agentId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Agent (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-preferred-agent">
                                  <SelectValue placeholder="Any available agent" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="any" data-testid="option-agent-any">Any Available Agent</SelectItem>
                                {agents.map((agent) => (
                                  <SelectItem key={agent.id} value={agent.id} data-testid={`option-agent-${agent.name.replace(/\s/g, '-').toLowerCase()}`}>
                                    {agent.name} - {agent.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </Form>

                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setBookingStep(1)}
                      data-testid="button-back-to-datetime"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleServiceSelect} 
                      className="flex-1"
                      data-testid="button-continue-to-details"
                    >
                      Continue to Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Contact Details */}
            {bookingStep === 3 && (
              <Card data-testid="card-contact-details">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Your Details
                  </CardTitle>
                  <CardDescription>
                    Please provide your contact information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="clientName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-client-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="clientEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} data-testid="input-client-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="clientPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} data-testid="input-client-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us more about what you need help with..."
                                className="min-h-[100px]"
                                {...field}
                                data-testid="textarea-appointment-notes"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-4">
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={() => setBookingStep(2)}
                          data-testid="button-back-to-service"
                        >
                          Back
                        </Button>
                        <Button 
                          type="submit" 
                          className="flex-1"
                          disabled={createAppointment.isPending}
                          data-testid="button-book-appointment"
                        >
                          {createAppointment.isPending ? "Booking..." : "Book Appointment"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Success */}
            {bookingStep === 4 && (
              <Card className="text-center" data-testid="card-booking-success">
                <CardContent className="pt-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2" data-testid="text-success-title">
                    Appointment Booked!
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid="text-success-description">
                    Your appointment has been scheduled successfully. We'll send you a confirmation email with all the details.
                  </p>
                  <Button 
                    onClick={() => {
                      setBookingStep(1);
                      setSelectedDate(undefined);
                      setSelectedTime("");
                      form.reset();
                    }}
                    data-testid="button-book-another"
                  >
                    Book Another Appointment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Summary */}
          <div>
            <Card className="sticky top-8" data-testid="card-appointment-summary">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Appointment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span data-testid="text-summary-date">
                      {selectedDate ? format(selectedDate, "PPPP") : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span data-testid="text-summary-time">
                      {selectedTime || "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="text-right" data-testid="text-summary-service">
                      {form.watch('service') || "Not selected"}
                    </span>
                  </div>
                  {form.watch('agentId') && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Agent:</span>
                      <span data-testid="text-summary-agent">
                        {form.watch('agentId') === "any" 
                          ? "Any Available Agent" 
                          : agents.find((agent) => agent.id === form.watch('agentId'))?.name || "Any Available"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground" data-testid="text-summary-note">
                    <strong>Note:</strong> You'll receive a confirmation email with detailed instructions and any documents you should bring to your appointment.
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Office Information</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Provision ExperTax Services</p>
                    <p>1234 Business Blvd, Suite 100</p>
                    <p>Professional Plaza, CA 90210</p>
                    <p>(555) 123-4567</p>
                  </div>
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