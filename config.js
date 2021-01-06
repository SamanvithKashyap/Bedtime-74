import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyB8u6souaNymwHFBaQG-g0baIqLrolMDK0",
    authDomain: "story-hub-a3b51.firebaseapp.com",
    databaseURL: "https://story-hub-a3b51-default-rtdb.firebaseio.com",
    projectId: "story-hub-a3b51",
    storageBucket: "story-hub-a3b51.appspot.com",
    messagingSenderId: "367275090718",
    appId: "1:367275090718:web:1202966915e0a24f769f0f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
