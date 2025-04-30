import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import { ShieldAlert, ChevronLeft } from 'lucide-react';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <ShieldAlert size={80} className="text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
            You do not have permission to access this page. Please contact an administrator if you believe this is an error.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <ChevronLeft size={18} className="mr-2" />
            Return to Home
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UnauthorizedPage;