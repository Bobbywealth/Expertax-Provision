import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, Award, Calendar, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "500+",
    label: "Happy Clients"
  },
  {
    icon: Award,
    number: "15+",
    label: "Years Experience"
  },
  {
    icon: Calendar,
    number: "99%",
    label: "On-Time Filing"
  },
  {
    icon: TrendingUp,
    number: "$2.5M+",
    label: "Refunds Secured"
  }
];

export default function SidebarStats() {
  return (
    <div className="fixed right-0 top-24 h-screen w-32 bg-gradient-to-b from-primary/10 to-secondary/10 border-l border-border overflow-y-auto flex flex-col items-center py-8 gap-6 hidden lg:flex" data-testid="sidebar-stats">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="flex flex-col items-center gap-2 text-center p-3" data-testid={`sidebar-stat-${index}`}>
            <IconComponent className="h-6 w-6 text-primary" />
            <div className="text-2xl font-bold text-foreground text-sm">{stat.number}</div>
            <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
