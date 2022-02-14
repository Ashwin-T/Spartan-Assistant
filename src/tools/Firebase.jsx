import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyApI8KdlmnfSAL5XcUBzl-BBFllb3Xp7rE",
    authDomain: "the-spartan-assistant.firebaseapp.com",
    projectId: "the-spartan-assistant",
    storageBucket: "the-spartan-assistant.appspot.com",
    messagingSenderId: "442926627705",
    appId: "1:442926627705:web:d57679f7309ee1353ecda8",
    measurementId: "G-TH2H1MX0G1"
};

let app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {app, analytics};
