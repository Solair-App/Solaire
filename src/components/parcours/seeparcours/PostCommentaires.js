import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router';
import * as firebase from 'firebase';


const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',

    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',

    },
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

  align: {
    marginTop: '1%',
    paddingBottom: '7%',
    textAlign: 'left',
    marginLeft: '5%',
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
      marginLeft: '0',
    },
    [theme.breakpoints.up('lg')]: {
      textAlign: 'center',
      marginLeft: '0',
    },
  },

  button: {
    backgroundColor: '#4ca9a9',
    color: 'white',
  },

  smallTitle: {
    fontSize: '95%',
    textAlign: 'left',
    paddingBottom: '0.5%',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: '#4ca9a9',
  },

  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
    const commentaryNumber = Date.now().toString()
      + Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
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
      <p className={classes.smallTitle}>Commenter</p>
      <Divider variant="inset" className={classes.divider} />
      <div className={classes.container}>
        <form noValidate autoComplete="on">

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
            className={classes.input}
            value={values.name}
            onChange={handleChange1}
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
      </div>
      <p className={classes.smallTitle}>Tous les commentaires</p>
      <Divider variant="inset" className={classes.divider} />
    </div>
  );
};

export default withRouter(Commentaires);
