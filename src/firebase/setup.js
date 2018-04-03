var DB = require('./database/database').default;
var Auth = require('./auth/auth').default;
require("firebase/auth");
require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");
// require("firebase/storage");

var Firebase  = require("firebase/app");
var firBaseConfig = {
  apiKey: "AIzaSyAuYLb2L0qafKyxZdkUw1qVp46ffpig_EY",
  authDomain: "mongotest-11a55.firebaseapp.com",
  databaseURL: "https://mongotest-11a55.firebaseio.com/",
  storageBucket: "mongotest-11a55.appspot.com"
};

Firebase.initializeApp(firBaseConfig);

export { Auth , DB, Firebase };
