var Firebase  = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/messaging");
require("firebase/functions");
require("firebase/storage");

Firebase.initializeApp({
  apiKey: "AIzaSyCn1b75MQ45nc3fhcNBkVJbHcFwJvqgcmA",
  authDomain: "platrom-7b0e2.firebaseapp.com",
  databaseURL: "https://platrom-7b0e2.firebaseio.com",
  projectId: "platrom-7b0e2",
  storageBucket: "platrom-7b0e2.appspot.com",
  messagingSenderId: "459800981318"
});

export { Firebase };
