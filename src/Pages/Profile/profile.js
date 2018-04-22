import React, { Component } from 'react';
import './profile.css';

//=== Classes ==================================================================
import Storage from './../../Classes/Firebase/CloudStorage/CloudStorage';
import DB from './../../Classes/Firebase/Database/Database';

//=== Components ===============================================================
import UserInfo from './ProfileComponents/UserInfo/UserInfo';
import ProfileControl from './ProfileComponents/ProfileControl/ProfileControl';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

//=== Classes ==================================================================
export default class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.firebase = this.props.firebase;
    this.cloudStorage = new Storage(this.firebase);
    this.db = new DB(this.firebase);
    this.state = {
      profileData : {
        bio : "Loading",
        profilePics : "https://firebasestorage.googleapis.com/v0/b/platrom-7b0e2.appspot.com/o/profilePics%2FB1TbUTfSbSNr05UAO9NgZlOYPnt2profilePic?alt=media&token=53e20dd2-095a-4963-9a12-77ae5822d9bd"
      },
      curPOS : { lat : 0, lng : 0 }
    }
    this.getUserCurrentLocation()
  }

  savePhoto(){
    this.firebase.storage().ref('profilePics/'+this.state.profileData.id + "profilePic")
      .put(document.getElementById('profilePic').files[0])
      .then((snapshot)=>{
        this.db.edit({
          collection: "users",
          data: {
            profilePic : snapshot.metadata.downloadURLs[0],
            bio : document.getElementById('profile-bio').value
          },
          doc: this.state.profileData.id,
          successHandler: (data)=>{ console.log("the data is",data) },
          errorHandler: ( err )=>{ console.log(err) }
        })
    })
  }

  setUserData(data){
    this.setState({ profileData : data })
  }

  setUserPhoto(data){
    this.setUserData(data)
    this.firebase.storage().ref('profilePics/' + data.id + "profilePic")
    .getDownloadURL()
    .then((url)=>{ console.log('Set User Photo Worked') })
    .catch((error)=>{ console.log("Photo Was not Added",error) })
  }

  getUserCurrentLocation(){
    var setMap = (position)=>{
      this.setState({ curPOS : { lat: position.coords.latitude, lng: position.coords.longitude }})
    }
    navigator.geolocation.getCurrentPosition(setMap.bind(this),(error)=>{console.log(error)});
  }

  componentDidMount(){
    if(this.firebase&&this.firebase.auth().currentUser){
      this.db.getDoc({
        errorHandler : (err)=>{ console.log(err) },
        successHandler: this.setUserPhoto.bind(this),
        collection : "users",
        doc : this.firebase.auth().currentUser.uid
      })
    }
    this.getUserCurrentLocation()
  }

  render() {
    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
      <GoogleMap defaultZoom={10} defaultCenter={{ lat: this.state.curPOS.lat, lng: this.state.curPOS.lng }}>
        { props.isMarkerShown && <Marker position={{ lat: this.state.curPOS.lat, lng:this.state.curPOS.lng }} />}
      </GoogleMap>
    ))
    return (
      <div>
        <UserInfo profileData={ this.state.profileData } savePhoto={ this.savePhoto.bind(this) } />
        <ProfileControl firebase={ this.props.firebase } profileData={ this.state.profileData } savePhoto = { this.savePhoto.bind(this) } />
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwojlX6Zlg8WX3RrJCijGPvHzDDciMoYk&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `350px`,marginBottom: '75px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}
