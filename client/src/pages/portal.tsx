import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, FileText, Calendar, Upload, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Portal() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" data-testid="page-portal-loading">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-portal">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2" data-testid="text-portal-title">
              Welcome back, {user?.firstName || "Client"}!
            </h1>
            <p className="text-xl text-muted-foreground" data-testid="text-portal-description">
              Manage your tax documents, appointments, and account information
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {user?.profileImageUrl && (
              <img 
                src={user.profileImageUrl} 
                alt="Profile" 
                className="h-12 w-12 rounded-full object-cover border-2 border-primary"
                data-testid="img-user-avatar"
              />
            )}
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/api/logout"}
              className="flex items-center"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card data-testid="card-quick-actions">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common tasks and services you can access
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  onClick={() => window.location.href = "/appointments"}
                  data-testid="button-book-appointment"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Book Appointment</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  data-testid="button-upload-documents"
                >
                  <Upload className="h-6 w-6" />
                  <span>Upload Documents</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  onClick={() => window.location.href = "/contact"}
                  data-testid="button-contact-advisor"
                >
                  <User className="h-6 w-6" />
                  <span>Contact Advisor</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  data-testid="button-view-returns"
                >
                  <FileText className="h-6 w-6" />
                  <span>View Tax Returns</span>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card data-testid="card-recent-activity">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest interactions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg" data-testid="activity-welcome">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Account created</p>
                        <p className="text-sm text-muted-foreground">Welcome to Provision ExperTax Services!</p>
                      </div>
                    </div>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No recent activity yet</p>
                    <p className="text-sm text-muted-foreground">Book an appointment or upload documents to get started</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Account Info & Stats */}
          <div className="space-y-6">
            {/* Account Information */}
            <Card data-testid="card-account-info">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-sm" data-testid="text-user-name">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}` 
                      : 'Not provided'
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm" data-testid="text-user-email">{user?.email || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                  <p className="text-sm" data-testid="text-member-since">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default" data-testid="badge-account-status">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card data-testid="card-quick-stats">
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Appointments</span>
                  <span className="font-semibold" data-testid="stat-appointments">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Documents</span>
                  <span className="font-semibold" data-testid="stat-documents">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tax Returns</span>
                  <span className="font-semibold" data-testid="stat-tax-returns">0</span>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card data-testid="card-support">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our tax experts are here to help you with any questions or concerns.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = "/contact"}
                  data-testid="button-get-help"
                >
                  Get Help
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}