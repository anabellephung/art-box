import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player/lazy';
import Slider from 'react-slick';
import swal from 'sweetalert';

class ResponsivePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoIds: [],
      isLoading: false,
    }
  }

  handleMusic() {
    this.setState({
      isLoading: true
    })
    const genre = this.props.genre + 'music'
    const apiKey = "AIzaSyCfWCfywMHZBriuwHhiOX-YxOWSgHWgZL8";
    const requestUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${genre}type=video&key=${apiKey}`
    console.log(requestUrl);
    axios.get(requestUrl).then((response) => {
      const videoList = response.data['items']
      this.setState({
        videoIds: videoList,
        isLoading: false
      })
    })
    .catch(err => {
      if (err.response) {
        // client received an error response (5xx, 4xx)
        swal({
          title: "404 Error",
          text: "Music could not be located at this time.",
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

  render() {
    const genre = this.props.genre
    const color = this.props.color
    const videos = this.state.videoIds
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <>
        <div className="musicPlayer">
          <div className="musicBgImg"></div>
          <span>
            <p>Set the mood:</p>
            <button value={genre} onClick={() =>this.handleMusic()} style={{ backgroundColor: color }}>
              <span className="fas fa-play" aria-label="press play to list videos"></span>
            </button>
          </span>
          <div className="videoList">
            <div className="player-wrapper">
              <Slider {...settings}>
                {this.state.isLoading ?
                  (
                    <div className="musicSpinnerBox">
                      <span
                        className="fa fa-spinner fa-spin fa-3x fa-fw musicSpinner"
                        aria-label="loading..."
                        role="img"
                      ></span>
                    </div>
                  )
                  :
                  (
                    videos.map(video => (
                      <ReactPlayer
                        key={video.id.videoId}
                        className="react-player"
                        url={`https://www.youtube.com/watch?v=` + video.id.videoId}
                        onPlay={() => this.setState({ showSpinner: false })}
                        onBuffer={() => this.setState({ showSpinner: true })}
                        width="100%"
                        height="230px"
                      />
                    ))
                  )
                }
              </Slider>
            </div>
          </div>
        </div>  
      </>
    );
  }
}
export default ResponsivePlayer; 