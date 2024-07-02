import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyD1nOy_z33K_tP5G1gn5JT65B-CHEm-UkQ",
    authDomain: "graphcommunity-b25b3.firebaseapp.com",
    projectId: "graphcommunity-b25b3",
    dataBaseURL: "https://graphcommunity-b25b3-default-rtdb.firebaseio.com",
    storageBucket: "graphcommunity-b25b3.appspot.com",
    messagingSenderId: "350185458394",
    appId: "1:350185458394:web:1e75694681a862aceab3e3",
    measurementId: "G-40E7VHPR31"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };