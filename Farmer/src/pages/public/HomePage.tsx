import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, Wheat, FileText, Sprout } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardTitle } from '../../components/ui/Card';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-800 to-primary-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <img 
            src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg" 
            alt="Agriculture field" 
            className="object-cover w-full h-full" 
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Empowering Farmers with Government Schemes
            </h1>
            <p className="mt-6 text-xl max-w-2xl">
              Access and apply for agricultural subsidies, loans, and support programs designed to help farmers thrive.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="animate-slide-up">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/farmer/schemes">
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20 animate-slide-up">
                  Browse Schemes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Simple steps to access government support for your farming needs
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-700">
                  <Sprout className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Register</h3>
                <p className="mt-2 text-base text-gray-500">
                  Create an account to access all government agricultural schemes in one place.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-700">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Apply</h3>
                <p className="mt-2 text-base text-gray-500">
                  Browse available schemes, check eligibility, and submit applications online.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-700">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Track</h3>
                <p className="mt-2 text-base text-gray-500">
                  Monitor your application status and get updates on approvals and disbursements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Schemes */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Schemes
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Explore top government programs to support your agricultural endeavors
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "PM-Kisan Scheme",
                description: "Direct income support of ₹6,000 per year to eligible farmer families, distributed in 3 equal installments.",
                imageUrl: "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg"
              },
              {
                title: "Crop Insurance Scheme",
                description: "Comprehensive risk coverage for farmers from pre-sowing to post-harvest losses due to natural calamities.",
                imageUrl: "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg"
              },
              {
                title: "Soil Health Card Scheme",
                description: "Soil nutrient assessment to help farmers improve productivity through judicious use of fertilizers.",
                imageUrl: "https://images.pexels.com/photos/5560055/pexels-photo-5560055.jpeg"
              }
            ].map((scheme, index) => (
              <Card key={index} className="h-full transition-all duration-200 hover:shadow-md">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={scheme.imageUrl} 
                    alt={scheme.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                  />
                </div>
                <CardContent>
                  <CardTitle>{scheme.title}</CardTitle>
                  <p className="mt-2 text-gray-600">{scheme.description}</p>
                  <div className="mt-4">
                    <Link to="/farmer/schemes">
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/farmer/schemes">
              <Button>
                View All Schemes
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Hear from farmers who have benefited from government schemes
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
            {[
              {
                quote: "The irrigation subsidy helped me install drip irrigation on my farm. My water usage is down by 60% and crop yield has increased significantly.",
                name: "Rajesh Kumar",
                location: "Uttar Pradesh",
                imageUrl: "https://images.pexels.com/photos/2382895/pexels-photo-2382895.jpeg"
              },
              {
                quote: "With the equipment loan scheme, I was able to purchase a tractor. It's transformed how I work my land and increased my productivity tremendously.",
                name: "Anita Sharma",
                location: "Punjab",
                imageUrl: "https://images.pexels.com/photos/6033981/pexels-photo-6033981.jpeg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <div className="p-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-primary-400" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-lg text-gray-600">{testimonial.quote}</p>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <img className="h-12 w-12 rounded-full object-cover" src={testimonial.imageUrl} alt={testimonial.name} />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">Farmer, {testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-200">Register today and explore available schemes.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/register">
                <Button className="bg-white text-primary-700 hover:bg-gray-100 hover:text-primary-800">
                  Register Now
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link to="/login">
                <Button variant="outline" className="text-white border-white/30 hover:bg-primary-800">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;