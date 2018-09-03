export default function ({
  sucessHandler,
  erroHandler,
}) {
  this.firebase.auth().signOut()
    .then(() => {
      sucessHandler();
    })
    .catch((error) => {
      console.log(error);
      erroHandler();
    });
}
