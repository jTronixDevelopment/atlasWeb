export default function ({
  email,
}) {
  this.firebase.auth().sendPasswordResetEmail(
    email, this.actionCodeSettings,
  )
    .then(() => {
      // Password reset email sent.
    })
    .catch((error) => {
      // Error occurred. Inspect error.code.
      console.log(error);
    });
}
