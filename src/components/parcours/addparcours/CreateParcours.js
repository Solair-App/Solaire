
import React, { useState, useEffect } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import SelectField from './SelectField';
import Parcours from './Parcours';
import '../../../SCSS/CreateParcours.scss';


function CreateParcours({
  firestore, match, history, state,
}) {
  const [value, setValue] = useState({
    currentValue: 'tous les champs sont requis',
  });

  useEffect(() => {
    if (match.params.parcoursId) {
      const currentparcours = match.params.parcoursId;
      const db = firestore;
      const parcours = db.collection('parcours').doc(currentparcours);
      parcours
        .get()
        .then((doc) => {
          const dataParcours = doc.data();
          setValue({
            name: dataParcours.name,
            description: dataParcours.description,
            thématique: dataParcours.thématique,
            langue: dataParcours.langue,
            durée: dataParcours.durée,
            difficulté: dataParcours.difficulté,
            tags: dataParcours.tags,
          });
        });
    }
  }, [firestore, history, match]);

  // Modifications du state

  // redirection si le parcours est crée
  function redirect(url) {
    history.push({
      pathname: url,
      state: { parcours: true },
    });
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
          tags: parcours.tags,
          isReadable: false,
          creator: localStorage.getItem('userId'),
          rating: 0,
          votants: [],
          commentaires: {},
        },
        { merge: true },
      )
      .then(() => {
        redirect(`/createparcours/${parcoursRef.id}/addcours`);
      });
  }

  function modifyParcoursInsideDB(parcours, idParcours) {
    const db = firestore;
    db.collection('parcours').doc(idParcours).set(
      {
        name: parcours.name,
        description: parcours.description,
        thématique: parcours.thématique,
        langue: parcours.langue,
        durée: parcours.durée,
        difficulté: parcours.difficulté,
        tags: parcours.tags,
      },
      { merge: true },
    )
      .then(() => {
        redirect(`/createparcours/${idParcours}/addcours`);
      });
  } const handleChange = name => (event) => {
    setValue({ ...value, [name]: event.target.value });
  };


  // Vérifie si tous les states sont bien remplis, sinon renvoie un message d'erreur
  function allStateAreFill() {
    if (
      value.name
      && value.description
      && value.thématique
      && value.langue
      && value.durée
      && value.difficulté
      && value.tags
    ) {
      return true;
    }
    setValue({
      ...value,
      errorMessage: ' Tous les champs sont requis',
    });
    return false;
  }
  // création de l'objet parcours
  function validateParcours() {
    if (allStateAreFill()) {
      const currentParcours = new Parcours(
        value.name,
        value.description,
        value.thématique,
        value.langue,
        value.durée,
        value.difficulté,
        value.tags,
      );
      let idParcours;
      if (match.params.parcoursId) {
        idParcours = match.params.parcoursId;
        modifyParcoursInsideDB(currentParcours, idParcours);
      } else {
        pushParcoursInsideDB(currentParcours);
      }
    }
  }
  return (

    <form className="classesContainer" autoComplete="off">
      <ArrowBack
        style={{ position: 'fixed', left: '10px', top: '10px' }}
        onClick={() => {
          redirect('/mydashboard');
        }}
      />
      <h2 className="h2" style={{ marginTop: '5%' }}>Création de parcours</h2>
      <div>
        <TextField
          required
          id="standard-name"
          label="Nom du parcours"
          className="textfield"
          value={value.name}
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
          value={value.description}
          multiline
          rows="5"
          onChange={handleChange('description')}
          className="textField"
          style={{ marginTop: '2%', marginBottom: '5%', width: '50%' }}
        />
      </div>
      <div>
        <TextField
          required
          id="standard-name"
          label="tags"
          className="textfield"
          value={value.tags}
          onChange={handleChange('tags')}
          style={{ marginTop: '5%', width: '50%' }}
        />
      </div>
      <SelectField
        required
        choices={state.thématique}
        name="thématique"
        handleChange={handleChange}
        value={value.thématique}
        className="selectField"
        style={{ borderRadius: '20px' }}
      />
      <SelectField
        required
        choices={state.langue}
        name="langue"
        handleChange={handleChange}
        value={value.langue}
        class="container"
      />
      <SelectField
        required
        choices={state.durée}
        name="durée"
        handleChange={handleChange}
        value={value.durée}
        class="container"
      />
      <SelectField
        required
        choices={state.difficulté}
        name="difficulté"
        handleChange={handleChange}
        value={value.difficulté}
        className="selectField"
      />

      <h3 className="h3">{value.errorMessage}</h3>
      <Button
        variant="outlined"
        onClick={validateParcours}
        name="thématique"
        className="Button"
        style={{
          margin: '30px 0 30px 0',
          width: '300px',
        }}
      >
        {match.params.parcoursId ? 'Sauver mes modifications' : 'Créer mon parcours'}
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
