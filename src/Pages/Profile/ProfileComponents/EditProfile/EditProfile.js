import React, { Component } from 'react';

import { Button, Input } from 'reactstrap';

import DB from '../../../../Classes/Firebase/Database/Database';
import CloudStorage from '../../../../Classes/Firebase/CloudStorage/CloudStorage';

import './EditProfile.css'
export default class ProfileFeed extends Component{

  constructor(props){
    super(props);
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
    var input = document.getElementById('editProfilePictureInput');
    var profilePicturePreview = document.getElementById('editProfilePicture');
    var reader = new FileReader();
    reader.onload = function (e) {
      profilePicturePreview.src = e.target.result
    }
    reader.readAsDataURL(input.files[0]);
  }

  saveProfileData(){
    let changedData = this.getChangedProfileData.bind(this);

  }

  getChangedProfileData(){
    
  }

  //=== Component Life Cycle ===================================================

  render(){
    return(
        <div>
          <img id='editProfilePicture' alt='profileComp' src={this.props.profileData.profilePic}/>
          <div className='upload-btn-wrapper full-width'>
            <Button block>Change Profile Picture</Button>
            <input id="editProfilePictureInput" type='file' onChange={ this.showImgPreview.bind(this) }/>
          </div>
            <p>Bio</p>
            <textarea id='editProfileBio' placeholder={this.props.profileData.bio}/>
            <p>Hometown</p>
            <Input id='editProfileHomeTown' placeholder={this.props.profileData.homeTown}/>
            <p>Birthday</p>
            <Input id='editProfileBirthday'placeholder={this.props.profileData.birthday}/>
            <Button onClick={this.saveProfileData.bind(this)}>Save</Button>
        </div>
    )
  }
}
