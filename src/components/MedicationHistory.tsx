
import React, { useState } from "react";
import { 
  Pill, 
  Calendar, 
  User, 
  Clock, 
  FilePlus, 
  Check, 
  AlertTriangle, 
  Info 
} from "lucide-react";

const MedicationHistory: React.FC = () => {
  // Mock data for medication history
  const medications = [
    {
      id: 1,
      name: "Amlodipine",
      dosage: "5mg",
      frequency: "Once daily",
      purpose: "Blood Pressure Control",
      prescribedBy: "Dr. Rajesh Kumar",
      prescribedOn: "12 Mar 2023",
      endDate: "12 Sep 2023",
      status: "Active",
      notes: "Take in the morning with food.",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      purpose: "Diabetes Management",
      prescribedBy: "Dr. Priya Patel",
      prescribedOn: "05 Jan 2023",
      endDate: "Ongoing",
      status: "Active",
      notes: "Take with meals to minimize GI side effects.",
    },
    {
      id: 3,
      name: "Azithromycin",
      dosage: "500mg",
      frequency: "Once daily",
      purpose: "Respiratory Infection",
      prescribedBy: "Dr. Samantha Patel",
      prescribedOn: "15 Nov 2022",
      endDate: "22 Nov 2022",
      status: "Completed",
      notes: "5-day course completed successfully.",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check size={12} className="mr-1" />
            Active
          </span>
        );
      case "Completed":
        return (
          <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Check size={12} className="mr-1" />
            Completed
          </span>
        );
      case "Discontinued":
        return (
          <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <AlertTriangle size={12} className="mr-1" />
            Discontinued
          </span>
        );
      default:
        return (
          <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Info size={12} className="mr-1" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Medication History</h1>
        <p className="mt-2 text-gray-600">
          View and manage your medication history, prescriptions, and treatment plans
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-900">
              <Pill className="inline-block mr-2 text-medical" size={20} />
              Medication Log
            </h2>
            <button className="flex items-center text-sm px-3 py-1.5 text-medical bg-medical/10 rounded-lg hover:bg-medical/20 transition-colors">
              <FilePlus size={16} className="mr-1.5" />
              Add Medication
            </button>
          </div>

          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medication
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dosage & Frequency
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prescribed By
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {medications.map((medication) => (
                    <tr key={medication.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {medication.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {medication.purpose}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{medication.dosage}</div>
                        <div className="text-sm text-gray-500">
                          <Clock size={14} className="inline mr-1" />
                          {medication.frequency}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <User size={14} className="inline mr-1" />
                          {medication.prescribedBy}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <Calendar size={14} className="inline mr-1" />
                          {medication.prescribedOn}
                        </div>
                        <div className="text-sm text-gray-500">
                          to {medication.endDate}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {getStatusBadge(medication.status)}
                        <div className="text-xs text-gray-500 mt-1">
                          {medication.notes}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Medication Schedule
          </h2>

          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <Clock size={24} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">
              No medication schedule has been set up yet.
            </p>
            <button className="mt-4 bg-medical hover:bg-medical-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
              Set Up Medication Schedule
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Medication Information
          </h2>

          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-start">
              <Info size={20} className="text-blue-500 mr-4 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium text-blue-900">Important Medication Tips</h3>
                <ul className="mt-2 space-y-2 text-blue-800">
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0">
                      <Check size={12} />
                    </span>
                    Always take medications as prescribed by your healthcare provider.
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0">
                      <Check size={12} />
                    </span>
                    Do not stop taking medications without consulting your doctor.
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0">
                      <Check size={12} />
                    </span>
                    Store medications properly as per package instructions.
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0">
                      <Check size={12} />
                    </span>
                    Report any side effects to your healthcare provider immediately.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationHistory;
