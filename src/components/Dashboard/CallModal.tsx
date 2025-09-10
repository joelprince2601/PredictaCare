import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  Clock,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  patientPhone?: string;
  riskLevel?: 'low' | 'moderate' | 'high' | 'critical';
}

type CallStatus = 'dialing' | 'connecting' | 'connected' | 'ended';

export function CallModal({ isOpen, onClose, patientName, patientPhone = "(555) 123-4567", riskLevel = "moderate" }: CallModalProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>('dialing');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCallStatus('dialing');
      setCallDuration(0);
      setIsMuted(false);
      setIsOnHold(false);
      return;
    }

    const timer = setTimeout(() => {
      if (callStatus === 'dialing') {
        setCallStatus('connecting');
      } else if (callStatus === 'connecting') {
        setCallStatus('connected');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen, callStatus]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-risk-critical/20 text-risk-critical border-risk-critical/40';
      case 'high': return 'bg-risk-high/20 text-risk-high border-risk-high/40';
      case 'moderate': return 'bg-risk-moderate/20 text-risk-moderate border-risk-moderate/40';
      case 'low': return 'bg-risk-low/20 text-risk-low border-risk-low/40';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {callStatus === 'ended' ? 'Call Ended' : 'Patient Call'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-6">
          {/* Patient Info */}
          <div className="text-center space-y-3">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{patientName}</h3>
              <p className="text-sm text-muted-foreground">{patientPhone}</p>
              <Badge variant="outline" className={getRiskBadgeColor(riskLevel)}>
                {riskLevel} risk
              </Badge>
            </div>
          </div>

          {/* Call Status */}
          <div className="text-center space-y-2">
            {callStatus === 'dialing' && (
              <>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">Dialing...</span>
                </div>
                <div className="flex space-x-1 justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                </div>
              </>
            )}

            {callStatus === 'connecting' && (
              <>
                <div className="flex items-center justify-center space-x-2">
                  <PhoneCall className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">Connecting...</span>
                </div>
              </>
            )}

            {callStatus === 'connected' && (
              <>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-status-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-status-success font-medium">Connected</span>
                </div>
                <div className="flex items-center justify-center space-x-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{formatDuration(callDuration)}</span>
                </div>
                {isOnHold && (
                  <Badge variant="outline" className="bg-amber-950/30 text-amber-300 border-amber-500">
                    On Hold
                  </Badge>
                )}
              </>
            )}

            {callStatus === 'ended' && (
              <div className="flex items-center justify-center space-x-2">
                <PhoneOff className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Call ended</span>
              </div>
            )}
          </div>

          {/* Call Controls */}
          {callStatus === 'connected' && (
            <div className="flex items-center space-x-4">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="rounded-full h-12 w-12"
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>

              <Button
                variant={isOnHold ? "secondary" : "outline"}
                size="sm"
                onClick={() => setIsOnHold(!isOnHold)}
                className="rounded-full h-12 w-12"
              >
                <Volume2 className="h-5 w-5" />
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={handleEndCall}
                className="rounded-full h-12 w-12"
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          )}

          {(callStatus === 'dialing' || callStatus === 'connecting') && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEndCall}
              className="rounded-full h-12 w-12"
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}