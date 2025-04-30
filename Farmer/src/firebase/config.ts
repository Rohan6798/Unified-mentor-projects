import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkHRW4WIvEBAsQmsloZTljqngYTWOu9CQ",
  authDomain: "farmer-ed843.firebaseapp.com",
  projectId: "farmer-ed843",
  storageBucket: "farmer-ed843.firebasestorage.app",
  messagingSenderId: "549675124590",
  appId: "1:549675124590:web:ba37d0392441709169237f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;