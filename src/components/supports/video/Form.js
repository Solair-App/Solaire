import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './Form.css';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';

const textStyles = theme => ({
  textField: {
    marginTop: theme.spacing(2),
    width: '250px',
  },
});

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      link: '',
      name: '',
      duree: '',
      description: '',

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
    const videoSet = db.collection('parcours').doc(parcours).collection('cours');
    const video = videoSet.doc(cours);
    video.set({
      link, duree, name, description, type: 'video', finish: true, creator: localStorage.getItem('userId'),
    }, { merge: true });
    e.preventDefault();

    const { history } = this.props;
    history.push(`/createparcours/${parcours}/addcours`);
  }

  redirect = (url) => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  }

  render() {
    const { classes, history } = this.props;
    const {
      id, name, description, duree, link,
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
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            history.goBack();
          }}
        />
        <form className="formFather">
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <h1 className="formH1">Créer un cours vidéo</h1>
            <Box>
              <TextField
                id="outlined-with-placeholder"
                label="Nom de la vidéo"
                value={name}
                name="name"
                onChange={onChange}
                variant="outlined"
                className={classes.textField}
              />
            </Box>
            <Box>
              <TextField
                id="outlined-textarea"
                label="Description de la vidéo"
                multiline
                value={description}
                name="description"
                onChange={onChange}
                variant="outlined"
                className={classes.textField}
              />
            </Box>
            <Box>
              <TextField
                id="outlined-with-placeholder"
                label="Durée de la vidéo"
                variant="outlined"
                value={duree}
                name="duree"
                onChange={onChange}
                className={classes.textField}
              />
            </Box>
            <Box>
              <TextField
                id="outlined-with-placeholder"
                label="Lien de la vidéo"
                variant="outlined"
                value={link}
                onChange={recoveryId}
                className={classes.textField}
              />
            </Box>
            <Box>
              <div className="video">
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
          <Box>
            <Button variant="outlined" onClick={this.onSubmit} className={classes.button}>
              Enregistrer
            </Button>
          </Box>
        </form>
      </>
    );
  }
}

export default withRouter(withFirebaseContext(withStyles(textStyles)(Form)));
