"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Bug, User, Clock, TrendingUp, Eye } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface ThreatAnalysisProps {
  analysisComplete: boolean
}

interface ThreatData {
  id: string
  fileName: string
  threatType: "insider" | "malware"
  category: string
  riskLevel: number
  detectionTime: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
}

const mockThreats: ThreatData[] = [
  {
    id: "1",
    fileName: "suspicious_script.exe",
    threatType: "malware",
    category: "Trojan",
    riskLevel: 85,
    detectionTime: "2024-01-10 14:23:15",
    description: "Detected malicious executable with trojan characteristics",
    severity: "high",
  },
  {
    id: "2",
    fileName: "data_export.csv",
    threatType: "insider",
    category: "Data Exfiltration",
    riskLevel: 72,
    detectionTime: "2024-01-10 14:18:42",
    description: "Unusual data export pattern detected outside business hours",
    severity: "medium",
  },
  {
    id: "3",
    fileName: "keylogger.dll",
    threatType: "malware",
    category: "Spyware",
    riskLevel: 95,
    detectionTime: "2024-01-10 14:15:33",
    description: "Keylogger detected attempting to capture sensitive information",
    severity: "critical",
  },
  {
    id: "4",
    fileName: "unauthorized_access.log",
    threatType: "insider",
    category: "Privilege Escalation",
    riskLevel: 68,
    detectionTime: "2024-01-10 14:12:18",
    description: "Attempted unauthorized access to restricted system areas",
    severity: "medium",
  },
]

const pieData = [
  { name: "Malware", value: 2, color: "#ef4444" },
  { name: "Insider Threats", value: 2, color: "#f97316" },
]

const riskData = [
  { category: "Critical", count: 1, color: "#dc2626" },
  { category: "High", count: 1, color: "#ea580c" },
  { category: "Medium", count: 2, color: "#ca8a04" },
  { category: "Low", count: 0, color: "#16a34a" },
]

export default function ThreatAnalysis({ analysisComplete }: ThreatAnalysisProps) {
  const [selectedThreat, setSelectedThreat] = useState<ThreatData | null>(null)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  if (!analysisComplete) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Threat Analysis Results
          </CardTitle>
          <CardDescription>Analysis results will appear here after completing a behavioral scan</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
            <Eye className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Analysis Data</h3>
          <p className="text-gray-600">Run a behavioral analysis to view threat detection results</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">4</div>
            <p className="text-xs text-muted-foreground">Detected in last scan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Malware</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">Malicious software detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insider Threats</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">2</div>
            <p className="text-xs text-muted-foreground">Suspicious user behavior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">80%</div>
            <p className="text-xs text-muted-foreground">High risk environment</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Threat Distribution</CardTitle>
            <CardDescription>Breakdown of detected threats by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Level Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
            <CardDescription>Threats categorized by severity level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Threat Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Threat Analysis</CardTitle>
          <CardDescription>Comprehensive breakdown of all detected threats</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Threats</TabsTrigger>
              <TabsTrigger value="malware">Malware</TabsTrigger>
              <TabsTrigger value="insider">Insider Threats</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {mockThreats.map((threat) => (
                <div key={threat.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`} />
                      <h4 className="font-semibold">{threat.fileName}</h4>
                      <Badge variant={threat.threatType === "malware" ? "destructive" : "secondary"}>
                        {threat.threatType === "malware" ? "Malware" : "Insider Threat"}
                      </Badge>
                      <Badge variant={getSeverityBadge(threat.severity)}>{threat.severity.toUpperCase()}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600">{threat.riskLevel}%</div>
                      <div className="text-xs text-gray-500">Risk Level</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Category:</span> {threat.category}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="font-medium">Detected:</span> {threat.detectionTime}
                    </div>
                    <div>
                      <Progress value={threat.riskLevel} className="w-full" />
                    </div>
                  </div>

                  <p className="text-gray-600">{threat.description}</p>

                  <Button variant="outline" size="sm" onClick={() => setSelectedThreat(threat)}>
                    View Details
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="malware" className="space-y-4">
              {mockThreats
                .filter((t) => t.threatType === "malware")
                .map((threat) => (
                  <div key={threat.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bug className="h-5 w-5 text-red-500" />
                        <h4 className="font-semibold">{threat.fileName}</h4>
                        <Badge variant="destructive">{threat.category}</Badge>
                      </div>
                      <div className="text-lg font-bold text-red-600">{threat.riskLevel}%</div>
                    </div>
                    <p className="text-gray-600">{threat.description}</p>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="insider" className="space-y-4">
              {mockThreats
                .filter((t) => t.threatType === "insider")
                .map((threat) => (
                  <div key={threat.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-purple-500" />
                        <h4 className="font-semibold">{threat.fileName}</h4>
                        <Badge variant="secondary">{threat.category}</Badge>
                      </div>
                      <div className="text-lg font-bold text-purple-600">{threat.riskLevel}%</div>
                    </div>
                    <p className="text-gray-600">{threat.description}</p>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
