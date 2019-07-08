import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
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
  button: {
    backgroundColor: '#4ca9a9',
    color: 'white',
  },
}));

const Commentaires = (props) => {
  const [values, setValues] = useState({
    repCommentaire: {
      name: '',
      message: '',
    },
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
  //          { commentaires.answerIndex: firebase.firestore.FieldValue.arrayUnion({ repCommentaire: { pseudo: values.name, commentaire: values.message } }) },

  function pushAnswerInsideDB() {
    const { answerCommentaire, answerIndex } = props;
    if (answerIndex) {
      const db = firebase.firestore();
      const messagesRef = db.collection('parcours').doc(parcours);
      messagesRef
        .update(
          { [`commentaires.${answerIndex}.repCommentaire`]: firebase.firestore.FieldValue.arrayUnion({ pseudo: values.name, creator: localStorage.getItem('userId'), commentaire: values.message }) },
        )
        .then(() => {
          localStorage.setItem('index', messagesRef.id);
          answerCommentaire(values);
        });
      const { getParcours } = props;
      getParcours();
    }
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
    const { newReponse } = props;
    if (allStateAreFill()) {
      pushAnswerInsideDB();
      newReponse(true);
    }
  }

  return (
    <div>
      <>
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
        <div className={classes.align}>
          <Fab
            type="submit"
            variant="extended"
            size="medium"
            aria-label="Add"
            className={classes.button}
            onClick={validateMessages}
          >
            <NavigationIcon className={classes.extendedIcon} />
          Envoyer
          </Fab>
        </div>
      </>
    </div>
  );
};

export default (withRouter(Commentaires));
