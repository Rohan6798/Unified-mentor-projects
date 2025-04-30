import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-blue-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Digital E-Gram Panchayat</h3>
              <p className="text-sm text-gray-300">Connecting Citizens with Government Services</p>
            </div>
            <div className="text-sm text-gray-300">
              <p>© {new Date().getFullYear()} Digital E-Gram Panchayat. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;