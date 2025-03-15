
import React, { useState } from "react";
import { 
  FileIcon, 
  Hospital, 
  Calendar, 
  User, 
  FilePlus, 
  X, 
  Image,
  Download 
} from "lucide-react";
import Modal from "./ui/Modal";

const MedicalHistory: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for medical history
  const hospitals = [
    {
      id: 1,
      name: "Apollo Hospitals",
      date: "12 Mar 2023",
      doctor: "Dr. Rajesh Kumar",
      reason: "Annual Checkup",
      documents: [
        { id: 101, name: "Blood Test Report", type: "pdf", size: "1.2 MB" },
        { id: 102, name: "X-Ray Report", type: "jpg", size: "3.4 MB" },
      ],
    },
    {
      id: 2,
      name: "AIIMS Delhi",
      date: "05 Jan 2023",
      doctor: "Dr. Samantha Patel",
      reason: "COVID-19 Treatment",
      documents: [
        { id: 201, name: "COVID Test Report", type: "pdf", size: "0.8 MB" },
        { id: 202, name: "Lung Scan", type: "jpg", size: "4.1 MB" },
        { id: 203, name: "Prescription", type: "pdf", size: "0.3 MB" },
      ],
    },
  ];

  const diseases = [
    {
      id: 1,
      name: "Hypertension",
      diagnosedOn: "15 Jun 2022",
      diagnosedBy: "Dr. Rahul Sharma",
      status: "Ongoing",
      notes: "Moderate hypertension, managed with medication and lifestyle changes.",
    },
    {
      id: 2,
      name: "Type 2 Diabetes",
      diagnosedOn: "03 Dec 2021",
      diagnosedBy: "Dr. Priya Patel",
      status: "Ongoing",
      notes: "Well-controlled with medication and diet. Regular monitoring required.",
    },
  ];

  const openDocumentModal = (document: any) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "jpg":
      case "png":
      case "jpeg":
        return <Image size={20} className="text-blue-500" />;
      case "pdf":
        return <FileIcon size={20} className="text-red-500" />;
      default:
        return <FileIcon size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Medical History</h1>
        <p className="mt-2 text-gray-600">
          View and manage your complete medical records, hospital visits, and ongoing conditions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Hospital Visits */}
        <section>
          <h2 className="section-title flex items-center">
            <Hospital size={20} className="mr-2 text-medical" />
            Hospital Visits
          </h2>
          
          <div className="space-y-4">
            {hospitals.map((hospital) => (
              <div key={hospital.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{hospital.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {hospital.date}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <User size={14} className="mr-1" />
                          {hospital.doctor}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{hospital.reason}</p>
                    </div>
                  </div>
                  
                  {hospital.documents.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {hospital.documents.map((doc) => (
                          <div 
                            key={doc.id}
                            onClick={() => openDocumentModal(doc)}
                            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                          >
                            {getDocumentIcon(doc.type)}
                            <div className="ml-3">
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.size}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <div className="py-2 text-center">
              <button className="inline-flex items-center text-medical hover:text-medical-dark">
                <FilePlus size={16} className="mr-1" />
                <span>Add Hospital Visit</span>
              </button>
            </div>
          </div>
        </section>
        
        {/* Current Diseases/Conditions */}
        <section>
          <h2 className="section-title flex items-center">
            <FileIcon size={20} className="mr-2 text-medical" />
            Current Medical Conditions
          </h2>
          
          <div className="space-y-4">
            {diseases.map((disease) => (
              <div key={disease.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium">{disease.name}</h3>
                        <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          {disease.status}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          Diagnosed: {disease.diagnosedOn}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <User size={14} className="mr-1" />
                          {disease.diagnosedBy}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{disease.notes}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <button className="text-sm text-medical hover:text-medical-dark">
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="py-2 text-center">
              <button className="inline-flex items-center text-medical hover:text-medical-dark">
                <FilePlus size={16} className="mr-1" />
                <span>Add Medical Condition</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Document Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDocument?.name || "Document View"}
        maxWidth="xl"
      >
        <div className="p-4">
          {selectedDocument?.type === "pdf" ? (
            <div className="bg-gray-100 rounded-lg p-12 flex flex-col items-center justify-center">
              <FileIcon size={64} className="text-red-500 mb-4" />
              <p className="text-gray-700 mb-4">PDF preview not available</p>
              <button className="flex items-center px-4 py-2 bg-medical text-white rounded-lg hover:bg-medical-dark transition-colors">
                <Download size={16} className="mr-2" />
                Download PDF
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-lg w-full h-64 flex items-center justify-center">
                <Image size={48} className="text-gray-400" />
              </div>
              <div className="mt-4 flex justify-center">
                <button className="flex items-center px-4 py-2 bg-medical text-white rounded-lg hover:bg-medical-dark transition-colors">
                  <Download size={16} className="mr-2" />
                  Download Image
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MedicalHistory;
