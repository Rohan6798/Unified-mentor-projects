import React from 'react';

const MyApplications: React.FC = () => {
  // Sample data - would come from API in a real app
  const applications = [
    {
      id: "APP-2023-001",
      schemeName: "Pradhan Mantri Fasal Bima Yojana",
      appliedDate: "2023-01-15",
      status: "Approved",
      amount: "₹15,000",
      comments: "All documents verified."
    },
    {
      id: "APP-2023-002",
      schemeName: "Kisan Credit Card Scheme",
      appliedDate: "2023-02-28",
      status: "Pending",
      amount: "₹25,000",
      comments: "Waiting for land verification."
    },
    {
      id: "APP-2023-003",
      schemeName: "PM Kisan Samman Nidhi",
      appliedDate: "2023-03-10",
      status: "Under Review",
      amount: "₹6,000",
      comments: "Documents under review."
    },
    {
      id: "APP-2023-004",
      schemeName: "Soil Health Card Scheme",
      appliedDate: "2023-04-05",
      status: "Rejected",
      amount: "N/A",
      comments: "Land records not matching with application."
    }
  ];

  // Function to get status color class
  const getStatusColorClass = (status: string) => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Applications</h1>
      <p className="text-gray-600 mb-6">Track the status of your scheme applications</p>
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2 bg-white p-2 rounded-lg shadow">
          <select className="border rounded px-3 py-1 outline-none focus:ring-2 focus:ring-green-500">
            <option value="">All Applications</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="under review">Under Review</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="border rounded px-3 py-1 outline-none focus:ring-2 focus:ring-green-500">
            <option value="">All Time</option>
            <option value="last month">Last Month</option>
            <option value="last 3 months">Last 3 Months</option>
            <option value="last 6 months">Last 6 Months</option>
            <option value="last year">Last Year</option>
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search applications..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.schemeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.appliedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                    {(application.status === 'Pending' || application.status === 'Under Review') && (
                      <button className="text-red-600 hover:text-red-900">Cancel</button>
                    )}
                    {application.status === 'Rejected' && (
                      <button className="text-blue-600 hover:text-blue-900">Reapply</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-2">Total Applications</h3>
          <div className="flex items-center">
            <div className="text-3xl font-bold">{applications.length}</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-2">Approved</h3>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-green-600">{applications.filter(app => app.status === 'Approved').length}</div>
            <div className="ml-3 text-sm text-gray-500">
              {Math.round((applications.filter(app => app.status === 'Approved').length / applications.length) * 100)}%
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-2">Pending/Review</h3>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-yellow-600">
              {applications.filter(app => app.status === 'Pending' || app.status === 'Under Review').length}
            </div>
            <div className="ml-3 text-sm text-gray-500">
              {Math.round((applications.filter(app => app.status === 'Pending' || app.status === 'Under Review').length / applications.length) * 100)}%
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-2">Rejected</h3>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-red-600">{applications.filter(app => app.status === 'Rejected').length}</div>
            <div className="ml-3 text-sm text-gray-500">
              {Math.round((applications.filter(app => app.status === 'Rejected').length / applications.length) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;