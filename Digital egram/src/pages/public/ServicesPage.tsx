import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Layout from '../../components/common/Layout';
import ServiceCard from '../../components/common/ServiceCard';
import { Search } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
}

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesCollection = collection(db, 'services');
        const serviceSnapshot = await getDocs(servicesCollection);
        const servicesList = serviceSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Service[];
        
        setServices(servicesList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);
  
  // If we don't have any real services yet, add some demo services
  useEffect(() => {
    if (!loading && services.length === 0) {
      setServices([
        {
          id: '1',
          title: 'Birth Certificate',
          description: 'Apply for a birth certificate for newborns or obtain a copy of an existing certificate.',
          category: 'Certificates',
          imageUrl: 'https://images.pexels.com/photos/557744/pexels-photo-557744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          id: '2',
          title: 'Land Records',
          description: 'Access and apply for land record certificates and property documentation.',
          category: 'Property',
          imageUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          id: '3',
          title: 'Income Certificate',
          description: 'Apply for income certificate required for various government schemes and benefits.',
          category: 'Certificates',
          imageUrl: 'https://images.pexels.com/photos/6693324/pexels-photo-6693324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          id: '4',
          title: 'Death Certificate',
          description: 'Apply for death certificate for legal and administrative purposes.',
          category: 'Certificates',
          imageUrl: 'https://images.pexels.com/photos/38284/paper-blank-white-empty-38284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          id: '5',
          title: 'Pension Scheme',
          description: 'Apply for various pension schemes provided by the government for elderly citizens.',
          category: 'Welfare',
          imageUrl: 'https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          id: '6',
          title: 'Water Connection',
          description: 'Apply for a new water connection or resolve issues with existing connection.',
          category: 'Utilities',
          imageUrl: 'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
      ]);
    }
  }, [loading, services]);
  
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = ['all', ...Array.from(new Set(services.map(service => service.category)))];
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Government Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse available government services and apply online
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for services..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">
                Filter by Category:
              </label>
              <select
                id="category"
                className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                category={service.category}
                imageUrl={service.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found matching your criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ServicesPage;