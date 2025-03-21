import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ArrowRight, Lock, Mail, CreditCard } from "lucide-react";

const DoctorLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    try {
      setError("");
      await login(email, password, licenseNumber, true); // Pass true for isDoctor
      navigate("/fingerprint-auth"); // Redirect to fingerprint auth
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md w-full animate-scale-in glass-panel">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-medical rounded-full mx-auto flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-gray-900">Doctor Login</h1>
            <p className="mt-2 text-gray-600">Enter your credentials to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="doctor.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="medical-input pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="medical-input pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                Medical License Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard size={18} className="text-gray-400" />
                </div>
                <input
                  id="licenseNumber"
                  type="text"
                  placeholder="ML12345678"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="medical-input pl-10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-medical hover:bg-medical-dark text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Login to Dashboard
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>For demo purposes, any email and password will work</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLoginPage;
