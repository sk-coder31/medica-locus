
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  ChevronRight, 
  ActivityIcon, 
  FileText, 
  Heart,
  UserCheck
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="animate-fade-in">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
                    <Shield size={14} className="mr-1.5" />
                    Secure Medical Tracking
                  </div>
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Your Medical Data</span>
                    <span className="block text-medical">Simple & Secure</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Track your health metrics, medical history, and medications in one secure place. 
                    Take control of your healthcare journey with our intuitive medical tracking solution.
                  </p>
                </div>
                <div className="mt-8 sm:mt-10 animate-slide-up">
                  <div className="sm:flex sm:justify-center lg:justify-start">
                    <div>
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-medical hover:bg-medical-dark md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
                      >
                        Get Started
                        <ChevronRight size={20} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 animate-fade-in">
          <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-medical-light/20 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" 
              alt="Medical Dashboard" 
              className="h-full w-full object-cover object-center rounded-l-3xl shadow-lg animate-blur-in"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-scale-in">
            <h2 className="text-base font-semibold text-medical uppercase tracking-wide">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need for health tracking
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Comprehensive tools to monitor and manage your health data securely.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 animate-slide-up">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-md bg-medical-light/20 text-medical flex items-center justify-center mb-4">
                  <ActivityIcon size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Health Metrics</h3>
                <p className="mt-2 text-base text-gray-500">
                  Track BMI, fat percentage, SpO2, weight, and other vital health metrics.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-md bg-medical-light/20 text-medical flex items-center justify-center mb-4">
                  <FileText size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
                <p className="mt-2 text-base text-gray-500">
                  Store and access your medical records, hospital visits, and health documents.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-md bg-medical-light/20 text-medical flex items-center justify-center mb-4">
                  <Heart size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Medication Tracking</h3>
                <p className="mt-2 text-base text-gray-500">
                  Manage prescriptions, dosages, and schedules for all your medications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-medical">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start?</span>
            <span className="block text-blue-100">Create your account today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-medical bg-white hover:bg-gray-50 transition-colors"
              >
                <UserCheck size={20} className="mr-2" />
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 MediTrack. All rights reserved.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              Secure, simple, and reliable medical tracking
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
