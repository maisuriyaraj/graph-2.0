import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyD1nOy_z33K_tP5G1gn5JT65B-CHEm-UkQ",
    authDomain: process.env.AUTHDOMAIN || "graphcommunity-b25b3.firebaseapp.com",
    projectId: process.env.PROJECTID || "graphcommunity-b25b3",
    dataBaseURL: process.env.DATABASEURL ||"https://graphcommunity-b25b3-default-rtdb.firebaseio.com",
    storageBucket: process.env.STORAGEBUCKET || "graphcommunity-b25b3.appspot.com",
    messagingSenderId: process.env.MESSAGINGSENDERID || "350185458394",
    appId: process.env.APPID || "1:350185458394:web:1e75694681a862aceab3e3",
    measurementId: process.env.MEASUREMENTID || "G-40E7VHPR31"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };