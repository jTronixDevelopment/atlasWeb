import { connect } from 'react-redux';
import SignIn from './SignIn';
import {
  changeAuthStatus,
  showEmailError,
  showPasswordError,
} from './SignInActions';

const mapStateToProps = state => ({ ...state.signIn, ...state.app });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
  showEmailError: () => dispatch(showEmailError()),
  showPasswordError: () => dispatch(showPasswordError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
