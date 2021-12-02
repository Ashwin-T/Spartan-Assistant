import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCZDqqdwAVhsnBZvDkqwc09K2m5LYqsB94",
    authDomain: "skemfreshmen.firebaseapp.com",
    projectId: "skemfreshmen",
    storageBucket: "skemfreshmen.appspot.com",
    messagingSenderId: "1091469784767",
    appId: "1:1091469784767:web:bd9252bc00fb2df38cb80a",
    measurementId: "G-EHTYMCRY1J"
};

let app = initializeApp(firebaseConfig);
export default app;