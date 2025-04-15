import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Users,
  Ambulance,
  Share2,
  CreditCard,
  ArrowRight,
} from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-teal-900/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Connecting Healthcare.
              <br />
              <span className="text-teal-400">Empowering Lives.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your healthcare facility with our comprehensive management
              system designed for the modern era.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/features"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors"
              >
                Explore System
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-teal-900 transition-colors"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline your operations with our integrated features designed
              specifically for healthcare facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="h-6 w-6" />,
                title: 'Real-time Booking',
                description:
                  'Efficient appointment scheduling system with real-time updates.',
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: 'Patient Portal',
                description:
                  'Secure patient portal for accessing medical records and appointments.',
              },
              {
                icon: <Ambulance className="h-6 w-6" />,
                title: 'Emergency Locator',
                description:
                  'Quick access to emergency resources and facility information.',
              },
              {
                icon: <Share2 className="h-6 w-6" />,
                title: 'Inventory Sharing',
                description:
                  'Connect with other facilities to share and manage resources.',
              },
              {
                icon: <CreditCard className="h-6 w-6" />,
                title: 'Billing Integration',
                description:
                  'Seamless billing and payment processing for patients.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-teal-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Healthcare Facility?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of healthcare providers who trust VitalConnect
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-teal-600 transition-colors"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;