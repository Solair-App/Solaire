import React from 'react';
import Cancel from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import SelectField from './SelectField';
import Parcours from './Parcours';

import '../../../SCSS/CreateParcours.scss';

function CreateParcours(props) {
  const [values] = React.useState({});

  const [state, setState] = React.useState({
    currentValue: 'tous les champs sont requis',
  });


  // Modifications du state
  const handleChange = name => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  // redirection si le parcours est crée
  function redirect(url) {
    const { history } = props;
    history.push(url);
  }

  // Stockage du parcours dans la db
  function pushParcoursInsideDB(parcours) {
    const { firestore } = props;
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

        redirect('/AddCours');
      });
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
      <Cancel
        style={{ position: 'fixed', left: '4px', top: '4px' }}
        onClick={() => {
          redirect('/Dashboard');
        }}
      />
      <h2 className="h2">Création de parcours</h2>
      <div>
        <TextField

          required
          id="standard-name"
          label="Nom du parcours"
          className="textfield"
          value={values.text}
          onChange={handleChange('name')}
          style={{ marginTop: '5%', width: '50%' }}
        />
      </div>
      {' '}
      <div>
        <TextField
          required
          id="filled-multiline-flexible"
          label="Description"
          multiline
          rows="5"
          onChange={handleChange('description')}
          className="textField"
          style={{ marginBottom: '5%', width: '50%' }}
        />
      </div>
      <SelectField
        required
        choices={props.state.thématique}
        name="thématique"
        handleChange={handleChange}
        currentValue={state.thématique}
        className="selectField"
        style={{ borderRadius: '20px' }}
      />
      <SelectField
        required
        choices={props.state.langue}
        name="langue"
        handleChange={handleChange}
        currentValue={state.langue}
        class="container"
      />
      <SelectField
        required
        choices={props.state.durée}
        name="durée"
        handleChange={handleChange}
        currentValue={state.durée}
        class="container"
      />
      <SelectField
        required
        choices={props.state.difficulté}
        name="difficulté"
        handleChange={handleChange}
        currentValue={state.difficulté}
        className="selectField"
      />
      <h3 className="h3">{state.errorMessage}</h3>
      <Button
        size="large"
        color="primary"
        onClick={validateParcours}
        variant="contained"
        style={{
          position: 'fixed center',
          bottom: '1%',
          left: '0%',
          right: '0%',
          borderRadius: '20px',
        }}
        className="Button"
      >
        Créer mon parcours
      </Button>
    </form>
  );
}
const mapStateToProps = state => ({
  state,
});

export default connect(
  mapStateToProps,

)(withRouter(withFirebaseContext(CreateParcours)));
