import React from 'react';
import * as firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import SelectField from './SelectField';
import 'firebase/firestore';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
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
  const [values] = React.useState({

  });

  const [state, setState] = React.useState({
    currentValue: 'tous les champs sont requis',
  });
  // Récupération des informations dans la DB
  function getCategoryFromDB(collection, doc) {
    const category = ['Choisissez une catégorie'];
    const db = firebase.firestore();
    const themRef = db.collection(collection).doc(doc);
    themRef
      .get()
      .then((document) => {
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

    parcoursRef.set(
      {
        name: parcours.name,
        description: parcours.description,
        thématique: parcours.thématique,
        langue: parcours.langue,
        durée: parcours.durée,
        difficulté: parcours.difficulté,
      },
      { merge: true },

    ).then(() => {
      setState({
        ...state,
        id: parcoursRef.id,
      });

      redirect();
    });
    return false;
  }

  // tableaux de data de la DB, servant à map.
  const category = getCategoryFromDB('parcours', 'bJdXDbnHIKwLUdxTGskW');
  const language = getCategoryFromDB('parcours', 'HCMRHOU3DoSelrR7iFhy');
  const difficulty = getCategoryFromDB('parcours', 'NK294sVIv9Tejw2N19bY');
  const time = getCategoryFromDB('parcours', 'bHeKCjXlUAtK9YruIqm5');

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
      return true;
    }
    return false;
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
        choices={category}
        name="thématique"
        handleChange={handleChange}
        currentValue={state.thématique}
      />
      <SelectField
        required
        choices={language}
        name="langue"
        handleChange={handleChange}
        currentValue={state.langue}
      />
      <SelectField
        required
        choices={time}
        name="durée"
        handleChange={handleChange}
        currentValue={state.durée}
      />
      <SelectField
        underlineStyle={{ display: 'none' }}
        iconStyle={{ fill: '#ff0000' }}
        labelStyle={{ color: '#ff0000' }}
        required
        choices={difficulty}
        name="difficulté"
        handleChange={handleChange}
        currentValue={state.difficulté}
      />
      <h3 style={{ color: 'red', marginBottom: '15%' }}>{state.errorMessage}</h3>


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

export default withFirebaseContext(CreateParcours);
