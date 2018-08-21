import { connect } from 'react-redux';
import Title from './Title';
import ChangeTitle from './TileActions';

const mapStateToProps = (state, ownProps) => ({ ...state });

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeTitle: title => dispatch(ChangeTitle(title)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Title);
