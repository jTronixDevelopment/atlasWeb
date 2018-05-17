import React, { Component } from 'react';
import './Profile.css';

//=== Classes ==================================================================
import Storage from './../../Classes/Firebase/CloudStorage/CloudStorage';
import DB from './../../Classes/Firebase/Database/Database';

//=== Components ===============================================================
import UserInfo from './ProfileComponents/UserInfo/UserInfo';
import ProfileControl from './ProfileComponents/ProfileControl/ProfileControl';
import GeoChart from './../../Components/Maps/GeoChart/GeoChart';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps"

//=== Classes ==================================================================
export default class ProfilePage extends Component {

  constructor(props){
    super(props);
    this.firebase = this.props.firebase
    this.storage = new Storage(this.props.firebase);
    this.db = new DB(this.props.firebase);
    this.mapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "administrative.countries.egypt",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "black"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]
    this.state = {
      profileData : {
        bio : "Loading",
        profilePic : ""
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

  getUserData(){
    if(this.props.firebase&&this.props.firebase.auth().currentUser){
      this.db.getUserData({
        docId : this.firebase.auth().currentUser.uid,
        successHandler: this.setUserData.bind(this)
      })
      this.storage.getProfilePic({
        docId : this.firebase.auth().currentUser.uid,
        successHandler: this.setUserPhoto.bind(this)
      })
    } else {
      console.log("Firebase not defined or user not logged in.")
    }
  }

  setUserData(data){
    this.setState({ profileData : data.data() })
  }

  setUserPhoto(url){
    let user = Object.assign({}, this.state.profileData);
    user.profilePic = url;
    this.setState({profileData : user});
  }

  getUserCurrentLocation(){
    var setMap = (position)=>{
      this.setState({ curPOS : { lat: position.coords.latitude, lng: position.coords.longitude }})
    }
    navigator.geolocation.getCurrentPosition(setMap.bind(this),(error)=>{console.log(error)});
  }

  //=== Component Lifecycle ========================================================

  componentDidMount(){
    this.getUserData()
    this.getUserCurrentLocation()
  }

  render() {
    const MyMapComponent = withGoogleMap((props) =>
      <GoogleMap defaultZoom={10} defaultCenter={{ lat: this.state.curPOS.lat, lng: this.state.curPOS.lng }} defaultOptions={{styles:this.mapStyle}}>
        { props.isMarkerShown && <Marker position={{ lat: this.state.curPOS.lat, lng:this.state.curPOS.lng }} />}
      </GoogleMap>
    )
    return (
      <div>
        <UserInfo profileData={ this.state.profileData } savePhoto={ this.savePhoto.bind(this) } />
        <ProfileControl firebase={ this.props.firebase } profileData={ this.state.profileData } savePhoto = { this.savePhoto.bind(this) } />
        <GeoChart/>
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwojlX6Zlg8WX3RrJCijGPvHzDDciMoYk&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `350px`, marginBottom: '75px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}
