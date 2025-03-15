
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../components/ui/use-toast";

const FingerprintAuth: React.FC = () => {
  const navigate = useNavigate();
  const { verifyFingerprint, user, isFingerPrintVerified } = useAuth();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    // Start the fingerprint animation immediately
    startScan();
  }, []);

  useEffect(() => {
    // Redirect to appropriate dashboard when fingerprint is verified
    if (isFingerPrintVerified) {
      const destination = user?.role === "doctor" ? "/doctor-dashboard" : "/dashboard";
      setTimeout(() => {
        navigate(destination);
        toast({
          title: "Authentication successful",
          description: "Welcome to MediTrack",
        });
      }, 1000);
    }
  }, [isFingerPrintVerified, navigate, user, toast]);

  const startScan = async () => {
    setScanning(true);
    
    try {
      await verifyFingerprint();
      setScanComplete(true);
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md w-full animate-scale-in glass-panel">
        <div className="p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Fingerprint Authentication</h1>
          <p className="mt-2 text-gray-600 mb-8">
            For emergency access verification
          </p>

          <div className="flex flex-col items-center justify-center">
            <div 
              className={`h-32 w-32 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                scanning ? "bg-medical/20 animate-pulse" : 
                scanComplete ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <Fingerprint 
                size={64} 
                className={`transition-colors duration-300 ${
                  scanning ? "text-medical animate-pulse" : 
                  scanComplete ? "text-green-500" : "text-gray-400"
                }`} 
              />
            </div>

            <div className="mt-4 text-center">
              {scanning ? (
                <p className="text-medical">Scanning fingerprint...</p>
              ) : scanComplete ? (
                <p className="text-green-600">Fingerprint verified</p>
              ) : (
                <p className="text-gray-500">Place your finger on the scanner</p>
              )}
            </div>

            {!scanning && !scanComplete && (
              <button
                onClick={startScan}
                className="mt-6 px-6 py-2 bg-medical hover:bg-medical-dark text-white rounded-xl transition-colors"
              >
                Retry Scan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FingerprintAuth;
