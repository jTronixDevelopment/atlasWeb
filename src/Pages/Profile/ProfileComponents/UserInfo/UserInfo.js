import React, { Component } from 'react'

import { Jumbotron } from 'reactstrap';

import './userinfo.css'

export default class App extends Component {
  render() {
    return (
        <Jumbotron fluid className='profile-jumbotron'>
          <div className='flex-container'>
            <img alt='profileIcon' className='profile-pic' src= { this.props.profileData.profilePic } />
            <div className='profile-bio'>
              <b>Bio</b>
              <p>{ `${this.props.profileData.firstName} ${this.props.profileData.lastName}` }</p>
              <b>About me</b>
              <p>{ this.props.profileData.bio }</p>
              <b>Hometown</b>
              <p>{ this.props.profileData.homeTown }</p>
            </div>
          </div>
        </Jumbotron>
    );
  }
}
