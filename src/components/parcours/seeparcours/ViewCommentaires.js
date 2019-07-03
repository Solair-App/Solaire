import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from 'material-ui-rating';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import * as firebase from 'firebase';
import AnswerCommentaire from './AnswerCommentaire';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10,
  },
  container: {
    backgroundColor: '#58e0d3',
  },
  pseudo: {
    color: 'white',
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: 'white',
    opacity: 0.5,
  },
  align: {
    textAlign: 'none',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },

}));

// Récupération des commentaires de la db
const ViewCommentaires = ({
  commentaires,
  answerCommentaire,
  getParcours,
  parcours,
  currentParcours,
  userInfo,
}) => {
  const classes = useStyles();
  const [answer, setAnswer] = useState({ });
  const [newAnswer, setNewAnswer] = useState(false);

  const newReponse = (value) => {
    if (value === true) {
      setNewAnswer(true);
    } else {
      setNewAnswer(false);
    }
  };

  const deleting = (key) => {
    const db = firebase.firestore();
    const docRef = db.collection('parcours').doc(currentParcours);
    docRef.update({
      [`commentaires.${key}`]: firebase.firestore.FieldValue.delete(),
    }).then(() => {
      console.log(`Document ${key} successfully deleted!`);
    })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    getParcours();
  };

  function showCommentaire() {
    return Object.entries(commentaires).map(([key, value]) => (
      <div key={`${key + 1}m`}>
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="imageProfil" src={value.image} />
            </ListItemAvatar>
            <ListItemText
              primary={(
                <Fragment>
                  <Typography>
                    {value.pseudo}
                    {(parcours && parcours.creator === localStorage.getItem('userId')) || (userInfo && userInfo.is_admin)
                      ? (<DeleteIcon onClick={() => deleting(key)} />) : undefined
            }
                  </Typography>
                </Fragment>
)}
              secondary={(
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {' '}
                    {value.commentaire}
                    <Rating readOnly value={value.rating} />
                  </Typography>
                </React.Fragment>
)}
            />

          </ListItem>
        </List>

        {!newAnswer && (
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="Add"
          className={classes.align}
          onClick={() => { setAnswer({ [key]: !answer[key] }); }}
        >
          <NavigationIcon className={classes.extendedIcon} />
           Répondre
        </Fab>

        )}
        {answer[key] && <AnswerCommentaire newAnswer={newAnswer} newReponse={newReponse} answerCommentaire={answerCommentaire} answerIndex={key} getParcours={getParcours} />}
        {value.repCommentaire.map(commentaire => (
          <div>
            <p>{commentaire.pseudo}</p>
            <p>{commentaire.commentaire}</p>
          </div>
        ))}
      </div>
    )).reverse();
  }

  return (
    <div className={classes.container}>
      {
        commentaires && showCommentaire()
      }
    </div>
  );
};

export default ViewCommentaires;
