import React, { Component } from 'react';
import './style.css';
//import FooterLink from './footerIcon.js';

import { Link } from 'react-router-dom';

import FeedIcon from './../icons/feed.png';
import PersonIcon from './../icons/person.png';
import MessageIcon from './../icons/message.png';
import SearcIcon from './../icons/search.png';

class Footer extends Component {
  constructor(props){
    super(props);
    this.state = props;
  }

  componentDidMount(){
  }

  render() {
    return (
      <div className="nav-container">
        <Link to='./places' className="nav-item">
          <img className='nav-img' src={FeedIcon} alt='places'/>
        </Link>
        <Link to='./' className="nav-item">
          <img className='nav-img' src={MessageIcon} alt='messages'/>
        </Link>
        <Link to='./search' className="nav-item">
          <img className='nav-img' src={SearcIcon} alt='search'/>
        </Link>
        <Link to='./profile' className="nav-item">
          <img className='nav-img' src={PersonIcon} alt='profile'/>
        </Link>
      </div>
    );
  }
}

export default Footer;
