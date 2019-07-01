import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import AnswerCommentaire from './AnswerCommentaire';

const mapStateToProps = state => ({
  state,
});


// Récupération des commentaires de la db
const ViewCommentaires = ({
  match, firestore, location, currentParcours, currentCommentaire, answerCommentaire, RepCommentaire,
}) => {
  const parcours = currentParcours;
  const [commentaires, setCommentaires] = useState();
  useEffect(() => {
    const docRef = firebase.firestore().collection('parcours').doc(parcours);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const allFields = doc.data();
        setCommentaires(allFields.commentaires);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }, [firestore, location, match, parcours]);

  const [answer, setAnswer] = useState({ });
  const [addCommentary, setAddComentary] = useState();

  function showCommentaire() {
    // if (currentCommentaire.commentaire.length > 3) {
    //   commentaires.push(currentCommentaire);
    // }
    return Object.entries(commentaires).map(([key, value]) => (
      <div key={`${key + 1}m`}>
        {console.log(value)}
        <h1>{value.pseudo}</h1>
        <p>{value.commentaire}</p>
        <button type="submit" onClick={() => { setAnswer({ [key]: !answer[key] }); setAddComentary(key); }}>
       Répondre
        </button>
        { answer[key] ? <AnswerCommentaire answerCommentaire={answerCommentaire} answerIndex={key} /> : '' }
        {value.repCommentaire.map(commentaire => (
          <div>
            <p>{commentaire.pseudo}</p>
            <p>{commentaire.commentaire}</p>
          </div>
        ))}
      </div>
    )).reverse();
  }

  // function showAnswer() {
  //   if (currentCommentaire.commentaire.index) {
  //     commentaires.push(RepCommentaire);
  //   }
  //   return commentaires.map((commentaire, index) => (
  //     <div key={`${index + 1}m`}>
  //       <h1>{commentaire.pseudo}</h1>
  //       <p>{commentaire.commentaire}</p>
  //     </div>
  //   ));
  // }

  return (
    <div>
      {
        commentaires && showCommentaire()
      }
    </div>
  );
};

export default connect(mapStateToProps)(ViewCommentaires);
