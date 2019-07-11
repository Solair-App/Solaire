import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './Form.css';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import Fab from '@material-ui/core/Fab';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      link: '',
      name: '',
      duree: '',
      description: '',
      error: '',
    };
  }

  componentDidMount() {
    const { location } = this.props;
    if (location.state && location.state.video) {
      const cours = location.state.video;
      this.setState({
        description: cours.description,
        duree: cours.duree,
        link: cours.link,
        name: cours.name,
        id: cours.link.substring(cours.link.lastIndexOf('=') + 1, cours.link.length),
      });
    }
  }

  recoveryId = (e) => {
    const { value } = e.target;
    this.setState({ link: value, id: value.substring(value.lastIndexOf('=') + 1, value.length) });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (e) => {
    const {
      link, duree, name, description,
    } = this.state;
    const { firestore, match } = this.props;
    const parcours = match.params.parcoursId;
    const cours = match.params.coursId;
    const db = firestore;
    if (this.isContentNull()) {
      this.setState({ error: 'Il manque des informations' });
    } else {
      const videoSet = db.collection('parcours').doc(parcours).collection('cours');
      const video = videoSet.doc(cours);
      video.set({
        link, duree, name, description, type: 'video', finish: true, creator: localStorage.getItem('userId'), graduate: [],
      }, { merge: true });
      e.preventDefault();

      const { history } = this.props;
      history.push(`/createparcours/${parcours}/addcours`);
    }
  }

  redirect = (url) => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  }

  isContentNull = () => {
    const {
      link, name, duree, description,
    } = this.state;
    if (link === '' || name === '' || duree === '' || description === '') {
      return true;
    }
    return false;
  };

  render() {
    const { history, match } = this.props;
    const parcours = match.params.parcoursId;
    const {
      id, name, description, duree, link, error,
    } = this.state;
    const { recoveryId, onChange } = this;
    const opts = {
      height: '200',
      width: '300',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        fs: 0,
      },
    };
    return (
      <>
        <div className="topFond">
          <ArrowBack
            style={{ position: 'fixed', left: '10px', top: '10px' }}
            onClick={() => {
              history.push(`/createparcours/${parcours}/addcours`);
            }}
          />
          <h1>Créer un cours vidéo</h1>
        </div>
        <form className="formFather">
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box style={{ marginTop: '9px%', width: '298px' }}>
              <TextField
                id="outlined-with-placeholder"
                label="Nom de la vidéo"
                required
                value={name}
                name="name"
                style={{ width: '100%' }}
                onChange={onChange}
                className="textfield"
              />
            </Box>
            <Box style={{ marginTop: '9px', width: '298px' }}>
              <TextField
                id="filled-multiline-flexible"
                label="Description"
                required
                multiline
                value={description}
                name="description"
                style={{ width: '100%' }}
                onChange={onChange}
                className="textfield"
              />
            </Box>
            <Box style={{ marginTop: '9px', width: '298px' }}>
              <TextField
                id="outlined-with-placeholder"
                label="Durée de la vidéo"
                value={duree}
                required
                name="duree"
                style={{ width: '100%' }}
                onChange={onChange}
                className="textfield"
              />
            </Box>
            <Box style={{ marginTop: '9px', width: '298px' }}>
              <TextField
                id="outlined-with-placeholder"
                label="Lien de la vidéo"
                required
                style={{ width: '100%' }}
                value={link}
                onChange={recoveryId}
                className="textfield"
              />
            </Box>
            <Box style={{ marginTop: '9px', width: '298px' }}>
              <div
                className="video"
                style={{ width: '100%' }}
              >
                {id.length === 11 ? (
                  <YouTube
                    videoId={id}
                    opts={opts}
                    /* eslint no-underscore-dangle: 0 */
                    onReady={this._onReady}
                  />
                ) : null}
              </div>
            </Box>
          </Box>
          <Box style={{ marginTop: '9px' }}>
            <Fab
              variant="extended"
              size="medium"
              aria-label="Add"
              onClick={this.onSubmit}
              style={{
                width: '300px',
                color: 'white',
                marginTop: '18px',
                borderRadius: '4px',
                backgroundColor: '#E15920',
              }}
            >
              <SaveIcon className="saveicon" />
              {' '}
              Enregistrer
            </Fab>
          </Box>
        </form>
        {error && <p style={{ margin: 'auto', paddingTop: '7px', width: '100%' }}>{error}</p>}
      </>
    );
  }
}

export default withRouter(withFirebaseContext(Form));
