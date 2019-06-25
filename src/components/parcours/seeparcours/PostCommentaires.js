import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import * as firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
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
    currentValue: 'tous les champs sont requis',
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
    const db = firebase.firestore();
    const messagesRef = db.collection('parcours').doc(parcours);
    messagesRef
      .update({
        commentaires: firebase.firestore.FieldValue.arrayUnion({
          pseudo: values.name,
          commentaire: values.message,
          rating: props.rating,
        }),
      })
      .then(() => {
        localStorage.setItem('id', messagesRef.id);
        props.sendCommentaire(values);
      });
    const { history } = props;
    history.push(`/parcours/${parcours}`);
  }

  // Vérifie si tous les states sont bien remplis, sinon renvoie un message d'erreur
  function allStateAreFill() {
    if (values.name && values.message && props.rating) {
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
        <TextField
          required
          id="filled-name"
          label="Votre nom ou pseudo"
          className={classes.textField}
          value={values.name}
          onChange={handleChange1}
          margin="normal"
          variant="filled"
          name="name"
        />
        {' '}
        {userRate()}
        <TextField
          id="filled-textarea"
          label="Votre message"
          placeholder="Placeholder"
          className={classes.textField}
          style={{ margin: 8 }}
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

      <button type="submit" onClick={validateMessages}>
        Envoyer
      </button>
    </div>
  );
};

export default withRouter(Commentaires);
