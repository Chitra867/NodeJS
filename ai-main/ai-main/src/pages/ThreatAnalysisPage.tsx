import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Shield, AlertTriangle, Search, Filter, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ThreatAnalysisPage: React.FC = () => {
  const { threats, getThreatsByType } = useData();
  const [selectedTab, setSelectedTab] = useState<'all' | 'insider' | 'malware'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredThreats = threats.filter(threat => {
    const matchesTab = selectedTab === 'all' || threat.type === selectedTab;
    const matchesSearch = threat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || threat.severity === severityFilter;
    
    return matchesTab && matchesSearch && matchesSeverity;
  });

  const insiderThreats = getThreatsByType('insider');
  const malwareThreats = getThreatsByType('malware');

  // Chart data
  const severityData = [
    { name: 'High', value: threats.filter(t => t.severity === 'high').length },
    { name: 'Medium', value: threats.filter(t => t.severity === 'medium').length },
    { name: 'Low', value: threats.filter(t => t.severity === 'low').length }
  ];

  const typeData = [
    { name: 'Insider Threats', value: insiderThreats.length },
    { name: 'Malware', value: malwareThreats.length }
  ];

  const COLORS = ['#DC2626', '#F59E0B', '#10B981'];
  const TYPE_COLORS = ['#F59E0B', '#DC2626'];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const tabs = [
    { id: 'all', label: 'All Threats', count: threats.length },
    { id: 'insider', label: 'Insider Threats', count: insiderThreats.length },
    { id: 'malware', label: 'Malware', count: malwareThreats.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Threat Analysis</h1>
          <p className="mt-2 text-gray-600">
            Comprehensive analysis of detected threats and behavioral anomalies
          </p>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Severity Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    selectedTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search threats..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value as any)}
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Threat Cards */}
        <div className="space-y-6">
          {filteredThreats.map((threat) => (
            <div
              key={threat.id}
              className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${
                threat.severity === 'high' ? 'border-red-500' :
                threat.severity === 'medium' ? 'border-yellow-500' :
                'border-green-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {threat.type === 'insider' ? (
                      <Shield className="h-6 w-6 text-orange-500" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    )}
                    <h3 className="text-xl font-semibold text-gray-900">{threat.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{threat.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Process</div>
                      <div className="font-medium text-gray-900">{threat.processName}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Type</div>
                      <div className="font-medium text-gray-900 capitalize">{threat.type}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Detected</div>
                      <div className="font-medium text-gray-900">
                        {threat.detectedAt.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-blue-900">Impact Assessment</div>
                        <p className="text-blue-800">{threat.impact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-start space-x-2">
                      <Shield className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-amber-900">Recommendation</div>
                        <p className="text-amber-800">{threat.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-6 text-center">
                  <div className="text-3xl font-bold text-gray-900">{threat.riskScore}%</div>
                  <div className="text-sm text-gray-500">Risk Score</div>
                  <div className={`mt-2 w-16 h-16 rounded-full flex items-center justify-center ${
                    threat.riskScore >= 80 ? 'bg-red-100' :
                    threat.riskScore >= 60 ? 'bg-yellow-100' :
                    'bg-green-100'
                  }`}>
                    <div className={`text-lg font-bold ${
                      threat.riskScore >= 80 ? 'text-red-600' :
                      threat.riskScore >= 60 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {threat.riskScore >= 80 ? 'H' : threat.riskScore >= 60 ? 'M' : 'L'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredThreats.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No threats found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatAnalysisPage;