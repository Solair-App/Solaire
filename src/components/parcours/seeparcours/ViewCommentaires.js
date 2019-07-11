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
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import * as firebase from 'firebase';
import AnswerCommentaire from './AnswerCommentaire';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10,
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
    marginTop: '1%',
    paddingBottom: '3%',
    textAlign: 'left',
    paddingLeft: '5%',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  extendedIcon: {
    marginRight: theme.spacing(1),
  },

  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),

  },

  answersTitle: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

  button: {
    backgroundColor: '#138787',
    color: 'white',
  },

  viewAnswersExpansion: {
    backgroundColor: '#eaf7f7',
  },

  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

// Récupération des commentaires de la db
const ViewCommentaires = ({
  commentaires,
  answerCommentaire,
  getParcours,
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
    docRef
      .update({
        [`commentaires.${key}`]: firebase.firestore.FieldValue.delete(),
      })
      .then(() => {
        console.log(`Document ${key} successfully deleted!`);
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    getParcours();
  };

  const deleteAnswer = (commentaire, key) => {
    const db = firebase.firestore();
    const docRef = db.collection('parcours').doc(currentParcours);
    docRef
      .update({
        [`commentaires.${key}.repCommentaire`]: firebase.firestore.FieldValue.arrayRemove(
          commentaire,
        ),
      })
      .then(() => {
        console.log(`Document ${key} successfully deleted!`);
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    getParcours();
  };

  const randomKey = Math.random().toString(36).substr(2, 3);

  function showCommentaire() {
    return Object.entries(commentaires).map(([key, value]) => (
      <div key={`${key + randomKey}m`}>
        <List className={classes.root} alignItems="flex-start">
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="imageProfil" src={value.image} />
            </ListItemAvatar>
            <ListItemText
              primary={(
                <Fragment>
                  <Typography className="typo">
                    {value.pseudo}
                    {(value.creator === localStorage.getItem('userId')) || (userInfo && userInfo.is_admin)
                      ? (
                        <DeleteIcon
                          onClick={() => deleting(key)}
                          style={{
                            marginLeft: '1%',
                            color: '#138787',

                          }}
                        />
                      ) : undefined
            }
                  </Typography>
                </Fragment>
)}
              secondary={(
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"

                    color="textPrimary"
                  >
                    {' '}
                    {value.commentaire}

                  </Typography>
                  <Rating readOnly value={value.rating} />
                </Fragment>
)}
            />
          </ListItem>
        </List>
        <div className={classes.align}>
          <Fab
            variant="extended"
            size="medium"
            aria-label="Add"
            className={classes.button}
            onClick={() => {
              setAnswer({ [key]: !answer[key] });
              setNewAnswer(false);
            }}
          >
            <NavigationIcon className={classes.extendedIcon} />
                 Répondre
          </Fab>
        </div>
        {answer[key] && !newAnswer && <AnswerCommentaire newAnswer={newAnswer} newReponse={newReponse} answerCommentaire={answerCommentaire} answerIndex={key} getParcours={getParcours} userInfo={userInfo} />}
        {value.repCommentaire.length > 0 ? (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.viewAnswersExpansion}
            >
              <Typography className={classes.answersTitle}>Voir les réponses</Typography>
            </ExpansionPanelSummary>
            {value.repCommentaire.map(commentaire => (
              <div>
                <div className={classes.root}>

                  <ExpansionPanelDetails>
                    <List className={classes.root} alignItems="flex-start">
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="imageProfil" src={commentaire.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={(
                            <Fragment>
                              <Typography>
                                {commentaire.pseudo}
                                {(value.creator === localStorage.getItem('userId')) || (userInfo && userInfo.is_admin)
                                  ? (
                                    <DeleteIcon
                                      onClick={() => deleteAnswer(commentaire, key)}
                                      style={{
                                        marginLeft: '1%',
                                        color: '#4ca9a9',
                                      }}
                                    />
                                  ) : undefined
            }
                              </Typography>
                            </Fragment>
)}
                          secondary={(
                            <Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                {' '}
                                {commentaire.commentaire}
                              </Typography>
                            </Fragment>
)}
                        />
                      </ListItem>
                    </List>
                  </ExpansionPanelDetails>
                </div>
              </div>
            ))}
          </ExpansionPanel>
        ) : undefined}
        <Divider variant="inset" className={classes.divider} />
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
