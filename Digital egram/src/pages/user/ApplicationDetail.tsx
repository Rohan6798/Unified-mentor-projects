import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/common/Layout';
import StatusBadge from '../../components/common/StatusBadge';
import toast from 'react-hot-toast';
import { ChevronLeft, Clock, Calendar, MessageSquare } from 'lucide-react';

interface Application {
  id: string;
  serviceId: string;
  serviceName: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  formData: Record<string, string>;
  comments?: string[];
  createdAt: {
    toDate: () => Date;
  };
  updatedAt: {
    toDate: () => Date;
  };
}

const ApplicationDetail: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      if (!currentUser || !applicationId) return;
      
      try {
        const applicationDoc = doc(db, 'applications', applicationId);
        const applicationSnap = await getDoc(applicationDoc);
        
        if (applicationSnap.exists()) {
          const applicationData = applicationSnap.data() as Omit<Application, 'id'>;
          
          // Check if the application belongs to the current user
          if (applicationData.userId !== currentUser.uid) {
            toast.error('You do not have permission to view this application');
            navigate('/applications');
            return;
          }
          
          setApplication({ id: applicationSnap.id, ...applicationData } as Application);
        } else {
          toast.error('Application not found');
          navigate('/applications');
        }
      } catch (error) {
        console.error('Error fetching application details:', error);
        toast.error('Failed to load application details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplicationDetails();
  }, [applicationId, currentUser, navigate]);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getStatusText = () => {
    switch (application?.status) {
      case 'pending':
        return "Your application has been received and is pending review.";
      case 'under-review':
        return "Your application is currently being reviewed by our staff.";
      case 'approved':
        return "Congratulations! Your application has been approved.";
      case 'rejected':
        return "We're sorry, your application has been rejected.";
      default:
        return "Application status unknown.";
    }
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
  
  if (!application) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Not Found</h2>
          <p className="text-gray-600 mb-8">The application you're looking for doesn't exist or you don't have permission to view it.</p>
          <button
            onClick={() => navigate('/applications')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <ChevronLeft size={16} className="mr-2" />
            Back to Applications
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/applications')}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Applications
        </button>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-xl font-semibold text-gray-900 mb-2 md:mb-0">
                {application.serviceName}
              </h1>
              <StatusBadge status={application.status} className="mt-2 md:mt-0" />
            </div>
            <p className="text-sm text-gray-500">Application ID: {application.id}</p>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <div className={`p-4 rounded-md mb-6 ${
                application.status === 'approved' ? 'bg-green-50 border border-green-100' : 
                application.status === 'rejected' ? 'bg-red-50 border border-red-100' : 
                'bg-blue-50 border border-blue-100'
              }`}>
                <p className={`text-sm ${
                  application.status === 'approved' ? 'text-green-800' : 
                  application.status === 'rejected' ? 'text-red-800' : 
                  'text-blue-800'
                }`}>
                  {getStatusText()}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Submitted On</p>
                    <p className="text-sm text-gray-900">
                      {application.createdAt ? formatDate(application.createdAt.toDate()) : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock size={18} className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Last Updated</p>
                    <p className="text-sm text-gray-900">
                      {application.updatedAt ? formatDate(application.updatedAt.toDate()) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h2>
              <div className="bg-gray-50 rounded-md p-4">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  {Object.entries(application.formData).map(([key, value]) => (
                    <div key={key} className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) { return str.toUpperCase(); })}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{value || 'N/A'}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            
            {application.comments && application.comments.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MessageSquare size={18} className="text-blue-600 mr-2" />
                  Comments from Staff
                </h2>
                <div className="space-y-4">
                  {application.comments.map((comment, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-700">{comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationDetail;