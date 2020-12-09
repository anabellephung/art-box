import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAirx7j5ylp40nLlnE2213u1UYIyR8g84s",
  authDomain: "commentBox-46114.firebaseapp.com",
  projectId: "commentBox-46114",
  storageBucket: "commentBox-46114.appspot.com",
  messagingSenderId: "928770988354",
  appId: "1:928770988354:web:20e5fa82d75dae941590db"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;