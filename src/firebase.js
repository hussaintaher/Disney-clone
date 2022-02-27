import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjrZkh0pEt1uYjatv-OmoaQm_-VzDc5qI",
  authDomain: "disneyplus-clone-2891d.firebaseapp.com",
  projectId: "disneyplus-clone-2891d",
  storageBucket: "disneyplus-clone-2891d.appspot.com",
  messagingSenderId: "604538919316",
  appId: "1:604538919316:web:fbc73c8bd0b70fa39ad781"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, signInWithPopup, provider};
export default db;