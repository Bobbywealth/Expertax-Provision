import { Users, Award, Calendar, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "500+",
    label: "Clients"
  },
  {
    icon: Award,
    number: "15+",
    label: "Years"
  },
  {
    icon: Calendar,
    number: "99%",
    label: "On-Time"
  },
  {
    icon: TrendingUp,
    number: "$2.5M+",
    label: "Refunds"
  }
];

export default function SidebarStats() {
  return (
    <div className="fixed right-0 top-24 h-screen w-40 bg-gradient-to-b from-primary/15 via-secondary/10 to-accent/15 border-l-2 border-primary/30 overflow-y-auto flex flex-col items-center py-12 gap-8 hidden lg:flex backdrop-blur-sm" data-testid="sidebar-stats">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="flex flex-col items-center gap-3 text-center p-4 hover:scale-110 transition-transform duration-300 cursor-pointer group" data-testid={`sidebar-stat-${index}`}>
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-primary/30 group-hover:border-primary/60 group-hover:bg-primary/10 transition-all duration-300 shadow-lg">
              <IconComponent className="h-7 w-7 text-primary group-hover:text-secondary transition-colors duration-300" />
            </div>
            <div className="text-2xl font-black text-foreground tracking-tight">{stat.number}</div>
            <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
