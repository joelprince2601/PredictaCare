import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  riskLevel?: 'low' | 'moderate' | 'high' | 'critical';
}

export function ScheduleModal({ isOpen, onClose, patientName, riskLevel = "moderate" }: ScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [appointmentType, setAppointmentType] = useState<string>();
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const appointmentTypes = [
    "Follow-up Visit",
    "Care Coordination Call", 
    "Medication Review",
    "Lab Results Discussion",
    "Urgent Consultation",
    "Wellness Check",
    "Specialist Referral",
    "Discharge Planning"
  ];

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-risk-critical/20 text-risk-critical border-risk-critical/40';
      case 'high': return 'bg-risk-high/20 text-risk-high border-risk-high/40';
      case 'moderate': return 'bg-risk-moderate/20 text-risk-moderate border-risk-moderate/40';
      case 'low': return 'bg-risk-low/20 text-risk-low border-risk-low/40';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime || !appointmentType) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, and appointment type.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Appointment Scheduled",
      description: `${appointmentType} scheduled for ${patientName} on ${format(selectedDate, "PPP")} at ${selectedTime}`,
      variant: "default"
    });

    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setAppointmentType(undefined);
    setNotes("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Schedule Appointment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Patient Info */}
          <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{patientName}</h3>
              <Badge variant="outline" className={getRiskBadgeColor(riskLevel)}>
                {riskLevel} risk patient
              </Badge>
            </div>
          </div>

          {/* Appointment Type */}
          <div className="space-y-2">
            <Label>Appointment Type</Label>
            <Select value={appointmentType} onValueChange={setAppointmentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Date</Label>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => 
                  date < new Date() || 
                  date.getDay() === 0 || 
                  date.getDay() === 6
                }
                initialFocus
                className={cn("rounded-lg border pointer-events-auto")}
              />
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="space-y-2">
              <Label>Select Time</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-sm"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes for this appointment..."
              className="min-h-[80px]"
            />
          </div>

          {/* Summary */}
          {selectedDate && selectedTime && appointmentType && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
              <div className="flex items-center space-x-2 text-primary">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Appointment Summary</span>
              </div>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Patient:</span> {patientName}</p>
                <p><span className="font-medium">Type:</span> {appointmentType}</p>
                <p><span className="font-medium">Date:</span> {format(selectedDate, "PPP")}</p>
                <p><span className="font-medium">Time:</span> {selectedTime}</p>
                {notes && <p><span className="font-medium">Notes:</span> {notes}</p>}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSchedule} 
              disabled={!selectedDate || !selectedTime || !appointmentType || isSubmitting}
            >
              {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}