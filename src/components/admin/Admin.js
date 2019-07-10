/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import * as firebase from 'firebase';
import Grid from '@material-ui/core/Grid';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import OneCategory from './OneCategory';
import SimpleModal from '../SimpleModal';


const forLoop = ['thématique', 'difficulté', 'durée', 'langue'];


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thématique: [],
      open: false,
      difficulté: [],
      durée: [],
      langue: [],
      newthématique: '',
      newlangue: '',
      newdurée: '',
      newdifficulté: '',
      newItem: '',
      success: null,
      deleteCat: null,
      deleteKey: null,
    };
    this.thématique = [];
    this.difficulté = [];
    this.durée = [];
    this.langue = [];
    this.getCategoryFromDB();
  }

  getDelete = (category, key) => {
    this.setState({
      deleteCat: category,
      deleteKey: key,
      open: true,
    });
  }

  deleteItem = () => {
    this.setState({ open: false });
    const { deleteCat, deleteKey } = this.state;
    const db = firebase.firestore();
    const docRef = db.collection('category').doc(deleteCat);
    docRef.update({
      [`${deleteKey}`]: firebase.firestore.FieldValue.delete(),
    }).then(() => {
      this.setState({ success: `Element de ${deleteCat} supprimé avec succès` });
      setTimeout(this.setState({ success: null }), 3000);
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

  onChange = (event) => {
    this.setState({ [`new${event.target.name}`]: event.target.value });
  }

  addItem = (category) => {
    const db = firebase.firestore();
    const docRef = db.collection('category').doc(category);
    const UniqueKey = Math.random().toString(36).substr(2, 3);
    docRef.set({
      [UniqueKey]: this.state[`new${category}`],
    }, { merge: true });
    this.thématique = [];
    this.difficulté = [];
    this.durée = [];
    this.langue = [];
    this.getCategoryFromDB();
  }

  jsUcfirst = string => string.charAt(0).toUpperCase() + string.slice(1)

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

  toggle = () => {
    this.setState({ open: false });
  }

  render() {
    const {
      success, open, deleteCat, deleteKey,
    } = this.state;
    const { history } = this.props;
    return (
      <div>
        <div className="topFond">
          <ArrowBack
            style={{ position: 'fixed', left: '10px', top: '10px' }}
            onClick={() => {
              history.push('/profile');
            }}
          />
          <h1>Modifier les catégories</h1>
        </div>
        <SimpleModal open={open} idCours={deleteCat} deleteKey={deleteKey} togle={this.toggle} deleted={this.deleteItem} />
        {success && success}
        <Grid container>
          {forLoop.map(category => (
            <OneCategory getDelete={this.getDelete} key={category} addItem={this.addItem} onChange={this.onChange} category={category} jsUcfirst={this.jsUcfirst} state={this.state} />
          ))}

        </Grid>
      </div>
    );
  }
}

export default withRouter(Admin);
