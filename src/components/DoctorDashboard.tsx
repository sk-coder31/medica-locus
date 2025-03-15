import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  Calendar, 
  User, 
  ChevronRight, 
  Heart, 
  Activity, 
  Pill
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./ui/Modal";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Mock appointment data
const MOCK_APPOINTMENTS = [
  {
    id: "apt1",
    patientId: "p1",
    patientName: "Alice Johnson",
    age: 45,
    time: "10:00 AM",
    reason: "Annual checkup",
    status: "upcoming",
    vitalStats: {
      bloodPressure: "120/80",
      weight: 68,
      heartRate: 72,
      temperature: 98.6
    },
    medicalHistory: [
      "Hypertension diagnosed in 2018",
      "Tonsillectomy in 2010"
    ],
    currentMedications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Daily" },
      { name: "Aspirin", dosage: "81mg", frequency: "Daily" }
    ],
    currentDiseases: ["Hypertension", "High Cholesterol"]
  },
  {
    id: "apt2",
    patientId: "p2",
    patientName: "Robert Smith",
    age: 62,
    time: "11:30 AM",
    reason: "Diabetes follow-up",
    status: "upcoming",
    vitalStats: {
      bloodPressure: "135/85",
      weight: 82,
      heartRate: 78,
      temperature: 98.4
    },
    medicalHistory: [
      "Type 2 Diabetes diagnosed in 2015",
      "Knee replacement in 2019"
    ],
    currentMedications: [
      { name: "Metformin", dosage: "1000mg", frequency: "Twice Daily" },
      { name: "Atorvastatin", dosage: "20mg", frequency: "Daily at bedtime" }
    ],
    currentDiseases: ["Type 2 Diabetes", "Osteoarthritis"]
  },
  {
    id: "apt3",
    patientId: "p3",
    patientName: "Emily Chen",
    age: 29,
    time: "2:00 PM",
    reason: "Migraine consultation",
    status: "upcoming",
    vitalStats: {
      bloodPressure: "110/70",
      weight: 56,
      heartRate: 68,
      temperature: 98.2
    },
    medicalHistory: [
      "Chronic migraines since 2017",
      "Appendectomy in 2010"
    ],
    currentMedications: [
      { name: "Sumatriptan", dosage: "50mg", frequency: "As needed for migraine" },
      { name: "Propranolol", dosage: "40mg", frequency: "Daily" }
    ],
    currentDiseases: ["Chronic Migraine", "Seasonal Allergies"]
  }
];

// Chart data for blood pressure
const bloodPressureData = [
  { name: "Systolic", value: 120, color: "#4f46e5" },
  { name: "Diastolic", value: 80, color: "#818cf8" }
];

// Chart data for weight trends
const weightData = [
  { name: "Current", value: 68, color: "#10b981" },
  { name: "Target", value: 65, color: "#d1fae5" }
];

// Chart config
const chartConfig = {
  systolic: { label: "Systolic", theme: { light: "#4f46e5", dark: "#818cf8" } },
  diastolic: { label: "Diastolic", theme: { light: "#818cf8", dark: "#a5b4fc" } },
  current: { label: "Current", theme: { light: "#10b981", dark: "#34d399" } },
  target: { label: "Target", theme: { light: "#d1fae5", dark: "#6ee7b7" } },
};

