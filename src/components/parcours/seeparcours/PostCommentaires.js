import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
    margin: 'auto auto',
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

  note: {
    alignItems: 'center',
    textAlign: 'left',
    display: 'flex',
  },

  align: {
    marginTop: 10,
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
    backgroundColor: '#138787',
    color: 'white',
    marginBottom: 30,
    marginLeft: -18,
    height: '40px !important',
    paddingRight: '15px !important',
    paddingLeft: '15px !important',

  },

  smallTitle: {
    fontSize: '95%',
    textAlign: 'left',
    paddingBottom: '0.5%',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: '#138787',
  },

  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  comment: {
    margin: '0px !important',
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
              creator: localStorage.getItem('userId'), image: props.userInfo.url, pseudo: props.userInfo.name, date: Date(Date.now()).toString(), rating: props.rating, commentaire: values.message, repCommentaire: [],
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
    if (values.message && rating) {
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
  const { userRate, userInfo } = props;

  return (
    <div>
      <p className={classes.smallTitle}>
Commenter
      </p>
      <Divider variant="inset" className={classes.divider} />
      <div className={classes.container}>

        <form noValidate autoComplete="on">
          {' '}

          <div className={classes.note}>
            {' '}
            <List
              className={classes.input}
            >

              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="imageProfil" src={userInfo.url} />
                </ListItemAvatar>

                <p>
                  {' '}
                  {' '}
Votre Note :

                </p>
                <p>
                  {userRate()}
                </p>
              </ListItem>
              <ListItem style={{ padding: 0 }}>
                <TextField
                  id="filled-textarea"
                  label={`Commenter en tant que ${userInfo.name}`}
                  placeholder="Placeholder"
                  input
                  multiline
                  fullWidth
                  margin="normal"
                  variant="filled"
                  name="message"
                  value={values.message}
                  onChange={handleChange1}
                  inputProps={inputProps}
                  style={{ width: '700' }}
                  className={classes.comment}
                />
              </ListItem>
            </List>
          </div>
        </form>
        {value.errorMessage}
        {' '}

        <div className={classes.align}>
          <Fab
            type="submit"
            variant="extended"
            size="small"
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
