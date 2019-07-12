import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import * as firebase from 'firebase';


const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),

  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  button: {
    backgroundColor: '#138787',
    color: 'white',
  },

  input: {
    margin: 'auto auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',

    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
      marginLeft: '70px',
    },
  },

  align: {
    marginTop: '1%',
    paddingBottom: '7%',
    textAlign: 'left',
    marginLeft: '110px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      marginLeft: '0',
    },
  },

  note: {
    alignItems: 'center',
    textAlign: 'left',
    display: 'flex',
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
          {
            [`commentaires.${answerIndex}.repCommentaire`]: firebase.firestore.FieldValue.arrayUnion({
              pseudo: props.userInfo.name, creator: localStorage.getItem('userId'), image: props.userInfo.url, commentaire: values.message,
            }),
          },
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
      values.message
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
  const { userInfo } = props;
  return (

    <div>
      <>
        <form className={classes.container} noValidate autoComplete="on">
          <div className={classes.note}>
            {' '}
            <List
              className={classes.input}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="imageProfil" src={userInfo.url} />
                </ListItemAvatar>
                <p>{userInfo.name}</p>
              </ListItem>
              <ListItem>

                <TextField
                  id="filled-textarea"
                  label={`Commenter en tant que ${userInfo.name}`}
                  style={{ margin: 8 }}
                  placeholder="Votre message"
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
              </ListItem>
            </List>

          </div>
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
