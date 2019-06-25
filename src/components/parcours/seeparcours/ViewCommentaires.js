import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import Rating from 'material-ui-rating';

const mapStateToProps = state => ({
  state,
});

// Récupération des slides de la db
const ViewCommentaires = ({
  match,
  firestore,
  location,
  currentParcours,
  currentCommentaire,
}) => {
  const parcours = currentParcours;
  const [commentaires, setCommentaires] = useState([]);
  useEffect(() => {
    const docRef = firebase
      .firestore()
      .collection('parcours')
      .doc(parcours);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const allFields = doc.data();
          setCommentaires(allFields.commentaires);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [firestore, location, match, parcours]);

  function showCommentaire() {
    if (currentCommentaire.commentaire.length > 3) {
      commentaires.push(currentCommentaire);
    }

    return commentaires
      .map((commentaire, index) => (
        <div key={`${index + 1}m`}>
          <h1>{commentaire.pseudo}</h1>
          <Rating readOnly value={commentaire.rating} />
          <p>{commentaire.commentaire}</p>
        </div>
      ))
      .reverse();
  }

  return <div>{commentaires && showCommentaire()}</div>;
};

export default connect(mapStateToProps)(ViewCommentaires);
