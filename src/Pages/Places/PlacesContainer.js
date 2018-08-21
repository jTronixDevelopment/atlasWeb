import { connect } from 'react-redux';
import Places from './Places';
import { changeAuthStatus } from './PlacesActions';

const mapStateToProps = state => ({ ...state.places });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Places);
