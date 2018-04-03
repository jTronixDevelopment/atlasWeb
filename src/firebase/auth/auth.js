export default class Auth{
  constructor(firebase) {
    this.firebase = firebase;
  }

  signUp({ email,password,errorHandler,successHandler }) {
    this.firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(){
        successHandler();
        console.log("cool");
      })
      .catch(function(error) {
        if(error)
          errorHandler(error)
      });
  }

  signIn({email,password,errorHandler,successHandler}) {
    this.firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      successHandler();
    })
    .catch(function(error) {
      if(error)
        errorHandler(error)
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
