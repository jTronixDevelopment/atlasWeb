export default class Auth{
  constructor(firebase){
    this.firebase = firebase;
  }

  signUp({ email, password, errorHandler, successHandler }) {
    this.firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((success)=>{
        successHandler(success)
      }).then(()=>{
        console.log("successfully added users")
      })
      .catch(function(error) {
        if(error)
          errorHandler(error)
      });
  }

  signIn({email, password, errorHandler, successHandler}) {
    this.firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      successHandler();
    })
    .catch(function(error) {
      if(error)
        errorHandler(error)
    })
    this.firebase.auth().setPersistence(this.firebase.auth.Auth.Persistence.LOCAL)
  }

  signOut({sucessHandler , erroHandler}) {
    this.firebase.auth().signOut()
    .then(()=>{
    })
    .catch((error)=>{
    });
  }

  forgotPassword({ email }){
    this.firebase.auth().sendPasswordResetEmail(
    email, this.actionCodeSettings)
    .then(function() {
      // Password reset email sent.
    })
    .catch(function(error) {
      // Error occurred. Inspect error.code.
    });
  }

  signInWithFacebook({ successHandler, errorHandler }){
    var provider = new this.firebase.auth.FacebookAuthProvider();
    this.firebase.auth().signInWithRedirect(provider).then(function() {
      this.firebase.auth().getRedirectResult().then(function(result) {
      }).catch(function(error) {
        errorHandler(error)
      });
    });
  }

}
