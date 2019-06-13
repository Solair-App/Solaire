import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import withFirebaseContext from '../Firebase/withFirebaseContext';
import '../App.scss';

class SlideApprenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoSlide: { slides: [] },
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
        {
          infoSlide.slides && Object.values(infoSlide.slides).map(sl => <div style={{ color: 'black' }}>{ReactHtmlParser(sl)}</div>)
        }
        {/* <pre style={{ border: '2px solid black' }}>
            {infoSlide && ReactHtmlParser(infoSlide.slides[1].replace(regex, subst)) }
          </pre>
          <pre style={{ border: '2px solid black' }}>
            {infoSlide && ReactHtmlParser(infoSlide.slides[2].replace(regex, subst)) }
          </pre> */}
      </>
    );
  }
}

export default withRouter(withFirebaseContext(SlideApprenant));
