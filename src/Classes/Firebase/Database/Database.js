export default class DB{

  add({ collection, data, successHandler, errorHandler, firebase }){
    firebase.firestore().collection(collection).doc(data.id).set(data)
      .then((doc)=>{
        
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  edit(){

  }

  query({ query, erroHandler, successHandler ,firebase }){
    firebase.firestore().collection('posts').where('userName', '==','ryan').get().then((querySnapshot)=>{
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
    })
  }
}
