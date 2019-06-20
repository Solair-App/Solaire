import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Button from '@material-ui/core/Button';
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
    console.log('hello');
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
    console.log(this.curentCours);
    firebase
      .firestore()
      .collection('parcours')
      .doc(this.parcours).collection('cours')
      .doc(this.curentcours)
      .set({
        graduate: firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem('userid'),
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
        <Button variant="outlined" onClick={this.connectDb}>
              cours terminé
        </Button>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Video));
