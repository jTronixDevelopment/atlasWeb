export default function ({
  path,
  successHandler,
  errorHandler,
  id,
}) {
  this.firebase.storage().ref(`${path}/${id}`)
    .getDownloadURL()
    .then((url) => {
      successHandler(url);
    })
    .catch((error) => {
      errorHandler();
      console.log('Photo Was not Added', error);
    });
}
