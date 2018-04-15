import React, { Component } from 'react';
import './profile.css';

//=== Classes ==================================================================
import Storage from './../../Classes/Firebase/CloudStorage/CloudStorage';

//=== Components ===============================================================
import UserInfo from './ProfileComponents/UserInfo/UserInfo';
import ProfileFeed from './ProfileComponents/ProfileFeed/ProfileFeed';

//=== Classes ==================================================================
export default class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.firebase = this.props.firebase;
  }

  sendFile(){
    var photo = document.getElementById('photo').files[0];
    var ref = this.props.firebase.storage().ref('profilePics/test');
    ref.put(photo).then(()=>{
      console.log('Uploaded a blob or file!');
    })
  }

  render() {
    return (
      <div>
        <UserInfo/>
        <div className='profile-bio'>
          <h5>Bio</h5>
          I am so cool I love to eat poops all the time, This is my bio blah blah bla
        </div>
        <iframe className='profile-map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52797.17603966931!2d-118.61200586666747!3d34.20198572602608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c29c13d8d4bc85%3A0x99e61fc843e046d9!2sExpress+Smog+Test+Only!5e0!3m2!1sen!2sus!4v1523687272064"></iframe>
        <div className="upload-btn-wrapper">
          <button className="btn">Upload a file</button>
          <input id='photo' type="file" name="myfile" />
        </div>
      </div>
    );
  }
}
