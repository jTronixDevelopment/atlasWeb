import React, { Component } from 'react';

import './Thumbnail.css'

export default class Thumbnail extends Component{
  render(){
    return(
      <div className='thumbnail-container text-center'>
        <p className='thumbnail-title text-center' >{ this.props.title }</p>
        <img className='thumbnail-image' src={ this.props.src }/>
      </div>
    )
  }
}
