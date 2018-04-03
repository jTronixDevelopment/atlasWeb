export default class Auth{
  constructor(firebase) {
    this.firebase = firebase;
    console.log(firebase)
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
      });
  }

  signIn({email,password,errorHandler,successHandler}) {
    this.firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      if(error){
        errorHandler(error)
      } else {
        successHandler()
      }
    })
  }

  signOut({sucessHandler , erroHandler}) {
    this.firebase.auth().signOut().then(function() {
      //Do signout stuff
    }).catch(function(error) {
      // An error happened.
    });
  }

}
