
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Check, AlertCircle } from "lucide-react";

const LocationVerification: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          
          // Try to get location name using reverse geocoding
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data.display_name) {
              setLocationName(data.display_name);
            }
          } catch (err) {
            console.error("Error fetching location name:", err);
          }
          
          setLoading(false);
        },
        (err) => {
          setError(
            err.code === 1
              ? "Location access denied. Please allow location access to continue."
              : "Error getting your location. Please try again."
          );
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  const handleContinue = () => {
    // In a real app, you would save the location to the user profile
    navigate("/dashboard");
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Re-attempt to get location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.display_name) {
            setLocationName(data.display_name);
          }
        } catch (err) {
          console.error("Error fetching location name:", err);
        }
        
        setLoading(false);
      },
      (err) => {
        setError(
          err.code === 1
            ? "Location access denied. Please allow location access to continue."
            : "Error getting your location. Please try again."
        );
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md w-full animate-scale-in glass-panel">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-medical rounded-full mx-auto flex items-center justify-center">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-gray-900">Verify Your Location</h1>
            <p className="mt-2 text-gray-600">
              We need your location to provide personalized medical services
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-medical border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Detecting your location...</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <div className="flex justify-center">
                  <AlertCircle className="h-12 w-12 text-red-500" />
                </div>
                <p className="mt-4 text-red-600">{error}</p>
                <button
                  onClick={handleRetry}
                  className="mt-6 bg-medical hover:bg-medical-dark text-white font-medium py-3 px-6 rounded-xl transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex justify-center">
                  <Check className="h-12 w-12 text-green-500" />
                </div>
                <p className="mt-4 text-green-600">Location successfully detected!</p>
                {locationName && (
                  <p className="mt-2 text-gray-700">
                    <span className="font-medium">Your location:</span> {locationName}
                  </p>
                )}
                <button
                  onClick={handleContinue}
                  className="mt-6 bg-medical hover:bg-medical-dark text-white font-medium py-3 px-6 rounded-xl transition-colors"
                >
                  Continue to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationVerification;
