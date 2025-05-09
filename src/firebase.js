import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPHzbf88VaM6A_amDWu21FVi5ii_VVT1o",
    authDomain: "cemetery-map-app.firebaseapp.com",
    projectId: "cemetery-map-app",
    storageBucket: "cemetery-map-app.firebasestorage.app",
    messagingSenderId: "655199772699",
    appId: "1:655199772699:web:a043f92785888c616d58be"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
