import { connect } from 'react-redux';
import Post from './Post';
import { changeAuthStatus } from './PostActions';

const mapStateToProps = state => ({ ...state.post, ...state.app });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
