import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Star, MessageSquare, CheckCircle } from "lucide-react";
import { insertTestimonialSchema, type InsertTestimonial } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const services = [
  "Individual Tax Preparation",
  "Business Tax Filing",
  "Tax Planning & Strategy",
  "IRS Audit Defense",
  "Bookkeeping Services",
  "Payroll Processing",
  "Other"
];

export default function TestimonialSubmit() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertTestimonial>({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      rating: 5,
      testimonialText: "",
      service: "",
    },
  });

  const submitTestimonial = useMutation({
    mutationFn: (data: InsertTestimonial) => 
      apiRequest("POST", "/api/testimonials", data),
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Thank you for your feedback!",
        description: "Your testimonial has been submitted and will be reviewed before publication.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission failed",
        description: error.message || "There was an error submitting your testimonial. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertTestimonial) => {
    submitTestimonial.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Thank You!</CardTitle>
              <CardDescription className="text-lg">
                Your testimonial has been submitted successfully.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                We appreciate you taking the time to share your experience. Your feedback helps us improve our services 
                and helps other clients understand the value we provide.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Your testimonial will be reviewed and may appear on our website once approved.
              </p>
              <Button 
                onClick={() => window.location.href = "/"} 
                className="w-full sm:w-auto"
                data-testid="button-back-home"
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <MessageSquare className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-page-title">
            Share Your Experience
          </h1>
          <p className="text-xl text-muted-foreground">
            We'd love to hear about your experience with our tax services. Your feedback helps us serve you and others better.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit Your Testimonial</CardTitle>
            <CardDescription>
              Tell us about your experience and help others understand the value of our services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your full name" 
                            {...field} 
                            data-testid="input-client-name"
                          />
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            {...field} 
                            data-testid="input-client-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Used</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger data-testid="select-service">
                            <SelectValue placeholder="Select the service you used" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => field.onChange(rating)}
                              className="focus:outline-none"
                              data-testid={`button-rating-${rating}`}
                            >
                              <Star
                                className={`w-8 h-8 transition-colors ${
                                  rating <= field.value
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            </button>
                          ))}
                          <span className="ml-3 text-sm text-muted-foreground">
                            {field.value} out of 5 stars
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="testimonialText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Testimonial</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your experience with our services. What did you like most? How did we help you?"
                          className="min-h-32"
                          {...field}
                          data-testid="textarea-testimonial"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={submitTestimonial.isPending}
                    className="flex-1"
                    data-testid="button-submit-testimonial"
                  >
                    {submitTestimonial.isPending ? "Submitting..." : "Submit Testimonial"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="flex-1 sm:flex-none"
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            By submitting this testimonial, you give us permission to use your feedback for marketing purposes. 
            Your contact information will not be shared publicly.
          </p>
        </div>
      </div>
    </div>
  );
}