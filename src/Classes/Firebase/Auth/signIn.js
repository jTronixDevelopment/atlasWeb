
export default function ({
  email, password, errorHandler, successHandler,
}) {
  this.firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      successHandler();
    })
    .catch((error) => {
      if (error) {
        errorHandler(error);
      }
    });
  this.firebase.auth().setPersistence(this.firebase.auth.Auth.Persistence.LOCAL);
}
