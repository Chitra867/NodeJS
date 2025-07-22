"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Monitor, AlertTriangle, Shield, Clock, Activity } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import FileUpload from "@/components/file-upload"
import ThreatAnalysis from "@/components/threat-analysis"
import ReportGeneration from "@/components/report-generation"
import SettingsPanel from "@/components/settings-panel"

interface DashboardProps {
  user: { email: string; name: string; organization: string }
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStarted, setAnalysisStarted] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisStarted(true)

    toast({
      title: "Analysis Started",
      description: "Behavioral scan initiated. This may take a few minutes.",
    })

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
      toast({
        title: "Analysis Complete",
        description: "Threat detection scan has finished successfully.",
      })
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AI Behavioral Analytics Platform</h1>
                <p className="text-sm text-gray-500">Kathmandu Valley Financial Security</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.organization}</p>
              </div>
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Status</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Active</div>
                  <p className="text-xs text-muted-foreground">All monitoring systems operational</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analysisComplete ? "Just now" : "Never"}</div>
                  <p className="text-xs text-muted-foreground">
                    {analysisComplete ? "Analysis completed" : "No previous scans"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Threat Level</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{analysisComplete ? "Medium" : "Unknown"}</div>
                  <p className="text-xs text-muted-foreground">
                    {analysisComplete ? "Some threats detected" : "Run analysis to assess"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Start Analysis Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Behavioral Analysis Control
                </CardTitle>
                <CardDescription>
                  Manually initiate AI-powered behavioral scanning to detect insider threats and malware
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!analysisStarted ? (
                  <div className="text-center py-8">
                    <div className="bg-blue-50 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                      <Monitor className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Ready to Start Analysis</h3>
                    <p className="text-gray-600 mb-6">
                      Click the button below to begin comprehensive behavioral scanning of your system
                    </p>
                    <Button onClick={startAnalysis} size="lg" className="px-8">
                      <Play className="h-4 w-4 mr-2" />
                      Start Analysis
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isAnalyzing ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h3 className="text-lg font-semibold mb-2">Analysis in Progress</h3>
                        <p className="text-gray-600 mb-4">
                          Scanning system processes and analyzing behavioral patterns...
                        </p>
                        <Progress value={75} className="w-full max-w-md mx-auto" />
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="bg-green-50 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                          <Shield className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Analysis Complete</h3>
                        <p className="text-gray-600 mb-6">
                          Behavioral scan finished. View results in the Analysis tab.
                        </p>
                        <div className="flex justify-center space-x-4">
                          <Button onClick={() => setActiveTab("results")}>View Results</Button>
                          <Button variant="outline" onClick={startAnalysis}>
                            Run Again
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <FileUpload />
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <ThreatAnalysis analysisComplete={analysisComplete} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportGeneration analysisComplete={analysisComplete} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsPanel user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
