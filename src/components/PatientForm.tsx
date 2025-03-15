
import React, { useState } from "react";
import { 
  SaveIcon, 
  User, 
  Weight, 
  Ruler, 
  Heart, 
  Activity, 
  Thermometer 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PatientForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bmi: "",
    fatPercentage: "",
    spO2: "",
    weight: "",
    height: "",
    oxygenLevels: "",
    sugarContent: "",
    isDiabetic: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height) / 100; // Convert cm to meters
    
    if (weight > 0 && height > 0) {
      const bmi = (weight / (height * height)).toFixed(1);
      setFormData((prev) => ({ ...prev, bmi }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send data to your backend here
      localStorage.setItem("patient_data", JSON.stringify(formData));
      setLoading(false);
      toast.success("Patient data saved successfully!");
      
      // Navigate to dashboard
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Patient Data Collection</h1>
        <p className="mt-2 text-gray-600">
          Please enter your current health metrics to update your medical profile
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weight */}
              <div className="space-y-2">
                <label htmlFor="weight" className="flex items-center text-sm font-medium text-gray-700">
                  <Weight size={16} className="mr-2" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="Enter weight in kg"
                  value={formData.weight}
                  onChange={handleChange}
                  onBlur={calculateBMI}
                  className="medical-input"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Height */}
              <div className="space-y-2">
                <label htmlFor="height" className="flex items-center text-sm font-medium text-gray-700">
                  <Ruler size={16} className="mr-2" />
                  Height (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  placeholder="Enter height in cm"
                  value={formData.height}
                  onChange={handleChange}
                  onBlur={calculateBMI}
                  className="medical-input"
                  min="0"
                />
              </div>

              {/* BMI */}
              <div className="space-y-2">
                <label htmlFor="bmi" className="flex items-center text-sm font-medium text-gray-700">
                  <Activity size={16} className="mr-2" />
                  BMI
                </label>
                <input
                  type="text"
                  id="bmi"
                  name="bmi"
                  placeholder="Calculated automatically"
                  value={formData.bmi}
                  onChange={handleChange}
                  className="medical-input"
                  readOnly
                />
              </div>

              {/* Fat Percentage */}
              <div className="space-y-2">
                <label htmlFor="fatPercentage" className="flex items-center text-sm font-medium text-gray-700">
                  <User size={16} className="mr-2" />
                  Fat Percentage (%)
                </label>
                <input
                  type="number"
                  id="fatPercentage"
                  name="fatPercentage"
                  placeholder="Enter fat percentage"
                  value={formData.fatPercentage}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* SpO2 */}
              <div className="space-y-2">
                <label htmlFor="spO2" className="flex items-center text-sm font-medium text-gray-700">
                  <Heart size={16} className="mr-2" />
                  SpO2 (%)
                </label>
                <input
                  type="number"
                  id="spO2"
                  name="spO2"
                  placeholder="Enter oxygen saturation level"
                  value={formData.spO2}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                  max="100"
                  step="1"
                />
              </div>

              {/* Oxygen Levels */}
              <div className="space-y-2">
                <label htmlFor="oxygenLevels" className="flex items-center text-sm font-medium text-gray-700">
                  <Thermometer size={16} className="mr-2" />
                  Oxygen Levels (mmHg)
                </label>
                <input
                  type="number"
                  id="oxygenLevels"
                  name="oxygenLevels"
                  placeholder="Enter oxygen levels"
                  value={formData.oxygenLevels}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                />
              </div>

              {/* Sugar Content */}
              <div className="space-y-2">
                <label htmlFor="sugarContent" className="flex items-center text-sm font-medium text-gray-700">
                  <Thermometer size={16} className="mr-2" />
                  Sugar Content (mg/dL)
                </label>
                <input
                  type="number"
                  id="sugarContent"
                  name="sugarContent"
                  placeholder="Enter blood sugar level"
                  value={formData.sugarContent}
                  onChange={handleChange}
                  className="medical-input"
                  min="0"
                />
              </div>

              {/* Diabetic Toggle */}
              <div className="flex items-center space-x-3">
                <label htmlFor="isDiabetic" className="text-sm font-medium text-gray-700">
                  Are you a diabetic patient?
                </label>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    id="isDiabetic"
                    name="isDiabetic"
                    checked={formData.isDiabetic}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`block h-6 rounded-full transition-colors w-12 ${
                      formData.isDiabetic ? "bg-medical" : "bg-gray-200"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${
                      formData.isDiabetic ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
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
                  <SaveIcon className="mr-2" size={18} />
                )}
                Save Patient Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
