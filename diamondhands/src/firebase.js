import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA9YAE6jwb1GEA7clfnYLqrkBB1L-rSkpg",
    authDomain: "diamond-hands-ca6e7.firebaseapp.com",
    projectId: "diamond-hands-ca6e7",
    storageBucket: "diamond-hands-ca6e7.appspot.com",
    messagingSenderId: "78768005190",
    appId: "1:78768005190:web:8a06a0234d11d467732a47",
    measurementId: "G-WGBJZKRSML",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
