import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  GraduationCap, 
  Stethoscope, 
  Pill, 
  Heart,
  ClipboardList,
  UserCheck
} from "lucide-react";

interface ActionButtonProps {
  action: string;
  patientName: string;
  variant?: "outline" | "ghost" | "default";
  size?: "sm" | "default";
}

export function ActionButton({ action, patientName, variant = "outline", size = "sm" }: ActionButtonProps) {
  const { toast } = useToast();

  const getActionIcon = (actionType: string) => {
    if (actionType.includes("Review")) return <FileText className="h-3 w-3 mr-1" />;
    if (actionType.includes("Education")) return <GraduationCap className="h-3 w-3 mr-1" />;
    if (actionType.includes("Consult")) return <Stethoscope className="h-3 w-3 mr-1" />;
    if (actionType.includes("Pharmacy") || actionType.includes("Medication")) return <Pill className="h-3 w-3 mr-1" />;
    if (actionType.includes("BP") || actionType.includes("Check")) return <Heart className="h-3 w-3 mr-1" />;
    if (actionType.includes("Outreach") || actionType.includes("Coordinator")) return <UserCheck className="h-3 w-3 mr-1" />;
    return <ClipboardList className="h-3 w-3 mr-1" />;
  };

  const getActionLabel = (actionType: string) => {
    if (actionType.includes("Review Care Plan")) return "Review Plan";
    if (actionType.includes("Patient Education")) return "Education";
    if (actionType.includes("Call Pharmacy")) return "Pharmacy";
    if (actionType.includes("Medication Review")) return "Med Review";
    if (actionType.includes("Care Coordinator")) return "Outreach";
    if (actionType.includes("BP Check")) return "BP Check";
    if (actionType.includes("Review Results")) return "Results";
    if (actionType.includes("Review Discharge")) return "Discharge";
    return actionType;
  };

  const handleAction = () => {
    const actionMessages = {
      "Review Care Plan": `Opened care plan for ${patientName}`,
      "Patient Education Call": `Scheduled education call for ${patientName}`,
      "Call Pharmacy": `Contacted pharmacy regarding ${patientName}'s medications`,
      "Medication Review": `Initiated medication review for ${patientName}`,
      "Care Coordinator Outreach": `Care coordinator notified about ${patientName}`,
      "BP Check": `BP monitoring scheduled for ${patientName}`,
      "Review Results": `Lab results reviewed for ${patientName}`,
      "Review Discharge Plan": `Discharge plan reviewed for ${patientName}`,
      "Patient Outreach": `Patient outreach initiated for ${patientName}`,
    };

    const message = actionMessages[action as keyof typeof actionMessages] || 
                   `Action "${action}" completed for ${patientName}`;

    toast({
      title: "Action Completed",
      description: message,
      variant: "default"
    });
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleAction}
    >
      {getActionIcon(action)}
      {getActionLabel(action)}
    </Button>
  );
}