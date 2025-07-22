import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Download, FileText, Calendar, Filter, TrendingUp, AlertTriangle, Shield } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const { reports } = useData();
  const [sortBy, setSortBy] = useState<'date' | 'threats' | 'risk'>('date');
  const [filterBy, setFilterBy] = useState<'all' | 'high-risk' | 'recent'>('all');

  const filteredReports = reports.filter(report => {
    if (filterBy === 'high-risk') {
      return report.highRiskThreats > 0;
    }
    if (filterBy === 'recent') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return report.date >= weekAgo;
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b.date.getTime() - a.date.getTime();
      case 'threats':
        return b.threatsFound - a.threatsFound;
      case 'risk':
        return b.highRiskThreats - a.highRiskThreats;
      default:
        return 0;
    }
  });

  const downloadReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    const reportData = {
      id: report.id,
      date: report.date.toISOString(),
      summary: {
        threatsFound: report.threatsFound,
        insiderThreats: report.insiderThreats,
        malwareThreats: report.malwareThreats,
        highRiskThreats: report.highRiskThreats,
        status: report.status,
        duration: report.duration
      },
      recommendations: [
        'Review all high-risk threats immediately',
        'Implement additional monitoring for insider threats',
        'Update malware definitions',
        'Conduct security awareness training'
      ]
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-report-${report.date.toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAllReports = () => {
    const allReportsData = {
      exportDate: new Date().toISOString(),
      totalReports: reports.length,
      reports: reports.map(report => ({
        id: report.id,
        date: report.date.toISOString(),
        threatsFound: report.threatsFound,
        insiderThreats: report.insiderThreats,
        malwareThreats: report.malwareThreats,
        highRiskThreats: report.highRiskThreats,
        status: report.status,
        duration: report.duration
      }))
    };

    const blob = new Blob([JSON.stringify(allReportsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all-security-reports-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRiskLevel = (report: any) => {
    const riskPercentage = (report.highRiskThreats / report.threatsFound) * 100;
    if (riskPercentage >= 50) return { level: 'High', color: 'text-red-600 bg-red-50' };
    if (riskPercentage >= 25) return { level: 'Medium', color: 'text-yellow-600 bg-yellow-50' };
    return { level: 'Low', color: 'text-green-600 bg-green-50' };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Security Reports</h1>
              <p className="mt-2 text-gray-600">
                Historical scan reports and threat analysis summaries
              </p>
            </div>
            <button
              onClick={downloadAllReports}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              <span>Export All</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Threats</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.reduce((sum, report) => sum + report.threatsFound, 0)}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.reduce((sum, report) => sum + report.highRiskThreats, 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Scan Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(reports.reduce((sum, report) => sum + report.duration, 0) / reports.length)}s
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="date">Date</option>
                <option value="threats">Threats Found</option>
                <option value="risk">Risk Level</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
              >
                <option value="all">All Reports</option>
                <option value="high-risk">High Risk Only</option>
                <option value="recent">Recent (7 days)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => {
            const riskLevel = getRiskLevel(report);
            return (
              <div
                key={report.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <FileText className="h-6 w-6 text-blue-500" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Security Scan Report
                        </h3>
                        <p className="text-sm text-gray-600">
                          {report.date.toLocaleDateString()} at {report.date.toLocaleTimeString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${riskLevel.color}`}>
                        {riskLevel.level} Risk
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-gray-600">Threats Found</div>
                        <div className="font-bold text-gray-900">{report.threatsFound}</div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="text-orange-600">Insider Threats</div>
                        <div className="font-bold text-orange-900">{report.insiderThreats}</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="text-red-600">Malware</div>
                        <div className="font-bold text-red-900">{report.malwareThreats}</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-purple-600">High Risk</div>
                        <div className="font-bold text-purple-900">{report.highRiskThreats}</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-blue-600">Duration</div>
                        <div className="font-bold text-blue-900">{report.duration}s</div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 flex flex-col space-y-2">
                    <button
                      onClick={() => downloadReport(report.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Status</div>
                      <div className={`font-medium ${
                        report.status === 'completed' ? 'text-green-600' : 
                        report.status === 'in-progress' ? 'text-blue-600' : 
                        'text-red-600'
                      }`}>
                        {report.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Try adjusting your filters or run a new scan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;