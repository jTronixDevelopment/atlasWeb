export default function ({
  email, password, errorHandler, successHandler,
}) {
  this.firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((success) => {
      successHandler(success);
    }).then(() => {
      console.log('successfully added users');
    })
    .catch((error) => {
      if (error) { errorHandler(error); }
    });
}
