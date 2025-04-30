import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/common/Layout';
import toast from 'react-hot-toast';
import { ChevronLeft, FileText, Calendar, Clock, User } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  requirements: string[];
  process: string[];
  imageUrl?: string;
  formFields: FormField[];
}

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!serviceId) return;
      
      try {
        const serviceDoc = doc(db, 'services', serviceId);
        const serviceSnap = await getDoc(serviceDoc);
        
        if (serviceSnap.exists()) {
          setService({ id: serviceSnap.id, ...serviceSnap.data() } as Service);
        } else {
          // Fallback to demo data if service doesn't exist in Firestore
          const demoServices: Record<string, Service> = {
            '1': {
              id: '1',
              title: 'Birth Certificate',
              description: 'Apply for a birth certificate for newborns or obtain a copy of an existing certificate.',
              category: 'Certificates',
              requirements: [
                'Proof of birth from hospital',
                'Parents\' identification documents',
                'Address proof'
              ],
              process: [
                'Fill the application form',
                'Upload required documents',
                'Pay the fees, if applicable',
                'Application will be processed within 15 working days'
              ],
              imageUrl: 'https://images.pexels.com/photos/557744/pexels-photo-557744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              formFields: [
                { id: 'childName', label: 'Child\'s Full Name', type: 'text', required: true },
                { id: 'dob', label: 'Date of Birth', type: 'date', required: true },
                { id: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
                { id: 'fatherName', label: 'Father\'s Name', type: 'text', required: true },
                { id: 'motherName', label: 'Mother\'s Name', type: 'text', required: true },
                { id: 'address', label: 'Address', type: 'textarea', required: true }
              ]
            },
            '2': {
              id: '2',
              title: 'Land Records',
              description: 'Access and apply for land record certificates and property documentation.',
              category: 'Property',
              requirements: [
                'Property documents',
                'Identity proof',
                'Address proof',
                'Previous land records (if available)'
              ],
              process: [
                'Submit application with all required documents',
                'Verification of land records',
                'Field verification may be conducted',
                'Certificate will be issued after verification'
              ],
              imageUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              formFields: [
                { id: 'ownerName', label: 'Owner\'s Name', type: 'text', required: true },
                { id: 'propertyAddress', label: 'Property Address', type: 'textarea', required: true },
                { id: 'surveyNo', label: 'Survey Number', type: 'text', required: true },
                { id: 'landArea', label: 'Land Area (in sq. meters)', type: 'number', required: true },
                { id: 'purposeRequest', label: 'Purpose of Request', type: 'select', required: true, options: [
                  'Property Tax',
                  'Sale/Purchase',
                  'Loan',
                  'Legal Verification',
                  'Other'
                ]}
              ]
            },
            '3': {
              id: '3',
              title: 'Income Certificate',
              description: 'Apply for income certificate required for various government schemes and benefits.',
              category: 'Certificates',
              requirements: [
                'Identity proof',
                'Address proof',
                'Income documents (salary slips, tax returns, etc.)',
                'Bank statements of last 6 months'
              ],
              process: [
                'Fill the application form with accurate income details',
                'Submit required documents',
                'Verification by revenue department',
                'Certificate issuance after verification'
              ],
              imageUrl: 'https://images.pexels.com/photos/6693324/pexels-photo-6693324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              formFields: [
                { id: 'applicantName', label: 'Applicant Name', type: 'text', required: true },
                { id: 'occupation', label: 'Occupation', type: 'text', required: true },
                { id: 'annualIncome', label: 'Annual Income (in Rs.)', type: 'number', required: true },
                { id: 'familyMembers', label: 'Number of Family Members', type: 'number', required: true },
                { id: 'purpose', label: 'Purpose of Certificate', type: 'select', required: true, options: [
                  'Education Scholarship',
                  'Housing Subsidy',
                  'Government Scheme',
                  'Legal Requirement',
                  'Other'
                ]}
              ]
            }
          };
          
          if (demoServices[serviceId]) {
            setService(demoServices[serviceId]);
          } else {
            toast.error('Service not found');
            navigate('/services');
          }
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
        toast.error('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServiceDetails();
  }, [serviceId, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || !service) return;
    
    try {
      setSubmitting(true);
      
      // Create application in Firestore
      const applicationData = {
        serviceId: service.id,
        serviceName: service.title,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const applicationsCollection = collection(db, 'applications');
      const docRef = await addDoc(applicationsCollection, applicationData);
      
      console.log('Application submitted with ID:', docRef.id);
      toast.success('Application submitted successfully');
      navigate('/applications');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application');
    } finally {
      setSubmitting(false);
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
  
  if (!service) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <ChevronLeft size={16} className="mr-2" />
            Back to Services
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/services')}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Services
        </button>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {service.imageUrl && (
            <div className="h-64 overflow-hidden">
              <img 
                src={service.imageUrl} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-4">
              {service.category}
            </span>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
            
            <p className="text-lg text-gray-700 mb-8">{service.description}</p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText size={20} className="text-blue-600 mr-2" />
                  Requirements
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {service.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock size={20} className="text-blue-600 mr-2" />
                  Process
                </h3>
                <ol className="list-decimal pl-6 space-y-2">
                  {service.process.map((step, index) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <User size={24} className="text-blue-600 mr-2" />
                Application Form
              </h2>
              
              {!currentUser ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                  <p className="text-yellow-800">
                    Please <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">sign in</Link> to apply for this service.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {service.formFields.map((field) => (
                    <div key={field.id}>
                      <label 
                        htmlFor={field.id} 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.id}
                          name={field.id}
                          value={formData[field.id] || ''}
                          onChange={handleInputChange}
                          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          required={field.required}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          id={field.id}
                          name={field.id}
                          value={formData[field.id] || ''}
                          onChange={handleInputChange}
                          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={field.required}
                        >
                          <option value="">Select an option</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={formData[field.id] || ''}
                          onChange={handleInputChange}
                          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}
                  
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetailPage;