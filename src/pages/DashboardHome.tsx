import { StatsCard } from "@/components/Dashboard/StatsCard";
import { RiskHeatmap } from "@/components/Dashboard/RiskHeatmap";
import { AlertsList } from "@/components/Dashboard/AlertsList";
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Filter,
  RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Care Team Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor patient risk levels and manage care interventions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Patients"
          value="342"
          change={{ value: "+18", type: "increase" }}
          icon={Users}
          variant="default"
        />
        <StatsCard
          title="Critical Risk Patients"
          value="23"
          change={{ value: "+4", type: "increase" }}
          icon={AlertTriangle}
          variant="critical"
        />
        <StatsCard
          title="Average Risk Score"
          value="47.8"
          change={{ value: "-3.2", type: "decrease" }}
          icon={TrendingUp}
          variant="success"
        />
        <StatsCard
          title="Pending Actions"
          value="18"
          change={{ value: "-7", type: "decrease" }}
          icon={Calendar}
          variant="warning"
        />
      </div>

      {/* Risk Trend Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Population Risk Trends</h3>
            <p className="text-sm text-muted-foreground">Risk distribution over the last 30 days</p>
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
        
        {/* Placeholder for chart */}
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Risk trend visualization</p>
            <p className="text-sm text-muted-foreground">Chart component would be rendered here</p>
          </div>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RiskHeatmap />
        <AlertsList />
      </div>
    </div>
  );
}