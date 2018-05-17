
export default class Storgage{
  constructor(firebase){
    this.firebase = firebase;
  }
  upload({ file, path, successHandler, errorHandler, data }){
    this.firebase.storage().ref(path).put(file).then((id)=>{
      successHandler(id)
    })
    .catch((err)=>{
      errorHandler(err)
    })
  }

  bulkUpload({ files, path }){
    files.forEach((file)=>{
      this.firebase.storage().ref(path).put(file).then(()=>{
        console.log('Uploaded a blob or file!');
      })
    })
  }

  getImgURL({ path, successHandler, errorHandler, id }){
    this.firebase.storage().ref(path + '/' + id)
    .getDownloadURL()
    .then((url)=>{ successHandler(url)})
    .catch((error)=>{ console.log("Photo Was not Added", error) })
  }

  getProfilePic({ successHandler, docId }){
    this.firebase.storage().ref('profilePics/' + docId).getDownloadURL()
      .then((url)=>{ successHandler(url) })
      .catch((error)=>{ console.log("Photo Was not Added",error) })
  }

}
