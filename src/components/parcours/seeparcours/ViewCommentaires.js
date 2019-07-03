import React, { useState } from 'react';
import Rating from 'material-ui-rating';
import DeleteIcon from '@material-ui/icons/Delete';
import * as firebase from 'firebase';
import AnswerCommentaire from './AnswerCommentaire';

// Récupération des slides de la db
const ViewCommentaires = ({
  commentaires,
  answerCommentaire,
  getParcours,
  parcours,
  currentParcours,
  userInfo,
}) => {
  const [answer, setAnswer] = useState({});
  const [newAnswer, setNewAnswer] = useState(false);

  const newReponse = (value) => {
    if (value === true) {
      setNewAnswer(true);
      setTimeout(() => {
        setNewAnswer(false);
      }, 3000);
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

  function showCommentaire() {
    return Object.entries(commentaires)
      .map(([key, value]) => (
        <div key={`${key + 1}m`}>
          <h1>
            {value.pseudo}
            {value.creator === localStorage.getItem('userId')
            || (userInfo && userInfo.is_admin) ? (
              <DeleteIcon onClick={() => deleting(key)} />
              ) : (
                undefined
              )}
          </h1>
          <Rating readOnly value={value.rating} />
          <p>{value.commentaire}</p>
          <button
            type="submit"
            onClick={() => {
              setAnswer({ [key]: !answer[key] });
            }}
          >
            Répondre
          </button>
          {answer[key] && (
            <AnswerCommentaire
              newAnswer={newAnswer}
              newReponse={newReponse}
              answerCommentaire={answerCommentaire}
              answerIndex={key}
              getParcours={getParcours}
            />
          )}
          {value.repCommentaire.map(commentaire => (
            <div>
              <p>{commentaire.pseudo}</p>
              <p>{commentaire.commentaire}</p>
            </div>
          ))}
        </div>
      ))
      .reverse();
  }

  return <div>{commentaires && showCommentaire()}</div>;
};

export default ViewCommentaires;
