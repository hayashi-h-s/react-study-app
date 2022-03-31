import { initializeApp } from 'firebase/app';
import { getFirestore, } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVeUOOLqTIwbc4S4X-wKip_ROJOrN55bg",
  authDomain: "react-study-app-9a531.firebaseapp.com",
  databaseURL: "https://react-study-app-9a531-default-rtdb.firebaseio.com/",
  projectId: "react-study-app-9a531",
  storageBucket: "react-study-app-9a531.appspot.com",
  messagingSenderId: "865667575323",
  appId: "1:865667575323:web:4106838e8eb65583fe12be",
  measurementId: "G-RXFMB6K9BP",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
