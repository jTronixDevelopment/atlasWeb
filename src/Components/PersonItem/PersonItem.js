import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Thumbnail from '../Thumbnail/Thumbnail';

// === Style ====================================================================
import './PersonItem.css';

const SearchView = (props) => {
  const {
    profilePic,
    lastName,
    firstName,
    homeTown,
  } = { ...props.userInfo.userInfo };
  return (
    <div>
      <Thumbnail src={profilePic} />
      <div>
        { `${firstName} , ${lastName} / ${homeTown}`}
      </div>
    </div>
  );
};

const RedirectView = props => (
  <Redirect
    to={{
      pathname: '/viewprofile',
      state: { from: props },
    }}
  />
);

export default class PersonItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentInView: <SearchView userInfo={this.props} />,
    };
  }

  showProfile() {
    this.setState({
      componentInView: <RedirectView props={this.props} />,
    });
  }

  render() {
    return (
      <div className="flex-container flex-center flex-left search-person-item" onClick={this.showProfile.bind(this)}>
        {this.state.componentInView}
      </div>
    );
  }
}
