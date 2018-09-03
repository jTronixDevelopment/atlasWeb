import { connect } from 'react-redux';
import People from './People';
import { changeAuthStatus } from './PeopleActions';

const mapStateToProps = state => ({ ...state.people, ...state.app });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(People);
