import React from 'react';
import { useParams } from 'react-router-dom';

const SchemeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, we would fetch the scheme details based on the ID
  // This is sample data for demonstration
  const scheme = {
    id: parseInt(id || '1'),
    title: "Pradhan Mantri Fasal Bima Yojana",
    description: "A crop insurance scheme that aims to provide financial support to farmers suffering crop loss or damage due to unforeseen events.",
    category: "Insurance",
    deadline: "June 30, 2023",
    eligibility: "All farmers growing notified crops and paying the premium are eligible.",
    benefits: [
      "Comprehensive risk coverage for pre-sowing to post-harvest losses",
      "Low premium rates for farmers",
      "Use of technology for quick assessment and settlement of claims",
      "Protection against non-preventable natural risks"
    ],
    requiredDocuments: [
      "Aadhar Card",
      "Land Records (7/12 extract)",
      "Bank Account Details",
      "Passport Size Photograph",
      "Proof of Land Cultivation"
    ],
    applicationProcess: "Applications can be submitted online through the portal or at Common Service Centers (CSCs) or designated bank branches.",
    contactInfo: {
      phone: "+91-11-23383744",
      email: "pmfby-agri@gov.in",
      website: "www.pmfby.gov.in"
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-green-800">{scheme.title}</h1>
        <div className="flex flex-wrap gap-3 mt-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Category: {scheme.category}</span>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Deadline: {scheme.deadline}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Scheme Description</h2>
            <p className="text-gray-700">{scheme.description}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Benefits</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {scheme.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Eligibility Criteria</h2>
            <p className="text-gray-700">{scheme.eligibility}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Application Process</h2>
            <p className="text-gray-700 mb-4">{scheme.applicationProcess}</p>
            <div className="mt-6">
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Required Documents</h2>
            <ul className="space-y-3">
              {scheme.requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {doc}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{scheme.contactInfo.phone}</span>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{scheme.contactInfo.email}</span>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                <span>{scheme.contactInfo.website}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
            <p className="text-blue-700 text-sm mb-4">If you have any questions about this scheme or need assistance with your application, our support team is here to help.</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;