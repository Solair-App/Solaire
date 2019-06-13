import React, { Component } from 'react';
import { withRouter } from 'react-router';
import withFirebaseContext from './Firebase/withFirebaseContext';
import './App.css';

class SlideApprenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoSlide: {},
    };
    this.getInfo();
  }

  getInfo = () => {
    const { firestore } = this.props;
    const docRef = firestore.collection('slide').doc('m9umoDwBm378HMLhS1EI');
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
      <div>
        {infoSlide.data}
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(SlideApprenant));
