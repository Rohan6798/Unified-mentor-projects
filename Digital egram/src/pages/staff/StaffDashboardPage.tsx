import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Users, BarChart } from 'lucide-react';

const StaffDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Applications</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">18</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/staff/applications" className="font-medium text-blue-600 hover:text-blue-500">
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Processed Today</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">7</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/staff/applications?timeframe=today" className="font-medium text-blue-600 hover:text-blue-500">
                  View details
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-md rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                  <BarChart className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Approval Rate</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">87%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/staff/statistics" className="font-medium text-blue-600 hover:text-blue-500">
                  View statistics
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {[
              { id: 'APP-675432', service: 'Birth Certificate', applicant: 'Amit Sharma', date: 'May 10, 2025', status: 'pending' },
              { id: 'APP-675431', service: 'Income Certificate', applicant: 'Priya Patel', date: 'May 10, 2025', status: 'under-review' },
              { id: 'APP-675429', service: 'Land Records', applicant: 'Raj Kumar', date: 'May 9, 2025', status: 'pending' },
              { id: 'APP-675425', service: 'Death Certificate', applicant: 'Sunita Gupta', date: 'May 9, 2025', status: 'approved' },
              { id: 'APP-675421', service: 'Pension Application', applicant: 'Mohan Singh', date: 'May 9, 2025', status: 'rejected' }
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
                  <div className="flex-shrink-0">
                    <Link 
                      to={`/staff/applications/${application.id}`} 
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="text-sm">
              <Link to="/staff/applications" className="font-medium text-blue-600 hover:text-blue-500">
                View all applications
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StaffDashboardPage;