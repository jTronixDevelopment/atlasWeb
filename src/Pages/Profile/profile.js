import React, { Component } from 'react';
import './profile.css';

//=== Classes ==================================================================
import Storage from './../../Classes/Firebase/CloudStorage/CloudStorage';
import DB from './../../Classes/Firebase/Database/Database';

//=== Components ===============================================================
import UserInfo from './ProfileComponents/UserInfo/UserInfo';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

//=== Classes ==================================================================
export default class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.firebase = this.props.firebase;
    this.cloudStorage = new Storage();
    this.db = new DB();
    this.state = {
      profileData : {
        bio : "Loading",
        profilePics : "https://firebasestorage.googleapis.com/v0/b/platrom-7b0e2.appspot.com/o/profilePics%2FB1TbUTfSbSNr05UAO9NgZlOYPnt2profilePic?alt=media&token=53e20dd2-095a-4963-9a12-77ae5822d9bd"
      }
    }
  }

  savePhoto(){
    var photo = document.getElementById('profilePic').files[0]; // add checks
    this.props.firebase.storage().ref('profilePics/'+this.state.profileData.id + "profilePic")
      .put(photo)
      .then((snapshot)=>{
      this.db.edit({
        collection: "users",
        data: {
          profilePic : snapshot.metadata.downloadURLs[0],
          bio : document.getElementById('profile-bio').value
        },
        doc: this.state.profileData.id,
        successHandler: (data)=>{ console.log("the data is",data) },
        errorHandler: ( err )=>{ console.log(err) },
        firebase: this.props.firebase
      })
    })
  }

  setUserData(data){
    this.profileData = data;
    this.setState({ profileData : this.profileData })
  }

  setUserPhoto(data){
    this.setUserData(data)
    this.firebase.storage().ref('profilePics/' + data.id + "profilePic")
    .getDownloadURL()
    .then(function(url){
      console.log('SetUserPhotoWorked')
    })
    .catch((error)=>{
      console.log("Photo Was not Added",error)
    })
  }

  componentDidMount(){
    this.db.getDoc({
      errorHandler : (err)=>{ console.log(err) },
      successHandler: this.setUserPhoto.bind(this),
      firebase : this.props.firebase,
      collection : "users",
      doc : this.firebase.auth().currentUser.uid
    })
  }

  render() {
    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        { props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
      </GoogleMap>
    ))
    return (
      <div>
        <UserInfo profileData={ this.state.profileData } savePhoto = { this.savePhoto.bind(this) } />
        <MyMapComponent isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `350px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}
