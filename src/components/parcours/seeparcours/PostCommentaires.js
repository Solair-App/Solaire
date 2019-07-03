import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { withRouter } from 'react-router';
import * as firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#58e0d3',
  },

  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: 'white',
  },

  dense: {
    marginTop: 16,
  },

  menu: {
    width: 200,
  },

  note: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Commentaires = (props) => {
  const { rating } = props;
  const [values, setValues] = useState({
    name: '',
    message: '',
    rating,
  });
  const classes = useStyles();
  const [value, setValue] = useState({
    multiline: 'Controlled',
    errorMessage: '',
  });

  // Modifications du state
  const handleChange1 = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const inputProps = {
    maxLength: '5000',
  };

  const { match } = props;
  const parcours = match.params.parcoursId;

  // Stockage des messages dans la db
  function pushMessagesInsideDB() {
    const { sendCommentaire } = props;
    const db = firebase.firestore();
    const commentaryNumber = Date.now().toString() + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const messagesRef = db.collection('parcours').doc(parcours);
    messagesRef
      .set(
        {
          commentaires: {
            [commentaryNumber]: {
              creator: localStorage.getItem('userId'), image: props.userInfo.url, pseudo: values.name, date: Date(Date.now()).toString(), rating: props.rating, commentaire: values.message, repCommentaire: [],
            },
          },
        },
        { merge: true },
      )
      .then(() => {
        localStorage.setItem('id', messagesRef.id);
        sendCommentaire(values);
        const { getParcours } = props;
        getParcours();
      });
  }

  // Vérifie si tous les states sont bien remplis, sinon renvoie un message d'erreur
  function allStateAreFill() {
    if (values.name && values.message && rating) {
      return true;
    }
    setValue({
      ...value,
      errorMessage: ' Tous les champs sont requis',
    });
    return false;
  }

  function validateMessages() {
    if (allStateAreFill()) {
      pushMessagesInsideDB();
    }
  }
  const { userRate } = props;

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="on">

        <div className={classes.note}>
          {' '}
          <p>
            {' '}
            {' '}
Votre Note :

          </p>
          <p>
            {userRate()}
          </p>
        </div>

        <TextField
          fullWidth
          required
          input
          id="filled-name"
          label="Votre nom ou pseudo"
          className={`${classes.textField} ${classes.input}`}
          value={values.name}
          onChange={handleChange1}
          style={{ margin: 8 }}
          margin="normal"
          variant="filled"
          name="name"
        />
        <TextField
          id="filled-textarea"
          label="Votre message"
          placeholder="Placeholder"
          className={`${classes.textField} ${classes.input}`}
          style={{ margin: 8 }}
          input
          multiline
          fullWidth
          margin="normal"
          variant="filled"
          name="message"
          value={values.message}
          onChange={handleChange1}
          inputProps={inputProps}
        />
      </form>
      {value.errorMessage}
      {' '}
      <Fab
        type="submit"
        variant="extended"
        size="medium"
        color="primary"
        aria-label="Add"
        className={classes.align}
        onClick={validateMessages}
      >
        <NavigationIcon className={classes.extendedIcon} />
          Envoyer
      </Fab>
    </div>
  );
};

export default withRouter(Commentaires);
