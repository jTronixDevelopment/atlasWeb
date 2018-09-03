import { connect } from 'react-redux';
import Search from './Search';
import { changeAuthStatus } from './SearchActions';

const mapStateToProps = state => ({ ...state.search, ...state.app });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
