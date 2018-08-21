import React from 'react';
import PropType from 'prop-types';

import './Thumbnail.css';

export default (props) => {
  const { src } = props;
  return (
    <div className="thumbnail-container">
      <img alt="profilePic" className="thumbnail-image" src={src} />
    </div>
  );
};
