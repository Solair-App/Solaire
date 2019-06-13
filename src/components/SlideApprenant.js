import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import withFirebaseContext from '../Firebase/withFirebaseContext';
import '../App.scss';

const SlideApprenant = ({ firestore }) => {
  const [infoSlide, setSlide] = useState({ slides: [] });
  useEffect(() => {
    const docRef = firestore.collection('parcours').doc(localStorage.getItem('id')).collection('cours').doc(localStorage.getItem('coursId'));
    docRef.get().then((doc) => {
      if (doc.exists) {
        setSlide(doc.data());
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
      {
        infoSlide.slides && Object.values(infoSlide.slides).map(sl => <div style={{ color: 'black' }}>{ReactHtmlParser(sl)}</div>)
      }
    </div>
  );
};


export default withRouter(withFirebaseContext(SlideApprenant));
