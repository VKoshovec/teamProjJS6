import { initializeApp } from 'firebase/app';
import { getAnalytics, getFirestore } from 'firebase/firestore/lite';
import { getDatabase, ref, set, get } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCjQyny8SgADYEvs3IyK-2He7uJP3zOYC0',
  authDomain: 'teamprojjs6.firebaseapp.com',
  databaseURL:
    'https://teamprojjs6-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'teamprojjs6',
  storageBucket: 'teamprojjs6.appspot.com',
  messagingSenderId: '779869491174',
  appId: '1:779869491174:web:f832ac9eee035fa4f41027',
  measurementId: 'G-8X92MK3MYD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
// console.log('FIREBASE', db);

const dbRef = ref(getDatabase());
console.log('dbRef', dbRef);
