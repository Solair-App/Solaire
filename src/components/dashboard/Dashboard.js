import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import List from './List';
import useDashButton from './DashButton';
import BottomNav from './BottomNav';

import { mapDispatchToProps } from '../../actions/action';

const mapStateToProps = state => ({
  state,
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.getMarkers();
    this.getCategoryFromDB();
  }

  getMarkers() {
    // eslint-disable-next-line no-shadow
    const { mapDispatchToProps } = this.props;

    const markers = [];

    firebase
      .firestore()
      .collection('parcours')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          markers.push(doc.data());
        });

        mapDispatchToProps(markers, 'parcours');
      });
  }


  getCategoryFromDB = () => {
    let category = [];
    const forLoop = ['thématique', 'difficulté', 'durée', 'langue'];
    // eslint-disable-next-line no-shadow
    const { mapDispatchToProps } = this.props;
    const firestore = firebase.firestore();
    const db = firestore;
    for (let i = 0; i < forLoop.length; i += 1) {
      const themRef = db.collection('category').doc(forLoop[i]);
      // eslint-disable-next-line no-loop-func
      themRef.get().then((document) => {
        const dbCategory = document.data();

        // eslint-disable-next-line no-restricted-syntax
        for (const [, value] of Object.entries(dbCategory)) {
          category.push(`${value}`);
        }
        mapDispatchToProps(category, 'category', forLoop[i]);
        category = [];
      });
    }
  }


  render() {
    const { state } = this.props;


    return (
      <div style={{ display: 'block', textAlign: 'left' }}>
        {' '}
        {state && state.thématique ? (

          state.thématique.map(results => (
            <List data={state.parcours} thématique={results} />
          ))
        ) : (
          <p>loading.. </p>
        )}
        <useDashButton />
        <BottomNav />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { mapDispatchToProps },
)(Dashboard);
