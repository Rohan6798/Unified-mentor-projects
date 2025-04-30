import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import StatusBadge from '../../components/common/StatusBadge';
import { Search, Filter, FileText } from 'lucide-react';

interface Application {
  id: string;
  applicant: string;
  email: string;
  service: string;
  date: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
}

const StaffApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching from Firestore
    const fetchApplications = async () => {
      // This would be a Firestore query in production
      const mockApplications: Application[] = [
        { id: 'APP-675432', applicant: 'Amit Sharma', email: 'amit.s@example.com', service: 'Birth Certificate', date: 'May 10, 2025', status: 'pending' },
        { id: 'APP-675431', applicant: 'Priya Patel', email: 'priya.p@example.com', service: 'Income Certificate', date: 'May 10, 2025', status: 'under-review' },
        { id: 'APP-675429', applicant: 'Raj Kumar', email: 'raj.k@example.com', service: 'Land Records', date: 'May 9, 2025', status: 'pending' },
        { id: 'APP-675425', applicant: 'Sunita Gupta', email: 'sunita.g@example.com', service: 'Death Certificate', date: 'May 9, 2025', status: 'approved' },
        { id: 'APP-675421', applicant: 'Mohan Singh', email: 'mohan.s@example.com', service: 'Pension Scheme', date: 'May 9, 2025', status: 'rejected' },
        { id: 'APP-675418', applicant: 'Kavita Sharma', email: 'kavita.s@example.com', service: 'Water Connection', date: 'May 8, 2025', status: 'pending' },
        { id: 'APP-675415', applicant: 'Rajesh Mehra', email: 'rajesh.m@example.com', service: 'Income Certificate', date: 'May 8, 2025', status: 'under-review' },
        { id: 'APP-675412', applicant: 'Anita Desai', email: 'anita.d@example.com', service: 'Birth Certificate', date: 'May 8, 2025', status: 'approved' },
        { id: 'APP-675409', applicant: 'Vikram Joshi', email: 'vikram.j@example.com', service: 'Land Records', date: 'May 7, 2025', status: 'pending' },
        { id: 'APP-675406', applicant: 'Neha Patel', email: 'neha.p@example.com', service: 'Death Certificate', date: 'May 7, 2025', status: 'rejected' }
      ];
      
      setApplications(mockApplications);
      setFilteredApplications(mockApplications);
      setLoading(false);
    };
    
    fetchApplications();
  }, []);

  useEffect(() => {
    // Filter applications based on search term and status filter
    const result = applications.filter(application => {
      const matchesSearch = 
        application.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredApplications(result);
  }, [applications, searchTerm, statusFilter]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Manage Applications</h1>
          <p className="text-gray-600">Review and process citizen applications</p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by applicant, service or ID..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <label htmlFor="status" className="text-sm font-medium text-gray-700">
                Filter by Status:
              </label>
              <select
                id="status"
                className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredApplications.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {application.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{application.applicant}</div>
                      <div className="text-xs">{application.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={application.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/staff/applications/${application.id}`} 
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Found</h3>
            <p className="text-gray-500">
              No applications match your current filters.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StaffApplicationsPage;