 
import React, { Component } from 'react';
import './Header.css';
import { withRouter } from 'react-router-dom';
import { AtlasIcon, SettingsIcon, MessageIcon } from '../../imgs/icons';

// this also works with react-router-native

const Settings = withRouter(({ history }) => (
  <div className="flex-header-item flex-left" onClick={ () => { history.push('/settings') }}>
    <img className="icon" alt="icon" src={SettingsIcon} />
  </div>
));

export default class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className='header-container text-center flex-header'>
        <div className='flex-header-item flex-left'>
         <img className='icon' alt='icon' src={ MessageIcon } />
        </div>
        <div className='flex-header-item flex-center'>
          <img className='icon' alt='icon' src={ AtlasIcon } />
        </div>
        <Settings />
      </div>
    );
  }
}
