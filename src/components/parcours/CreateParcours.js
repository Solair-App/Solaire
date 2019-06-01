import React from 'react';
import * as firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
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

function CreateParcours(props) {
  const classes = useStyles();
  const [values] = React.useState({
    name: '',
  });

  const [state, setState] = React.useState({
    currentValue: 'tous les champs sont requis',
  });

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

  const handleChange = name => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  function createParcours(parcours) {
    const { firestore } = props;

    firestore.doc('parcours/5').set(
      {
        name: parcours.name,
        description: parcours.description,
        thématique: parcours.thématique,
        langue: parcours.langue,
        durée: parcours.durée,
        difficulté: parcours.difficulté,
      },
      { merge: true },
    );
  }

  const category = getCategoryFromDB('parcours', 'ZaUZ5QfXw9nLWXa0SwIt');
  const language = getCategoryFromDB('parcours', 'AkD1DW8HDTZXf7Zmk165');
  const difficulty = [
    'Choisissez une difficulté',
    'Facile',
    'Avancé',
    'Difficile',
  ];
  const time = [
    'Choisissez la durée',
    '1 - 5 minutes',
    '5 - 25 minutes',
    'plus de 30 minutes',
  ];
  function stateIsRequired() {
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
      errorMessage: ' Tous les champs sont requis',
    });
    return false;
  }
  function validateParcours() {
    if (stateIsRequired()) {
      const currentParcours = new Parcours(
        state.name,
        state.description,
        state.thématique,
        state.langue,
        state.durée,
        state.difficulté,
      );
      createParcours(currentParcours);
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
      <h1 style={{ color: 'red', marginBottom: '15%' }}>{state.errorMessage}</h1>
      <Button
        fullWidth
        size="large"
        color="secondary"
        onClick={validateParcours}
        variant="contained"
        style={{
          position: 'fixed', bottom: '0', left: '0', borderRadius: '20px',
        }}

      >
        {' '}
        {validateParcours ? (
          <Link to="/AddCours" style={{}}>
      Créer mon parcours
          </Link>
        ) : 'Créer mon parcours' }
        <Link to="/AddCours" style={{}}>
        Créer mon parcours
        </Link>
      </Button>
    </form>
  );
}

export default withFirebaseContext(CreateParcours);
