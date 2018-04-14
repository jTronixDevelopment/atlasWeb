export default class Auth{

  signUp({ email, password, errorHandler, successHandler,firebase }) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(){
        successHandler();
      })
      .catch(function(error) {
        if(error)
          errorHandler(error)
      });
  }

  signIn({email, password, errorHandler, successHandler, firebase}) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      successHandler();
    })
    .catch(function(error) {
      if(error)
        errorHandler(error)
    })
  }

  signOut({sucessHandler , erroHandler, firebase}) {
    firebase.auth().signOut()
    .then(()=>{
    })
    .catch((error)=>{
    });
  }

  forgotPassword({ email, firebase }){
    firebase.auth().sendPasswordResetEmail(
    email, this.actionCodeSettings)
    .then(function() {
      // Password reset email sent.
    })
    .catch(function(error) {
      // Error occurred. Inspect error.code.
    });
  }

  signInWithFacebook({ firebase , successHandler, errorHandler }){
    var provider = new firebase.auth.FacebookAuthProvider();
    alert('in')
    firebase.auth().signInWithRedirect(provider).then(function() {
      console.log("cool")
      firebase.auth().getRedirectResult().then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    });
  }

}
