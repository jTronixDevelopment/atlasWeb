import React, { Component } from 'react';

import Thumbnail from './../../Components/Thumbnail/Thumbnail'

//=== Style ====================================================================
import './PersonItem.css'

export default class PersonItem extends Component{

  showProfile(){
    console.log(this.props.user)
  }

  //=== Component Life Cycle ===================================================

  componentWillMount(){}

  componentDidMount(){}

  render(){
    return(
        <div className='flex-container flex-center flex-left' onClick={this.showProfile.bind(this)}>
          <Thumbnail src={ this.props.userInfo.profilePic }/>
          <div>
            { `${this.props.userInfo.firstName} , ${this.props.userInfo.lastName} / ${ this.props.userInfo.homeTown }`}
          </div>
        </div>
    )
  }
}
