import React, { Component } from 'react';
import './ViewProfile.css';

//=== Classes ==================================================================
import Storage from './../../Classes/Firebase/CloudStorage/CloudStorage';
import DB from './../../Classes/Firebase/Database/Database';

//=== Components ===============================================================
import UserInfo from './../../Components/ProfileComponents/UserInfo/UserInfo';
import GeoChart from './../../Components/Maps/GeoChart/GeoChart';
import Map from './../../Components/Maps/Map/Map';

//=== Classes ==================================================================
export default class ProfilePage extends Component {

  constructor(props){
    super(props);
    this.firebase = this.props.firebase
    this.storage = new Storage(this.props.firebase);
    this.db = new DB(this.props.firebase);
    this.state = {
      profileData : {
        bio : "Loading",
        profilePic : ""
      }
    }
    console.log(props)
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

  //=== Geochart Setup =============================================================

  //=== Component Lifecycle ========================================================

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <UserInfo profileData={ this.state.profileData } />
        <GeoChart />
        <Map/>
      </div>
    )
  }
}
