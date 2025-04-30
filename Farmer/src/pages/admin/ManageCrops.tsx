import React, { useState } from 'react';

const ManageCrops: React.FC = () => {
  const [filterSeason, setFilterSeason] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for crops
  const crops = [
    {
      id: 1,
      name: "Rice (Paddy)",
      scientificName: "Oryza sativa",
      season: "Kharif",
      waterRequirement: "High",
      soilType: "Clay, clay loam",
      growthDuration: "120-150 days",
      yieldPerHectare: "3-6 tons",
      status: "Active"
    },
    {
      id: 2,
      name: "Wheat",
      scientificName: "Triticum aestivum",
      season: "Rabi",
      waterRequirement: "Medium",
      soilType: "Loam, clay loam",
      growthDuration: "120-150 days",
      yieldPerHectare: "3-5 tons",
      status: "Active"
    },
    {
      id: 3,
      name: "Maize (Corn)",
      scientificName: "Zea mays",
      season: "Kharif, Rabi",
      waterRequirement: "Medium",
      soilType: "Well-drained loamy",
      growthDuration: "90-120 days",
      yieldPerHectare: "2-5 tons",
      status: "Active"
    },
    {
      id: 4,
      name: "Cotton",
      scientificName: "Gossypium hirsutum",
      season: "Kharif",
      waterRequirement: "Medium",
      soilType: "Black soil, alluvial soil",
      growthDuration: "150-180 days",
      yieldPerHectare: "2-3 tons",
      status: "Active"
    },
    {
      id: 5,
      name: "Soybean",
      scientificName: "Glycine max",
      season: "Kharif",
      waterRequirement: "Medium-Low",
      soilType: "Well-drained, loamy",
      growthDuration: "90-120 days",
      yieldPerHectare: "1-2.5 tons",
      status: "Active"
    },
    {
      id: 6,
      name: "Chickpea (Gram)",
      scientificName: "Cicer arietinum",
      season: "Rabi",
      waterRequirement: "Low",
      soilType: "Sandy loam to clay loam",
      growthDuration: "90-120 days",
      yieldPerHectare: "0.8-1.5 tons",
      status: "Active"
    },
    {
      id: 7,
      name: "Sugarcane",
      scientificName: "Saccharum officinarum",
      season: "Zaid",
      waterRequirement: "High",
      soilType: "Deep, well-drained loamy",
      growthDuration: "12-18 months",
      yieldPerHectare: "60-80 tons",
      status: "Draft"
    }
  ];

  // Filter crops based on season and search term
  const filteredCrops = crops.filter(crop => {
    const matchesSeason = filterSeason === 'all' || crop.season.toLowerCase().includes(filterSeason.toLowerCase());
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          crop.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeason && matchesSearch;
  });

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-amber-100 text-amber-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Crops</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Add New Crop
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded-lg ${filterSeason === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterSeason('all')}
          >
            All Seasons
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filterSeason === 'kharif' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterSeason('kharif')}
          >
            Kharif
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filterSeason === 'rabi' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterSeason('rabi')}
          >
            Rabi
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filterSeason === 'zaid' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilterSeason('zaid')}
          >
            Zaid
          </button>
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search crops..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
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
      
      {/* Crops Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scientific Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water Req.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soil Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCrops.map((crop) => (
                <tr key={crop.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{crop.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 italic">{crop.scientificName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.season}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.waterRequirement}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.soilType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(crop.status)}`}>
                      {crop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900 mr-3">View</button>
                    {crop.status === 'Active' && (
                      <button className="text-red-600 hover:text-red-900">Archive</button>
                    )}
                    {crop.status === 'Draft' && (
                      <button className="text-green-600 hover:text-green-900">Publish</button>
                    )}
                    {crop.status === 'Archived' && (
                      <button className="text-green-600 hover:text-green-900">Restore</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Crop Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">Crop Statistics</h2>
              <p className="text-gray-600 mb-4">Overview of crop database</p>
            </div>
            <div className="p-2 bg-green-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          
          <div className="mt-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Crops</span>
              <span className="font-semibold">{crops.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Kharif Crops</span>
              <span className="font-semibold">{crops.filter(c => c.season.includes('Kharif')).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rabi Crops</span>
              <span className="font-semibold">{crops.filter(c => c.season.includes('Rabi')).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Zaid Crops</span>
              <span className="font-semibold">{crops.filter(c => c.season.includes('Zaid')).length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">Recommended Actions</h2>
              <p className="text-gray-600 mb-4">Suggested tasks for crop management</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          
          <div className="mt-5 space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-700">Update crop yield data for the current season</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-700">Review and finalize draft crop entries</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-700">Add seasonal recommendations for top crops</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Add Crop</h2>
          <form>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter crop name"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Scientific Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter scientific name"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
              <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Select season</option>
                <option value="kharif">Kharif</option>
                <option value="rabi">Rabi</option>
                <option value="zaid">Zaid</option>
                <option value="kharif,rabi">Kharif & Rabi</option>
                <option value="rabi,zaid">Rabi & Zaid</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Add Crop
            </button>
          </form>
        </div>
      </div>
      
      {/* Tips Section */}
      <div className="bg-green-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Crop Information Management Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">Seasonal Updates</h3>
            <p className="text-sm text-gray-700">
              Remember to update crop information before each growing season to ensure farmers have the most current data.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">Data Accuracy</h3>
            <p className="text-sm text-gray-700">
              Verify yield data with agricultural research institutions to maintain accuracy in crop information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCrops;