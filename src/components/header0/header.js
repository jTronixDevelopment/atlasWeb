import React, { Component } from 'react';
import './header.css';
import img from './atlasLogo.png';
class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <img id='logo' alt='logo' src={img}/>
      </div>
    );
  }
}

export default Header;
