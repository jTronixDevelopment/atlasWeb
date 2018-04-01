export default class Auth{
  constructor(firebase) {
    this.firebase = firebase;
    this.actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'https://www.example.com/finishSignUp?cartId=1234',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: false,
        minimumVersion: '12'
      }
    };
  }

  signUp({ email,password,errorHandler }) {
    this.firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        errorHandler(error)
      }).then(()=>{
        console.log("Success sign up")
      });
  }

  signIn({email,password,errorHandler}) {
    this.firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      errorHandler(error)
    }).then(()=>{
      console.log("Success sign inn")
    });
  }

  signOut({sucessHandler , erroHandler}) {
    this.firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

}
