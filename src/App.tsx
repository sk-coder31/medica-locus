
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./components/LoginPage";
import DoctorLoginPage from "./components/DoctorLoginPage";
import LocationVerification from "./components/LocationVerification";
import Dashboard from "./components/Dashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientForm from "./components/PatientForm";
import MedicalHistory from "./components/MedicalHistory";
import MedicationHistory from "./components/MedicationHistory";
import HealthMonitor from "./components/HealthMonitor";
import FingerprintAuth from "./components/FingerprintAuth";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, requireFingerprint = true }: { children: React.ReactNode, requireFingerprint?: boolean }) => {
  const { isAuthenticated, loading, isFingerPrintVerified, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-medical border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If fingerprint verification is required but not completed
  if (requireFingerprint && !isFingerPrintVerified && user?.role === "doctor") {
    return <Navigate to="/fingerprint-auth" />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/doctor-login" element={<DoctorLoginPage />} />
              <Route path="/fingerprint-auth" element={
                <ProtectedRoute requireFingerprint={false}>
                  <FingerprintAuth />
                </ProtectedRoute>
              } />
              <Route path="/verify-location" element={
                <ProtectedRoute>
                  <LocationVerification />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/doctor-dashboard" element={
                <ProtectedRoute>
                  <DoctorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/patient-form" element={
                <ProtectedRoute>
                  <PatientForm />
                </ProtectedRoute>
              } />
              <Route path="/health-monitor" element={
                <ProtectedRoute>
                  <HealthMonitor />
                </ProtectedRoute>
              } />
              <Route path="/medical-history" element={
                <ProtectedRoute>
                  <MedicalHistory />
                </ProtectedRoute>
              } />
              <Route path="/medication-history" element={
                <ProtectedRoute>
                  <MedicationHistory />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
