import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUE3cTqAtzB9024JcBRzplWV_co6PhM5U",
  authDomain: "digital-e-gram.firebaseapp.com",
  projectId: "digital-e-gram",
  storageBucket: "digital-e-gram.firebasestorage.app",
  messagingSenderId: "325592772918",
  appId: "1:325592772918:web:c56e21ee122e810e1e8397"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;