import React from 'react';
import { Award, Users, Globe, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-teal-600" />,
      value: "1000+",
      label: "Healthcare Providers"
    },
    {
      icon: <Globe className="h-8 w-8 text-teal-600" />,
      value: "50+",
      label: "Cities Covered"
    },
    {
      icon: <Heart className="h-8 w-8 text-teal-600" />,
      value: "1M+",
      label: "Patients Served"
    },
    {
      icon: <Award className="h-8 w-8 text-teal-600" />,
      value: "99.9%",
      label: "System Uptime"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "VitalConnect Founded",
      description: "Started with a vision to revolutionize healthcare management"
    },
    {
      year: "2021",
      title: "First Major Partnership",
      description: "Partnered with 100 hospitals across the country"
    },
    {
      year: "2022",
      title: "Innovation Award",
      description: "Recognized for breakthrough in healthcare technology"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Extended services to international healthcare providers"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About VitalConnect
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transforming healthcare management through innovative technology and
          connected solutions.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To revolutionize healthcare management by providing cutting-edge
            technology solutions that enhance efficiency, improve patient care, and
            connect healthcare providers globally.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-600">
            To become the global standard in healthcare management systems,
            fostering a connected and efficient healthcare ecosystem that benefits
            providers and patients alike.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="flex justify-center mb-4">{stat.icon}</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Our Journey
        </h2>
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-4 items-start"
            >
              <div className="flex-none w-24">
                <div className="text-xl font-bold text-teal-600">
                  {item.year}
                </div>
              </div>
              <div className="flex-grow">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </div>
                <div className="text-gray-600">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Values */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p>Constantly pushing boundaries in healthcare technology</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Reliability</h3>
            <p>Providing dependable solutions for critical operations</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
            <p>Working together to improve healthcare delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;