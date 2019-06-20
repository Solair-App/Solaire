import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  state,
});


// Récupération des slides de la db
const ViewCommentaires = ({
  match, firestore, location, currentParcours, currentCommentaire,
}) => {
  const parcours = currentParcours;
  const [commentaires, setCommentaires] = useState('');
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
    console.log(currentCommentaire);

    if (currentCommentaire.commentaire.length > 2) {
      console.log('test');
      const tab2 = JSON.stringify(JSON.parse(commentaires));
      tab2.push(currentCommentaire);
      setCommentaires(tab2);
    }
  }, [firestore, location, match, parcours]);


  return (
    <div>

      {commentaires && commentaires.map((commentaire, index) => (
        <div key={`${index + 1}m`}>
          <h1>{commentaire.pseudo}</h1>
          <p>{commentaire.commentaire}</p>
        </div>
      ))}


    </div>
  );
};

export default connect(mapStateToProps)(ViewCommentaires);
