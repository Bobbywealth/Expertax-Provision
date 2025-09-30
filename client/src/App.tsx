import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Pricing from "@/pages/pricing";
import Agents from "@/pages/agents";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Appointments from "@/pages/appointments";
import TestimonialSubmit from "@/pages/testimonial-submit";
import TestimonialsAdmin from "@/pages/testimonials-admin";
import Calendar from "@/pages/calendar";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/agents" component={Agents} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/appointments" component={Appointments} />
      <Route path="/testimonials/submit" component={TestimonialSubmit} />
      <Route path="/testimonials/admin" component={TestimonialsAdmin} />
      <Route path="/calendar" component={Calendar} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
