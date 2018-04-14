
export default class Storgage{
  upload({ file, path, firebase }){
    firebase.storage().ref(path).put(file).then(()=>{
      console.log('Uploaded a blob or file!');
    })
  }

  bulkUpload({ files, path, firebase }){
    files.forEach((file)=>{
      firebase.storage().ref(path).put(file).then(()=>{
        console.log('Uploaded a blob or file!');
      })
    })
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
