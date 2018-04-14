export default class DB{
  add({ collection, data, firebase, sucessHandler, errorHandler }){
    console.log(firebase)
    firebase.firestore().collection(collection).add(data)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
        sucessHandler(docRef.id);
    })
    .catch(function(error) {
        errorHandler(error)
    });
  }

  query({ firebase }){
    console.log(firebase)
    firebase.firestore().collection('posts').where('userName', '==','ryan').get().then((querySnapshot)=>{
      console.log(querySnapshot)
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
    })
  }
}
