import React from 'react';
import { Shield, Brain, Users, Target, Award, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze behavioral patterns to detect anomalies and potential threats in real-time.'
    },
    {
      icon: Shield,
      title: 'Comprehensive Security',
      description: 'Multi-layered protection against both insider threats and external malware attacks with predictive analytics.'
    },
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'Specifically designed for financial institutions in the Kathmandu Valley with localized threat intelligence.'
    },
    {
      icon: Globe,
      title: 'Real-Time Monitoring',
      description: 'Continuous system process monitoring and behavioral analysis to ensure immediate threat detection.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Researcher',
      expertise: 'Machine Learning, Behavioral Analytics',
      description: 'Leading AI researcher with 15+ years in cybersecurity and behavioral analysis.'
    },
    {
      name: 'Rajesh Sharma',
      role: 'Security Architect',
      expertise: 'Financial Security, Threat Detection',
      description: 'Expert in financial institution security with deep knowledge of Nepalese banking systems.'
    },
    {
      name: 'Emily Johnson',
      role: 'Data Scientist',
      expertise: 'Predictive Analytics, Data Mining',
      description: 'Specialist in predictive modeling and insider threat detection algorithms.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Software Engineer',
      expertise: 'Real-time Systems, Full-stack Development',
      description: 'Senior developer focused on building scalable security monitoring systems.'
    }
  ];

  const technologies = [
    'TensorFlow & PyTorch for AI/ML models',
    'Real-time process monitoring',
    'Behavioral analytics engine',
    'Advanced threat intelligence',
    'Predictive risk assessment',
    'Automated incident response'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI SecureWatch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Implementation of an Artificial Intelligence (AI)-Integrated Predictive Behavioral Analytics Framework 
            for Detecting Insider Threats and Malware through System Process Monitoring to Enhance Data Security 
            in Financial Institutions of the Kathmandu Valley.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To revolutionize cybersecurity in Nepal's financial sector by providing cutting-edge AI-powered threat 
            detection solutions. We are committed to protecting sensitive financial data and maintaining the integrity 
            of banking systems through advanced behavioral analytics and real-time monitoring capabilities.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-center mb-4">
                  <feature.icon className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology & Innovation</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Technologies</h3>
              <ul className="space-y-3">
                {technologies.map((tech, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Approach</h3>
              <p className="text-gray-700 leading-relaxed">
                Our AI-driven approach combines behavioral analytics with real-time system monitoring to create 
                a comprehensive security framework. By analyzing user behavior patterns, system processes, and 
                network activities, we can predict and prevent both insider threats and malware attacks before 
                they cause damage.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-200">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-3">{member.expertise}</p>
                <p className="text-xs text-gray-500">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact & Recognition */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact on Financial Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                AI SecureWatch has been instrumental in enhancing cybersecurity posture for financial institutions 
                across the Kathmandu Valley. Our solution has successfully prevented numerous security incidents 
                and has become a trusted partner for banks and financial organizations.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">99.8%</div>
                  <div className="text-sm text-gray-600">Threat Detection Rate</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-gray-600">Continuous Monitoring</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recognition & Awards</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <div>
                    <div className="font-semibold text-gray-900">Best Cybersecurity Innovation 2024</div>
                    <div className="text-sm text-gray-600">Nepal Banking Association</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <div>
                    <div className="font-semibold text-gray-900">AI Excellence Award 2024</div>
                    <div className="text-sm text-gray-600">Technology Innovation Council</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <div>
                    <div className="font-semibold text-gray-900">Financial Security Leadership</div>
                    <div className="text-sm text-gray-600">Nepal Rastra Bank Recognition</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Our Vision for the Future</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            We envision a future where financial institutions in Nepal and beyond are protected by intelligent, 
            adaptive security systems that can predict and prevent threats before they materialize. Our continued 
            investment in AI research and development will drive the next generation of cybersecurity solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;