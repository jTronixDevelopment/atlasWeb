import React, { Component } from 'react';

import Thumbnail from './../../Components/Thumbnail/Thumbnail'
import {Redirect} from 'react-router-dom'

//=== Style ====================================================================
import './PersonItem.css'

const SearchView = (props)=>{
  let { profilePic, lastName, firstName , homeTown } = {...props.userInfo.userInfo}
  return(
    <div>
      <Thumbnail src={ profilePic }/>
      <div>
        { `${firstName} , ${lastName} / ${homeTown }`}
      </div>
    </div>
  )
}

const RedirectView = (props)=>{
  return (
    <Redirect
      to={{
        pathname: "/viewprofile",
        state: { from: props }
      }}
    />
  )
}

export default class PersonItem extends Component{

  constructor(props){
    super(props);
    this.state = {
      componentInView: <SearchView userInfo={this.props}/>
    }

  }
  showProfile(){
    console.log('in')
    this.setState({
      componentInView: <RedirectView props={this.props}/>
    })
  }

  //=== Component Life Cycle ===================================================

  componentWillMount(){}

  componentDidMount(){}

  render(){
    return(
        <div className='flex-container flex-center flex-left search-person-item' onClick={this.showProfile.bind(this)}>
          {this.state.componentInView}
        </div>
    )
  }
}
