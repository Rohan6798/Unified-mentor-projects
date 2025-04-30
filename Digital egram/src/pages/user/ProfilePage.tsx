import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/common/Layout';
import toast from 'react-hot-toast';
import { UserCircle, Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  address?: string;
  district?: string;
  state?: string;
  pincode?: string;
  dob?: string;
}

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    mobile: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
    dob: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) return;
      
      try {
        const userDoc = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userDoc);
        console.log(userSnap.exists());
        
        if (userSnap.exists()) {
          const userData = userSnap.data() as UserProfile;
          setProfile({
            name: userData.name || '',
            email: userData.email || currentUser.email || '',
            mobile: userData.mobile || '',
            address: userData.address || '',
            district: userData.district || '',
            state: userData.state || '',
            pincode: userData.pincode || '',
            dob: userData.dob || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    try {
      setSaving(true);
      const userDoc = doc(db, 'users', currentUser.uid);
      
      await updateDoc(userDoc, {
        name: profile.name,
        mobile: profile.mobile,
        address: profile.address,
        district: profile.district,
        state: profile.state,
        pincode: profile.pincode,
        dob: profile.dob,
        updatedAt: new Date(),
      });
      
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-blue-700 px-6 py-4">
            <h1 className="text-xl font-semibold text-white">My Profile</h1>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-5 mb-4">
                  <UserCircle size={80} className="text-blue-600" />
                </div>
                
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-4"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              
              <div className="md:w-2/3">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100"
                        disabled
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={profile.mobile}
                        onChange={handleInputChange}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleInputChange}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                          District
                        </label>
                        <input
                          type="text"
                          id="district"
                          name="district"
                          value={profile.district}
                          onChange={handleInputChange}
                          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={profile.state}
                          onChange={handleInputChange}
                          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={profile.pincode}
                          onChange={handleInputChange}
                          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={profile.dob}
                        onChange={handleInputChange}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="flex space-x-4 pt-4">
                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                      <p className="text-gray-500">{currentUser?.uid}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <Mail className="text-blue-600 mt-1 mr-3 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-gray-900">{profile.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="text-blue-600 mt-1 mr-3 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Mobile</p>
                          <p className="text-gray-900">{profile.mobile || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="text-blue-600 mt-1 mr-3 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="text-gray-900">{profile.dob || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="text-blue-600 mt-1 mr-3 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="text-gray-900">
                            {profile.address ? (
                              <>
                                {profile.address}
                                {(profile.district || profile.state) && <br />}
                                {profile.district && `${profile.district}, `}
                                {profile.state && `${profile.state} `}
                                {profile.pincode && profile.pincode}
                              </>
                            ) : (
                              'Not provided'
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;