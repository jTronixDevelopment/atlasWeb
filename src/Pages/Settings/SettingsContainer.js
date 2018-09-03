import { connect } from 'react-redux';
import Settings from './Settings';
import { changeAuthStatus } from './SettingsActions';

const mapStateToProps = state => ({ ...state.settings, ...state.app });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
