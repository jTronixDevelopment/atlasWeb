export default class DB{
  constructor(firebase){
    this.firebase = firebase;
  }

  add({ collection, data, successHandler, errorHandler, docId }){
    this.firebase.firestore().collection(collection).add(data)
      .then((doc)=>{
        successHandler(doc);
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  edit({ collection, data, doc, successHandler, errorHandler }){
    this.firebase.firestore().collection(collection).doc(doc).update(data)
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
  }

  getDoc({ collection, doc, data, successHandler, errorHandler }){
    this.firebase.firestore().collection(collection).doc(doc)
    .get().then(function(doc) {
        if (doc.exists) {
            successHandler(doc.data())
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  query({ query, erroHandler, successHandler }){
    this.firebase.firestore().collection('posts').where(query.feild, query.operator , query.value ).get().then((querySnapshot)=>{
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
    })
  }
}
