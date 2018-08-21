import React, { Component } from 'react';

import { Button, Input } from 'reactstrap';

import DB from '../../Classes/Firebase/Database/Database';
import CloudStorage from '../../Classes/Firebase/CloudStorage/CloudStorage';

import './Settings.css';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    const { firebase } = this.props;
    this.db = new DB(firebase);
    this.storage = new CloudStorage(firebase);
    this.state = {
      profilePicChanged: false,
      bioChanged: false,
      hometownChanged: false,
      birthdayChanged: false,
    };
    this.saveProfileData = this.saveProfileData.bind(this);
    this.birthdayChanged = this.birthdayChanged.bind(this);
    this.hometownChanged = this.hometownChanged.bind(this);
    this.bioChanged = this.bioChanged.bind(this);
    this.photoChanged = this.photoChanged.bind(this);
  }

  componentDidMount() {
    this.profilePictureInput = document.getElementById('profilePictureInput');
    this.profilePicturePreview = document.getElementById('profilePicturePreview');
    this.editProfileBio = document.getElementById('editProfileBio');
    this.editProfileHomeTown = document.getElementById('editProfileHomeTown');
    this.editProfileBirthday = document.getElementById('editProfileBirthday');
  }

  getImageUrl() {
    this.storage.getProfilePic({
      successHandler: this.saveProfilePicURL.bind(this),
      docId: this.firebase.auth().currentUser.uid,
    });
  }

  getChangedProfileData() {
    const {
      bioChanged,
      birthdayChanged,
      hometownChanged,
    } = this.state;
    const dataObj = {};
    if (bioChanged) {
      dataObj.bio = this.editProfileBio.value;
    }
    if (birthdayChanged) {
      dataObj.birthday = this.editProfileBirthday.value;
    }
    if (hometownChanged) {
      dataObj.homeTown = this.editProfileHomeTown.value;
    }
    return dataObj;
  }

  photoChanged() {
    this.setState({ profilePicChanged: true });
    this.showImgPreview();
  }

  saveProfilePicURL(url) {
    this.db.edit({
      successHandler: (urlx) => { console.log(urlx); },
      errorHandler: () => { console.log('error'); },
      data: { profilePic: url },
      docId: this.firebase.auth().currentUser.uid,
      collection: 'users',
    });
  }


  changeProfilePicture(data) {
    this.storage.upload({
      file: this.profilePictureInput.files[0],
      path: `profilePics/${this.firebase.auth().currentUser.uid}`,
      data,
      successHandler: this.getImageUrl.bind(this),
      errorHandler: (err) => { console.log(err); },
    });
  }

  showImgPreview() {
    const input = document.getElementById('profilePictureInput');
    const profilePicturePreview = document.getElementById('profilePicturePreview');
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePicturePreview.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }

  saveProfileData() {
    const {
      profilePicChanged,
    } = this.state;
    this.db.edit({
      successHandler: profilePicChanged ? this.changeProfilePicture.bind(this) : () => { console.log('profile Data Changed'); },
      errorHandler: () => { console.log('error'); },
      data: this.getChangedProfileData(),
      docId: this.firebase.auth().currentUser.uid,
      collection: 'users',
    });
  }

  bioChanged() {
    this.setState({ bioChanged: true });
    console.log('bioChanged');
  }

  birthdayChanged() {
    this.setState({ birthdayChanged: true });
    console.log('BDAY CHANGED');
  }

  hometownChanged() {
    this.setState({ hometownChanged: true });
    console.log('hometownChanged');
  }

  render() {
    const {
      profileData,
    } = this.props;
    return (
      <div>
        <img id="profilePicturePreview" alt="profileComp" src={profileData.profilePic} />
        <div className="upload-btn-wrapper full-width">
          <Button type="button" block>Change Profile Picture</Button>
          <input id="profilePictureInput" type="file" onChange={this.photoChanged} />
        </div>
        <p>Bio</p>
        <textarea id="editProfileBio" placeholder={profileData.bio} onChange={this.bioChanged} />
        <p>Hometown</p>
        <Input id="editProfileHomeTown" placeholder={profileData.homeTown} onChange={this.hometownChanged} />
        <p>Birthday</p>
        <Input id="editProfileBirthday" placeholder={profileData.birthday} onChange={this.birthdayChanged} />
        <Button onClick={this.saveProfileData}>Save</Button>
      </div>
    );
  }
}
