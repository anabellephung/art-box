import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-scroll';
import MoodSelection from './MoodSelection.js';
import SearchBar from './SearchBar.js'
import CommentBox from './CommentBox.js';
import ResponsivePlayer from './ResponsivePlayer.js';

class Art extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: '',
      noMood: true,
      bgColor: '',
      value: '',
      art: [],
      isNull: false,
      isLoading: false,
    };
  }

  // axios call for art gallery search
  getArt = userInput => {
    this.setState({
      isLoading: true,
      art: []
    })
    const searchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=" + userInput;
    axios
      .get(searchUrl)
      .then(res => {
        const artIds = res.data['objectIDs']
        if (artIds === null) {
          this.setState({
            isNull: true,
            isLoading: false
          })
        }
        else {
          // display one random piece of art from list of art that correlates with user input value
          const randomArtId = artIds[Math.floor(Math.random() * artIds.length)];
          const requestUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + randomArtId;
          return axios.get(requestUrl)
        }
      })
      .then(res => {
        const artInfo = res.data;
        this.setState({
          art: artInfo,
          isNull: false,
          isLoading: false
        })
      })
      // error handling for art gallery search axios call
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          swal({
            title: "404 Error",
            text: "Art could not be located at this time.",
            icon: "error",
            button: "OK",
          });
        } else if (err.request) {
          // client never received a response, or request never left
          swal({
            title: "Network Error",
            text: "Please try again",
            icon: "error",
            button: "OK",
          });
        } else {
          // anything else
          swal({
            title: "Error",
            text: "Please try again",
            icon: "error",
            button: "OK",
          });
        }
      })
  }

  // handles mood selection in correlation to theme of 'art box' (music genre, background color)
  handleMood(e) {
    const moodValue = e.target.value
    this.setState({
      mood: moodValue,
      noMood: false
    });

    const colorRef = {
      lofi: 'cadetblue',
      house: 'darkgoldenrod',
      acoustic: 'salmon',
      love: 'darkslateblue',
      alternative: 'darkslategray',
      jazz: 'firebrick',
    }

    this.setState({
      bgColor: colorRef[moodValue]
    })
  }

  // art gallery search input value - value change
  handleChange(e) {
    const searchValue = e.target.value;
    this.setState({
      value: searchValue
    });
  }

  // art gallery search input value - value submit
  handleSubmit(e) {
    e.preventDefault();
    const input = this.state.value
    this.getArt(input);
  }

  render() {
    const artPiece = this.state.art;
    const color = this.state.bgColor;
    const searchTerm = this.state.mood;
    const comment = this.state.comment;
    return (
      <>
      <main>
        <section className="moodSelection" id="mood">
          <MoodSelection 
            mood={this.state.mood} 
            handleMood={(e) => this.handleMood(e)}
            />
        </section>
        <section className="art" id="art" style = {{backgroundColor: color}}>
          <div className="wrapper">
            <div className="headingContainer">
                <Link activeClass="active" to="mood" spy={true} smooth={true} duration={1000}>
                  <button className="changeMood">
                    Change Mood <span className="fas fa-level-up-alt" aria-label="Scroll up to change mood"></span>
                  </button>
                </Link>
              <h2>Art Box</h2>
              <p>{comment}</p>
            </div>
            {this.state.noMood ?
              ( 
                // if no mood is chosen, responsive player will not display
                <p className="noMoodMsg">Select a mood above to curate a theme!</p>
              )
              :
              (
                <ResponsivePlayer
                  genre={searchTerm}
                  color={color}
                />
              )
            }
            <div className="container">
              <div className="artBox">
                <SearchBar 
                  value={this.state.value}
                  handleSubmit={(e) => this.handleSubmit(e)}
                  handleChange={(e) => this.handleChange(e)}
                />
                {this.state.isLoading ?
                  (
                    <div className="artSpinnerBox">
                      <span
                        className="fa fa-spinner fa-spin fa-3x fa-fw artSpinner"
                        aria-label="loading..."
                        role="img"
                      ></span>
                    </div>
                  )
                  :
                  null
                }
                {this.state.isNull ?
                  (
                    <div className="artContainer">
                      <div className="artBgImg"></div>
                      <p className="errMsg">No art was found. Please try again.</p>
                      <span
                        className="errImg"
                        role="img"
                        aria-label="photo in frame for stylistic reasons"
                      >
                        🖼️
                  </span>
                    </div>
                  )
                  :
                  (
                    <div className="artContainer">
                      <div className="artBgImg"></div>
                      <div className="pieceBox">
                        <div className="mat">
                            <img src={artPiece.primaryImageSmall} alt={artPiece.title} />
                        </div>
                        {/* <img src={artPiece.primaryImageSmall} alt={artPiece.title}/> */}
                      </div>
                      <div className="artTextBox">
                        <h3>{artPiece.title}</h3>
                        <p className="artistName">{artPiece.artistDisplayName}</p>
                        <time className="pieceDate">{artPiece.objectDate}</time>
                        <p className="pieceMedium">{artPiece.medium}</p>
                      </div>
                    </div>
                  )
                }
              </div>
              <CommentBox />
            </div>
          </div>
        </section>
      </main>
      </>
    );
  }
}
export default Art; 