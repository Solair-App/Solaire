import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  state,
});


// Récupération des slides de la db
const ViewCommentaires = (props) => {
  const [commentaire, setCommentaire] = useState({ commentaires: [] });
  useEffect(() => {
    const docRef = firebase.firestore().collection('parcours');
    docRef.get().then((doc) => {
      if (doc.exists) {
        setCommentaire(doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  });

  return (
    <div>
      <h2>
        {props.state.parcours[5].data.commentaires.map((commentaires, index) => (
          <div key={`${index + 1}m`}>
            <h1 />
            <h2 />
          </div>
        ))}

      </h2>

    </div>
  );
};

export default connect(mapStateToProps)(ViewCommentaires);
