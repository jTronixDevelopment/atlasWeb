import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';

import DB from '../../../../Classes/Firebase/Database/Database';
import CloudStorage from '../../../../Classes/Firebase/CloudStorage/CloudStorage';

import './EditProfile.css';

export default class ProfileFeed extends Component {
  constructor(props) {
    super(props);
    const { firebase } = this.props;
    console.log(firebase);
    this.db = new DB(firebase);
    this.storage = new CloudStorage(firebase);
    this.state = {
      bioChanged: false,
      hometownChanged: false,
      birthdayChanged: false,
    };
    this.saveProfileData = this.saveProfileData.bind(this);
    this.hometownChanged = this.hometownChanged.bind(this);
    this.birthdayChanged = this.birthdayChanged.bind(this);
    this.bioChanged = this.bioChanged.bind(this);
    this.photoChanged = this.photoChanged.bind(this);
  }

  getImageUrl() {
    const {
      firebase,
    } = this.props;
    this.storage.getProfilePic({
      successHandler: this.saveProfilePicURL.bind(this),
      docId: firebase.auth().currentUser.uid,
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
    console.log('Profile Data to be saved ', dataObj);
    return dataObj;
  }

  photoChanged() {
    // this.setState({ profilePicChanged: true });
    this.showImgPreview();
  }

  saveProfilePicURL(url) {
    const {
      firebase,
    } = this.props;
    this.db.edit({
      successHandler: () => { console.log(url); },
      errorHandler: () => { console.log('error'); },
      data: { profilePic: url },
      docId: firebase.auth().currentUser.uid,
      collection: 'users',
    });
  }

  changeProfilePicture(data) {
    const {
      firebase,
    } = this.props;
    this.storage.upload({
      file: this.profilePictureInput.files[0],
      path: `profilePics/${firebase.auth().currentUser.uid}`,
      data,
      successHandler: this.getImageUrl.bind(this),
      errorHandler: (err) => { console.log(err); },
    });
  }

  showImgPreview() {
    console.log(this);
    // const input = document.getElementById('profilePictureInput');
    // const profilePicturePreview = document.getElementById('profilePicturePreview');
    // const reader = new FileReader();
    // reader.onload = function (e) {
    //   profilePicturePreview.src = e.target.result;
    // };
    // reader.readAsDataURL(input.files[0]);
  }

  saveProfileData() {
    const {
      firebase,
      profilePicChanged,
    } = this.props;
    this.db.edit({
      successHandler: profilePicChanged ? this.changeProfilePicture.bind(this) : () => { console.log('profile Data Changed'); },
      errorHandler: () => { console.log('error'); },
      data: this.getChangedProfileData(),
      docId: firebase.auth().currentUser.uid,
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

  //= == Component Life Cycle ===================================================

  render() {
    const {
      profileData
    } = this.props;
    const {
      bio,
      homeTown,
      birthday,
      profilePic,
    } = profileData;
    return (
      <div>
        <img id="profilePicturePreview" alt="profileComp" src={profilePic} />
        <div className="upload-btn-wrapper full-width">
          <Button block>Change Profile Picture</Button>
          <input id="profilePictureInput" type="file" onChange={this.photoChanged} />
        </div>
        <p>Bio</p>
        <textarea id="editProfileBio" placeholder={bio} onChange={this.bioChanged} />
        <p>Hometown</p>
        <Input id="editProfileHomeTown" placeholder={homeTown} onChange={this.hometownChanged} />
        <p>Birthday</p>
        <Input id="editProfileBirthday" placeholder={birthday} onChange={this.birthdayChanged} />
        <Button onClick={this.saveProfileData}>Save</Button>
      </div>
    );
  }
}


ProfileFeed.propTypes = {
  firebase: PropTypes.string.isRequired,
  profilePicChanged: PropTypes.bool.isRequired,
};
