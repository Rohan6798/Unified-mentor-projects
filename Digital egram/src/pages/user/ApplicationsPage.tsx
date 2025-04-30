import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/common/Layout';
import StatusBadge from '../../components/common/StatusBadge';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Clock, ChevronRight } from 'lucide-react';

interface Application {
  id: string;
  serviceId: string;
  serviceName: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  createdAt: {
    toDate: () => Date;
  };
  updatedAt: {
    toDate: () => Date;
  };
}

const ApplicationsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser) return;
      
      try {
        const applicationsRef = collection(db, 'applications');
        const q = query(
          applicationsRef,
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const applicationsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Application[];
        
        setApplications(applicationsList);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [currentUser]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-lg text-gray-600">
            Track the status of your service applications
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Found</h3>
            <p className="text-gray-500 mb-6">
              You haven't submitted any applications yet.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {applications.map((application) => (
                <li key={application.id} className="hover:bg-gray-50">
                  <Link to={`/applications/${application.id}`} className="block">
                    <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <FileText 
                            size={22} 
                            className="text-blue-600 mr-3 flex-shrink-0" 
                          />
                          <div>
                            <span className="text-lg font-semibold text-gray-900 block">
                              {application.serviceName}
                            </span>
                            <span className="text-sm text-gray-500 block">
                              Application ID: {application.id}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center mr-6">
                          <Calendar size={18} className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">
                            {application.createdAt ? formatDate(application.createdAt.toDate()) : 'N/A'}
                          </span>
                        </div>
                        
                        <StatusBadge status={application.status} />
                        
                        <ChevronRight size={18} className="text-gray-400 hidden md:block" />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ApplicationsPage;