/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import * as firebase from 'firebase';

const forLoop = ['thématique', 'difficulté', 'durée', 'langue'];


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thématique: [],
      difficulté: [],
      durée: [],
      langue: [],
      success: null,
    };
    this.thématique = [];
    this.difficulté = [];
    this.durée = [];
    this.langue = [];
    this.getCategoryFromDB();
  }

  deleteItem = (category, key) => {
    const db = firebase.firestore();
    const docRef = db.collection('category').doc(category);
    docRef.update({
      [`${key}`]: firebase.firestore.FieldValue.delete(),
    }).then(() => {
      this.setState({ success: `Element de ${category} supprimé avec succès` });
    })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    this.thématique = [];
    this.difficulté = [];
    this.durée = [];
    this.langue = [];
    this.getCategoryFromDB();
  }

  addItem = (thématique) => {
  }

  getCategoryFromDB = () => {
    // eslint-disable-next-line no-shadow
    const db = firebase.firestore();
    for (let i = 0; i < forLoop.length; i += 1) {
      const themRef = db.collection('category').doc(forLoop[i]);
      // eslint-disable-next-line no-loop-func
      themRef.get().then((document) => {
        const dbCategory = document.data();
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(dbCategory)) {
          this[`${forLoop[i]}`].push({ key, value });
          this.setState({ [forLoop[i]]: this[`${forLoop[i]}`] });
        }
      });
    }
  };

  render() {
    const { success } = this.state;
    return (
      <div>
        {success && success}
        <h1>Modifier les catégories</h1>
        {forLoop.map(category => (
          <div key={category}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h2>{category}</h2>
              {' '}
              <button onClick={() => this.addItem(category)} type="button">Ajouter</button>
            </div>
            <>
              {this.state[`${category}`].map(item => (
                <div key={item.key}>
                  <p>{item.value}</p>
                  <button onClick={() => this.deleteItem(category, item.key)} type="button">Supprimer</button>
                </div>
              ))}
            </>
          </div>
        ))}
      </div>
    );
  }
}

export default Admin;
