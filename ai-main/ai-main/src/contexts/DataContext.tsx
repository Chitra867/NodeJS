import React, { createContext, useContext, useState } from 'react';
import { format, subDays, startOfDay } from 'date-fns';

export interface ThreatData {
  id: string;
  name: string;
  type: 'insider' | 'malware';
  riskScore: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  detectedAt: Date;
  impact: string;
  processName: string;
  recommendation: string;
}

export interface ScanReport {
  id: string;
  date: Date;
  threatsFound: number;
  insiderThreats: number;
  malwareThreats: number;
  highRiskThreats: number;
  status: 'completed' | 'in-progress' | 'failed';
  duration: number;
}

interface DataContextType {
  threats: ThreatData[];
  reports: ScanReport[];
  addThreat: (threat: ThreatData) => void;
  addReport: (report: ScanReport) => void;
  getThreatsByType: (type: 'insider' | 'malware') => ThreatData[];
  getRecentThreats: (days: number) => ThreatData[];
  getRiskDistribution: () => { name: string; value: number }[];
  getThreatTrends: () => { date: string; insider: number; malware: number }[];
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const generateMockThreats = (): ThreatData[] => {
  const mockThreats: ThreatData[] = [
    {
      id: '1',
      name: 'Unusual Data Access Pattern',
      type: 'insider',
      riskScore: 85,
      severity: 'high',
      description: 'Employee accessing sensitive customer data outside normal hours',
      detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      impact: 'Potential data breach, customer privacy violation',
      processName: 'banking_system.exe',
      recommendation: 'Immediately review access logs and contact the employee'
    },
    {
      id: '2',
      name: 'Trojan.Win32.Banker',
      type: 'malware',
      riskScore: 92,
      severity: 'high',
      description: 'Banking trojan attempting to steal credentials',
      detectedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      impact: 'Critical - Customer credentials at risk',
      processName: 'svchost.exe',
      recommendation: 'Quarantine immediately and run full system scan'
    },
    {
      id: '3',
      name: 'Excessive Login Attempts',
      type: 'insider',
      riskScore: 67,
      severity: 'medium',
      description: 'Multiple failed login attempts from internal network',
      detectedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      impact: 'Potential brute force attack',
      processName: 'login_service.exe',
      recommendation: 'Monitor user activity and consider password reset'
    },
    {
      id: '4',
      name: 'Suspicious Email Attachment',
      type: 'malware',
      riskScore: 78,
      severity: 'high',
      description: 'Potentially malicious file opened from email',
      detectedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      impact: 'Possible system compromise',
      processName: 'outlook.exe',
      recommendation: 'Isolate workstation and scan for malware'
    },
    {
      id: '5',
      name: 'Off-hours File Transfer',
      type: 'insider',
      riskScore: 45,
      severity: 'medium',
      description: 'Large file transfer during non-business hours',
      detectedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      impact: 'Potential data exfiltration',
      processName: 'file_transfer.exe',
      recommendation: 'Review transfer logs and file contents'
    }
  ];
  
  return mockThreats;
};

const generateMockReports = (): ScanReport[] => {
  const reports: ScanReport[] = [];
  
  for (let i = 0; i < 10; i++) {
    const date = subDays(new Date(), i);
    const threatsFound = Math.floor(Math.random() * 15) + 1;
    const insiderThreats = Math.floor(threatsFound * 0.6);
    const malwareThreats = threatsFound - insiderThreats;
    
    reports.push({
      id: `report-${i}`,
      date,
      threatsFound,
      insiderThreats,
      malwareThreats,
      highRiskThreats: Math.floor(threatsFound * 0.3),
      status: 'completed',
      duration: Math.floor(Math.random() * 300) + 60
    });
  }
  
  return reports;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [threats, setThreats] = useState<ThreatData[]>(generateMockThreats());
  const [reports, setReports] = useState<ScanReport[]>(generateMockReports());

  const addThreat = (threat: ThreatData) => {
    setThreats(prev => [threat, ...prev]);
  };

  const addReport = (report: ScanReport) => {
    setReports(prev => [report, ...prev]);
  };

  const getThreatsByType = (type: 'insider' | 'malware') => {
    return threats.filter(threat => threat.type === type);
  };

  const getRecentThreats = (days: number) => {
    const cutoff = subDays(new Date(), days);
    return threats.filter(threat => threat.detectedAt >= cutoff);
  };

  const getRiskDistribution = () => {
    const high = threats.filter(t => t.severity === 'high').length;
    const medium = threats.filter(t => t.severity === 'medium').length;
    const low = threats.filter(t => t.severity === 'low').length;
    
    return [
      { name: 'High Risk', value: high },
      { name: 'Medium Risk', value: medium },
      { name: 'Low Risk', value: low }
    ];
  };

  const getThreatTrends = () => {
    return reports.slice(0, 7).reverse().map(report => ({
      date: format(report.date, 'MMM dd'),
      insider: report.insiderThreats,
      malware: report.malwareThreats
    }));
  };

  return (
    <DataContext.Provider value={{
      threats,
      reports,
      addThreat,
      addReport,
      getThreatsByType,
      getRecentThreats,
      getRiskDistribution,
      getThreatTrends
    }}>
      {children}
    </DataContext.Provider>
  );
};