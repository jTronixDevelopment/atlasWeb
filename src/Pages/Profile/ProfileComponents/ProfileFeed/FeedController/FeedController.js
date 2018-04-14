import React, { Component } from 'react';

import './feedcontroller.css';

import Comments from './../../../../../imgs/icons/comments.png';

export default class FeedController extends Component{
  render(){
    return(
      <ul className='flex-grid'>
        <li className='col'>
          <img className='feed-controller-icon' src={ Comments } />
        </li>
        <li className='col'>
          <img className='feed-controller-icon' src={ Comments } />
        </li>
        <li className='col'>
          <img className='feed-controller-icon' src={ Comments } />
        </li>
        <li className='col'>
          <img className='feed-controller-icon' src={ Comments } />
        </li>
      </ul>
    )
  }
}
