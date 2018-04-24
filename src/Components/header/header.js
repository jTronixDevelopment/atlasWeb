import React, { Component } from 'react';
import './header.css';
import { AtlasIcon } from './../../imgs/icons';

export default class Header extends Component {
  render() {
    return (
      <div className='header-container text-center'>
        <b>Atlas</b>
        <img className='icon' alt='icon' src={ AtlasIcon }/>
      </div>
    );
  }
}
