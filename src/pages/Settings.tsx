import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Activity,
  Save,
  RefreshCw
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings & Controls</h1>
          <p className="text-muted-foreground mt-1">
            Configure your dashboard preferences and alert thresholds
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <User className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">User Profile</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="Dr. Sarah Chen" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="sarah.chen@hospital.org" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Care Coordinator" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue="Chronic Care Management" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="license">License Number</Label>
              <Input id="license" defaultValue="NP12345678" />
            </div>
          </div>
        </div>
      </Card>

      {/* Alert & Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Alert & Notification Settings</h3>
        </div>

        <div className="space-y-6">
          {/* Team Bandwidth Control */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <Label className="text-base font-medium">Team Bandwidth Control</Label>
                <p className="text-sm text-muted-foreground">
                  Adjust alert thresholds based on your team's current capacity
                </p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Optimal Load
              </Badge>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm">Alert Sensitivity: High</Label>
                <Slider
                  defaultValue={[75]}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Low (fewer alerts)</span>
                  <span>High (more alerts)</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="font-medium">Daily Alert Limit</p>
                  <p className="text-2xl font-bold text-primary">25</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="font-medium">Current Load</p>
                  <p className="text-2xl font-bold text-green-600">18</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="font-medium">Capacity</p>
                  <p className="text-2xl font-bold text-muted-foreground">72%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="space-y-4">
            <h4 className="font-medium">Notification Preferences</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="critical-alerts">Critical Patient Alerts</Label>
                  <p className="text-sm text-muted-foreground">Immediate notifications for high-risk patients</p>
                </div>
                <Switch id="critical-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="missed-appointments">Missed Appointment Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications when patients miss appointments</p>
                </div>
                <Switch id="missed-appointments" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lab-results">Lab Results Available</Label>
                  <p className="text-sm text-muted-foreground">Notifications for new lab results</p>
                </div>
                <Switch id="lab-results" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="medication-alerts">Medication Adherence</Label>
                  <p className="text-sm text-muted-foreground">Alerts for medication non-compliance</p>
                </div>
                <Switch id="medication-alerts" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Risk Thresholds */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Risk Assessment Thresholds</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Critical Risk Threshold (≥80)</Label>
              <Slider
                defaultValue={[80]}
                min={70}
                max={90}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">High Risk Threshold (≥60)</Label>
              <Slider
                defaultValue={[60]}
                min={50}
                max={79}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Moderate Risk Threshold (≥40)</Label>
              <Slider
                defaultValue={[40]}
                min={30}
                max={59}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Low Risk Threshold (&lt;40)</Label>
              <div className="text-sm text-muted-foreground mt-2 p-2 bg-muted rounded">
                Automatically calculated based on other thresholds
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Security & Audit */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Security & Audit</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Enhanced security for your account</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Session Timeout</Label>
              <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
            </div>
            <select className="px-3 py-2 border rounded-md bg-background">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>4 hours</option>
            </select>
          </div>
          <div>
            <Label className="text-sm font-medium">Recent Activity</Label>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <p>• Login from Chrome on Windows - 2 hours ago</p>
              <p>• Patient record accessed: Margaret Johnson - 4 hours ago</p>
              <p>• Alert dismissed: Robert Chen medication - 6 hours ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}