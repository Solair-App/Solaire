import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './Form.css';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import withFirebaseContext from '../Firebase/withFirebaseContext';

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

  // componentDidMount() {
  //   const { location, history } = this.props;
  //   if (!location.state || !location.state.cours) {
  //     history.push('/CreateParcours');
  //   }
  // }

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
    const { firestore } = this.props;
    const db = firestore;
    const videoSet = db.collection('parcours').doc(localStorage.getItem('id')).collection('cours');
    const video = videoSet.doc(localStorage.getItem('coursId'));
    video.set({
      link, duree, name, description,
    }, { merge: true });
    e.preventDefault();

    const { history } = this.props;
    history.push('mydashboard');
  }

  render() {
    const { classes } = this.props;
    const {
      id, name, description, duree,
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
