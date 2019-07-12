import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import * as firebase from 'firebase';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';

class Video extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
    this.curentcours = match.params.coursId;
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

  connectDb = () => {
    const { history } = this.props;
    firebase
      .firestore()
      .collection('parcours')
      .doc(this.parcours).collection('cours')
      .doc(this.curentcours)
      .set({
        graduate: firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem('userId'),
        ),
      }, { merge: true });
    history.push(`/parcours/${this.parcours}`);
  };

  getInfo = () => {
    const { firestore } = this.props;

    const docRef = firestore.collection('parcours').doc(this.parcours).collection('cours').doc(this.currentcours);
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
    const opts = {
      height: 'auto',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };
    return (
      <div>
        <div className="topFond">
          <ArrowBack
            style={{ position: 'absolute', left: '9px', top: '13px' }}
            onClick={() => {
              history.push(`/parcours/${this.parcours}`);
            }}
          />
          {video && <h1>{video.name}</h1>}
        </div>
        <div className="fondDescription">
          {video && <p>{video.description}</p>}
        </div>
        <YouTube
          className="videoDiv"
          videoId={videoId}
          opts={opts}
          /* eslint no-underscore-dangle: 0 */
          onReady={this._onReady}
        />
        <div className="coursTerminé">
          <Fab
            variant="extended"
            size="medium"
            aria-label="Add"
            onClick={this.connectDb}
            style={{
              marginTop: '18px',
              color: 'white',
              backgroundColor: '#E15920',
            }}
          >
          Cours terminé
          </Fab>
        </div>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Video));
