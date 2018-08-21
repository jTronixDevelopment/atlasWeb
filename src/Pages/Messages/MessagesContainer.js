import { connect } from 'react-redux';
import Messages from './Messages';
import { changeAuthStatus } from './MessagesActions';

const mapStateToProps = state => ({ ...state.messages });


const mapDispatchToProps = dispatch => ({
  changeAuthStatus: status => dispatch(changeAuthStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages);
