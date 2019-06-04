import React from 'react';
import * as firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import SelectField from './SelectField';
import 'firebase/firestore';

import Parcours from './Parcours';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',

    flexWrap: 'wrap',
    height: '100%',
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

function CreateParcours() {
  const classes = useStyles();
  const [values] = React.useState({});

  const [state, setState] = React.useState({
    currentValue: 'tous les champs sont requis',
  });
  // Récupération des informations dans la DB
  function getCategoryFromDB(collection, doc) {
    const category = ['Choisissez une catégorie'];
    const db = firebase.firestore();
    const themRef = db.collection(collection).doc(doc);
    themRef.get().then((document) => {
      const dbCategory = document.data();
      // eslint-disable-next-line no-restricted-syntax
      for (const [, value] of Object.entries(dbCategory)) {
        category.push(`${value}`);
      }
    });

    return category;
  }
  // Modifications du state
  const handleChange = name => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  // redirection si le parcours est crée
  function redirect() {
    setTimeout(window.location.assign('/AddCours'), 5000);
  }

  // Stockage du parcours dans la db
  function pushParcoursInsideDB(parcours) {
    const db = firebase.firestore();
    const parcoursRef = db.collection('parcours').doc();

    parcoursRef
      .set(
        {
          name: parcours.name,
          description: parcours.description,
          thématique: parcours.thématique,
          langue: parcours.langue,
          durée: parcours.durée,
          difficulté: parcours.difficulté,
        },
        { merge: true },
      )
      .then(() => {
        localStorage.setItem('id', parcoursRef.id);

        redirect();
      });
  }

  // tableaux de data de la DB, servant à map.

  function categoryToArray(doc) {
    const category = getCategoryFromDB('parcours', doc);

    return category;
  }

  // Vérifie si tous les states sont bien remplis, sinon renvoie un message d'erreur
  function allStateAreFill() {
    if (
      state.name
      && state.description
      && state.thématique
      && state.langue
      && state.durée
      && state.difficulté
    ) {
      return true;
    }
    setState({
      ...state,
      errorMessage: ' Tous les champs sont requis',
    });
    return false;
  }
  // création de l'objet parcours
  function validateParcours() {
    if (allStateAreFill()) {
      const currentParcours = new Parcours(
        state.name,
        state.description,
        state.thématique,
        state.langue,
        state.durée,
        state.difficulté,
      );
      pushParcoursInsideDB(currentParcours);
    }
  }

  return (
    <form className={classes.container} autoComplete="off">
      <h1>Création de parcours</h1>
      <TextField
        required
        id="standard-name"
        label="Nom du parcours"
        className={classes.textField}
        value={values.text}
        onChange={handleChange('name')}
        style={{ marginTop: '5%', width: '50%' }}
      />
      <TextField
        required
        id="filled-multiline-flexible"
        label="Description"
        multiline
        rows="5"
        onChange={handleChange('description')}
        className={classes.textField}
        style={{ marginBottom: '5%', width: '50%' }}
      />
      <SelectField
        required
        choices={categoryToArray('ZaUZ5QfXw9nLWXa0SwIt')}
        name="thématique"
        handleChange={handleChange}
        currentValue={state.thématique}
      />
      <SelectField
        required
        choices={categoryToArray('AkD1DW8HDTZXf7Zmk165')}
        name="langue"
        handleChange={handleChange}
        currentValue={state.langue}
      />
      <SelectField
        required
        choices={categoryToArray('KKj7dhD2axqYjelGHnxx')}
        name="durée"
        handleChange={handleChange}
        currentValue={state.durée}
      />
      <SelectField
        required
        choices={categoryToArray('pBNtLDEviTPfjzUSWxzL')}
        name="difficulté"
        handleChange={handleChange}
        currentValue={state.difficulté}
      />
      <h1 style={{ color: 'red', marginBottom: '15%' }}>
        {state.errorMessage}
      </h1>

      <Button
        fullWidth
        size="medium"
        color="primary"
        onClick={validateParcours}
        variant="contained"
        style={{
          position: 'fixed', bottom: '2%', left: '5%', right: '10%', borderRadius: '20px',
        }}

      >
        Créer mon parcours
      </Button>
    </form>
  );
}

export default CreateParcours;
