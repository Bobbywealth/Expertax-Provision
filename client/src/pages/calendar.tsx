import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, startOfWeek, endOfWeek, parseISO } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, User, Mail, Phone, FileText, Check, X, AlertCircle } from "lucide-react";
import { type Appointment } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "wouter";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300", 
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

const statusIcons = {
  pending: AlertCircle,
  confirmed: Clock,
  completed: Check,
  cancelled: X
};

export default function Calendar() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const { data: appointments = [], isLoading } = useQuery<Appointment[]>({
    queryKey: ['/api/appointments'],
    enabled: !!user,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      apiRequest("PATCH", `/api/appointments/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      setSelectedAppointment(null);
      toast({
        title: "Status updated",
        description: "Appointment status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "There was an error updating the appointment.",
        variant: "destructive",
      });
    },
  });

  // Redirect if not authenticated
  if (!authLoading && !user) {
    return <Redirect to="/api/login" />;
  }

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(appointment => 
      isSameDay(new Date(appointment.appointmentDate), date)
    );
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
    const StatusIcon = statusIcons[appointment.status as keyof typeof statusIcons];
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div 
            className="p-2 mb-1 text-xs bg-primary/10 border border-primary/20 rounded cursor-pointer hover:bg-primary/20 transition-colors"
            data-testid={`appointment-${appointment.id}`}
          >
            <div className="flex items-center gap-1 mb-1">
              <StatusIcon className="w-3 h-3" />
              <span className="font-medium truncate">{appointment.clientName}</span>
            </div>
            <div className="text-muted-foreground">
              {format(new Date(appointment.appointmentDate), 'h:mm a')}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              {format(new Date(appointment.appointmentDate), 'EEEE, MMMM d, yyyy')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Client</label>
                <div className="flex items-center gap-2 mt-1">
                  <User className="w-4 h-4" />
                  <span>{appointment.clientName}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Contact</label>
              <div className="space-y-1 mt-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{appointment.clientEmail}</span>
                </div>
                {appointment.clientPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{appointment.clientPhone}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Service</label>
              <div className="mt-1">{appointment.service}</div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Time & Duration</label>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4" />
                <span>
                  {format(new Date(appointment.appointmentDate), 'h:mm a')} ({appointment.duration} minutes)
                </span>
              </div>
            </div>

            {appointment.notes && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Notes</label>
                <div className="flex items-start gap-2 mt-1">
                  <FileText className="w-4 h-4 mt-0.5" />
                  <span className="text-sm">{appointment.notes}</span>
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Update Status</label>
              <div className="flex gap-2">
                {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={appointment.status === status ? "default" : "outline"}
                    onClick={() => updateStatus.mutate({ id: appointment.id, status })}
                    disabled={updateStatus.isPending}
                    data-testid={`button-status-${status}`}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading calendar...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <CalendarIcon className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground" data-testid="text-calendar-title">
              Appointment Calendar
            </h1>
            <p className="text-muted-foreground">
              View and manage your appointments
            </p>
          </div>
        </div>

        {/* Calendar Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  {format(currentDate, 'MMMM yyyy')}
                </CardTitle>
                <CardDescription>
                  {appointments.length} total appointments
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                  data-testid="button-prev-month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentDate(new Date())}
                  data-testid="button-today"
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                  data-testid="button-next-month"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Calendar Grid */}
        <Card>
          <CardContent className="p-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-px mb-px">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-sm font-medium text-muted-foreground bg-muted/50"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-px">
              {calendarDays.map((day) => {
                const dayAppointments = getAppointmentsForDay(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-32 p-2 bg-background border border-border ${
                      !isCurrentMonth ? 'text-muted-foreground bg-muted/20' : ''
                    } ${isToday ? 'bg-primary/5 border-primary' : ''}`}
                    data-testid={`calendar-day-${format(day, 'yyyy-MM-dd')}`}
                  >
                    <div className={`text-sm font-medium mb-2 ${isToday ? 'text-primary' : ''}`}>
                      {format(day, 'd')}
                    </div>
                    <div className="space-y-1">
                      {dayAppointments.map((appointment) => (
                        <AppointmentCard key={appointment.id} appointment={appointment} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {Object.entries(statusColors).map(([status, colorClass]) => {
            const count = appointments.filter(a => a.status === status).length;
            const StatusIcon = statusIcons[status as keyof typeof statusIcons];
            
            return (
              <Card key={status}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${colorClass}`}>
                      <StatusIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold" data-testid={`stat-${status}`}>
                        {count}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {status}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}