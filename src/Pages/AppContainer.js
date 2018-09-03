import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = state => ({
  ...state.app,
});


const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
