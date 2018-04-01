export default class DB{
  constructor(firebase){
    this.firebase = firebase;
  }

  write(DBname, data){
    this.firebase.database().ref('users/' + data.userId).set(data);
  }
}
