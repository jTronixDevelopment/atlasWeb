import React, { Component } from 'react';

import { SettingsIcon, PostIcon } from './../../../../imgs/icons';

//=== Component ================================================================
import ModalComponent from '../../../../Components/Modal/Modal';
import PostWidget from '../../../../Components/PostWidget/PostWidget';
import EditProfile from './../EditProfile/EditProfile';

//=== Styling ==================================================================
import './ProfileControl.css';

export default class ProfileControl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      modalBody: <PostWidget ref={this.test} firebase={this.props.firebase}/>,
      modalTitle: 'Post'
    };
    this.test = React.createRef()
  }

  toggleModal(){
    this.setState({ modalShown: !this.state.modalShown })
  }

  showPostComponent(){
    this.setState({
      modalShown: true,
      modalBody: <PostWidget firebase={this.props.firebase} profileData={this.props.profileData}/>,
      modalTitle: "Post"
    })
  }

  showEditComponent(){
    this.setState({
      modalShown: true,
      modalBody: <EditProfile ref={this.test} firebase={this.props.firebase} profileData={this.props.profileData}/>,
      modalTitle: "Edit Profile"
    })
  }

  //=== Component Lifecycle ====================================================

  componentDidMount(){
  }

  componentWillMount(){

  }

  render(){
    return (
      <div>
        <ModalComponent
          ref={ this.test }
          modalShown ={ this.state.modalShown }
          modalBody={ this.state.modalBody }
          modalTitle={ this.state.modalTitle }
          reset={ this.toggleModal.bind(this) }
        />
        <ul className="flex-container profile-control-container" >
          <li className="flex-item profile-control-item" onClick={this.showPostComponent.bind(this)}>
            <p className='clear-style'>Post New</p>
            <img alt='postItem' src={ PostIcon } className='profile-control-icon'/>
          </li>
          <li className="flex-item profile-control-item" onClick={this.showEditComponent.bind(this)}>
            <p className='clear-style'>Edit Profile</p>
            <img alt='edit' src={ SettingsIcon } className='profile-control-icon'/>
          </li>
        </ul>
      </div>
    )
  }
}
