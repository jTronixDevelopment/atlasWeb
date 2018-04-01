import React, { Component } from 'react';
import './footer.css';
//import FooterLink from './footerIcon.js';

class Footer extends Component {
  constructor(props){
    super(props);
    this.state = props;
  }

  componentDidMount(){
    this.adjustWidthFooter()
  }

  adjustWidthFooter(){
    var height = document.getElementsByClassName('footer-item')[0].offsetHeight;
    var ar = document.getElementsByClassName('footer-item-icon');
    for(var i = 0; i<ar.length;i++){
      ar[i].style.fontSize = (height - 40) + 'px';
      ar[i].style.paddingTop = ((40/2)) + 'px';
    }
  }

  render() {
    return (
      <div className="footer-container test">
        <div onClick={()=>{this.props.changeView('Feed')}} className="footer-item">
          <span className='footer-item-icon glyphicon glyphicon-th-list'></span>
        </div>
        <div onClick={()=>{this.props.changeView('Places')}} className="footer-item">
          <span className='footer-item-icon glyphicon glyphicon-globe'></span>
        </div>
        <div onClick={()=>{this.props.changeView('Search')}} className="footer-item">
          <span className='footer-item-icon glyphicon glyphicon-search'></span>
        </div>
        <div onClick={()=>{this.props.changeView('Passport')}} className="footer-item">
          <span className='footer-item-icon glyphicon glyphicon-user'></span>
        </div>
      </div>
    );
  }
}

export default Footer;
