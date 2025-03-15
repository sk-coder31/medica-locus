
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Stethoscope } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-[85vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Comprehensive Medical Management Platform
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Simplifying healthcare management for patients and doctors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <User className="h-8 w-8 text-medical" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Patient Portal</h2>
                <p className="text-gray-600 mb-6">
                  Access your medical records, track your health metrics, and manage your medications from a single dashboard.
                </p>
                <Link 
                  to="/login" 
                  className="inline-flex items-center text-white bg-medical hover:bg-medical-dark px-6 py-3 rounded-xl transition-colors"
                >
                  Patient Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="h-16 w-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Stethoscope className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Doctor Dashboard</h2>
                <p className="text-gray-600 mb-6">
                  Manage patient appointments, view medical histories, and update treatment plans with our comprehensive doctor dashboard.
                </p>
                <Link 
                  to="/doctor-login" 
                  className="inline-flex items-center text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl transition-colors"
                >
                  Doctor Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center text-gray-600">
            <p>For demonstration purposes, any email and password will work</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
