import React, { useState } from 'react';

const ManageSchemes: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for schemes
  const schemes = [
    {
      id: 1,
      title: "Pradhan Mantri Fasal Bima Yojana",
      category: "Insurance",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      budget: "₹50,00,000",
      applications: 125,
      status: "Active"
    },
    {
      id: 2,
      title: "Kisan Credit Card Scheme",
      category: "Financial",
      startDate: "2023-01-15",
      endDate: "2023-12-31",
      budget: "₹75,00,000",
      applications: 98,
      status: "Active"
    },
    {
      id: 3,
      title: "Soil Health Card Scheme",
      category: "Agricultural",
      startDate: "2023-02-01",
      endDate: "2023-11-30",
      budget: "₹25,00,000",
      applications: 64,
      status: "Active"
    },
    {
      id: 4,
      title: "Micro Irrigation Fund Scheme",
      category: "Irrigation",
      startDate: "2023-03-01",
      endDate: "2023-10-31",
      budget: "₹40,00,000",
      applications: 42,
      status: "Active"
    },
    {
      id: 5,
      title: "PM Kisan Samman Nidhi",
      category: "Financial Aid",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      budget: "₹1,00,00,000",
      applications: 210,
      status: "Active"
    },
    {
      id: 6,
      title: "National Mission For Sustainable Agriculture",
      category: "Agricultural",
      startDate: "2022-04-01",
      endDate: "2023-03-31",
      budget: "₹35,00,000",
      applications: 87,
      status: "Expired"
    },
    {
      id: 7,
      title: "Livestock Insurance Scheme",
      category: "Insurance",
      startDate: "2023-07-01",
      endDate: "2024-06-30",
      budget: "₹30,00,000",
      applications: 0,
      status: "Upcoming"
    }
  ];

  // Filter schemes based on status and search term
  const filteredSchemes = schemes.filter(scheme => {
    const matchesStatus = filterStatus === 'all' || scheme.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scheme.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Schemes</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Add New Scheme
        </button>
      </div>
      
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
            className={`px-4 py-2 rounded-lg ${filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterStatus('active')}
          >
            Active
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filterStatus === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterStatus('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filterStatus === 'expired' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterStatus('expired')}
          >
            Expired
          </button>
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search schemes..."
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
      
      {/* Schemes Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchemes.map((scheme) => (
                <tr key={scheme.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{scheme.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scheme.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {scheme.startDate} to {scheme.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scheme.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scheme.applications}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(scheme.status)}`}>
                      {scheme.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900 mr-3">View</button>
                    {scheme.status === 'Active' && (
                      <button className="text-red-600 hover:text-red-900">Deactivate</button>
                    )}
                    {scheme.status === 'Upcoming' && (
                      <button className="text-green-600 hover:text-green-900">Activate</button>
                    )}
                    {scheme.status === 'Expired' && (
                      <button className="text-green-600 hover:text-green-900">Renew</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Scheme Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Active Schemes</h2>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-blue-600">{schemes.filter(s => s.status === 'Active').length}</div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">Total budget allocated: <span className="font-semibold">₹2,90,00,000</span></p>
            <p className="text-gray-700">Total applications: <span className="font-semibold">539</span></p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Top Performing Scheme</h2>
          <h3 className="text-lg font-medium text-gray-900">PM Kisan Samman Nidhi</h3>
          <div className="mt-2 mb-4">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
            <span className="ml-2 text-gray-500">Financial Aid</span>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">Total applications: <span className="font-semibold">210</span></p>
            <p className="text-gray-700">Budget utilization: <span className="font-semibold">68%</span></p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Launches</h2>
          {schemes.filter(s => s.status === 'Upcoming').length > 0 ? (
            schemes.filter(s => s.status === 'Upcoming').map(scheme => (
              <div key={scheme.id} className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0">
                <h3 className="text-lg font-medium text-gray-900">{scheme.title}</h3>
                <p className="text-gray-600">Launch date: <span className="font-medium">{scheme.startDate}</span></p>
                <p className="text-gray-600">Category: <span className="font-medium">{scheme.category}</span></p>
                <p className="text-gray-600">Budget: <span className="font-medium">{scheme.budget}</span></p>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No upcoming scheme launches</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Create New Scheme
          </button>
          <button className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Reports
          </button>
          <button className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Templates
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSchemes;