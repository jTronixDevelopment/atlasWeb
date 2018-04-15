import React, { Component } from 'react';
import './profile.css';

//=== Classes ==================================================================
import Storage from './../../Classes/Firebase/CloudStorage/CloudStorage';

//=== Components ===============================================================
import UserInfo from './ProfileComponents/UserInfo/UserInfo';
import ProfileFeed from './ProfileComponents/ProfileFeed/ProfileFeed';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

const MyMapComponent = props =>{
  return (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }} >
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
)
}

//=== Classes ==================================================================
export default class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.firebase = this.props.firebase;
    this.currentUser = this.firebase.auth().currentUser
  }

  sendFile(){
    var photo = document.getElementById('photo').files[0];
    var ref = this.props.firebase.storage().ref('profilePics/test');
    ref.put(photo).then(()=>{
      console.log('Uploaded a blob or file!');
    })
  }

  componentWillMount(){
    // this.db.query(
    //
    // )
  }

  render() {
    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
      </GoogleMap>
    ))

    return (
      <div>
        <UserInfo/>
        <div className='profile-bio'>
          <h5>Bio</h5>
        </div>
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <div className="upload-btn-wrapper">
          <button className="btn">Upload a file</button>
          <input id='photo' type="file" name="myfile" />
        </div>
      </div>
    )
  }
}
