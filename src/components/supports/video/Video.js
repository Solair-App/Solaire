import React, { Component } from 'react';
import YouTube from 'react-youtube';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';


class Video extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
    this.cours = match.params.coursId;
    if (localStorage.getItem('coursData')) {
      this.cours = JSON.parse(localStorage.getItem('coursData'));
      this.state = {
        video: this.cours,
        videoId: this.cours.link.substring(this.cours.link.lastIndexOf('=') + 1, this.cours.link.length),
      };
    } else {
      this.getInfo();
      this.state = {
        video: [],
        videoId: null,
      };
    }
  }

  getInfo = () => {
    const { firestore } = this.props;

    const docRef = firestore.collection('parcours').doc(this.parcours).collection('cours').doc(this.cours);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const video = doc.data();
        this.setState({
          video,
          videoId: video.link.substring(video.link.lastIndexOf('=') + 1, video.link.length),
        });
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  };

  redirect = (url) => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  }

  render() {
    const { video, videoId } = this.state;
    const { history } = this.props;
    console.log(video);
    const opts = {
      height: '260',
      width: '360',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    return (
      <div>
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            history.goBack();
          }}
        />
        {video
          && (
          <>
            <h1>{video.name}</h1>
            <p>{video.description}</p>
          </>
          )
        }
        <YouTube
          videoId={videoId}
          opts={opts}
          /* eslint no-underscore-dangle: 0 */
          onReady={this._onReady}
        />
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Video));
