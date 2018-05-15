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
    var map = new window.google.maps.Map(this.refs.map,{
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });

        window.google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
          });
          window.google.charts.setOnLoadCallback(drawMarkersMap);

           function drawMarkersMap() {
           var data = window.google.visualization.arrayToDataTable([
              ['Country', 'Posts'],
              ['Angola', 8], ['Benin', 6], ['Botswana', 1],
              ['Burkina Faso', 12], ['Burundi', 3], ['Cameroon', 3],
              ['Canary Islands', 28], ['Cape Verde', 15],
              ['Central African Republic', 4], ['Ceuta', 35], ['Chad', 12],
              ['Comoros', 12], ['Cote d\'Ivoire', 6],
              ['Democratic Republic of the Congo', 3], ['Djibouti', 12],
              ['Egypt', 26], ['Equatorial Guinea', 3], ['Eritrea', 15],
              ['Ethiopia', 9], ['Gabon', 0], ['Gambia', 13], ['Ghana', 5],
              ['Guinea', 10], ['Guinea-Bissau', 12], ['Kenya', 1],
              ['Lesotho', 29], ['Liberia', 6], ['Libya', 32], ['Madagascar', null],
              ['Madeira', 33], ['Malawi', 14], ['Mali', 12], ['Mauritania', 18],
              ['Mauritius', 20], ['Mayotte', 13], ['Melilla', 35],
              ['Morocco', 32], ['Mozambique', 25], ['Namibia', 22],
              ['Niger', 14], ['Nigeria', 8], ['Republic of the Congo', 1],
              ['Réunion', 21], ['Rwanda', 2], ['Saint Helena', 16],
              ['São Tomé and Principe', 0], ['Senegal', 15],
              ['Seychelles', 5], ['Sierra Leone', 8], ['Somalia', 2],
              ['Sudan', 15], ['South Africa', 30], ['South Sudan', 5],
              ['Swaziland', 26], ['Tanzania', 6], ['Togo', 6], ['Tunisia', 34],
              ['Uganda', 1], ['Western Sahara', 25], ['Zambia', 15],["USA",100]])

          var options = {
            region: 'world', // Africa
            colorAxis: {colors: ['#fff','#e31b23']},
            backgroundColor: '#81d4fa',
            datalessRegionColor: '#fff',
            defaultColor: '#f5f5f5'
          };

           var chart = new window.google.visualization.GeoChart(document.getElementById('map'));
           chart.draw(data, options);
          };
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
        <div ref='map'  id='map' style ={{height:"auto",width:'100%'}}></div>
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
