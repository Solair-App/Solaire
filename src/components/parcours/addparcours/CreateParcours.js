import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import * as firebase from 'firebase';
import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import SelectField from './SelectField';
import Parcours from './Parcours';
import BottomNav from '../../dashboard/BottomNav';
import '../../../SCSS/CreateParcours.scss';
import ImageUpload from '../../profile/ImageUpload';


function CreateParcours({
  firestore, match, history,
}) {
  const [cat, setCat] = useState({});
  const [value, setValue] = useState({
    currentValue: 'tous les champs sont requis',
    url: 'https://firebasestorage.googleapis.com/v0/b/shared-elearning.appspot.com/o/images%2Flearning%20placeholder.jpg?alt=media&token=61160392-656c-4810-9fdc-ccb4542279d4',
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
            url: dataParcours.url,
          });
        });
    }
    let category = [];
    if ((!cat.thématique && !cat.difficulté && !cat.durée && !cat.langue)
      || (cat.thématique.length < 2 && cat.difficulté.length < 2
        && cat.durée.length < 2 && cat.langue.length < 2)) {
      const forLoop = ['thématique', 'difficulté', 'durée', 'langue'];
      // eslint-disable-next-line no-shadow
      const firestore = firebase.firestore();
      const db = firestore;
      let catTmp = {};
      for (let i = 0; i < forLoop.length; i += 1) {
        const themRef = db.collection('category').doc(forLoop[i]);
        // eslint-disable-next-line no-loop-func
        themRef.get().then((document) => {
          const dbCategory = document.data();

          // eslint-disable-next-line no-restricted-syntax
          for (const [, val] of Object.entries(dbCategory)) {
            category.push(`${val}`);
          }
          catTmp = { ...catTmp, [forLoop[i]]: category };
          category = [];
          setCat(catTmp);
        });
      }
    }
  }, [firestore, history, match, cat.length,
    cat.difficulté, cat.durée,
    cat.langue, cat.thématique]);

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
          creatorName: localStorage.getItem('userName'),
          creator: localStorage.getItem('userId'),
          rating: 0,
          votants: [],
          commentaires: {},
          apprenants: [],
          url: parcours.url,
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
        url: parcours.url,
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
  // récupération url
  const getImage = (url) => {
    setValue({ ...value, url });
  };
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
        value.url,
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
    <>
      <form className="classesContainer" autoComplete="off" style={{ paddingBottom: '80px' }}>
        <div className="topFond">
          <h1>Création de parcours</h1>
          <ArrowBack
            style={{ position: 'absolute', left: '10px', top: '10px' }}
            onClick={() => {
              history.push('/mydashboard');
            }}
          />
        </div>
        <div style={{ marginTop: '1.5em' }}>
          <ImageUpload getImage={getImage} />
        </div>
        <div>
          <TextField

            id="standard-name"
            label="Nom du parcours"
            className="textfield"
            value={value.name}
            onChange={handleChange('name')}
            style={{ marginTop: '9px', width: 298 }}
          />
        </div>
        {' '}
        <div>
          <TextField

            id="filled-multiline-flexible"
            label="Description"
            value={value.description}
            multiline
            onChange={handleChange('description')}
            className="textfield"
            style={{ marginTop: '9px', width: 298 }}
          />
        </div>
        <TextField
          id="standard-name"
          label="tags"
          className="textfield"
          value={value.tags}
          onChange={handleChange('tags')}
          style={{ marginTop: '9px', width: 298 }}
        />

        <div style={{ marginTop: 7 }}>
          {cat.thématique && (
          <SelectField

            choices={cat.thématique}
            name="thématique"
            handleChange={handleChange}
            value={value.thématique}
            className="selectField"
          />
          )}
        </div>
        <div style={{ marginTop: -36 }}>
          {cat.langue
        && (
          <SelectField
            choices={cat.langue}
            name="langue"
            handleChange={handleChange}
            value={value.langue}
            class="container"
          />
        )
      }
        </div>
        <div style={{ marginTop: -36 }}>
          {cat.durée
        && (
          <SelectField
            choices={cat.durée}
            name="durée"
            handleChange={handleChange}
            value={value.durée}
            class="container"
          />
        )
      }
        </div>
        <div style={{ marginTop: -36 }}>
          {cat.difficulté
        && (
          <SelectField

            choices={cat.difficulté}
            name="difficulté"
            handleChange={handleChange}
            value={value.difficulté}
            className="selectField"
          />
        )
      }
        </div>
        <h3 className="h3" style={{ marginBottom: 3, marginTop: -30 }}>{value.errorMessage}</h3>
        <Fab
          variant="extended"
          size="medium"
          aria-label="Add"
          onClick={validateParcours}
          style={{
            marginTop: '15px',
            marginLeft: '10px',
            width: '300px',
            color: 'white',
            backgroundColor: '#E15920',
          }}
        >
          {match.params.parcoursId ? 'Sauver mes modifications' : 'Créer mon parcours'}
        </Fab>
      </form>
      <BottomNav />
    </>
  );
}

export default withRouter(withFirebaseContext(CreateParcours));
