import React from 'react';

const FarmerDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Application Status</h2>
          <div className="flex justify-between items-center">
            <span>Pending</span>
            <span className="text-amber-500 font-bold">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Approved</span>
            <span className="text-green-500 font-bold">2</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Rejected</span>
            <span className="text-red-500 font-bold">1</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Active Schemes</h2>
          <p className="text-gray-600">You have <span className="font-bold">5</span> active schemes available</p>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            View Schemes
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Weather Updates</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Today</p>
              <p className="font-semibold">Partly Cloudy</p>
            </div>
            <div className="text-3xl">🌤️</div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Temperature: 28°C</p>
          <p className="text-sm text-gray-500">Humidity: 65%</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
        <div className="space-y-4">
          <div className="border-b pb-3">
            <h3 className="font-medium">New Crop Insurance Scheme Launched</h3>
            <p className="text-sm text-gray-600">The government has launched a new crop insurance scheme for wheat farmers.</p>
            <p className="text-xs text-gray-500 mt-1">2 days ago</p>
          </div>
          <div className="border-b pb-3">
            <h3 className="font-medium">Subsidy Disbursement Started</h3>
            <p className="text-sm text-gray-600">The subsidy for fertilizers has been disbursed to eligible farmers.</p>
            <p className="text-xs text-gray-500 mt-1">1 week ago</p>
          </div>
          <div>
            <h3 className="font-medium">Training Workshop Announcement</h3>
            <p className="text-sm text-gray-600">A training workshop on modern farming techniques will be conducted next month.</p>
            <p className="text-xs text-gray-500 mt-1">2 weeks ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;