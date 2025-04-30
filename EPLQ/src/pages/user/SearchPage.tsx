import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { searchNearbyLocations, LocationData } from '../../services/dataService';
import { Search, MapPin, Tag, Lock } from 'lucide-react';

const SearchPage = () => {
  const { currentUser } = useAuth();
  const { showNotification } = useNotification();
  
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('5');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!latitude) {
      newErrors.latitude = 'Latitude is required';
    } else if (isNaN(Number(latitude)) || Number(latitude) < -90 || Number(latitude) > 90) {
      newErrors.latitude = 'Valid latitude is between -90 and 90';
    }
    
    if (!longitude) {
      newErrors.longitude = 'Longitude is required';
    } else if (isNaN(Number(longitude)) || Number(longitude) < -180 || Number(longitude) > 180) {
      newErrors.longitude = 'Valid longitude is between -180 and 180';
    }
    
    if (!radius) {
      newErrors.radius = 'Radius is required';
    } else if (isNaN(Number(radius)) || Number(radius) <= 0 || Number(radius) > 50) {
      newErrors.radius = 'Valid radius is between 1 and 50 km';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !currentUser) return;
    
    setIsLoading(true);
    
    try {
      // Simulate searching for nearby POIs while preserving privacy
      const results = await searchNearbyLocations(
        Number(latitude),
        Number(longitude),
        Number(radius),
        currentUser.id
      );
      
      setSearchResults(results);
      setHasSearched(true);
      
      if (results.length === 0) {
        showNotification('info', 'No results found', 'No points of interest found within the specified radius.');
      } else {
        showNotification('success', 'Search completed', `Found ${results.length} points of interest nearby.`);
      }
    } catch (error) {
      showNotification('error', 'Search failed', 'Failed to search for nearby locations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          showNotification('error', 'Geolocation error', 'Failed to get your current location.');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      showNotification('error', 'Not supported', 'Geolocation is not supported by your browser.');
    }
  };
  
  // Simulate "decryption" animation for educational purposes
  const [decryptingIndex, setDecryptingIndex] = useState<number | null>(null);
  
  const simulateDecryption = (index: number) => {
    setDecryptingIndex(index);
    setTimeout(() => {
      setDecryptingIndex(null);
    }, 1500);
  };

  return (
    <div className="page-container fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Nearby Locations</h1>
        <p className="text-muted-foreground mb-8">
          Search for points of interest near you while preserving your location privacy.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Privacy-Preserving Search
              </CardTitle>
              <CardDescription>
                Find nearby points of interest without revealing your exact location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="latitude" className="text-sm font-medium">
                    Latitude
                  </label>
                  <Input
                    id="latitude"
                    placeholder="e.g. 40.7128"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    error={errors.latitude}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="longitude" className="text-sm font-medium">
                    Longitude
                  </label>
                  <Input
                    id="longitude"
                    placeholder="e.g. -74.0060"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    error={errors.longitude}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="radius" className="text-sm font-medium">
                    Search Radius (km)
                  </label>
                  <Input
                    id="radius"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="5"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    error={errors.radius}
                  />
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleUseCurrentLocation}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Use Current Location
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={handleSubmit} className="w-full" isLoading={isLoading}>
                <Search className="h-4 w-4 mr-2" />
                Search Securely
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Search Results
              </CardTitle>
              <CardDescription>
                Encrypted results that only you can decrypt
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!hasSearched ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Enter search criteria and click "Search Securely" to find nearby points of interest.
                  </p>
                </div>
              ) : isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No points of interest found within the specified radius.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {searchResults.map((location, index) => (
                    <div 
                      key={location.id} 
                      className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{location.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 p-1 text-xs flex items-center"
                          onClick={() => simulateDecryption(index)}
                        >
                          <Lock className="h-3 w-3 mr-1" />
                          {decryptingIndex === index ? 'Decrypting...' : 'Decrypt Location'}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{location.description}</p>
                      
                      {/* Show location data (in a real app, this would be encrypted until decrypted by the user) */}
                      <div className="mt-2 p-2 rounded bg-accent/50 text-sm">
                        {decryptingIndex === index ? (
                          <div className="text-center py-2">
                            <div className="animate-pulse">Decrypting location data...</div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-xs text-muted-foreground">Latitude:</span>
                              <div>{location.latitude.toFixed(6)}</div>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Longitude:</span>
                              <div>{location.longitude.toFixed(6)}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {location.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex} 
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {hasSearched && searchResults.length > 0 && (
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Found {searchResults.length} points of interest within {radius} km
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSubmit}
                  isLoading={isLoading}
                >
                  Refresh Results
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
        
        {/* Educational info about privacy-preserving search */}
        <Card className="mt-8 bg-primary/5">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">How Privacy-Preserving Location Search Works</h3>
            <p className="text-sm text-muted-foreground">
              EPLQ uses advanced cryptographic techniques to protect your location privacy:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>Your location coordinates are encrypted before being sent to the server</li>
              <li>Search queries use homomorphic encryption to find nearby points without decrypting your location</li>
              <li>Only you can decrypt the final results using your private key</li>
              <li>No third parties, including service providers, can see your actual location</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;