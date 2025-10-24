import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7VCxaHo8veaHnM8RwY60EX_DEh3hOVHk",
  authDomain: "controle-almoxarifado-semcas.firebaseapp.com",
  projectId: "controle-almoxarifado-semcas",
  storageBucket: "controle-almoxarifado-semcas.firebasestorage.app",
  messagingSenderId: "916615427315",
  appId: "1:916615427315:web:6823897ed065c50d413386"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
