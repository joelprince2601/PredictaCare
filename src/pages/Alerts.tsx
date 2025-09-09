import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  X, 
  Phone,
  Calendar,
  Filter,
  Bell,
  BellOff,
  Archive
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  patient: {
    name: string;
    mrn: string;
    riskScore: number;
  };
  timestamp: string;
  status: 'active' | 'snoozed' | 'resolved';
  actions?: string[];
  priority: 'high' | 'medium' | 'low';
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Emergency Department Visit",
    description: "Patricia Davis admitted to ED with acute SOB and chest pain. Risk score: 83. History of CHF exacerbations.",
    patient: { name: "Patricia Davis", mrn: "MRN029384", riskScore: 83 },
    timestamp: "2024-01-16T10:15:00Z",
    status: "active",
    priority: "high",
    actions: ["Call Patient", "Review Care Plan", "Schedule Follow-up"]
  },
  {
    id: "2",
    type: "critical", 
    title: "Critical Lab Values Alert",
    description: "Margaret Johnson - Creatinine elevated to 2.8 (baseline 1.6). eGFR dropped to 18. Immediate nephrology consult required.",
    patient: { name: "Margaret Johnson", mrn: "MRN047291", riskScore: 87 },
    timestamp: "2024-01-16T09:37:00Z",
    status: "active",
    priority: "high",
    actions: ["Call Patient", "Schedule Urgent Consult"]
  },
  {
    id: "3", 
    type: "warning",
    title: "Multiple Missed Appointments",
    description: "Robert Chen missed both cardiology and endocrinology appointments this week. High-risk COPD + DM patient requiring intensive management.",
    patient: { name: "Robert Chen", mrn: "MRN038472", riskScore: 74 },
    timestamp: "2024-01-16T08:30:00Z",
    status: "active",
    priority: "high",
    actions: ["Schedule Call", "Care Coordinator Outreach"]
  },
  {
    id: "4",
    type: "warning",
    title: "Medication Non-Adherence Critical",
    description: "Sarah Williams - Metformin, Lisinopril, and Atorvastatin not refilled in 12 days. Last HbA1c: 9.2%. High CAD risk post-CABG.",
    patient: { name: "Sarah Williams", mrn: "MRN018475", riskScore: 79 }, 
    timestamp: "2024-01-16T06:00:00Z",
    status: "active",
    priority: "medium",
    actions: ["Call Pharmacy", "Patient Education Call"]
  },
  {
    id: "5",
    type: "info",
    title: "Critical Lab Results Review Needed",
    description: "Maria Rodriguez - HbA1c: 8.9% (up from 7.8%). Lipid panel shows LDL 165, HDL 32. Comprehensive diabetes management review required.",
    patient: { name: "Maria Rodriguez", mrn: "MRN056839", riskScore: 61 },
    timestamp: "2024-01-16T04:20:00Z",
    status: "active", 
    priority: "medium",
    actions: ["Review Results", "Schedule Diabetes Educator"]
  },
  {
    id: "6",
    type: "warning",
    title: "Hypertensive Crisis Risk", 
    description: "Michael Brown - Home BP readings consistently >180/100 over past week. COPD patient on multiple pulmonary medications. Possible drug interaction.",
    patient: { name: "Michael Brown", mrn: "MRN045729", riskScore: 52 },
    timestamp: "2024-01-16T02:15:00Z",
    status: "active",
    priority: "medium",
    actions: ["Medication Review", "Schedule Urgent BP Check"]
  },
  {
    id: "7",
    type: "info",
    title: "Post-Discharge Care Plan",
    description: "Thomas Anderson - Discharged from observation after hypertensive crisis. New medication regimen prescribed. 72-hour follow-up required per protocol.",
    patient: { name: "Thomas Anderson", mrn: "MRN058394", riskScore: 42 },
    timestamp: "2024-01-15T22:30:00Z",
    status: "active",
    priority: "medium",
    actions: ["Review Discharge Plan", "Schedule Follow-up"]
  },
  {
    id: "8",
    type: "warning",
    title: "Multiple Care Gaps Identified",
    description: "Linda Thompson - Mammogram overdue 8 months, colonoscopy overdue 2 years, annual eye exam overdue 14 months. Comprehensive preventive care needed.",
    patient: { name: "Linda Thompson", mrn: "MRN037291", riskScore: 31 },
    timestamp: "2024-01-15T18:45:00Z",
    status: "snoozed",
    priority: "low",
    actions: ["Schedule Screenings", "Patient Education"]
  },
  {
    id: "9",
    type: "critical",
    title: "Diabetic Ketoacidosis Risk",
    description: "Jennifer Martinez - Blood glucose >400 mg/dL reported by patient. History of DKA. Ketones not checked. Immediate evaluation needed.",
    patient: { name: "Jennifer Martinez", mrn: "MRN041728", riskScore: 69 },
    timestamp: "2024-01-15T16:20:00Z",
    status: "active",
    priority: "high",
    actions: ["Emergency Contact", "Direct to ED"]
  },
  {
    id: "10",
    type: "warning",
    title: "CHF Exacerbation Signs",
    description: "Patricia Davis reports 8 lb weight gain over 3 days, increased SOB, ankle swelling. Possible CHF exacerbation in high-risk patient.",
    patient: { name: "Patricia Davis", mrn: "MRN029384", riskScore: 83 },
    timestamp: "2024-01-15T14:10:00Z",
    status: "active", 
    priority: "high",
    actions: ["Urgent Assessment", "Diuretic Protocol"]
  },
  {
    id: "11",
    type: "info",
    title: "Insurance Prior Authorization",
    description: "David Kim - Insurance denied coverage for Jardiance. Patient cannot afford $280/month. Alternative SGLT2 inhibitor or appeal needed.",
    patient: { name: "David Kim", mrn: "MRN062847", riskScore: 35 },
    timestamp: "2024-01-15T11:30:00Z",
    status: "active",
    priority: "low",
    actions: ["Insurance Appeal", "Alternative Medication"]
  },
  {
    id: "12",
    type: "warning",
    title: "Depression Screen Positive",
    description: "William Garcia - PHQ-9 score of 16 (severe depression). New diagnosis in diabetic patient. Suicide risk assessment and psychiatric referral needed.",
    patient: { name: "William Garcia", mrn: "MRN075639", riskScore: 38 },
    timestamp: "2024-01-15T09:15:00Z",
    status: "active",
    priority: "medium", 
    actions: ["Psychiatric Referral", "Safety Assessment"]
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

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-950/30 text-red-300 border-red-500';
    case 'medium': return 'bg-yellow-950/30 text-yellow-300 border-yellow-500';
    case 'low': return 'bg-green-950/30 text-green-300 border-green-500';
    default: return 'bg-gray-950/30 text-gray-300 border-gray-500';
  }
};

