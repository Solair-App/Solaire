import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  const [values] = useState({});
  const classes = useStyles();
  const [value, setValue] = useState({
    name: '',
    age: '',
    multiline: 'Controlled',
    currentValue: 'tous les champs sont requis',
  });

  // Modifications du state
  const handleChange1 = name => (event) => {
    setValue({ ...value, [name]: event.target.value });
  };

  const handleChange2 = message => (event) => {
    setValue({ ...value, [message]: event.target.value });
  };

  const inputProps = {
    maxLength: '5000',
  };

  // Stockage des messages dans la db
  function pushMessagesInsideDB(messages) {
    const { firestore } = props;
    const db = firestore;
    const messagesRef = db.collection('messages').doc();

    messagesRef
      .set(
        {
          name: messages.name,
          message: messages.message,
        },
        { merge: true },
      )
      .then(() => {
        localStorage.setItem('id', messagesRef.id);
      });
    const { history } = props;
    history.push('/parcours');
  }

  // Vérifie si tous les states sont bien remplis, sinon renvoie un message d'erreur
  function allStateAreFill() {
    if (
      values.name
      && values.message
    ) {
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

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="on">
        <TextField
          required
          id="filled-name"
          label="Votre nom ou pseudo"
          className={classes.textField}
          value={values.name}
          onChange={handleChange1('name')}
          margin="normal"
          variant="filled"
        />
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
          value={values.message}
          onChange={handleChange2('name')}
          inputProps={inputProps}
        />
      </form>
      <button type="submit" onClick={validateMessages}>
       Envoyer
      </button>
    </div>
  );
};

export default Commentaires;
