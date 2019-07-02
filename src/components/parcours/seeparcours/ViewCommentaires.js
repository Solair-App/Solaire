import React, { useState } from 'react';
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
  const [newAnswer, setNewAnswer] = useState(false);

  const newReponse = (value) => {
    if (value === true) {
      setNewAnswer(true);
    } else {
      setNewAnswer(false);
    }
  };

  function showCommentaire() {
    return Object.entries(commentaires).map(([key, value]) => (
      <div key={`${key + 1}m`}>
        <h1>{value.pseudo}</h1>
        <Rating readOnly value={value.rating} />
        <p>{value.commentaire}</p>
        {!newAnswer && (
        <button type="submit" onClick={() => { setAnswer({ [key]: !answer[key] }); }}>
       Répondre
        </button>
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
    <div>
      {
        commentaires && showCommentaire()
      }
    </div>
  );
};

export default connect(mapStateToProps)(ViewCommentaires);
