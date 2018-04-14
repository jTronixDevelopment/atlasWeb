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
        <ProfileFeed/>
        <div className="upload-btn-wrapper">
          <button className="btn">Upload a file</button>
          <input id='photo' type="file" name="myfile" />
        </div>
        <button onClick={ this.sendFile.bind(this) } className='btn'>Save</button>
      </div>
    );
  }
}
