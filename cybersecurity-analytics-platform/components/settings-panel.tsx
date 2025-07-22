"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Shield, FileText, Eye, EyeOff, Save, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SettingsPanelProps {
  user: {
    email: string
    name: string
    organization: string
  }
}

export default function SettingsPanel({ user }: SettingsPanelProps) {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      desktop: false,
      sms: false,
      threatAlerts: true,
      reportReady: true,
      systemUpdates: false,
    },
    scanning: {
      autoScan: false,
      scanInterval: "24",
      deepScan: true,
      realTimeMonitoring: true,
      quarantineThreats: true,
    },
    reports: {
      autoGenerate: false,
      format: "pdf",
      includeCharts: true,
      emailReports: false,
      retentionDays: "30",
    },
    privacy: {
      shareAnonymousData: false,
      logRetention: "90",
      encryptReports: true,
      twoFactorAuth: false,
    },
    account: {
      name: user.name,
      email: user.email,
      organization: user.organization,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const [showPasswords, setShowPasswords] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  const saveSettings = async () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
      })
    }, 1000)
  }

  const resetSettings = () => {
    // Reset to default values
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to default values.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            System Settings
          </CardTitle>
          <CardDescription>Manage your behavioral analytics platform preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="scanning">Scanning</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                      <p className="text-sm text-gray-600">Show browser notifications</p>
                    </div>
                    <Switch
                      id="desktop-notifications"
                      checked={settings.notifications.desktop}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "desktop", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "sms", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="threat-alerts">Threat Alerts</Label>
                      <p className="text-sm text-gray-600">Immediate alerts for detected threats</p>
                    </div>
                    <Switch
                      id="threat-alerts"
                      checked={settings.notifications.threatAlerts}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "threatAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="report-ready">Report Ready</Label>
                      <p className="text-sm text-gray-600">Notify when reports are generated</p>
                    </div>
                    <Switch
                      id="report-ready"
                      checked={settings.notifications.reportReady}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "reportReady", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="system-updates">System Updates</Label>
                      <p className="text-sm text-gray-600">Updates about system maintenance</p>
                    </div>
                    <Switch
                      id="system-updates"
                      checked={settings.notifications.systemUpdates}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "systemUpdates", checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="scanning" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Scanning Configuration
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-scan">Automatic Scanning</Label>
                      <p className="text-sm text-gray-600">Enable scheduled automatic scans</p>
                    </div>
                    <Switch
                      id="auto-scan"
                      checked={settings.scanning.autoScan}
                      onCheckedChange={(checked) => handleSettingChange("scanning", "autoScan", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scan-interval">Scan Interval (hours)</Label>
                    <Select
                      value={settings.scanning.scanInterval}
                      onValueChange={(value) => handleSettingChange("scanning", "scanInterval", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Every Hour</SelectItem>
                        <SelectItem value="6">Every 6 Hours</SelectItem>
                        <SelectItem value="12">Every 12 Hours</SelectItem>
                        <SelectItem value="24">Daily</SelectItem>
                        <SelectItem value="168">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="deep-scan">Deep Scanning</Label>
                      <p className="text-sm text-gray-600">Perform comprehensive behavioral analysis</p>
                    </div>
                    <Switch
                      id="deep-scan"
                      checked={settings.scanning.deepScan}
                      onCheckedChange={(checked) => handleSettingChange("scanning", "deepScan", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="real-time">Real-time Monitoring</Label>
                      <p className="text-sm text-gray-600">Continuous process monitoring</p>
                    </div>
                    <Switch
                      id="real-time"
                      checked={settings.scanning.realTimeMonitoring}
                      onCheckedChange={(checked) => handleSettingChange("scanning", "realTimeMonitoring", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="quarantine">Auto-quarantine Threats</Label>
                      <p className="text-sm text-gray-600">Automatically isolate detected threats</p>
                    </div>
                    <Switch
                      id="quarantine"
                      checked={settings.scanning.quarantineThreats}
                      onCheckedChange={(checked) => handleSettingChange("scanning", "quarantineThreats", checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Report Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-generate">Auto-generate Reports</Label>
                      <p className="text-sm text-gray-600">Automatically create reports after scans</p>
                    </div>
                    <Switch
                      id="auto-generate"
                      checked={settings.reports.autoGenerate}
                      onCheckedChange={(checked) => handleSettingChange("reports", "autoGenerate", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="report-format">Default Report Format</Label>
                    <Select
                      value={settings.reports.format}
                      onValueChange={(value) => handleSettingChange("reports", "format", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                        <SelectItem value="json">JSON Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="include-charts">Include Charts</Label>
                      <p className="text-sm text-gray-600">Add visual charts to reports</p>
                    </div>
                    <Switch
                      id="include-charts"
                      checked={settings.reports.includeCharts}
                      onCheckedChange={(checked) => handleSettingChange("reports", "includeCharts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-reports">Email Reports</Label>
                      <p className="text-sm text-gray-600">Automatically email generated reports</p>
                    </div>
                    <Switch
                      id="email-reports"
                      checked={settings.reports.emailReports}
                      onCheckedChange={(checked) => handleSettingChange("reports", "emailReports", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retention">Report Retention (days)</Label>
                    <Select
                      value={settings.reports.retentionDays}
                      onValueChange={(value) => handleSettingChange("reports", "retentionDays", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                        <SelectItem value="365">1 Year</SelectItem>
                        <SelectItem value="0">Never Delete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy & Security
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="anonymous-data">Share Anonymous Data</Label>
                      <p className="text-sm text-gray-600">Help improve threat detection algorithms</p>
                    </div>
                    <Switch
                      id="anonymous-data"
                      checked={settings.privacy.shareAnonymousData}
                      onCheckedChange={(checked) => handleSettingChange("privacy", "shareAnonymousData", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="log-retention">Log Retention (days)</Label>
                    <Select
                      value={settings.privacy.logRetention}
                      onValueChange={(value) => handleSettingChange("privacy", "logRetention", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                        <SelectItem value="180">180 Days</SelectItem>
                        <SelectItem value="365">1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="encrypt-reports">Encrypt Reports</Label>
                      <p className="text-sm text-gray-600">Use encryption for stored reports</p>
                    </div>
                    <Switch
                      id="encrypt-reports"
                      checked={settings.privacy.encryptReports}
                      onCheckedChange={(checked) => handleSettingChange("privacy", "encryptReports", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add extra security to your account</p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={settings.privacy.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange("privacy", "twoFactorAuth", checked)}
                    />
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-semibold text-yellow-800">Data Privacy Notice</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          All behavioral analysis data is processed locally and encrypted. No sensitive information is
                          transmitted without your explicit consent.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Account Information
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="account-name">Full Name</Label>
                      <Input
                        id="account-name"
                        value={settings.account.name}
                        onChange={(e) => handleSettingChange("account", "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-email">Email Address</Label>
                      <Input
                        id="account-email"
                        type="email"
                        value={settings.account.email}
                        onChange={(e) => handleSettingChange("account", "email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-organization">Organization</Label>
                    <Input
                      id="account-organization"
                      value={settings.account.organization}
                      onChange={(e) => handleSettingChange("account", "organization", e.target.value)}
                    />
                  </div>

                  <Separator />

                  <h4 className="font-semibold">Change Password</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPasswords ? "text" : "password"}
                          value={settings.account.currentPassword}
                          onChange={(e) => handleSettingChange("account", "currentPassword", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPasswords(!showPasswords)}
                        >
                          {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type={showPasswords ? "text" : "password"}
                          value={settings.account.newPassword}
                          onChange={(e) => handleSettingChange("account", "newPassword", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                          id="confirm-password"
                          type={showPasswords ? "text" : "password"}
                          value={settings.account.confirmPassword}
                          onChange={(e) => handleSettingChange("account", "confirmPassword", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between pt-6 border-t">
            <Button variant="outline" onClick={resetSettings}>
              Reset to Defaults
            </Button>
            <Button onClick={saveSettings} disabled={isSaving}>
              {isSaving ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
