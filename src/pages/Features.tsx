import React from 'react';
import { Zap, Shield, Clock, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Lightning Fast",
      description: "Experience instant updates and real-time inventory tracking"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Secure Access",
      description: "Enterprise-grade security protecting your business data"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "24/7 Availability",
      description: "Access your inventory management system anytime, anywhere"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Team Collaboration",
      description: "Seamless multi-user support for your entire team"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Powerful Features for Your Business
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our comprehensive inventory management system comes packed with features
          designed to streamline your operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105"
          >
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;