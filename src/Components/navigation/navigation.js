import React, { Component } from 'react';
import './Navigation.css';
//import FooterLink from './footerIcon.js';

import { Link } from 'react-router-dom';

import { SearchIcon, PersonIcon, GlobeIcon, EditBlackIcon, PassportIcon } from './../../imgs/icons.js';

export default class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = props;
  }

  render() {
    return (
      <div className="nav-container">
        <Link to='./people' className="nav-item">
          <img className='nav-img' src={ PersonIcon } alt='people'/>
        </Link>
        <Link to='./places' className="nav-item">
          <img className='nav-img' src={ GlobeIcon } alt='places'/>
        </Link>
        <Link to='./post' className="nav-item">
          <img className='nav-img' src={ EditBlackIcon } alt='post'/>
        </Link>
        <Link to='./search' className="nav-item">
          <img className='nav-img' src={SearchIcon} alt='search'/>
        </Link>
        <Link to='./profile' className="nav-item">
          <img className='nav-img' src={PassportIcon} alt='profile'/>
        </Link>
      </div>
    );
  }
}
