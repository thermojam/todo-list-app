import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAjS6P-zsYhQB3Xa31aFjEb4APa1AVV-J8",
    authDomain: "todoslist-fb1a6.firebaseapp.com",
    projectId: "todoslist-fb1a6",
    storageBucket: "todoslist-fb1a6.firebasestorage.app",
    messagingSenderId: "592862781119",
    appId: "1:592862781119:web:4f6d7935f937bb5e79300a",
    databaseURL: "https://todoslist-fb1a6-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
