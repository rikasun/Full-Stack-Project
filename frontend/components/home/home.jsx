import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import BounceLoading from '../spinner';
import Modal from "react-modal";

const statusStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1001"
  }
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      board:{
        boardName: ''
      },
      boardId: 1, 
      loading: true, 
      modalIsOpen: false };
      setTimeout(() => this.setState({ loading: false }), 2000);
    this.handleBoardSubmit = this.handleBoardSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllPins();
    this.props.fetchUserBoards(this.props.currentuserId);
  }

  componentDidUpdate(){

  }

  handleSelect(e) {
    if (e.target.value === "Add new board...") {
   
      this.openModal();
      // this.setState({
      //   board: Object.assign({}, this.state.board,{
      //     ['boardName']: 'choosing'
      //   })
      // })
    } else {
      // this.setState({
      // board: Object.assign({}, this.state.board, {
      //   ['boardName']: e.target.value
      //  })
      // })
    }  
  }

  handleBoardSubmit(e){
    // e.preventDefault();
    let board = {};
    board.board_name = this.state.board.boardName;
    this.props.createBoard(board);
  }
  
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    // if (this.state.board.boardName === "choosing") {
    //   this.setState({
    //     board: Object.assign({}, this.state.board, {
    //       ["boardName"]: ""
    //     })
    //   });
    // }

    this.setState({ modalIsOpen: false });
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  renderItems() {

    let pins = this.props.pins.map(pin => (
      <div className="gallery-item">
        {/* <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Success Modal"
          style={statusStyle}
        >
          <div id="create-board-modal">
            <h3>Create a new board</h3>
            <form onSubmit={this.handleBoardSubmit}>
              <label>
                <div className="board-form-name">
                  <p>Name</p>
                  <input
                    type="text"
                    required
                    onChange={this.handleBoardSubmit('boardName')}
                  />
                </div>
              </label>
              <button className="create-button">Create</button>
            </form>
          </div>
        </Modal> */}
        <div className="save-selector">
          
          <select
            className="dropdown-selector"
            onChange={this.update("boardId")}
          >
            <option
              value=""
              selected={this.state.boardId ? "selected" : ""}
              disabled
            >
              Please select
            </option>
            <option selected="" onClick={this.openModal}>Add new board...</option>

            

            {this.props.boards.map((board, idx) => (
              <option key={idx} value={board.id}>
                {board.boardName}
              </option>
            ))}
          </select>

          <button
            onClick={() => this.props.addPinToBoard(this.state.boardId, pin.id)}
            className="save-button"
          >
            Save
          </button>
        </div>

        <img className="pin-photo" src={pin.photoUrl} />
        
      </div>
    ));

    return pins;
  }

  render() {
    // let masonryOptions = {
    //   transitionDuration: 0,
    //   gutter: 20
    // };

    if (this.state.loading) {
      return <BounceLoading state={this.state} />;
    }
    return (
      <div className="pin-display">
        <Masonry
          breakpointCols={4}
          className={"my-gallery-class-home"}
          columnClassName={"gallery-column"}
        >
          {this.renderItems()}
        </Masonry>
      </div>
    );
  }
}

export default withRouter(Home);
