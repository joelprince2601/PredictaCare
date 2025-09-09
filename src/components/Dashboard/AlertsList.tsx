import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  X, 
  Phone,
  Calendar 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  patient: string;
  timestamp: string;
  actions?: string[];
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Emergency Department Visit",
    description: "Patricia Davis admitted to ED with acute SOB and chest pain. Risk score: 83. History of CHF exacerbations.",
    patient: "Patricia Davis",
    timestamp: "8 minutes ago",
    actions: ["Call Patient", "Review Care Plan"]
  },
  {
    id: "2",
    type: "critical", 
    title: "Urgent Lab Values",
    description: "Margaret Johnson - Creatinine elevated to 2.8 (baseline 1.6). eGFR dropped to 18. Nephrology consult needed.",
    patient: "Margaret Johnson",
    timestamp: "23 minutes ago",
    actions: ["Call Patient", "Schedule Urgent Consult"]
  },
  {
    id: "3", 
    type: "warning",
    title: "Multiple Missed Appointments",
    description: "Robert Chen missed cardiology and endocrinology appointments this week. High-risk COPD + DM patient (Score: 74)",
    patient: "Robert Chen",
    timestamp: "1.5 hours ago",
    actions: ["Schedule Call", "Care Coordinator Outreach"]
  },
  {
    id: "4",
    type: "warning",
    title: "Medication Non-Adherence Alert",
    description: "Sarah Williams - Metformin and Lisinopril not refilled in 12 days. Last HbA1c: 9.2%. High CAD risk.",
    patient: "Sarah Williams", 
    timestamp: "2 hours ago",
    actions: ["Call Pharmacy", "Patient Education Call"]
  },
  {
    id: "5",
    type: "info",
    title: "Critical Lab Results Posted",
    description: "Maria Rodriguez - HbA1c: 8.9% (up from 7.8%). Lipid panel shows LDL 165. Diabetes management review needed.",
    patient: "Maria Rodriguez",
    timestamp: "3.2 hours ago",
    actions: ["Review Results", "Schedule Diabetes Educator"]
  },
  {
    id: "6",
    type: "warning",
    title: "BP Readings Out of Range", 
    description: "Michael Brown - Home BP readings averaging 168/94 over past week. COPD patient on multiple medications.",
    patient: "Michael Brown",
    timestamp: "4 hours ago",
    actions: ["Medication Review", "Schedule BP Check"]
  },
  {
    id: "7",
    type: "info",
    title: "Discharge Summary Available",
    description: "Thomas Anderson - Discharged from observation unit after HTN crisis. New medications prescribed. Follow-up needed in 3 days.",
    patient: "Thomas Anderson",
    timestamp: "5.5 hours ago",
    actions: ["Review Discharge Plan", "Schedule Follow-up"]
  },
  {
    id: "8",
    type: "warning",
    title: "Overdue Preventive Care",
    description: "Linda Thompson - Mammogram overdue by 8 months, colonoscopy overdue by 2 years. Multiple care gaps identified.",
    patient: "Linda Thompson",
    timestamp: "6 hours ago", 
    actions: ["Schedule Screenings", "Patient Outreach"]
  }
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'critical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
    case 'warning': return <Clock className="h-5 w-5 text-amber-600" />;
    case 'info': return <CheckCircle className="h-5 w-5 text-blue-600" />;
    default: return <AlertTriangle className="h-5 w-5" />;
  }
};

const getAlertBadge = (type: string) => {
  switch (type) {
    case 'critical': return 'bg-red-950/30 text-red-300 border-red-500';
    case 'warning': return 'bg-amber-950/30 text-amber-300 border-amber-500';  
    case 'info': return 'bg-blue-950/30 text-blue-300 border-blue-500';
    default: return 'bg-gray-950/30 text-gray-300 border-gray-500';
  }
};

export function AlertsList() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
          <p className="text-sm text-muted-foreground">Actionable notifications requiring attention</p>
        </div>
        <Button variant="outline" size="sm">
          View All Alerts
        </Button>
      </div>

      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <div className="flex-shrink-0 mt-1">
              {getAlertIcon(alert.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-foreground">{alert.title}</h4>
                <Badge variant="outline" className={getAlertBadge(alert.type)}>
                  {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Patient: {alert.patient}</span>
                  <span>{alert.timestamp}</span>
                </div>
                
                {alert.actions && (
                  <div className="flex items-center space-x-2">
                    {alert.actions.includes("Call Patient") && (
                      <Button variant="outline" size="sm">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    )}
                    {alert.actions.includes("Schedule Call") && (
                      <Button variant="outline" size="sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}