
import React, { useState } from "react";
import { 
  Weight, 
  Activity, 
  Heart, 
  Save,
  AlertCircle, 
  Droplets
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HealthMonitor: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    weight: "",
    bodyFat: "",
    bmi: "",
    visceralFat: "",
    metabolicAge: "",
    hydration: "",
    bmr: "",
    proteinPercentage: "",
    boneMass: "",
    muscleMass: "",
    subcutaneousFat: "",
    skeletalMass: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send data to your backend here
      localStorage.setItem("health_monitor_data", JSON.stringify(formData));
      setLoading(false);
      toast.success("Health data saved successfully!");
      
      // Navigate to dashboard
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">IoT Health Monitor</h1>
        <p className="mt-2 text-gray-600">
          Record your measurements from IoT devices for comprehensive health tracking
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-900 flex items-center">
              <Weight className="mr-2 text-medical" size={20} />
              IoT Weight Scale
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter measurements from your smart scale device
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Weight */}
              <div className="space-y-2">
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="Enter weight in kg"
                  value={formData.weight}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Body Fat */}
              <div className="space-y-2">
                <label htmlFor="bodyFat" className="block text-sm font-medium text-gray-700">
                  Body Fat (%)
                </label>
                <input
                  type="number"
                  id="bodyFat"
                  name="bodyFat"
                  placeholder="Enter body fat percentage"
                  value={formData.bodyFat}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* BMI */}
              <div className="space-y-2">
                <label htmlFor="bmi" className="block text-sm font-medium text-gray-700">
                  BMI
                </label>
                <input
                  type="number"
                  id="bmi"
                  name="bmi"
                  placeholder="Enter BMI"
                  value={formData.bmi}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Visceral Fat */}
              <div className="space-y-2">
                <label htmlFor="visceralFat" className="block text-sm font-medium text-gray-700">
                  Visceral Fat
                </label>
                <input
                  type="number"
                  id="visceralFat"
                  name="visceralFat"
                  placeholder="Enter visceral fat"
                  value={formData.visceralFat}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Metabolic Age */}
              <div className="space-y-2">
                <label htmlFor="metabolicAge" className="block text-sm font-medium text-gray-700">
                  Metabolic Age (years)
                </label>
                <input
                  type="number"
                  id="metabolicAge"
                  name="metabolicAge"
                  placeholder="Enter metabolic age"
                  value={formData.metabolicAge}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                />
              </div>

              {/* Hydration */}
              <div className="space-y-2">
                <label htmlFor="hydration" className="block text-sm font-medium text-gray-700">
                  Hydration (%)
                </label>
                <input
                  type="number"
                  id="hydration"
                  name="hydration"
                  placeholder="Enter hydration percentage"
                  value={formData.hydration}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>

            <div className="mt-8 mb-4">
              <h2 className="text-xl font-medium text-gray-900 flex items-center">
                <Activity className="mr-2 text-medical" size={20} />
                Advanced Metrics
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Additional body composition measurements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* BMR */}
              <div className="space-y-2">
                <label htmlFor="bmr" className="block text-sm font-medium text-gray-700">
                  BMR (calories)
                </label>
                <input
                  type="number"
                  id="bmr"
                  name="bmr"
                  placeholder="Enter basal metabolic rate"
                  value={formData.bmr}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                />
              </div>

              {/* Protein Percentage */}
              <div className="space-y-2">
                <label htmlFor="proteinPercentage" className="block text-sm font-medium text-gray-700">
                  Protein (%)
                </label>
                <input
                  type="number"
                  id="proteinPercentage"
                  name="proteinPercentage"
                  placeholder="Enter protein percentage"
                  value={formData.proteinPercentage}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* Bone Mass */}
              <div className="space-y-2">
                <label htmlFor="boneMass" className="block text-sm font-medium text-gray-700">
                  Bone Mass (kg)
                </label>
                <input
                  type="number"
                  id="boneMass"
                  name="boneMass"
                  placeholder="Enter bone mass"
                  value={formData.boneMass}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Muscle Mass */}
              <div className="space-y-2">
                <label htmlFor="muscleMass" className="block text-sm font-medium text-gray-700">
                  Muscle Mass (kg)
                </label>
                <input
                  type="number"
                  id="muscleMass"
                  name="muscleMass"
                  placeholder="Enter muscle mass"
                  value={formData.muscleMass}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Subcutaneous Fat */}
              <div className="space-y-2">
                <label htmlFor="subcutaneousFat" className="block text-sm font-medium text-gray-700">
                  Subcutaneous Fat (%)
                </label>
                <input
                  type="number"
                  id="subcutaneousFat"
                  name="subcutaneousFat"
                  placeholder="Enter subcutaneous fat"
                  value={formData.subcutaneousFat}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* Skeletal Mass */}
              <div className="space-y-2">
                <label htmlFor="skeletalMass" className="block text-sm font-medium text-gray-700">
                  Skeletal Mass (kg)
                </label>
                <input
                  type="number"
                  id="skeletalMass"
                  name="skeletalMass"
                  placeholder="Enter skeletal mass"
                  value={formData.skeletalMass}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <button
                type="submit"
                disabled={loading}
                className="bg-medical hover:bg-medical-dark text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Save className="mr-2" size={18} />
                )}
                Save Health Data
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-xl p-4 flex items-start">
        <AlertCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" size={20} />
        <div>
          <p className="text-blue-800 font-medium">About IoT Health Monitoring</p>
          <p className="text-blue-600 text-sm mt-1">
            For best results, use smart devices that can automatically sync your health data.
            This page allows manual entry of metrics typically collected by IoT health monitoring devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitor;
