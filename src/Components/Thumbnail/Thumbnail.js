import React, { Component } from 'react';

import './Thumbnail.css'

export default class Thumbnail extends Component{
  render(){
    return(
      <div className='thumbnail-container'>
        <img alt='profilePic' className='thumbnail-image' src={ this.props.src }/>
      </div>
    )
  }
}
