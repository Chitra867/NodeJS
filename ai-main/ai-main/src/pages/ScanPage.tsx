import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Scan, Play, Pause, Download, AlertTriangle, Shield, Clock, CheckCircle } from 'lucide-react';

interface ScanProcess {
  name: string;
  status: 'pending' | 'scanning' | 'completed' | 'threat-detected';
  progress: number;
}

const ScanPage: React.FC = () => {
  const { addThreat, addReport } = useData();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [currentProcess, setCurrentProcess] = useState('');
  const [scanProcesses, setScanProcesses] = useState<ScanProcess[]>([]);

  const processes = [
    'System Files',
    'Running Processes',
    'Network Connections',
    'Registry Entries',
    'User Behavior Patterns',
    'Email Attachments',
    'File Transfers',
    'Login Attempts'
  ];

  const startScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);
    
    const initialProcesses = processes.map(name => ({
      name,
      status: 'pending' as const,
      progress: 0
    }));
    setScanProcesses(initialProcesses);

    // Simulate scan process
    for (let i = 0; i < processes.length; i++) {
      const process = processes[i];
      setCurrentProcess(process);
      
      // Update process status to scanning
      setScanProcesses(prev => prev.map((p, index) => 
        index === i ? { ...p, status: 'scanning' } : p
      ));
      
      // Simulate process scanning
      for (let j = 0; j <= 100; j += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setScanProgress(((i * 100 + j) / (processes.length * 100)) * 100);
        
        setScanProcesses(prev => prev.map((p, index) => 
          index === i ? { ...p, progress: j } : p
        ));
      }
      
      // Randomly determine if threat is detected
      const threatDetected = Math.random() > 0.7;
      
      setScanProcesses(prev => prev.map((p, index) => 
        index === i ? { 
          ...p, 
          status: threatDetected ? 'threat-detected' : 'completed',
          progress: 100
        } : p
      ));
      
      if (threatDetected) {
        // Generate mock threat
        const mockThreat = {
          id: Date.now().toString(),
          name: `Suspicious ${process} Activity`,
          type: Math.random() > 0.5 ? 'insider' : 'malware',
          riskScore: Math.floor(Math.random() * 40) + 60,
          severity: Math.random() > 0.5 ? 'high' : 'medium',
          description: `Anomalous behavior detected in ${process.toLowerCase()}`,
          detectedAt: new Date(),
          impact: 'Potential security risk',
          processName: `${process.toLowerCase().replace(' ', '_')}.exe`,
          recommendation: 'Investigate immediately and apply security measures'
        };
        
        setScanResults(prev => [...prev, mockThreat]);
        addThreat(mockThreat as any);
      }
    }

    // Create scan report
    const report = {
      id: Date.now().toString(),
      date: new Date(),
      threatsFound: scanResults.length,
      insiderThreats: scanResults.filter(r => r.type === 'insider').length,
      malwareThreats: scanResults.filter(r => r.type === 'malware').length,
      highRiskThreats: scanResults.filter(r => r.severity === 'high').length,
      status: 'completed' as const,
      duration: 180
    };
    
    addReport(report);
    setIsScanning(false);
    setCurrentProcess('');
  };

  const downloadReport = () => {
    const reportData = {
      scanDate: new Date().toISOString(),
      threatsFound: scanResults.length,
      threats: scanResults,
      recommendation: 'Review all high-risk threats immediately'
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-scan-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'scanning':
        return <Scan className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'threat-detected':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-200';
      case 'scanning':
        return 'bg-blue-200';
      case 'completed':
        return 'bg-green-200';
      case 'threat-detected':
        return 'bg-red-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI System Scan</h1>
          <p className="mt-2 text-gray-600">
            Run comprehensive behavioral analysis to detect insider threats and malware
          </p>
        </div>

        {/* Scan Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Quick Scan</h2>
              <p className="text-gray-600">Analyze current system state and user behavior patterns</p>
            </div>
            <button
              onClick={startScan}
              disabled={isScanning}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                isScanning
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isScanning ? (
                <>
                  <Pause className="h-5 w-5" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span>Start Scan</span>
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          {(isScanning || scanProgress > 0) && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {isScanning ? `Scanning: ${currentProcess}` : 'Scan Complete'}
                </span>
                <span className="text-sm text-gray-500">{Math.round(scanProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Process Status */}
          {scanProcesses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scanProcesses.map((process, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    process.status === 'scanning' ? 'border-blue-300' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(process.status)}
                      <span className="font-medium text-gray-900">{process.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{process.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-500 ${
                        process.status === 'threat-detected' ? 'bg-red-500' :
                        process.status === 'completed' ? 'bg-green-500' :
                        process.status === 'scanning' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${process.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scan Results */}
        {scanResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Scan Results</h2>
              <button
                onClick={downloadReport}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>
            </div>

            <div className="space-y-4">
              {scanResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    result.severity === 'high' ? 'border-red-500 bg-red-50' :
                    result.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-green-500 bg-green-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {result.type === 'insider' ? (
                          <Shield className="h-5 w-5 text-orange-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        <h3 className="font-semibold text-gray-900">{result.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          result.severity === 'high' ? 'bg-red-100 text-red-800' :
                          result.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {result.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{result.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Process:</span> {result.processName}
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Impact:</span> {result.impact}
                        </div>
                      </div>
                      <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium text-blue-800">Recommendation:</span>
                        <p className="text-blue-700">{result.recommendation}</p>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-2xl font-bold text-gray-900">{result.riskScore}%</div>
                      <div className="text-sm text-gray-500">Risk Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanPage;