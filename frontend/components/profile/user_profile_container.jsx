import { connect } from 'react-redux';
import UserProfile from './user_profile';
import { requestUser } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.match.params.id]
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: (id) => dispatch(requestUser(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
