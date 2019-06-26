/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const forLoop = ['thématique', 'difficulté', 'durée', 'langue'];


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thématique: [],
      difficulté: [],
      durée: [],
      langue: [],
      newItem: '',
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

  onChange = (e) => {
    this.setState({ newItem: e.target.value });
  }

  addItem = (category) => {
    const { newItem } = this.state;
    const db = firebase.firestore();
    const docRef = db.collection('category').doc(category);
    const UniqueKey = Math.floor(Date.now() / 1000);
    docRef.set({
      [UniqueKey]: newItem,
    }, { merge: true });
    this.thématique = [];
    this.difficulté = [];
    this.durée = [];
    this.langue = [];
    this.getCategoryFromDB();
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
    const { success, newItem } = this.state;
    return (
      <div>
        {success && success}
        <h1>Modifier les catégories</h1>
        {forLoop.map(category => (
          <div style={{ marginTop: '3%' }} key={category}>
            <h2>{category}</h2>
            <>
              {this.state[`${category}`].map(item => (
                <div key={item.key}>
                  <p>{item.value}</p>
                  <button onClick={() => this.deleteItem(category, item.key)} type="button">Supprimer</button>
                </div>
              ))}
            </>
            <form autoComplete="off">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="new"
                    label={`new ${category}`}
                    name={`${category}`}
                    className="textfield"
                    value={newItem}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    type="submit"
                    onClick={() => this.addItem(category)}
                    className="Button"
                  >
                    Ajouter
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        ))}
      </div>
    );
  }
}

export default Admin;
