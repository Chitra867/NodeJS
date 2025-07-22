"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, File, X, CheckCircle, AlertCircle, Monitor, Cpu, HardDrive } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "analyzing" | "complete" | "error"
  progress: number
  threats?: number
}

export default function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const { toast } = useToast()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate file upload and analysis
    newFiles.forEach((file) => {
      simulateFileProcessing(file.id)
    })
  }

  const simulateFileProcessing = (fileId: string) => {
    // Upload simulation
    const uploadInterval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "uploading") {
            const newProgress = Math.min(file.progress + 10, 100)
            if (newProgress === 100) {
              clearInterval(uploadInterval)
              setTimeout(() => {
                setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: "analyzing", progress: 0 } : f)))
                simulateAnalysis(fileId)
              }, 500)
            }
            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 200)
  }

  const simulateAnalysis = (fileId: string) => {
    const analysisInterval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "analyzing") {
            const newProgress = Math.min(file.progress + 15, 100)
            if (newProgress === 100) {
              clearInterval(analysisInterval)
              const threats = Math.floor(Math.random() * 5)
              setTimeout(() => {
                setFiles((prev) =>
                  prev.map((f) =>
                    f.id === fileId
                      ? {
                          ...f,
                          status: "complete",
                          progress: 100,
                          threats,
                        }
                      : f,
                  ),
                )
                toast({
                  title: "Analysis Complete",
                  description: `File analysis finished. ${threats} potential threats detected.`,
                })
              }, 500)
            }
            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 300)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const startProcessMonitoring = () => {
    setIsMonitoring(true)
    toast({
      title: "Process Monitoring Started",
      description: "Real-time system process monitoring is now active.",
    })

    // Simulate process monitoring
    setTimeout(() => {
      setIsMonitoring(false)
      toast({
        title: "Monitoring Complete",
        description: "Process monitoring session completed successfully.",
      })
    }, 10000)
  }

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            File Upload & Analysis
          </CardTitle>
          <CardDescription>Upload files for behavioral analysis and threat detection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
            <p className="text-gray-600 mb-4">Supports executables, documents, and system files</p>
            <Input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={(e) => {
                if (e.target.files) {
                  handleFiles(Array.from(e.target.files))
                }
              }}
            />
            <Label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer bg-transparent">
                Select Files
              </Button>
            </Label>
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Uploaded Files</h4>
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1">
                    <File className="h-8 w-8 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      {(file.status === "uploading" || file.status === "analyzing") && (
                        <Progress value={file.progress} className="w-full mt-1" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === "complete" && (
                      <>
                        <Badge variant={file.threats === 0 ? "secondary" : "destructive"}>
                          {file.threats === 0 ? "Clean" : `${file.threats} Threats`}
                        </Badge>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </>
                    )}
                    {file.status === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
                    {file.status === "uploading" && <Badge variant="outline">Uploading...</Badge>}
                    {file.status === "analyzing" && <Badge variant="outline">Analyzing...</Badge>}
                    <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Process Monitoring Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Monitor className="h-5 w-5 mr-2" />
            Real-time Process Monitoring
          </CardTitle>
          <CardDescription>Monitor system processes for behavioral anomalies and insider threats</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Cpu className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-semibold">CPU Monitoring</p>
                <p className="text-sm text-gray-600">Process behavior analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <HardDrive className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-semibold">Disk Activity</p>
                <p className="text-sm text-gray-600">File access patterns</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Monitor className="h-8 w-8 text-purple-500" />
              <div>
                <p className="font-semibold">Network Traffic</p>
                <p className="text-sm text-gray-600">Communication analysis</p>
              </div>
            </div>
          </div>

          {isMonitoring ? (
            <div className="text-center py-6">
              <div className="animate-pulse bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Monitor className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Monitoring Active</h3>
              <p className="text-gray-600 mb-4">Real-time process monitoring in progress...</p>
              <Progress value={60} className="w-full max-w-md mx-auto" />
            </div>
          ) : (
            <div className="text-center py-6">
              <Button onClick={startProcessMonitoring} size="lg">
                <Monitor className="h-4 w-4 mr-2" />
                Start Process Monitoring
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
