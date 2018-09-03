import { connect } from 'react-redux';
import Places from './Places';
import { changeAuthStatus } from './PlacesActions';

const mapStateToProps = state => ({ ...state.places, ...state.app });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Places);
