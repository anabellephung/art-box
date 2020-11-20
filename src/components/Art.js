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
      bgColor: '',
      value: '',
      art: [],
      isNull: false,
      isLoading: false,
    };
  }

  getArt = userInput => {
    this.setState({
      isLoading: true
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

  handleMood(e) {
    const moodValue = e.target.value
    this.setState({
      mood: moodValue
    });

    const colorRef = {
      lofi: 'cadetblue',
      house: 'darkgoldenrod',
      acoustic: 'lightsalmon',
      love: 'darkslateblue',
      alternative: 'darkslategray',
      jazz: 'firebrick',
    }

    this.setState({
      bgColor: colorRef[moodValue]
    })
  }

  handleChange(e) {
    const searchValue = e.target.value;
    this.setState({
      value: searchValue
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const input = this.state.value
    this.getArt(input);
  }

  render() {
    const artPiece = this.state.art;
    const color = this.state.bgColor;
    const searchTerm = this.state.mood
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
            </div>
            <ResponsivePlayer
              genre={searchTerm}
              color={color}
            />
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
                      <h3>{artPiece.title}</h3>
                      <p>
                        {artPiece.artistDisplayName} {artPiece.objectDate}
                      </p>
                      <img src={artPiece.primaryImageSmall} alt={artPiece.title} />
                      <p>{artPiece.medium}</p>
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