import React, { useState } from 'react';

const CropInfo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  
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
      image: "https://images.pexels.com/photos/4986641/pexels-photo-4986641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
      image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
      image: "https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
      image: "https://images.pexels.com/photos/338142/pexels-photo-338142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
      image: "https://images.pexels.com/photos/1537169/pexels-photo-1537169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
      image: "https://images.pexels.com/photos/6363791/pexels-photo-6363791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  // Filter crops based on search and season filter
  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         crop.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = selectedSeason === '' || crop.season.includes(selectedSeason);
    return matchesSearch && matchesSeason;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Crop Information</h1>
      <p className="text-gray-600 mb-6">Learn about different crops, their requirements and best practices</p>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full md:w-1/2">
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
        
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500 w-full md:w-auto"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            <option value="">All Seasons</option>
            <option value="Kharif">Kharif</option>
            <option value="Rabi">Rabi</option>
            <option value="Zaid">Zaid</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map(crop => (
          <div key={crop.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={crop.image} 
                alt={crop.name} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{crop.name}</h2>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">{crop.season}</span>
              </div>
              <p className="text-gray-500 text-sm italic mb-4">{crop.scientificName}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Water Requirement:</span>
                  <span className="font-medium">{crop.waterRequirement}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Soil Type:</span>
                  <span className="font-medium">{crop.soilType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth Duration:</span>
                  <span className="font-medium">{crop.growthDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Yield Per Hectare:</span>
                  <span className="font-medium">{crop.yieldPerHectare}</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCrops.length === 0 && (
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No crops found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
      
      <div className="mt-10 bg-green-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Seasonal Crop Calendar</h2>
        <p className="text-gray-700 mb-4">Understanding the growing seasons is crucial for successful farming. Here's a quick guide:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">Kharif Season</h3>
            <p className="text-sm text-gray-600 mb-2">June to October (Monsoon)</p>
            <p className="text-sm">Crops: Rice, Maize, Sorghum, Cotton, Soybean</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">Rabi Season</h3>
            <p className="text-sm text-gray-600 mb-2">November to April (Winter)</p>
            <p className="text-sm">Crops: Wheat, Barley, Peas, Mustard, Chickpea</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">Zaid Season</h3>
            <p className="text-sm text-gray-600 mb-2">March to June (Summer)</p>
            <p className="text-sm">Crops: Cucumber, Watermelon, Muskmelon, Vegetables</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropInfo;