import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfcnnSjAS2F7NEgsNlLqKtMxh1JmEWPHw",
  authDomain: "auction-app-c7a13.firebaseapp.com",
  projectId: "auction-app-c7a13",
  storageBucket: "auction-app-c7a13.firebasestorage.app",
  messagingSenderId: "77266346226",
  appId: "1:77266346226:web:2e0d995976adf07c0af06b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
