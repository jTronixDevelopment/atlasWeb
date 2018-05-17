import React, { Component } from 'react';

import { Button, Input } from 'reactstrap';

import DB from '../../../../Classes/Firebase/Database/Database';
import CloudStorage from '../../../../Classes/Firebase/CloudStorage/CloudStorage';

import './EditProfile.css'
export default class ProfileFeed extends Component{

  constructor(props){
    super(props);
    console.log(this.props.firebase)
    this.db = new DB(this.props.firebase);
    this.storage = new CloudStorage(this.props.firebase);
    this.state = {
      profilePicChanged: false,
      bioChanged: false,
      nameChanged: false,
      hometownChanged: false,
      birthdayChanged: false
    }
  }

  showImgPreview(){
    var input = document.getElementById('profilePictureInput');
    var profilePicturePreview = document.getElementById('profilePicturePreview');
    var reader = new FileReader();
    reader.onload = function (e) {
      profilePicturePreview.src = e.target.result
    }
    reader.readAsDataURL(input.files[0]);
  }

  saveProfileData(){
    this.db.edit({
      successHandler : this.state.profilePicChanged?this.changeProfilePicture.bind(this):()=>{console.log("profile Data Changed")},
      errorHandler : ()=>{ console.log('error') },
      data : this.getChangedProfileData(),
      docId : this.props.firebase.auth().currentUser.uid,
      collection: 'users'
    })
  }

  changeProfilePicture(data){
    this.storage.upload({
      file: this.profilePictureInput.files[0],
      path: 'profilePics/' +  this.props.firebase.auth().currentUser.uid,
      data: data,
      successHandler : this.getImageUrl.bind(this),
      errorHandler: (err)=>{console.log(err)}
    })
  }

  getImageUrl(){
    this.storage.getProfilePic({
      successHandler : this.saveProfilePicURL.bind(this),
      docId : this.props.firebase.auth().currentUser.uid
    })
  }

  saveProfilePicURL(url){
    console.log(url)
    this.db.edit({
      successHandler :(url)=>{console.log(url)},
      errorHandler : ()=>{ console.log('error') },
      data : { profilePic : url },
      docId : this.props.firebase.auth().currentUser.uid,
      collection: 'users'
    })
  }

  photoChanged(){
    this.setState({profilePicChanged : true})
    this.showImgPreview()
  }

  getChangedProfileData(){
    var dataObj = {}
    if(this.state.bioChanged){
      dataObj.bio = this.editProfileBio.value
    }
    if(this.state.birthdayChanged){
      dataObj.birthday = this.editProfileBirthday.value
    }
    if(this.state.hometownChanged){
      dataObj.homeTown = this.editProfileHomeTown.value
    }
    console.log("Profile Data to be saved ", dataObj)
    return dataObj
  }

  bioChanged(){
    this.setState({ bioChanged: true })
    console.log("bioChanged")
  }

  birthdayChanged(){
    this.setState({ birthdayChanged: true })
    console.log("BDAY CHANGED");
  }

  hometownChanged(){
    this.setState({ hometownChanged: true })
    console.log('hometownChanged')
  }

  //=== Component Life Cycle ===================================================

  componentDidMount(){
    this.profilePictureInput = document.getElementById('profilePictureInput');
    this.profilePicturePreview = document.getElementById('profilePicturePreview');
    this.editProfileBio = document.getElementById('editProfileBio');
    this.editProfileHomeTown = document.getElementById('editProfileHomeTown');
    this.editProfileBirthday = document.getElementById('editProfileBirthday');
  }

  render(){
    return(
        <div>
          <img id='profilePicturePreview' alt='profileComp' src={this.props.profileData.profilePic}/>
          <div className='upload-btn-wrapper full-width'>
            <Button block>Change Profile Picture</Button>
            <input id="profilePictureInput" type='file' onChange={ this.photoChanged.bind(this) }/>
          </div>
            <p>Bio</p>
            <textarea id='editProfileBio' placeholder={this.props.profileData.bio} onChange={ this.bioChanged.bind(this) }/>
            <p>Hometown</p>
            <Input id='editProfileHomeTown' placeholder={this.props.profileData.homeTown} onChange={ this.hometownChanged.bind(this) } />
            <p>Birthday</p>
            <Input id='editProfileBirthday'placeholder={this.props.profileData.birthday} onChange={ this.birthdayChanged.bind(this)}/>
            <Button onClick={this.saveProfileData.bind(this)}>Save</Button>
        </div>
    )
  }
}
