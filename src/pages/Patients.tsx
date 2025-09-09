import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Phone, 
  Mail,
  Calendar,
  Plus
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  riskScore: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  conditions: string[];
  lastContact: string;
  nextAppointment?: string;
  mrn: string;
  primaryCare: string;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Margaret Johnson",
    age: 72,
    riskScore: 87,
    riskLevel: "critical",
    conditions: ["Type 2 Diabetes", "Hypertension", "CHF NYHA III", "CKD Stage 3b"],
    lastContact: "2024-01-15",
    nextAppointment: "2024-01-18",
    mrn: "MRN047291",
    primaryCare: "Dr. Emily Rodriguez"
  },
  {
    id: "2",
    name: "Robert Chen", 
    age: 68,
    riskScore: 74,
    riskLevel: "high",
    conditions: ["COPD Gold Stage 3", "Type 2 Diabetes", "OSA", "Pulmonary HTN"],
    lastContact: "2024-01-08",
    nextAppointment: "2024-01-19",
    mrn: "MRN038472",
    primaryCare: "Dr. Michael Thompson"
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    age: 55,
    riskScore: 61,
    riskLevel: "moderate", 
    conditions: ["HTN Stage 2", "Obesity Class II", "Pre-diabetes", "NASH"],
    lastContact: "2024-01-14",
    mrn: "MRN056839",
    primaryCare: "Dr. Sarah Kim"
  },
  {
    id: "4",
    name: "James Wilson",
    age: 63,
    riskScore: 48,
    riskLevel: "moderate",
    conditions: ["Type 2 Diabetes", "Dyslipidemia", "Neuropathy"],
    lastContact: "2024-01-16",
    nextAppointment: "2024-01-22",
    mrn: "MRN012847",
    primaryCare: "Dr. Jennifer Chen"
  },
  {
    id: "5",
    name: "Patricia Davis",
    age: 74,
    riskScore: 83,
    riskLevel: "critical",
    conditions: ["CHF HFrEF", "Atrial Fibrillation", "CKD Stage 4", "Type 2 Diabetes"],
    lastContact: "2024-01-16", 
    nextAppointment: "2024-01-17",
    mrn: "MRN029384",
    primaryCare: "Dr. Robert Martinez"
  },
  {
    id: "6",
    name: "Sarah Williams",
    age: 58,
    riskScore: 79,
    riskLevel: "high",
    conditions: ["CAD s/p CABG", "Type 2 Diabetes", "HTN", "Major Depression"],
    lastContact: "2024-01-12",
    nextAppointment: "2024-01-20", 
    mrn: "MRN018475",
    primaryCare: "Dr. Lisa Park"
  },
  {
    id: "7",
    name: "Michael Brown",
    age: 66,
    riskScore: 52,
    riskLevel: "moderate",
    conditions: ["COPD Gold Stage 2", "HTN", "Osteoarthritis"],
    lastContact: "2024-01-11",
    nextAppointment: "2024-01-25",
    mrn: "MRN045729",
    primaryCare: "Dr. David Wilson"
  },
  {
    id: "8", 
    name: "Linda Thompson",
    age: 49,
    riskScore: 31,
    riskLevel: "low",
    conditions: ["HTN Stage 1", "Hypothyroidism", "Anxiety"],
    lastContact: "2024-01-12",
    mrn: "MRN037291",
    primaryCare: "Dr. Amanda Foster"
  },
  {
    id: "9",
    name: "David Kim",
    age: 71, 
    riskScore: 35,
    riskLevel: "low",
    conditions: ["Type 2 Diabetes", "Osteoarthritis", "BPH"],
    lastContact: "2024-01-09",
    mrn: "MRN062847",
    primaryCare: "Dr. Kevin Lee"
  },
  {
    id: "10",
    name: "Thomas Anderson",
    age: 59,
    riskScore: 42,
    riskLevel: "moderate",
    conditions: ["HTN", "Type 2 Diabetes", "Hyperlipidemia"],
    lastContact: "2024-01-14",
    mrn: "MRN058394",
    primaryCare: "Dr. Maria Gonzalez"
  },
  {
    id: "11",
    name: "Jennifer Martinez",
    age: 67,
    riskScore: 69,
    riskLevel: "high", 
    conditions: ["Type 2 Diabetes", "Diabetic Nephropathy", "Retinopathy", "HTN"],
    lastContact: "2024-01-13",
    nextAppointment: "2024-01-21",
    mrn: "MRN041728",
    primaryCare: "Dr. Brian Kumar"
  },
  {
    id: "12",
    name: "William Garcia",
    age: 54,
    riskScore: 38,
    riskLevel: "low",
    conditions: ["HTN", "Pre-diabetes"],
    lastContact: "2024-01-10",
    mrn: "MRN075639",
    primaryCare: "Dr. Susan Wright"
  }
];

const getRiskBadgeStyle = (level: string) => {
  switch (level) {
    case 'critical': return 'bg-red-950/30 text-red-300 border-red-500';
    case 'high': return 'bg-orange-950/30 text-orange-300 border-orange-500';
    case 'moderate': return 'bg-yellow-950/30 text-yellow-300 border-yellow-500';
    case 'low': return 'bg-green-950/30 text-green-300 border-green-500';
    default: return 'bg-gray-950/30 text-gray-300 border-gray-500';
  }
};

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Management</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive view of all patients in your care team
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name or MRN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Risk Level
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last Contact
          </Button>
        </div>
      </Card>

      {/* Patients List */}
      <Card className="p-6">
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="font-semibold text-foreground">{patient.name}</h3>
                  <span className="text-sm text-muted-foreground">Age {patient.age}</span>
                  <Badge variant="outline" className={getRiskBadgeStyle(patient.riskLevel)}>
                    {patient.riskLevel.toUpperCase()} - {patient.riskScore}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{patient.mrn}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Conditions:</span>
                    <div className="mt-1">
                      {patient.conditions.map((condition, idx) => (
                        <Badge key={idx} variant="secondary" className="mr-1 mb-1">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Last Contact:</span>
                    <p>{new Date(patient.lastContact).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium">Primary Care:</span>
                    <p>{patient.primaryCare}</p>
                    {patient.nextAppointment && (
                      <>
                        <span className="font-medium">Next Appointment:</span>
                        <p className="text-primary">{new Date(patient.nextAppointment).toLocaleDateString()}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}