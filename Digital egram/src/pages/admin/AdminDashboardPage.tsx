import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Users, Settings, BarChart, Layers, AlertCircle } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.email}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white overflow-hidden shadow-md rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">154</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/admin/applications" className="font-medium text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-md rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Registered Users</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">537</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/admin/users" className="font-medium text-blue-600 hover:text-blue-500">
                  Manage users
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-md rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                  <Settings className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Services</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">14</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/admin/services" className="font-medium text-blue-600 hover:text-blue-500">
                  Manage services
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
              <Link to="/admin/applications" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all
              </Link>
            </div>
            <ul className="divide-y divide-gray-200">
              {[
                { id: 'APP-675432', service: 'Birth Certificate', applicant: 'Amit Sharma', date: 'May 10, 2025', status: 'pending' },
                { id: 'APP-675431', service: 'Income Certificate', applicant: 'Priya Patel', date: 'May 10, 2025', status: 'under-review' },
                { id: 'APP-675429', service: 'Land Records', applicant: 'Raj Kumar', date: 'May 9, 2025', status: 'pending' },
                { id: 'APP-675425', service: 'Death Certificate', applicant: 'Sunita Gupta', date: 'May 9, 2025', status: 'approved' },
              ].map((application, index) => (
                <li key={index} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {application.service}
                      </p>
                      <p className="text-sm text-gray-500">
                        {application.applicant} • {application.date}
                      </p>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        application.status === 'approved' ? 'bg-green-100 text-green-800' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        application.status === 'under-review' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status === 'approved' ? 'Approved' :
                          application.status === 'rejected' ? 'Rejected' :
                          application.status === 'under-review' ? 'Under Review' :
                          'Pending'}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">System Status</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                All Systems Operational
              </span>
            </div>
            <ul className="divide-y divide-gray-200">
              {[
                { name: 'User Authentication', status: 'operational', icon: <Users size={16} className="text-green-500" /> },
                { name: 'Application Processing', status: 'operational', icon: <FileText size={16} className="text-green-500" /> },
                { name: 'Service Management', status: 'operational', icon: <Settings size={16} className="text-green-500" /> },
                { name: 'Database System', status: 'operational', icon: <Layers size={16} className="text-green-500" /> },
                { name: 'Notification System', status: 'issues', icon: <AlertCircle size={16} className="text-yellow-500" /> },
              ].map((system, index) => (
                <li key={index} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    {system.icon}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {system.name}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      system.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {system.status === 'operational' ? 'Operational' : 'Minor Issues'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/admin/services/create"
              className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center"
            >
              <Layers className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-blue-900">Create New Service</span>
            </Link>
            
            <Link 
              to="/admin/users/create"
              className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-center"
            >
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-green-900">Add Staff User</span>
            </Link>
            
            <Link 
              to="/admin/reports"
              className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-center"
            >
              <BarChart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-purple-900">Generate Reports</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;