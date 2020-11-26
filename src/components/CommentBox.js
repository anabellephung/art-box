import React from 'react';
import firebase from './firebase';
import swal from 'sweetalert';
class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      isMounted: false,
      thoughts: [],
      userInput: ''
    }
  }

  // firebase ref
  componentDidMount() {
    this.setState({
      isMounted: true
    })
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({ key: key, text: data[key] });
      }
      this.setState({
        thoughts: newState
      })
    })
  }

  // on click of 'add comment' button, display modal where user can then input comment(value)
  leaveComment() {
    swal("How did you enjoy your experience at Art Box:", {
      content: "input",
      button: 'SUBMIT'
    })
      .then((value) => {
        if (value === '') {
          swal(`Please enter a comment 😸!`)
        }
        else {
          this.setState({
            userInput: value
          })
          const dbRef = firebase.database().ref();
          dbRef.push(this.state.userInput);
          swal('Thanks for the comment!');
        }
      });
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    })
  }

  render() {
    return (
      <div className="commentBox">
        <p>Comment Box</p>
        <div className="savedThoughts">
          <button className="addComment" onClick={() => this.leaveComment()}>
            Leave A Comment!
          </button>
          <ul>
            {this.state.thoughts.map((thought) => {
              return (
                <li key={thought.key}>
                  <span className="fas fa-comment" aria-label="List style comment icon"></span>{thought.text}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default CommentBox; 