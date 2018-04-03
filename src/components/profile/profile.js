import React, { Component } from 'react'

import Map from './profilecomponents/map/map'
import UserInfo from './profilecomponents/userinfo/userinfo'

export default class App extends Component {

  componentDidMount(){
    fetch("https://randomuser.me/api/")
    .then(res => res.json())
    .then((data)=>{
      console.log(data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  render() {
    return (
      <div>
        <UserInfo/>
        <Map/>
      </div>
    );
  }
}
