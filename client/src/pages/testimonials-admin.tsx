import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Star, Check, X, Eye, Award, Clock, Shield } from "lucide-react";
import { type Testimonial } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "wouter";

export default function TestimonialsAdmin() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pending");

  // Redirect if not authenticated
  if (!authLoading && !user) {
    return <Redirect to="/api/login" />;
  }

  const { data: allTestimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    queryFn: async () => {
      const res = await fetch('/api/testimonials', {
        credentials: 'include'
      });
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      return res.json();
    },
    enabled: !!user,
  });

  const approveTestimonial = useMutation({
    mutationFn: (id: string) => 
      apiRequest("PATCH", `/api/testimonials/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({
        title: "Testimonial approved",
        description: "The testimonial is now visible to the public.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to approve",
        description: error.message || "There was an error approving the testimonial.",
        variant: "destructive",
      });
    },
  });

  const featureTestimonial = useMutation({
    mutationFn: ({ id, featured }: { id: string; featured: boolean }) => 
      apiRequest("PATCH", `/api/testimonials/${id}/feature`, { featured }),
    onSuccess: (_, { featured }) => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({
        title: featured ? "Testimonial featured" : "Feature removed",
        description: featured 
          ? "This testimonial will be prominently displayed."
          : "This testimonial is no longer featured.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "There was an error updating the testimonial.",
        variant: "destructive",
      });
    },
  });

  const pendingTestimonials = allTestimonials.filter(t => !t.approved);
  const approvedTestimonials = allTestimonials.filter(t => t.approved);
  const featuredTestimonials = allTestimonials.filter(t => t.featured);

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <Card className="mb-4" data-testid={`card-testimonial-admin-${testimonial.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{testimonial.clientName}</CardTitle>
            <CardDescription>{testimonial.service || "Tax Services"}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            {testimonial.featured && (
              <Badge variant="secondary" className="gap-1">
                <Award className="w-3 h-3" />
                Featured
              </Badge>
            )}
            {testimonial.approved ? (
              <Badge variant="default" className="gap-1">
                <Check className="w-3 h-3" />
                Approved
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1">
                <Clock className="w-3 h-3" />
                Pending
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 italic">"{testimonial.testimonialText}"</p>
        <div className="text-sm text-muted-foreground mb-4">
          Submitted: {new Date(testimonial.createdAt).toLocaleDateString()}
        </div>
        <div className="flex flex-wrap gap-2">
          {!testimonial.approved && (
            <Button
              size="sm"
              onClick={() => approveTestimonial.mutate(testimonial.id)}
              disabled={approveTestimonial.isPending}
              className="gap-1"
              data-testid={`button-approve-${testimonial.id}`}
            >
              <Check className="w-4 h-4" />
              Approve
            </Button>
          )}
          {testimonial.approved && (
            <Button
              size="sm"
              variant={testimonial.featured ? "outline" : "secondary"}
              onClick={() => featureTestimonial.mutate({ 
                id: testimonial.id, 
                featured: !testimonial.featured 
              })}
              disabled={featureTestimonial.isPending}
              className="gap-1"
              data-testid={`button-feature-${testimonial.id}`}
            >
              <Award className="w-4 h-4" />
              {testimonial.featured ? "Unfeature" : "Feature"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground" data-testid="text-admin-title">
              Testimonials Management
            </h1>
            <p className="text-muted-foreground">
              Review and manage client testimonials
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total">
                {allTestimonials.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600" data-testid="stat-pending">
                {pendingTestimonials.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600" data-testid="stat-approved">
                {approvedTestimonials.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600" data-testid="stat-featured">
                {featuredTestimonials.length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" data-testid="tab-pending">
              Pending ({pendingTestimonials.length})
            </TabsTrigger>
            <TabsTrigger value="approved" data-testid="tab-approved">
              Approved ({approvedTestimonials.length})
            </TabsTrigger>
            <TabsTrigger value="featured" data-testid="tab-featured">
              Featured ({featuredTestimonials.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            {pendingTestimonials.length > 0 ? (
              <div className="space-y-4">
                {pendingTestimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Clock className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No pending testimonials</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            {approvedTestimonials.length > 0 ? (
              <div className="space-y-4">
                {approvedTestimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Check className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No approved testimonials</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="featured" className="mt-6">
            {featuredTestimonials.length > 0 ? (
              <div className="space-y-4">
                {featuredTestimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Award className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No featured testimonials</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}