import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Activity, 
  Heart, 
  Calendar, 
  FileText, 
  ChevronRight,
  Pill,
  Clock,
  TrendingUp,
  Weight,
  Zap
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patientData, setPatientData] = useState<any>(null);
  const [healthMonitorData, setHealthMonitorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch patient data
    setTimeout(() => {
      const savedData = localStorage.getItem("patient_data");
      const healthData = localStorage.getItem("health_monitor_data");
      
      if (savedData) {
        setPatientData(JSON.parse(savedData));
      }
      
      if (healthData) {
        setHealthMonitorData(JSON.parse(healthData));
      }
      
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-medical border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const patientInfo = {
    name: "John Doe",
    age: 42,
    gender: "Male",
    bloodGroup: "O+",
    aadhaarNumber: user?.aadhaar || "XXXX-XXXX-1234",
    contact: "+91 98765 43210",
    address: "123 Medical Street, Health City, India",
  };

  return (
    <div className="page-container">
      <div className="grid grid-cols-1 gap-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-medical to-medical-dark text-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">Welcome, {user?.name || "Patient"}</h1>
                <p className="mt-2 text-white/80">
                  Your medical dashboard is up to date. Here's your health overview.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/patient-form")}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl backdrop-blur-sm transition-colors"
                >
                  Update Health Data
                </button>
                <button
                  onClick={() => navigate("/health-monitor")}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl backdrop-blur-sm transition-colors flex items-center"
                >
                  <Weight size={16} className="mr-2" />
                  IoT Health Monitor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Health Metrics Section */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-medium text-gray-900">Health Metrics</h2>
            
            {patientData ? (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">BMI</span>
                    <Activity size={16} className="text-blue-600" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold">{patientData.bmi || "N/A"}</p>
                  <p className="text-xs text-blue-600/70">Body Mass Index</p>
                </div>
                
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">SpO2</span>
                    <Heart size={16} className="text-green-600" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold">{patientData.spO2 || "N/A"}%</p>
                  <p className="text-xs text-green-600/70">Oxygen Saturation</p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-600">Weight</span>
                    <TrendingUp size={16} className="text-purple-600" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold">{patientData.weight || "N/A"} kg</p>
                  <p className="text-xs text-purple-600/70">Body Weight</p>
                </div>
                
                <div className="bg-amber-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-amber-600">Sugar</span>
                    <Activity size={16} className="text-amber-600" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold">{patientData.sugarContent || "N/A"}</p>
                  <p className="text-xs text-amber-600/70">Blood Sugar Level</p>
                </div>
              </div>
            ) : (
              <div className="mt-4 bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-gray-500">No health data available. Please update your health metrics.</p>
                <button
                  onClick={() => navigate("/patient-form")}
                  className="mt-4 bg-medical hover:bg-medical-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Add Health Data
                </button>
              </div>
            )}
          </div>
        </div>

        {/* IoT Health Monitor Data Section */}
        {healthMonitorData && (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-gray-900 flex items-center">
                  <Weight className="mr-2 text-medical" size={20} />
                  IoT Health Monitoring
                </h2>
                <button
                  onClick={() => navigate("/health-monitor")}
                  className="text-sm text-medical hover:text-medical-dark flex items-center"
                >
                  Update Data
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {healthMonitorData.weight && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600">Weight</span>
                      <Weight size={16} className="text-blue-600" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold">{healthMonitorData.weight} kg</p>
                  </div>
                )}
                
                {healthMonitorData.bodyFat && (
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">Body Fat</span>
                      <Activity size={16} className="text-green-600" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold">{healthMonitorData.bodyFat}%</p>
                  </div>
                )}
                
                {healthMonitorData.bmi && (
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-600">BMI</span>
                      <TrendingUp size={16} className="text-purple-600" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold">{healthMonitorData.bmi}</p>
                  </div>
                )}
                
                {healthMonitorData.metabolicAge && (
                  <div className="bg-amber-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-600">Metabolic Age</span>
                      <Zap size={16} className="text-amber-600" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold">{healthMonitorData.metabolicAge} yrs</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-center">
                <button
                  onClick={() => navigate("/health-monitor")}
                  className="text-medical hover:text-medical-dark"
                >
                  View all IoT health measurements
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Patient Information Section */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">Patient Information</h2>
              <button
                onClick={() => {/* Edit action */}}
                className="text-sm text-medical hover:text-medical-dark"
              >
                Edit Profile
              </button>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{patientInfo.name}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age & Gender</p>
                    <p className="font-medium">{patientInfo.age} years, {patientInfo.gender}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart size={20} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="font-medium">{patientInfo.bloodGroup}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <FileText size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Aadhaar Number</p>
                    <p className="font-medium">{patientInfo.aadhaarNumber}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{patientInfo.contact}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{patientInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Medical History */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden card-hover">
            <div 
              className="p-6 cursor-pointer" 
              onClick={() => navigate("/medical-history")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium">Medical History</h3>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
              <p className="mt-2 text-gray-600 text-sm">
                View your complete medical history, hospital visits, and documents
              </p>
            </div>
          </div>
          
          {/* Medication History */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden card-hover">
            <div 
              className="p-6 cursor-pointer"
              onClick={() => navigate("/medication-history")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Pill size={20} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium">Medication History</h3>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
              <p className="mt-2 text-gray-600 text-sm">
                Track your medication schedule, prescriptions, and treatment plans
              </p>
            </div>
          </div>
        </div>
        
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-medium text-gray-900">Upcoming Appointments</h2>
            
            <div className="mt-4">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Clock size={24} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No upcoming appointments scheduled</p>
                <button className="mt-4 bg-medical hover:bg-medical-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
