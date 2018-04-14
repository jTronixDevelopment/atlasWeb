import React, { Component } from 'react';
import './style.css';
//import FooterLink from './footerIcon.js';

import { Link } from 'react-router-dom';

import { SearchIcon, MessageIcon, FeedIcon, PersonIcon } from './../../imgs/icons.js';

export default class Footer extends Component {
  constructor(props){
    super(props);
    this.state = props;
  }

  render() {
    return (
      <div className="nav-container">
        <Link to='./places' className="nav-item">
          <img className='nav-img' src={FeedIcon} alt='places'/>
        </Link>
        <Link to='./profile' className="nav-item">
          <img className='nav-img' src={PersonIcon} alt='profile'/>
        </Link>
        <Link to='./messages' className="nav-item">
          <img className='nav-img' src={MessageIcon} alt='messages'/>
        </Link>
        <Link to='./search' className="nav-item">
          <img className='nav-img' src={SearchIcon} alt='search'/>
        </Link>
      </div>
    );
  }
}
