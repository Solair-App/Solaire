import React, { Component } from 'react';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  getCategoryFromDB = () => {
    const { state } = this.props;
    let category = [];
    const forLoop = ['thématique', 'difficulté', 'durée', 'langue'];
    // eslint-disable-next-line no-shadow
    const { mapDispatchToProps, firestore } = this.props;
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
  };

  render() {
    return (
      <h1>Modifier les thématiques d&apos;apprentissage</h1>
    );
  }
}

export default withFirebaseContext(Admin);
