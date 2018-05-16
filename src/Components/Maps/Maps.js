import React, { Component } from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
//=== Style ====================================================================
import './Maps'

export default class Maps extends Component{

  constructor(props){
    super(props)
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
      curPOS : { lat : 0, lng : 0 },
      isHidden : this.props.isHidden
    }
    console.log(this.props)
  }

  getUserCurrentLocation(){
    var setMap = (position)=>{
      this.setState({ curPOS : { lat: position.coords.latitude, lng: position.coords.longitude }})
    }
    navigator.geolocation.getCurrentPosition(setMap.bind(this),(error)=>{console.log(error)});
  }

  //=== Component Life Cycle ===================================================

  componentWillMount(){
    this.getUserCurrentLocation()
  }

  render(){

    const MyMapComponent = withGoogleMap((props) =>
      <GoogleMap defaultZoom={10} defaultCenter={{ lat: this.state.curPOS.lat, lng: this.state.curPOS.lng }} defaultOptions={{styles:this.mapStyle}}>
        { props.isMarkerShown && <Marker position={{ lat: this.state.curPOS.lat, lng:this.state.curPOS.lng }} />}
      </GoogleMap>
    )

    return(
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwojlX6Zlg8WX3RrJCijGPvHzDDciMoYk&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div id='mapContainer' style={{ height: `350px`, width:'100%', display:this.props.isHidden}} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
    )
  }
}
