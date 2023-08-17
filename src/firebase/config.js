import firebase from "firebase/app"
import "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBO9Cdr0kxg-wMXChHvVI3jv26lTVpTPIY",
  authDomain: "master-chat-2.firebaseapp.com",
  projectId: "master-chat-2",
  storageBucket: "master-chat-2.appspot.com",
  messagingSenderId: "570506091171",
  appId: "1:570506091171:web:3b30b0f0c80cf3080a7d16"
};
// init firebase
firebase.initializeApp(firebaseConfig);
// init services
export const projectFirestore = firebase.firestore();  // for realtime db
// timestamp
export const timestamp = firebase.firestore.Timestamp;