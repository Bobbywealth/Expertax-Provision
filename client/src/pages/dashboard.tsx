import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, User, Mail, Phone, FileText, Check, X, AlertCircle, LogOut, Settings, CheckCircle } from "lucide-react";
import { type Appointment } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

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

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const { data: appointments = [], isLoading } = useQuery<Appointment[]>({
    queryKey: ['/api/calendly/events'],
    enabled: !!user,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      apiRequest("PATCH", `/api/appointments/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/calendly/events'] });
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

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLocation("/login");
      },
    });
  };

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

            {(appointment as any).source !== 'calendly' && (
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
            )}
            
            {(appointment as any).source === 'calendly' && (
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="w-4 h-4" />
                  <span>This appointment was booked through Calendly. Manage it through your Calendly account.</span>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-dashboard">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <CalendarIcon className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground" data-testid="text-dashboard-title">
                  Tax Management Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back, {user?.firstName || user?.username}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                  <p className="text-2xl font-bold text-foreground">{appointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">
                    {appointments.filter(apt => apt.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {appointments.filter(apt => apt.status === 'confirmed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {appointments.filter(apt => apt.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  {format(currentDate, 'MMMM yyyy')}
                </CardTitle>
                <CardDescription>
                  Calendar view of your appointments
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
          <CardContent>
            <div className="grid grid-cols-7 gap-px bg-muted">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="bg-background p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, dayIdx) => {
                const appointmentsForDay = getAppointmentsForDay(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={day.toString()}
                    className={`bg-background p-2 min-h-[120px] ${
                      !isCurrentMonth ? 'text-muted-foreground bg-muted/30' : ''
                    } ${isToday ? 'bg-primary/5 ring-2 ring-primary/20' : ''}`}
                    data-testid={`calendar-day-${format(day, 'yyyy-MM-dd')}`}
                  >
                    <div className="font-medium mb-1">
                      {format(day, 'd')}
                    </div>
                    <div className="space-y-1">
                      {appointmentsForDay.map((appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}