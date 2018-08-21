import { connect } from 'react-redux';
import Profile from './Profile';
import { changeAuthStatus } from './ProfileActions';

const mapStateToProps = state => ({ ...state });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
