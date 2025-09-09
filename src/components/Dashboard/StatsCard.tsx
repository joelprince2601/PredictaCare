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
  warning: "bg-amber-50 border-amber-200",
  critical: "bg-red-50 border-red-200", 
  success: "bg-green-50 border-green-200"
};

const iconStyles = {
  default: "text-primary",
  warning: "text-amber-600",
  critical: "text-red-600",
  success: "text-green-600"
};

export function StatsCard({ title, value, change, icon: Icon, variant = 'default' }: StatsCardProps) {
  return (
    <Card className={cn("p-6", variantStyles[variant])}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-sm font-medium",
                change.type === 'increase' ? 'text-green-600' : 
                change.type === 'decrease' ? 'text-red-600' : 
                'text-muted-foreground'
              )}>
                {change.value}
              </span>
              <span className="text-sm text-muted-foreground ml-1">vs last week</span>
            </div>
          )}
        </div>
        <div className={cn(
          "h-12 w-12 rounded-full flex items-center justify-center",
          variant === 'default' ? 'bg-primary/10' :
          variant === 'warning' ? 'bg-amber-100' :
          variant === 'critical' ? 'bg-red-100' :
          'bg-green-100'
        )}>
          <Icon className={cn("h-6 w-6", iconStyles[variant])} />
        </div>
      </div>
    </Card>
  );
}