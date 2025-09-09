// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ⚠️ Estos valores los sacás de la consola de Firebase (Project settings)
const firebaseConfig = {
    apiKey: "AIzaSyCjG5a3G7BWTVoFdIo_ST4MaW_hOCRLOy4",
    authDomain: "mini-proyectos.firebaseapp.com",
    projectId: "mini-proyectos",
    storageBucket: "mini-proyectos.firebasestorage.app",
    messagingSenderId: "106908902076",
    appId: "1:106908902076:web:bc74d74c05ff42a5d266b9",
    measurementId: "G-JRZDZVSRYL"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);
// Exporta la referencia a Firestore
export const db = getFirestore(app);
