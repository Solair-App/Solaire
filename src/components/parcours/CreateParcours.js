import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import SelectField from './SelectField';
import { withRouter } from 'react-router';


import Parcours from './Parcours';

import '../../SCSS/CreateParcours.scss';



function CreateParcours({ firestore, history }) {

  const [values] = React.useState({});

  const [state, setState] = React.useState({
    currentValue: 'tous les champs sont requis',
  });

  // Récupération des informations dans la DB
  function getCategoryFromDB(collection, doc) {
    const category = ['Choisissez une catégorie'];
    const db = firestore;
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
    setTimeout(history.push('/AddCours'), 5000);
  }

  // Stockage du parcours dans la db
  function pushParcoursInsideDB(parcours) {
    const db = firestore;
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
    <form className="classesContainer" autoComplete="off">
      <h2 className="h2">Création de parcours</h2>
      <div>
        <TextField
          required
          id="standard-name"
          label="Nom du parcours"
          className='textfield'
          value={values.text}
          onChange={handleChange('name')}
          style={{ marginTop: '5%', width: '50%' }} />
      </div> <div>
        <TextField
          required
          id="filled-multiline-flexible"
          label="Description"
          multiline
          rows="5"
          onChange={handleChange('description')}
          className="textField"
          style={{ marginBottom: '5%', width: '50%' }} />

      </div>
      <SelectField
        required
        choices={categoryToArray('thématique')}
        name="thématique"
        handleChange={handleChange}
        currentValue={state.thématique}
        className="selectField"
        style={{ borderRadius: '20px' }} />

      <SelectField
        required
        choices={categoryToArray('langue')}
        name="langue"
        handleChange={handleChange}
        currentValue={state.langue}
        class="container" />

      <SelectField
        required
        choices={categoryToArray('durée')}
        name="durée"
        handleChange={handleChange}
        currentValue={state.durée}
        class="container" />

      <SelectField
        required
        choices={categoryToArray('difficulté')}
        name="difficulté"
        handleChange={handleChange}
        currentValue={state.difficulté}
        className="selectField" />

      <h3 className="h3">{state.errorMessage}</h3>

      <Button
        size="large"
        color="primary"
        onClick={validateParcours}
        variant="contained"
        style={{ position: 'fixed center', bottom: '2%', left: '0%', right: '0%', borderRadius: '20px' }}
        className="Button">
        Créer mon parcours
      </Button>

    </form>
  );
}

export default withRouter(withFirebaseContext(CreateParcours));
