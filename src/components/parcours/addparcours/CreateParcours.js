
import React from 'react';
import Cancel from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import Parcours from './Parcours';

import '../../../SCSS/CreateParcours.scss';


function CreateParcours(props) {
  const [state, setState] = React.useState({
    currentValue: 'tous les champs sont requis',
  });

  // Récupération des informations dans la DB
  function getCategoryFromDB(collection, doc) {
    const category = ['Choisissez une catégorie'];
    const { firestore } = props;
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
  function redirect(url) {
    const { history } = props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
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

  const currencies = categoryToArray('thématique');
  console.log(currencies);

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }));

  const classes = useStyles();

  const [values] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  return (
    <form className="classesContainer" autoComplete="off">
      <Cancel style={{ position: 'fixed', left: '4px', top: '4px' }} onClick={() => { redirect('/#/Dashboard'); }} />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <h2
          className="h2"
          style={{
            marginTop: '20px',
            width: '300px',
          }}
        >
            Création de parcours
        </h2>
        <Box>
          <TextField
            id="outlined-with-placeholder"
            label="Nom du parcours *"
            variant="outlined"
            className="textField"
            value={values.text}
            onChange={handleChange('name')}
            style={{
              marginTop: '20px',
              width: '300px',
            }}
          />
        </Box>
        <Box>
          <TextField
            required
            id="outlined-textarea"
            label="Description"
            multiline
            variant="outlined"
            rows="4"
            onChange={handleChange('description')}
            className="textField"
            style={{
              marginTop: '20px',
              width: '300px',
            }}
          />
        </Box>
        <Box>
          <TextField
            required
            id="outlined-select-currency"
            select
            name="thématique"
            label="Select"
            handleChange={handleChange}
            className={classes.textField}
            style={{
              marginTop: '10px',
              width: '300px',
            }}
            value={state.currencies}
            onChange={handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
            variant="outlined"
          >
            {Object.keys(currencies).map((key, value) => (
              <MenuItem value={currencies}>
                {currencies[key]}
                {console.log(currencies)}
              </MenuItem>
            ))}
          </TextField>

        </Box>

        <Box>
          {/* <SelectField
            required
            choices={categoryToArray('langue')}
            name="langue"
            handleChange={handleChange}
            currentValue={state.langue}
            class="container"
          /> */}
          <TextField
            required
            id="outlined-select-currency"
            select
            name="langue"
            label="Select"
            handleChange={handleChange}
            className={classes.textField}
            style={{
              marginTop: '10px',
              width: '300px',
            }}
            value={state.currencies}
            onChange={handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
            variant="outlined"
          >
            {Object.keys(currencies).map((key, value) => (
              <MenuItem value={currencies}>
                {currencies[key]}
                {console.log(currencies)}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box>
          {/* <SelectField
            required
            choices={categoryToArray('durée')}
            name="durée"
            handleChange={handleChange}
            currentValue={state.durée}
            class="container"
          /> */}
          <TextField
            required
            id="outlined-select-currency"
            select
            name="durée"
            label="Select"
            handleChange={handleChange}
            className={classes.textField}
            style={{
              marginTop: '10px',
              width: '300px',
            }}
            value={state.currencies}
            onChange={handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
            variant="outlined"
          >
            {Object.keys(currencies).map((key, value) => (
              <MenuItem value={currencies}>
                {currencies[key]}
                {console.log(currencies)}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box>
          {/* <SelectField
            required
            choices={categoryToArray('difficulté')}
            name="difficulté"
            handleChange={handleChange}
            currentValue={state.difficulté}
            className="selectField"
          /> */}
          <TextField
            required
            id="outlined-select-currency"
            select
            name="difficulté"
            label="Select"
            handleChange={handleChange}
            className={classes.textField}
            style={{
              marginTop: '10px',
              width: '300px',
            }}
            value={state.currencies}
            onChange={handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
            variant="outlined"
          >
            {Object.keys(currencies).map((key, value) => (
              <MenuItem value={currencies}>
                {currencies[key]}
                {console.log(currencies)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <h3 className="h3">{state.errorMessage}</h3>
        <Box>
          <Button
            variant="outlined"
            onClick={validateParcours}
            name="thématique"
            handleChange={handleChange}
            currentValue={state.thématique}
            className="Button"
            style={{
              marginTop: '10px',
              width: '300px',
            }}
          >
            Valider
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default withRouter(withFirebaseContext(CreateParcours));
