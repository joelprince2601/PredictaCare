import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  name: string;
  age: number;
  riskScore: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  lastContact: string;
  conditions: string[];
  nextAppointment?: string;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Margaret Johnson",
    age: 72,
    riskScore: 87,
    riskLevel: "critical",
    lastContact: "2 days ago",
    conditions: ["Type 2 Diabetes", "Hypertension", "CHF", "CKD Stage 3"],
    nextAppointment: "Tomorrow 2:00 PM"
  },
  {
    id: "2", 
    name: "Robert Chen",
    age: 68,
    riskScore: 74,
    riskLevel: "high",
    lastContact: "1 week ago",
    conditions: ["COPD Gold Stage 3", "Type 2 Diabetes", "OSA"],
    nextAppointment: "Friday 10:00 AM"
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    age: 55,
    riskScore: 61,
    riskLevel: "moderate",
    lastContact: "3 days ago",
    conditions: ["HTN", "Obesity Class II", "Pre-diabetes"],
  },
  {
    id: "4",
    name: "James Wilson",
    age: 63,
    riskScore: 48,
    riskLevel: "moderate",
    lastContact: "1 day ago",
    conditions: ["Type 2 Diabetes", "Dyslipidemia"],
    nextAppointment: "Jan 22, 10:00 AM"
  },
  {
    id: "5",
    name: "Linda Thompson",
    age: 49,
    riskScore: 31,
    riskLevel: "low",
    lastContact: "5 days ago",
    conditions: ["HTN", "Hypothyroidism"],
  },
  {
    id: "6",
    name: "David Kim",
    age: 71,
    riskScore: 35,
    riskLevel: "low",
    lastContact: "1 week ago",
    conditions: ["Type 2 Diabetes", "Osteoarthritis"],
  },
  {
    id: "7",
    name: "Sarah Williams", 
    age: 58,
    riskScore: 79,
    riskLevel: "high",
    lastContact: "4 days ago",
    conditions: ["CAD", "Type 2 Diabetes", "HTN", "Depression"],
    nextAppointment: "Jan 20, 3:30 PM"
  },
  {
    id: "8",
    name: "Michael Brown",
    age: 66,
    riskScore: 52,
    riskLevel: "moderate", 
    lastContact: "6 days ago",
    conditions: ["COPD", "HTN"],
    nextAppointment: "Jan 25, 9:00 AM"
  },
  {
    id: "9",
    name: "Patricia Davis",
    age: 74,
    riskScore: 83,
    riskLevel: "critical",
    lastContact: "1 day ago",
    conditions: ["CHF", "AFib", "CKD Stage 4", "Type 2 Diabetes"],
    nextAppointment: "Today 4:00 PM"
  },
  {
    id: "10",
    name: "Thomas Anderson",
    age: 59,
    riskScore: 42,
    riskLevel: "moderate",
    lastContact: "3 days ago", 
    conditions: ["HTN", "Type 2 Diabetes"],
  }
];

const getRiskColor = (level: string) => {
  switch (level) {
    case 'critical': return 'bg-red-900/30 border-red-500 text-red-300';
    case 'high': return 'bg-orange-900/30 border-orange-500 text-orange-300';
    case 'moderate': return 'bg-yellow-900/30 border-yellow-500 text-yellow-300';
    case 'low': return 'bg-green-900/30 border-green-500 text-green-300';
    default: return 'bg-gray-900/30 border-gray-500 text-gray-300';
  }
};

export function RiskHeatmap() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Patient Risk Cohort</h3>
          <p className="text-sm text-muted-foreground">Active patients sorted by risk level</p>
        </div>
        <Button variant="outline" size="sm">
          View All Patients
        </Button>
      </div>

      <div className="space-y-3">
        {mockPatients.map((patient) => (
          <div key={patient.id} className={cn(
            "p-4 rounded-lg border-l-4 transition-colors hover:bg-muted/50",
            patient.riskLevel === 'critical' ? 'border-l-red-500 bg-red-950/20' :
            patient.riskLevel === 'high' ? 'border-l-orange-500 bg-orange-950/20' :
            patient.riskLevel === 'moderate' ? 'border-l-yellow-500 bg-yellow-950/20' :
            'border-l-green-500 bg-green-950/20'
          )}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-foreground">{patient.name}</h4>
                  <span className="text-sm text-muted-foreground">Age {patient.age}</span>
                  <Badge 
                    variant="outline" 
                    className={getRiskColor(patient.riskLevel)}
                  >
                    Risk: {patient.riskScore}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <span>Last contact: {patient.lastContact}</span>
                  <span>Conditions: {patient.conditions.join(", ")}</span>
                  {patient.nextAppointment && (
                    <span className="text-primary font-medium">
                      Next: {patient.nextAppointment}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}