import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmrFrxVZMCdJ9H6T71mOniHFq-kC_iMEg",
  authDomain: "website-1c26c.firebaseapp.com",
  projectId: "website-1c26c",
  storageBucket: "website-1c26c.firebasestorage.app",
  messagingSenderId: "80069524057",
  appId: "1:80069524057:web:bb0345a62e05013c5acf48",
  measurementId: "G-7SQC9H5Q97",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
