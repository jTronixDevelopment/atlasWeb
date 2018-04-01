import React, { Component } from 'react';
import './footer.css';

class FooterIcon extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div className="footer-icon-container">dffdsa
        <div className="footer-item">
          <img src={ require(".././imgs/atlas.png") }></img>
        </div>
        <div className="footer-item">t</div>
        <div className="footer-item">t</div>
        <div className="footer-item">t</div>
      </div>
    );
  }
}

export default FooterIcon;
