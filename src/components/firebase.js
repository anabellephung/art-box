import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDcyDDaL5p0c_3on7BRZIH8BcgINkRXC-4",
  authDomain: "commentbox-a68c6.firebaseapp.com",
  databaseURL: "https://commentbox-a68c6.firebaseio.com",
  projectId: "commentbox-a68c6",
  storageBucket: "commentbox-a68c6.appspot.com",
  messagingSenderId: "754571659579",
  appId: "1:754571659579:web:096bb7e16b3a2279f50f1e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;