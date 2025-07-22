"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Download, Calendar, Clock, AlertTriangle, Bug, User, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReportGenerationProps {
  analysisComplete: boolean
}

export default function ReportGeneration({ analysisComplete }: ReportGenerationProps) {
  const [reportFormat, setReportFormat] = useState("pdf")
  const [reportSections, setReportSections] = useState({
    executive: true,
    threats: true,
    analysis: true,
    recommendations: true,
    technical: false,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateReport = async () => {
    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)

      // Create and download mock report
      const reportData = generateReportData()
      downloadReport(reportData, reportFormat)

      toast({
        title: "Report Generated",
        description: `Security analysis report downloaded as ${reportFormat.toUpperCase()}`,
      })
    }, 3000)
  }

  const generateReportData = () => {
    const currentDate = new Date().toLocaleDateString()
    const currentTime = new Date().toLocaleTimeString()

    return {
      title: "AI Behavioral Analytics Security Report",
      date: currentDate,
      time: currentTime,
      organization: "Financial Institution - Kathmandu Valley",
      summary: {
        totalThreats: 4,
        malware: 2,
        insiderThreats: 2,
        riskScore: 80,
        status: "High Risk",
      },
      threats: [
        {
          fileName: "suspicious_script.exe",
          type: "Malware",
          category: "Trojan",
          riskLevel: 85,
          detectionTime: "2024-01-10 14:23:15",
        },
        {
          fileName: "data_export.csv",
          type: "Insider Threat",
          category: "Data Exfiltration",
          riskLevel: 72,
          detectionTime: "2024-01-10 14:18:42",
        },
      ],
    }
  }

  const downloadReport = (data: any, format: string) => {
    let content = ""
    let mimeType = ""
    let fileName = ""

    if (format === "pdf") {
      // In a real implementation, you would use a PDF library like jsPDF
      content = `Security Analysis Report\n\nDate: ${data.date}\nTime: ${data.time}\nOrganization: ${data.organization}\n\nSummary:\nTotal Threats: ${data.summary.totalThreats}\nMalware: ${data.summary.malware}\nInsider Threats: ${data.summary.insiderThreats}\nRisk Score: ${data.summary.riskScore}%\n\nDetailed Analysis:\n${data.threats.map((t: any) => `${t.fileName} - ${t.type} (${t.riskLevel}%)`).join("\n")}`
      mimeType = "text/plain"
      fileName = `security-report-${Date.now()}.txt`
    } else if (format === "csv") {
      const csvHeader = "File Name,Threat Type,Category,Risk Level,Detection Time\n"
      const csvData = data.threats
        .map((t: any) => `"${t.fileName}","${t.type}","${t.category}",${t.riskLevel},"${t.detectionTime}"`)
        .join("\n")
      content = csvHeader + csvData
      mimeType = "text/csv"
      fileName = `security-report-${Date.now()}.csv`
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleSectionChange = (section: string, checked: boolean) => {
    setReportSections((prev) => ({
      ...prev,
      [section]: checked,
    }))
  }

  if (!analysisComplete) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Report Generation
          </CardTitle>
          <CardDescription>Generate comprehensive security analysis reports</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
          <p className="text-gray-600">Complete an analysis to generate security reports</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Report Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Analysis Summary
          </CardTitle>
          <CardDescription>Overview of the latest behavioral analysis results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">4</div>
              <div className="text-sm text-gray-600">Total Threats</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Bug className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-600">Malware Detected</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <User className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">2</div>
              <div className="text-sm text-gray-600">Insider Threats</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Shield className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">80%</div>
              <div className="text-sm text-gray-600">Risk Score</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Last Analysis</h4>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  January 10, 2024
                  <Clock className="h-4 w-4 ml-3 mr-1" />
                  2:23 PM
                </div>
              </div>
              <Badge variant="destructive">High Risk</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Report Configuration
          </CardTitle>
          <CardDescription>Customize your security analysis report</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Report Format</label>
                <Select value={reportFormat} onValueChange={setReportFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">Report Sections</label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="executive"
                    checked={reportSections.executive}
                    onCheckedChange={(checked) => handleSectionChange("executive", checked as boolean)}
                  />
                  <label htmlFor="executive" className="text-sm">
                    Executive Summary
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="threats"
                    checked={reportSections.threats}
                    onCheckedChange={(checked) => handleSectionChange("threats", checked as boolean)}
                  />
                  <label htmlFor="threats" className="text-sm">
                    Threat Analysis
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="analysis"
                    checked={reportSections.analysis}
                    onCheckedChange={(checked) => handleSectionChange("analysis", checked as boolean)}
                  />
                  <label htmlFor="analysis" className="text-sm">
                    Behavioral Analysis
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recommendations"
                    checked={reportSections.recommendations}
                    onCheckedChange={(checked) => handleSectionChange("recommendations", checked as boolean)}
                  />
                  <label htmlFor="recommendations" className="text-sm">
                    Recommendations
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="technical"
                    checked={reportSections.technical}
                    onCheckedChange={(checked) => handleSectionChange("technical", checked as boolean)}
                  />
                  <label htmlFor="technical" className="text-sm">
                    Technical Details
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Generate Report</h4>
                <p className="text-sm text-gray-600">Create a comprehensive security analysis report</p>
              </div>
              <Button onClick={generateReport} disabled={isGenerating} size="lg">
                {isGenerating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated security analysis reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">Security Analysis Report - Jan 10, 2024</p>
                  <p className="text-sm text-gray-600">PDF • 4 threats detected • High risk</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="destructive">High Risk</Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium">Security Analysis Report - Jan 9, 2024</p>
                  <p className="text-sm text-gray-600">CSV • 1 threat detected • Low risk</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Low Risk</Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
