import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: LucideIcon;
  variant?: 'default' | 'warning' | 'critical' | 'success';
}

const variantStyles = {
  default: "bg-card border-border",
  warning: "bg-risk-moderate/10 border-risk-moderate/30",
  critical: "bg-risk-critical/10 border-risk-critical/30", 
  success: "bg-risk-low/10 border-risk-low/30"
};

const iconStyles = {
  default: "text-primary",
  warning: "text-risk-moderate",
  critical: "text-risk-critical",
  success: "text-risk-low"
};

export function StatsCard({ title, value, change, icon: Icon, variant = 'default' }: StatsCardProps) {
  return (
    <Card className={cn("p-8", variantStyles[variant])}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2 mb-3">{value}</p>
          {change && (
            <div className="flex items-center mt-3">
              <span className={cn(
                "text-sm font-medium",
                change.type === 'increase' ? 'text-status-success' : 
                change.type === 'decrease' ? 'text-risk-critical' : 
                'text-muted-foreground'
              )}>
                {change.value}
              </span>
              <span className="text-sm text-muted-foreground ml-1">vs last week</span>
            </div>
          )}
        </div>
        <div className={cn(
          "h-14 w-14 rounded-full flex items-center justify-center",
          variant === 'default' ? 'bg-primary/10' :
          variant === 'warning' ? 'bg-risk-moderate/10' :
          variant === 'critical' ? 'bg-risk-critical/10' :
          'bg-risk-low/10'
        )}>
          <Icon className={cn("h-7 w-7", iconStyles[variant])} />
        </div>
      </div>
    </Card>
  );
}