import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, UserCircle } from 'lucide-react';
import Layout from '../../components/common/Layout';
import {useAuth} from '../../contexts/AuthContext';

const HomePage: React.FC = () => {
  const {currentUser} = useAuth();
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Digital E-Gram Panchayat
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Connecting rural citizens with government services. Apply online, track your applications, and access essential public services from home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/services"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  Browse Services
                </Link>
                {!currentUser &&
                <Link
                  to="/register"
                  className="bg-white hover:bg-gray-100 text-blue-800 font-medium py-3 px-6 rounded-md transition-colors"
                >
                  Create Account
                </Link>
                }
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="E-Gram Panchayat" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform streamlines access to government services for rural citizens through a simple digital process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Search className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Services</h3>
              <p className="text-gray-600">
                Browse and search for government services and schemes that you need.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FileText className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
              <p className="text-gray-600">
                Fill out applications online without visiting government offices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <UserCircle className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Status</h3>
              <p className="text-gray-600">
                Monitor the status of your applications in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Popular Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These are some of the most common services accessed through our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Birth Certificate",
                description: "Apply for a birth certificate for newborns",
                image: "https://images.pexels.com/photos/17802731/pexels-photo-17802731/free-photo-of-baby-feet-on-mother-s-hands.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                title: "Land Records",
                description: "Access and apply for land record certificates",
                image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                title: "Income Certificate",
                description: "Apply for income certificate for various purposes",
                image: "https://images.pexels.com/photos/6693324/pexels-photo-6693324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link 
                    to="/services" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;