import React, { useState } from 'react';

const ApplicationReview: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<null | number>(null);
  
  // Sample data for applications
  const applications = [
    {
      id: 1,
      applicationId: "APP-2023-045",
      farmerName: "Rajesh Kumar",
      farmerId: "FARM-12345",
      schemeName: "PM Kisan Samman Nidhi",
      appliedDate: "2023-05-02",
      status: "Pending",
      land: "2.5 hectares",
      location: "Amritsar, Punjab",
      requestedAmount: "₹6,000",
      documents: ["Aadhar Card", "Land Records", "Bank Details", "Applicant Photo"],
      notes: "First-time applicant for PM Kisan scheme."
    },
    {
      id: 2,
      applicationId: "APP-2023-044",
      farmerName: "Suresh Patel",
      farmerId: "FARM-12346",
      schemeName: "Soil Health Card Scheme",
      appliedDate: "2023-05-01",
      status: "Pending",
      land: "3.2 hectares",
      location: "Anand, Gujarat",
      requestedAmount: "N/A",
      documents: ["Aadhar Card", "Land Records", "Bank Details", "Applicant Photo"],
      notes: "Farmer has requested soil testing for multiple plots."
    },
    {
      id: 3,
      applicationId: "APP-2023-043",
      farmerName: "Priya Singh",
      farmerId: "FARM-12347",
      schemeName: "Pradhan Mantri Fasal Bima Yojana",
      appliedDate: "2023-04-30",
      status: "Pending",
      land: "1.8 hectares",
      location: "Lucknow, Uttar Pradesh",
      requestedAmount: "₹15,000",
      documents: ["Aadhar Card", "Land Records", "Bank Details", "Crop Details"],
      notes: "Applying for wheat crop insurance for Rabi season."
    },
    {
      id: 4,
      applicationId: "APP-2023-042",
      farmerName: "Manoj Sharma",
      farmerId: "FARM-12348",
      schemeName: "Kisan Credit Card Scheme",
      appliedDate: "2023-04-29",
      status: "Pending",
      land: "4.5 hectares",
      location: "Jaipur, Rajasthan",
      requestedAmount: "₹25,000",
      documents: ["Aadhar Card", "Land Records", "Bank Details", "Income Certificate"],
      notes: "Second application for KCC, previous loan fully repaid."
    },
    {
      id: 5,
      applicationId: "APP-2023-041",
      farmerName: "Amit Verma",
      farmerId: "FARM-12349",
      schemeName: "PM Kisan Samman Nidhi",
      appliedDate: "2023-04-28",
      status: "Under Review",
      land: "1.2 hectares",
      location: "Nagpur, Maharashtra",
      requestedAmount: "₹6,000",
      documents: ["Aadhar Card", "Land Records", "Bank Details", "Applicant Photo"],
      notes: "Land records need additional verification."
    }
  ];

  // Filter applications based on status and search term
  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = app.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.schemeName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under review':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Find selected application details
  const selectedAppDetails = applications.find(app => app.id === selectedApplication);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Application Review</h1>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterStatus('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filterStatus === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filterStatus === 'under review' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterStatus('under review')}
          >
            Under Review
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filterStatus === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterStatus('approved')}
          >
            Approved
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filterStatus === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterStatus('rejected')}
          >
            Rejected
          </button>
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search applications..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold">Applications ({filteredApplications.length})</h2>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
              {filteredApplications.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <li 
                      key={app.id} 
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedApplication === app.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedApplication(app.id)}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium text-blue-600">{app.applicationId}</span>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="font-medium mt-1">{app.farmerName}</p>
                      <p className="text-sm text-gray-500">{app.schemeName}</p>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>Applied: {app.appliedDate}</span>
                        <span>{app.location}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No applications found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Application Details */}
        <div className="lg:col-span-2">
          {selectedAppDetails ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{selectedAppDetails.applicationId}</h2>
                  <p className="text-gray-500">Submitted on {selectedAppDetails.appliedDate}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedAppDetails.status)}`}>
                  {selectedAppDetails.status}
                </span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Farmer Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Farmer Name</p>
                        <p className="font-medium">{selectedAppDetails.farmerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Farmer ID</p>
                        <p className="font-medium">{selectedAppDetails.farmerId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{selectedAppDetails.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Land Holdings</p>
                        <p className="font-medium">{selectedAppDetails.land}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Scheme Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Scheme Name</p>
                        <p className="font-medium">{selectedAppDetails.schemeName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Requested Amount</p>
                        <p className="font-medium">{selectedAppDetails.requestedAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="font-medium">{selectedAppDetails.notes}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Submitted Documents</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedAppDetails.documents.map((doc, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-sm text-center">{doc}</p>
                        <button className="mt-2 text-blue-600 text-xs hover:underline">View</button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Review Comments</h3>
                  <textarea 
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Add your review comments here..."
                  ></textarea>
                </div>
                
                <div className="border-t pt-6 flex justify-between">
                  <div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg mr-3 hover:bg-gray-50">
                      Request More Information
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      Reject
                    </button>
                  </div>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Approve Application
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center h-full flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Application Selected</h3>
              <p className="text-gray-500 max-w-md">Select an application from the list to view its details and process it.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold">{applications.filter(app => app.status === 'Pending').length}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Under Review</p>
              <p className="text-2xl font-bold">{applications.filter(app => app.status === 'Under Review').length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Approved Today</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Rejected Today</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationReview;