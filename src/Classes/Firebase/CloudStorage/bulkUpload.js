export default function ({
  files,
  path,
}) {
  files.forEach((file) => {
    this.firebase.storage().ref(path).put(file).then(() => {
      console.log('Uploaded a blob or file!');
    });
  });
}
