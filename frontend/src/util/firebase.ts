import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAhkRcs4GzDOcvseI6Q6iNfrQSlLoihLSU',
  authDomain: 'keeb-comparison.firebaseapp.com',
  projectId: 'keeb-comparison',
  storageBucket: 'keeb-comparison.appspot.com',
  messagingSenderId: '14302523092',
  appId: '1:14302523092:web:7660ea8f06a9d8cbc99541',
};

if (firebase.apps.length === 0) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
