import { connect } from 'react-redux';
import ViewProfile from './ViewProfile';
import { changeAuthStatus } from './ViewProfileActions';

const mapStateToProps = state => ({ ...state.viewprofile });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewProfile);
