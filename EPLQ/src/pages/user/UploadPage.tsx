import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { uploadLocationData, getUserLocationData, LocationData, deleteLocation } from '../../services/dataService';
import { Upload, Map, Tag, Trash2 } from 'lucide-react';

const UploadPage = () => {
  const { currentUser } = useAuth();
  const { showNotification } = useNotification();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [userLocations, setUserLocations] = useState<LocationData[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [showMyLocations, setShowMyLocations] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !currentUser) return;
    
    setIsLoading(true);
    
    try {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const result = await uploadLocationData(
        currentUser.id,
        title,
        description,
        Number(latitude),
        Number(longitude),
        tagArray
      );
      
      showNotification('success', 'Location data uploaded', 'Your encrypted location data has been successfully uploaded.');
      
      // Reset form
      setTitle('');
      setDescription('');
      setLatitude('');
      setLongitude('');
      setTags('');
      
      // If the user was viewing their locations, refresh the list
      if (showMyLocations) {
        loadUserLocations();
      }
    } catch (error) {
      showNotification('error', 'Upload failed', 'Failed to upload location data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserLocations = async () => {
    if (!currentUser) return;
    
    setIsLoadingLocations(true);
    
    try {
      const locations = await getUserLocationData(currentUser.id);
      setUserLocations(locations);
      setShowMyLocations(true);
    } catch (error) {
      showNotification('error', 'Failed to load', 'Could not load your location data.');
    } finally {
      setIsLoadingLocations(false);
    }
  };

  const handleDelete = async (locationId: string) => {
    if (!currentUser) return;
    
    try {
      await deleteLocation(locationId, currentUser.id);
      showNotification('success', 'Location deleted', 'Location data has been successfully deleted.');
      
      // Update the list of locations
      setUserLocations(prevLocations => 
        prevLocations.filter(location => location.id !== locationId)
      );
    } catch (error) {
      showNotification('error', 'Delete failed', 'Failed to delete location data.');
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

  return (
    <div className="page-container fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Upload Location Data</h1>
        <p className="text-muted-foreground mb-8">
          Upload your encrypted location data for secure storage and privacy-preserving queries.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload Data
              </CardTitle>
              <CardDescription>
                Fill in the details to upload your encrypted location data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Location title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={errors.title}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className={`flex w-full rounded-md border ${
                      errors.description ? 'border-destructive' : 'border-input'
                    } bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                    placeholder="Location description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="tags" className="text-sm font-medium">
                    Tags (comma separated)
                  </label>
                  <Input
                    id="tags"
                    placeholder="e.g. park, public, safety"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional: Add tags to make your location easier to categorize
                  </p>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleUseCurrentLocation}
                >
                  <Map className="h-4 w-4 mr-2" />
                  Use Current Location
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={handleSubmit} className="w-full" isLoading={isLoading}>
                Upload Encrypted Data
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="h-5 w-5 mr-2" />
                My Locations
              </CardTitle>
              <CardDescription>
                View and manage your uploaded location data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showMyLocations ? (
                <div className="text-center py-8">
                  <Map className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    View your previously uploaded location data
                  </p>
                  <Button onClick={loadUserLocations} isLoading={isLoadingLocations}>
                    Load My Locations
                  </Button>
                </div>
              ) : isLoadingLocations ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : userLocations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    You haven't uploaded any location data yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {userLocations.map((location) => (
                    <div 
                      key={location.id} 
                      className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{location.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleDelete(location.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{location.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {location.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {new Date(location.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {showMyLocations && (
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={loadUserLocations}
                  isLoading={isLoadingLocations}
                >
                  Refresh Locations
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;