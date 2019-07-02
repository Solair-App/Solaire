import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import Rating from 'material-ui-rating';
import AnswerCommentaire from './AnswerCommentaire';


const mapStateToProps = state => ({
  state,
});

// Récupération des slides de la db
const ViewCommentaires = ({
  commentaires,
  answerCommentaire,
  getParcours,
}) => {
  const [answer, setAnswer] = useState({ });
  const [addCommentary, setAddComentary] = useState();

  function showCommentaire() {
    return Object.entries(commentaires).map(([key, value]) => (
      <div key={`${key + 1}m`}>
        <h1>{value.pseudo}</h1>
        <Rating readOnly value={value.rating} />
        <p>{value.commentaire}</p>
        <button type="submit" onClick={() => { setAnswer({ [key]: !answer[key] }); setAddComentary(key); }}>
       Répondre
        </button>
        { answer[key] ? <AnswerCommentaire answerCommentaire={answerCommentaire} answerIndex={key} getParcours={getParcours} /> : '' }
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
    <div>
      {
        commentaires && showCommentaire()
      }
    </div>
  );
};

export default connect(mapStateToProps)(ViewCommentaires);
