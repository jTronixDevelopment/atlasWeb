export default class DB{
  constructor(firebase){
    this.firebase = firebase;
  }

  add({ collection, data, successHandler, errorHandler, docId}){
    this.firebase.firestore().collection(collection).add(data)
      .then((doc)=>{
        successHandler(doc);
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  addWithID({collection, data, successHandler, errorHandler, docId}){
    this.firebase.firestore().collection(collection).doc(docId).set(data)
      .then((doc)=>{
        successHandler(doc);
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  edit({ collection, data, docId, successHandler, errorHandler }){
    this.firebase.firestore().collection(collection).doc(docId).update(data)
    .then(function() {
        successHandler(data)
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
  }

  getDoc({ collection, docId, data, successHandler, errorHandler }){
    this.firebase.firestore().collection(collection).doc(docId)
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
    this.firebase.firestore().collection('posts').where(query.feild, query.operator , query.value ).get()
    .then((querySnapshot)=>{
      querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
      });
    })
  }

  //=== Specific ===============================================================
  getUserData({ docId , successHandler}){
    this.firebase.firestore().collection('users').doc(docId).get()
      .then((data)=>{ successHandler(data) })
      .catch((error)=>{ console.log(error) })
  }

}
