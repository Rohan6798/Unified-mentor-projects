import React from 'react';

const AdminDashboard: React.FC = () => {
  // Sample data for admin dashboard
  const stats = {
    totalFarmers: 1568,
    activeSchemes: 12,
    pendingApplications: 78,
    approvedApplications: 245,
    rejectedApplications: 32,
    totalDisbursement: "₹1,25,45,000"
  };

  // Sample data for recent applications
  const recentApplications = [
    {
      id: "APP-2023-045",
      farmer: "Rajesh Kumar",
      schemeName: "PM Kisan Samman Nidhi",
      appliedDate: "2023-05-02",
      status: "Pending"
    },
    {
      id: "APP-2023-044",
      farmer: "Suresh Patel",
      schemeName: "Soil Health Card Scheme",
      appliedDate: "2023-05-01",
      status: "Pending"
    },
    {
      id: "APP-2023-043",
      farmer: "Priya Singh",
      schemeName: "Pradhan Mantri Fasal Bima Yojana",
      appliedDate: "2023-04-30",
      status: "Pending"
    },
    {
      id: "APP-2023-042",
      farmer: "Manoj Sharma",
      schemeName: "Kisan Credit Card Scheme",
      appliedDate: "2023-04-29",
      status: "Pending"
    }
  ];

  // Sample data for scheme breakdown
  const schemeBreakdown = [
    { name: "PM Kisan Samman Nidhi", applications: 145, amount: "₹87,00,000" },
    { name: "Pradhan Mantri Fasal Bima Yojana", applications: 98, amount: "₹24,50,000" },
    { name: "Kisan Credit Card Scheme", applications: 76, amount: "₹38,00,000" },
    { name: "Soil Health Card Scheme", applications: 36, amount: "₹9,00,000" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            New Scheme
          </button>
        </div>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Farmers</p>
              <h3 className="text-2xl font-bold">{stats.totalFarmers}</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-green-600">
            <span>↑ 12.5%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Active Schemes</p>
              <h3 className="text-2xl font-bold">{stats.activeSchemes}</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-600">
            <span>↑ 2</span>
            <span className="text-gray-500 ml-1">new schemes</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Pending Applications</p>
              <h3 className="text-2xl font-bold">{stats.pendingApplications}</h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-yellow-600">
            <span>↑ 8.3%</span>
            <span className="text-gray-500 ml-1">vs last week</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Approved Applications</p>
              <h3 className="text-2xl font-bold">{stats.approvedApplications}</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-green-600">
            <span>↑ 24</span>
            <span className="text-gray-500 ml-1">this month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Rejected Applications</p>
              <h3 className="text-2xl font-bold">{stats.rejectedApplications}</h3>
            </div>
            <div className="p-2 bg-red-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-red-600">
            <span>↓ 4.5%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Disbursement</p>
              <h3 className="text-2xl font-bold">{stats.totalDisbursement}</h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-purple-600">
            <span>↑ 18.2%</span>
            <span className="text-gray-500 ml-1">vs last quarter</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">{app.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{app.farmer}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{app.schemeName}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{app.appliedDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Scheme Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Scheme Breakdown</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm">Export</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme Name</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schemeBreakdown.map((scheme, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{scheme.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{scheme.applications}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{scheme.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h3 className="font-semibold text-lg mb-2">Pending Verification</h3>
          <p className="text-gray-600 mb-4">There are 32 applications pending verification that require your attention.</p>
          <button className="w-full py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors">
            Review Applications
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
          <h3 className="font-semibold text-lg mb-2">Scheme Expiring Soon</h3>
          <p className="text-gray-600 mb-4">2 schemes are expiring within the next 30 days. Review and take action.</p>
          <button className="w-full py-2 bg-amber-100 text-amber-600 rounded hover:bg-amber-200 transition-colors">
            Manage Schemes
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <h3 className="font-semibold text-lg mb-2">Fund Allocation</h3>
          <p className="text-gray-600 mb-4">Review and process fund allocation for approved applications for this month.</p>
          <button className="w-full py-2 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors">
            Process Allocation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;