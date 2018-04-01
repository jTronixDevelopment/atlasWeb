import React, { Component } from 'react'

import Map from './profilecomponents/map/map'
import UserInfo from './profilecomponents/userinfo/userinfo'

import { Container , Button, Input , Card, CardBody} from 'reactstrap';

class App extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div>
        <UserInfo/>
        <Map/>
      </div>
    );
  }ac
}

export default App;
