import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './Form.css';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const textStyles = theme => ({
  textField: {
    marginTop: theme.spacing(2),
    width: "250px"
  }
});

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    }
  }

  recoveryId = (e) => {
    const value = e.target.value;
    this.setState({ id: value.substring(value.lastIndexOf("=") + 1, value.length) });
  }

  render() {
    const { classes } = this.props;
    const id = this.state.id;
    const recoveryId = this.recoveryId;
    const opts = {
      height: '200',
      width: '300',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        fs: 0
      }
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
                variant="outlined"
                className={classes.textField}
              />
            </Box>
            <Box>
              <TextField
                id="outlined-textarea"
                label="Description de la vidéo"
                multiline
                variant="outlined"
                className={classes.textField}
              />
            </Box>
            <Box>
              <TextField
                id="outlined-with-placeholder"
                label="Durée de la vidéo"
                variant="outlined"
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
                {id.length === 11 ? <YouTube
                  videoId={id}
                  opts={opts}
                  onReady={this._onReady}
                /> : null}
              </div>
            </Box>
          </Box>
          <Box>
            <Button variant="outlined" className={classes.button}>
              Enregistrer
            </Button>
          </Box>
        </form>
      </>
    );
  }
}

export default withStyles(textStyles)(Form);
