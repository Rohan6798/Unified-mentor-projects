import { Link } from 'react-router-dom';
import { Shield, Lock, Map, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    icon: <Lock className="h-10 w-10 text-primary" />,
    title: 'Privacy Preserving',
    description: 'Your location data is encrypted end-to-end, ensuring that your privacy is always protected.'
  },
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: 'Secure Data Storage',
    description: 'Upload and store your location data with confidence, knowing it\'s protected with advanced encryption.'
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: 'Efficient Queries',
    description: 'Search nearby points of interest without compromising your location privacy.'
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: 'Public Safety',
    description: 'Helping emergency services provide better response while preserving individual privacy.'
  }
];

const HeroSection = ({ currentUser, isUser, isAdmin }: { currentUser: any; isUser: boolean; isAdmin: boolean }) => (
  <div className="bg-gradient-to-b from-primary/90 to-primary/60 text-primary-foreground">
    <div className="page-container py-16 md:py-24">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            EPLQ: Privacy-Preserving Location Queries
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Enabling location-based services while keeping your data private and secure.
          </p>
          {currentUser ? (
            <div className="flex flex-wrap gap-4">
              {isUser && (
                <Link to="/user/search">
                  <Button size="lg" variant="secondary" className="shadow-lg">
                    Search POIs
                  </Button>
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin/logs">
                  <Button size="lg" className="shadow-lg">
                    View Logs
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              <Link to="/user/register">
                <Button size="lg" className="shadow-lg">
                  Register Now
                </Button>
              </Link>
              <Link to="/user/login">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  User Login
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button size="lg" variant="outline" className="shadow-lg bg-transparent">
                  Admin Login
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 text-center">
                <Shield className="h-20 w-20 mx-auto mb-4 text-white" />
                <h2 className="text-2xl font-bold mb-2">Secure by Design</h2>
                <p className="opacity-90">
                  EPLQ uses advanced encryption techniques to ensure your location data remains private, even during queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => (
  <div className="page-container py-16">
    <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <Card key={index} className="hover:shadow-md transition-all duration-300">
          <CardHeader className="flex items-center justify-center">
            {feature.icon}
            <CardTitle className="mt-4 text-xl text-center">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const LandingPage = () => {
  const { currentUser, isUser, isAdmin } = useAuth();

  return (
    <div className="fade-in">
      <HeroSection currentUser={currentUser} isUser={isUser} isAdmin={isAdmin} />
      <FeaturesSection />
      {/* Other sections remain unchanged */}
    </div>
  );
};

export default LandingPage;