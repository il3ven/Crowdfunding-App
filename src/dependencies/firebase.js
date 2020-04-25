import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCe0ZvafGL26dBV19rUJhlCA_zRsut1AZU",
    authDomain: "crowdfunding-1708a.firebaseapp.com",
    databaseURL: "https://crowdfunding-1708a.firebaseio.com",
    projectId: "crowdfunding-1708a",
    storageBucket: "crowdfunding-1708a.appspot.com",
    messagingSenderId: "871074073141",
    appId: "1:871074073141:web:97c2f34ffa1abee07b7f7c",
    measurementId: "G-LBQ83RQP5C"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().signInAnonymously();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("User is logged in with ID : " + user.uid);
  } else {
    console.log("User is logged out");
  }
});

export default firebase;