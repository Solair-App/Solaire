import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import withFirebaseContext from '../Firebase/withFirebaseContext';
import '../App.scss';

class SlideApprenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoSlide: null,
    };
    this.getInfo();
  }

  getInfo = () => {
    const { firestore } = this.props;
    const docRef = firestore.collection('parcours').doc(localStorage.getItem('id')).collection('cours').doc(localStorage.getItem('coursId'));
    docRef.get().then((doc) => {
      if (doc.exists) {
        const infoSlide = doc.data();
        this.setState({
          infoSlide,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }


  render() {
    const { infoSlide } = this.state;
    return (
      <>
        <div style={{ border: '2px solid black' }}>
          {infoSlide && ReactHtmlParser(infoSlide.slides[1])}
        </div>
        <div style={{ border: '2px solid black' }}>
          {infoSlide && ReactHtmlParser(infoSlide.slides[2])}
        </div>
      </>
    );
  }
}

export default withRouter(withFirebaseContext(SlideApprenant));
