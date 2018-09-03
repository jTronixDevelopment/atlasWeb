import { connect } from 'react-redux';
import SignUp from './SignUp';
import {
  changeAuthStatus,
  showPasswordsNotEqual,
  showPasswordsEqual,
  showEmailError,
  showEmailSuccess,
  showPasswordIsStrong,
  showPasswordIsNotStrong,
} from './SignUpActions';

const mapStateToProps = state => ({ ...state.signUp, ...state.app });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
  showPasswordNotEqual: () => dispatch(showPasswordsNotEqual()),
  showPasswordEqual: () => dispatch(showPasswordsEqual()),
  showEmailError: () => dispatch(showEmailError()),
  showEmailSucess: () => dispatch(showEmailSuccess()),
  showPasswordIsStrong: () => dispatch(showPasswordIsStrong()),
  showPasswordIsNotStrong: () => dispatch(showPasswordIsNotStrong()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
