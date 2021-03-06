import { connect } from 'react-redux';
import BoardIndex from './board_index';
import { fetchUserBoards } from '../../actions/board_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    boards: Object.values(state.entities.boards).filter(board => board.authorId == ownProps.match.params.id),
    pins: Object.values(state.entities.pins),
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserBoards: (authorId) => dispatch(fetchUserBoards(authorId)),
  openModal: (modal) => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal())
})


export default connect(mapStateToProps, mapDispatchToProps)(BoardIndex);
