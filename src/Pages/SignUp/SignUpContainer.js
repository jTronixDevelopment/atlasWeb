import { connect } from 'react-redux';
import SignIn from './SignUp';
import { changeAuthStatus } from './SignUpActions';

const mapStateToProps = state => ({ ...state.signIn });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