export default function Alerts() {
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'snoozed'>('all');

  const filteredAlerts = mockAlerts.filter(alert => 
    filterStatus === 'all' || alert.status === filterStatus
  );

  const handleSelectAlert = (alertId: string, checked: boolean) => {
    if (checked) {
      setSelectedAlerts([...selectedAlerts, alertId]);
    } else {
      setSelectedAlerts(selectedAlerts.filter(id => id !== alertId));
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alert Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage patient alerts and notifications
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" disabled={selectedAlerts.length === 0}>
            <BellOff className="h-4 w-4 mr-2" />
            Snooze ({selectedAlerts.length})
          </Button>
          <Button variant="outline" size="sm" disabled={selectedAlerts.length === 0}>
            <Archive className="h-4 w-4 mr-2" />
            Archive ({selectedAlerts.length})
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant={filterStatus === 'all' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            All Alerts ({mockAlerts.length})
          </Button>
          <Button 
            variant={filterStatus === 'active' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setFilterStatus('active')}
          >
            <Bell className="h-4 w-4 mr-1" />
            Active ({mockAlerts.filter(a => a.status === 'active').length})
          </Button>
          <Button 
            variant={filterStatus === 'snoozed' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setFilterStatus('snoozed')}
          >
            <BellOff className="h-4 w-4 mr-1" />
            Snoozed ({mockAlerts.filter(a => a.status === 'snoozed').length})
          </Button>
        </div>
      </Card>

      {/* Alerts List */}
      <Card className="p-6">
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                "flex items-start space-x-4 p-4 rounded-lg border transition-colors",
                alert.status === 'snoozed' ? 'bg-muted/30' : 'hover:bg-muted/50',
                alert.priority === 'high' ? 'border-l-4 border-l-red-500' : 
                alert.priority === 'medium' ? 'border-l-4 border-l-amber-500' :
                'border-l-4 border-l-green-500'
              )}
            >
              <Checkbox
                checked={selectedAlerts.includes(alert.id)}
                onCheckedChange={(checked) => handleSelectAlert(alert.id, checked as boolean)}
                className="mt-1"
              />
              
              <div className="flex-shrink-0 mt-1">
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-foreground">{alert.title}</h4>
                  <Badge variant="outline" className={getAlertBadge(alert.type)}>
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                  </Badge>
                  <Badge variant="outline" className={getPriorityBadge(alert.priority)}>
                    {alert.priority} priority
                  </Badge>
                  {alert.status === 'snoozed' && (
                    <Badge variant="outline" className="bg-gray-100 text-gray-600">
                      Snoozed
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>
                      Patient: {alert.patient.name} ({alert.patient.mrn})
                    </span>
                    <span>Risk Score: {alert.patient.riskScore}</span>
                    <span>{formatTimestamp(alert.timestamp)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {alert.actions?.includes("Call Patient") && (
                      <Button variant="outline" size="sm">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    )}
                    {alert.actions?.includes("Schedule Call") && (
                      <Button variant="outline" size="sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <BellOff className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}