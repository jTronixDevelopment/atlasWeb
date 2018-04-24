
export default class Storgage{
  constructor(firebase){
    this.firebase = firebase;
  }
  upload({ file, path, successHandler, errorHandler, data }){
    this.firebase.storage().ref(path).put(file).then(()=>{
      successHandler()
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
    .catch((error)=>{ console.log("Photo Was not Added",error) })
  }

  errorHandler(error){
    switch (error) {
      case 'storage/unknown' :
        break;
        case 'storage/object_not_found':
          break;
        case 'storage/project_not_found':
          break;
        case 'storage/quota_exceededn':
          break;
        case 'storage/unauthorized':
          break;
        case 'storage/retry_limit_exceeded':
          break;
        case 'storage/invalid_checksum':
          break;
        case 'storage/canceled':
          break;
        case 'storage/invalid_event_name':
          break;
        case 'storage/invalid_url':
          break;
        case 'storage/invalid-argument':
          break;
        case 'storage/no_default_bucket':
          break;
        case 'storage/cannot_slice_blob':
          break;
        case 'storage/server_wrong_file_size':
          break;
      default:
        break;
    }
  }
}
