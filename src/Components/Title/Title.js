import React from 'react';
import PropTypes from 'prop-types';

const Title = (props) => {
  const changeTitle = () => {
    props.changeTitle(document.getElementById('test').value);
  };
  const {
    title,
  } = props;
  console.log(props)
  return (
    <div>
      <h1>{title}</h1>
      <input id="test" />
      <button type="button" onClick={changeTitle}>Click</button>
    </div>
  );
};

// Title.propTypes = {
//   title: PropTypes.string.isRequired,
//   changeTitle: PropTypes.func.isRequired,
// };

export default Title;
