import { auth, db } from './config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const seedAdminUser = async () => {
  try {
    // Create admin user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      'admin@egram.gov.in',
      'admin123'
    );

    // Add admin user data to Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: 'admin@egram.gov.in',
      name: 'System Administrator',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Admin user created successfully');
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Admin user already exists');
    } else {
      console.error('Error creating admin user:', error);
    }
  }
};

// Execute the seeding function
seedAdminUser();