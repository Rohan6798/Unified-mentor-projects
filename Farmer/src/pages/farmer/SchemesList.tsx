import React from 'react';
import { Link } from 'react-router-dom';

const SchemesList: React.FC = () => {
  // Sample data - would come from API in a real app
  const schemes = [
    {
      id: 1,
      title: "Pradhan Mantri Fasal Bima Yojana",
      category: "Insurance",
      deadline: "2023-06-30",
      eligibility: "All farmers with cropland",
      status: "Active"
    },
    {
      id: 2,
      title: "Kisan Credit Card Scheme",
      category: "Financial",
      deadline: "2023-07-15",
      eligibility: "All farmers",
      status: "Active"
    },
    {
      id: 3,
      title: "Soil Health Card Scheme",
      category: "Agricultural",
      deadline: "2023-08-01",
      eligibility: "All farmers with agricultural land",
      status: "Active"
    },
    {
      id: 4,
      title: "Micro Irrigation Fund Scheme",
      category: "Irrigation",
      deadline: "2023-09-30",
      eligibility: "Small and marginal farmers",
      status: "Active"
    },
    {
      id: 5,
      title: "PM Kisan Samman Nidhi",
      category: "Financial Aid",
      deadline: "2023-12-31",
      eligibility: "Small and marginal farmers with less than 2 hectares of land",
      status: "Active"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Available Schemes</h1>
      <p className="text-gray-600 mb-6">Browse and apply for agricultural schemes and benefits</p>
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2 bg-white p-2 rounded-lg shadow">
          <select className="border rounded px-3 py-1 outline-none focus:ring-2 focus:ring-green-500">
            <option value="">All Categories</option>
            <option value="insurance">Insurance</option>
            <option value="financial">Financial</option>
            <option value="agricultural">Agricultural</option>
            <option value="irrigation">Irrigation</option>
          </select>
          <select className="border rounded px-3 py-1 outline-none focus:ring-2 focus:ring-green-500">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search schemes..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schemes.map((scheme) => (
              <tr key={scheme.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{scheme.title}</div>
                  <div className="text-sm text-gray-500">Eligibility: {scheme.eligibility}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scheme.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scheme.deadline}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {scheme.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link to={`/farmer/schemes/${scheme.id}`} className="text-green-600 hover:text-green-900 mr-4">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-700">Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> schemes</p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-md bg-white text-gray-700 disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1 border rounded-md bg-white text-gray-700 disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SchemesList;