const COLORS = ["#4f46e5", "#818cf8", "#10b981", "#34d399"];

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentAppointment, setCurrentAppointment] = useState<any>(null);
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [loading, setLoading] = useState(true);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    // Simulate API call to fetch appointments
    setTimeout(() => {
      setLoading(false);
      
      // Set the first appointment as current by default
      if (appointments.length > 0) {
        setCurrentAppointment(appointments[0]);
      }
    }, 1000);
    
    // Set up appointment auto-switching (for demo purposes)
    const switchInterval = setInterval(() => {
      // Find the index of the current appointment
      const currentIndex = appointments.findIndex(apt => apt.id === currentAppointment?.id);
      
      // If we have a valid index and there's a next appointment
      if (currentIndex >= 0 && currentIndex < appointments.length - 1) {
        setCurrentAppointment(appointments[currentIndex + 1]);
      }
    }, 60000); // Switch every minute for demo
    
    return () => clearInterval(switchInterval);
  }, [appointments, currentAppointment]);

  const handlePatientClick = (patient: any) => {
    setSelectedPatient(patient);
    setIsPatientModalOpen(true);
  };

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

  return (
    <div className="page-container">
      <div className="grid grid-cols-1 gap-6">
        {/* Doctor Welcome Section */}
        <div className="bg-gradient-to-r from-medical to-medical-dark text-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">Welcome, {user?.name || "Doctor"}</h1>
                <p className="mt-2 text-white/80">
                  You have {appointments.length} appointments scheduled for today.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="bg-white/20 px-4 py-2 rounded-xl flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Appointment Card */}
        {currentAppointment && (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-900">Current Patient</h2>
                <div className="flex items-center text-sm text-medical">
                  <Clock size={16} className="mr-1" />
                  <span>{currentAppointment.time}</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Patient Info */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-900">{currentAppointment.patientName}</h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Age: {currentAppointment.age} years</p>
                      <p>Reason: {currentAppointment.reason}</p>
                    </div>
                    <button 
                      className="mt-4 text-medical hover:text-medical-dark text-sm flex items-center"
                      onClick={() => handlePatientClick(currentAppointment)}
                    >
                      View Complete Profile
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                  
                  {/* Current Diseases */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-900">Current Diseases</h3>
                    <ul className="mt-2 space-y-1">
                      {currentAppointment.currentDiseases.map((disease: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="h-2 w-2 rounded-full bg-medical mr-2"></div>
                          {disease}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Vital Statistics Visualizations */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Blood Pressure Chart */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-900">Blood Pressure</h3>
                    <div className="h-60">
                      <ChartContainer className="h-full" config={chartConfig}>
                        <PieChart>
                          <Pie
                            data={bloodPressureData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            nameKey="name"
                            label={({name, value}) => `${name}: ${value}`}
                          >
                            {bloodPressureData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip
                            content={<ChartTooltipContent nameKey="name" />}
                          />
                        </PieChart>
                      </ChartContainer>
                      <div className="text-center mt-2">
                        <span className="text-lg font-medium">{currentAppointment.vitalStats.bloodPressure}</span>
                        <p className="text-xs text-gray-500">mmHg</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Weight Chart */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-900">Weight</h3>
                    <div className="h-60">
                      <ChartContainer className="h-full" config={chartConfig}>
                        <PieChart>
                          <Pie
                            data={weightData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            nameKey="name"
                            label={({name, value}) => `${name}: ${value} kg`}
                          >
                            {weightData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip
                            content={<ChartTooltipContent nameKey="name" />}
                          />
                        </PieChart>
                      </ChartContainer>
                      <div className="text-center mt-2">
                        <span className="text-lg font-medium">{currentAppointment.vitalStats.weight} kg</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Other vital stats in a row */}
                  <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                      <Heart size={20} className="text-red-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Heart Rate</p>
                        <p className="text-lg font-medium">{currentAppointment.vitalStats.heartRate} <span className="text-xs text-gray-500">bpm</span></p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                      <Activity size={20} className="text-orange-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Temperature</p>
                        <p className="text-lg font-medium">{currentAppointment.vitalStats.temperature} <span className="text-xs text-gray-500">°F</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Current Medications */}
              <div className="mt-6">
                <h3 className="font-medium text-gray-900">Current Medications</h3>
                <div className="mt-3 overflow-hidden border border-gray-200 rounded-xl">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Frequency</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentAppointment.currentMedications.map((med: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{med.name}</TableCell>
                          <TableCell>{med.dosage}</TableCell>
                          <TableCell>{med.frequency}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="text-medical hover:text-medical-dark flex items-center text-sm">
                    <Pill size={16} className="mr-1" />
                    Add New Medication
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments List */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-medium text-gray-900">Today's Appointments</h2>
            
            <div className="mt-4 space-y-3">
              {appointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    currentAppointment?.id === appointment.id 
                      ? 'bg-medical/10 border border-medical/20' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentAppointment(appointment)}
                >
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      currentAppointment?.id === appointment.id 
                        ? 'bg-medical text-white' 
                        : 'bg-gray-200'
                    }`}>
                      <User size={18} />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-500">{appointment.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 mr-2">{appointment.time}</span>
                    <button
                      className="p-2 rounded-full hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePatientClick(appointment);
                      }}
                    >
                      <ChevronRight size={18} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="text-medical hover:text-medical-dark flex items-center">
                <Calendar size={18} className="mr-2" />
                Manage Appointment Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Patient Details Modal */}
      <Modal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        title="Patient Details"
        maxWidth="xl"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
              <div className="mb-4 md:mb-0">
                <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={40} className="text-gray-400" />
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-medium">{selectedPatient.patientName}</h2>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{selectedPatient.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Patient ID</p>
                    <p className="font-medium">{selectedPatient.patientId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Appointment Time</p>
                    <p className="font-medium">{selectedPatient.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reason for Visit</p>
                    <p className="font-medium">{selectedPatient.reason}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium text-lg mb-4">Vital Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Blood Pressure</p>
                  <p className="text-lg font-medium">{selectedPatient.vitalStats.bloodPressure}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Heart Rate</p>
                  <p className="text-lg font-medium">{selectedPatient.vitalStats.heartRate} bpm</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="text-lg font-medium">{selectedPatient.vitalStats.weight} kg</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Temperature</p>
                  <p className="text-lg font-medium">{selectedPatient.vitalStats.temperature} °F</p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium text-lg mb-4">Medical History</h3>
              <ul className="space-y-2">
                {selectedPatient.medicalHistory.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mr-2 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-medical"></div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <button className="text-medical hover:text-medical-dark text-sm">
                  View Complete Medical History
                </button>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium text-lg mb-4">Current Medications</h3>
              <div className="overflow-hidden border border-gray-200 rounded-xl">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Frequency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedPatient.currentMedications.map((med: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{med.name}</TableCell>
                        <TableCell>{med.dosage}</TableCell>
                        <TableCell>{med.frequency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setIsPatientModalOpen(false)}
              >
                Close
              </button>
              <button 
                className="px-4 py-2 bg-medical text-white rounded-lg hover:bg-medical-dark"
                onClick={() => {
                  setIsPatientModalOpen(false);
                  navigate(`/medical-history?patientId=${selectedPatient.patientId}`);
                }}
              >
                View Full Records
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorDashboard;
