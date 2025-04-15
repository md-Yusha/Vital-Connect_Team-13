import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-teal-600" />
              <span className="text-xl font-bold text-gray-900">
                VitalConnect
              </span>
            </Link>
            <p className="mt-4 text-gray-600">
              Connecting Healthcare. Empowering Lives.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Solutions
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/features"
                  className="text-base text-gray-600 hover:text-teal-600"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/inventory"
                  className="text-base text-gray-600 hover:text-teal-600"
                >
                  Inventory System
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/about"
                  className="text-base text-gray-600 hover:text-teal-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-base text-gray-600 hover:text-teal-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Connect
            </h3>
            <div className="mt-4 flex space-x-6">
              <a
                href="#"
                className="text-gray-500 hover:text-teal-600"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-teal-600"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-teal-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:contact@vitalconnect.com"
                className="text-gray-500 hover:text-teal-600"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 text-center">
            © {new Date().getFullYear()} VitalConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;