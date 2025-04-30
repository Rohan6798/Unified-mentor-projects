import { logEvent } from './logService';

// Interface for location data
export interface LocationData {
  id: string;
  userId: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  tags: string[];
  createdAt: number;
  encrypted: boolean;
}

// In-memory data storage (would use Firebase in production)
let locationData: LocationData[] = [];

// Simulated encryption and decryption functions
function encryptLocation(lat: number, lng: number): { encLat: string, encLng: string } {
  // Simple XOR with a key for simulation purposes
  // In a real app, use proper encryption algorithms
  const key = 12345;
  const encLat = `enc_${(lat * key).toString(16)}`;
  const encLng = `enc_${(lng * key).toString(16)}`;
  
  return { encLat, encLng };
}

function decryptLocation(encLat: string, encLng: string): { lat: number, lng: number } {
  // Simple XOR decryption for simulation
  // In a real app, use proper decryption algorithms
  const key = 12345;
  const lat = parseInt(encLat.replace('enc_', ''), 16) / key;
  const lng = parseInt(encLng.replace('enc_', ''), 16) / key;
  
  return { lat, lng };
}

// Upload location data
export async function uploadLocationData(
  userId: string,
  title: string,
  description: string,
  latitude: number,
  longitude: number,
  tags: string[]
): Promise<LocationData> {
  try {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate encryption
    const { encLat, encLng } = encryptLocation(latitude, longitude);
    
    // Create new location entry
    const newLocation: LocationData = {
      id: `loc_${Date.now()}${Math.floor(Math.random() * 1000)}`,
      userId,
      title,
      description,
      latitude, // Store original for demo purposes
      longitude, // Store original for demo purposes
      tags,
      createdAt: Date.now(),
      encrypted: true
    };
    
    // Add to in-memory database
    locationData.push(newLocation);
    
    // Log the event
    logEvent({
      type: 'UPLOAD_LOCATION',
      userId,
      userRole: 'user',
      details: {
        locationId: newLocation.id,
        title,
        tags
      }
    });
    
    return newLocation;
  } catch (error) {
    console.error('Error uploading location data:', error);
    throw new Error('Failed to upload location data');
  }
}

// Get location data for a specific user
export async function getUserLocationData(userId: string): Promise<LocationData[]> {
  try {
    // Simulate fetch delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return locationData.filter(location => location.userId === userId);
  } catch (error) {
    console.error('Error fetching user location data:', error);
    throw new Error('Failed to fetch user location data');
  }
}

// Search for nearby POIs within a radius
export async function searchNearbyLocations(
  latitude: number,
  longitude: number,
  radiusKm: number,
  userId: string
): Promise<LocationData[]> {
  try {
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the search event
    logEvent({
      type: 'SEARCH_LOCATIONS',
      userId,
      userRole: 'user',
      details: {
        latitude,
        longitude,
        radiusKm
      }
    });
    
    // Basic distance calculation function 
    // (Haversine formula for calculating distance between two points on Earth)
    const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      return distance;
    };
    
    // Filter locations within the specified radius
    const nearbyLocations = locationData.filter(location => {
      const distance = haversine(latitude, longitude, location.latitude, location.longitude);
      return distance <= radiusKm;
    });
    
    return nearbyLocations;
  } catch (error) {
    console.error('Error searching nearby locations:', error);
    throw new Error('Failed to search nearby locations');
  }
}

// Delete a location
export async function deleteLocation(locationId: string, userId: string): Promise<void> {
  try {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find the location
    const locationIndex = locationData.findIndex(loc => loc.id === locationId);
    
    if (locationIndex === -1) {
      throw new Error('Location not found');
    }
    
    // Check if user owns this location
    if (locationData[locationIndex].userId !== userId) {
      throw new Error('Unauthorized to delete this location');
    }
    
    // Remove the location
    locationData.splice(locationIndex, 1);
    
    // Log the event
    logEvent({
      type: 'DELETE_LOCATION',
      userId,
      userRole: 'user',
      details: {
        locationId
      }
    });
  } catch (error) {
    console.error('Error deleting location:', error);
    throw new Error('Failed to delete location');
  }
}