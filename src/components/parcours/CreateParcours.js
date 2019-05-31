import React from "react";
import SelectField from "./SelectField";
import * as firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "firebase/firestore";
import withFirebaseContext from "../../Firebase/withFirebaseContext";
import Parcours from './Parcours'
const useStyles = makeStyles(theme => ({
  container: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",

    flexWrap: "wrap",
    height: "100%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

function TextFields(props) {
  const classes = useStyles();
  const [values] = React.useState({
    name: ""
    
  });

  const [state, setState] = React.useState({
    currentValue :'tous les champs sont requis' 
    
  });

  function getCategoryFromDB(collection, doc) {
    let category = ['Choisissez une catégorie'];
    const db = firebase.firestore();
    let themRef = db.collection(collection).doc(doc);
    themRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let dbCategory = doc.data();
          for (let [, value] of Object.entries(dbCategory)) {
            category.push(`${value}`);
          }
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });

    return category;
  }
    
  const handleChange = name => event => {
  
    setState({ ...state, [name]: event.target.value });
    
  };
  function createParcours(parcours) {
    const { firestore } = props;

    firestore.doc(`parcours/5`).set(
      {
       name : parcours.name,
       description : parcours.description,
       thématique : parcours.thématique,
       langue : parcours.langue,
       durée : parcours.durée,
       difficulté : parcours.difficulté
      },
      { merge: true }
    );
  }

  const category = getCategoryFromDB("parcours", "ZaUZ5QfXw9nLWXa0SwIt");
  const language = getCategoryFromDB("parcours", "AkD1DW8HDTZXf7Zmk165");
  const difficulty = ["Choisissez une difficulté","Facile", "Avancé", "Difficile"];
  const time = ["Choisissez la durée","1 - 5 minutes", "5 - 25 minutes", "plus de 30 minutes"];

 
  function validateParcours() {
    if (stateIsRequired()) {
    const currentParcours = new Parcours(state.name, state.description, state.thématique, state.langue,state.durée, state.difficulté)
    createParcours(currentParcours)
    return true }
    else {
     return
    }
  }
  function stateIsRequired() {
    if (state.name && state.description && state.thématique && state.langue && state.durée && state.difficulté) {
      return true
    }

    else {
      setState({
        errorMessage :' Tous les champs sont requis'
      })
    }
  }

  return (
    
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
      required
        id="standard-name"
        label="Nom du parcours"
        className={classes.textField}
        value={values.text}
        onChange={handleChange("name")}
        margin="normal"
      />
      <TextField
      required
        id="filled-multiline-flexible"
        label="Description"
        multiline
        rows="5"
      
        onChange={handleChange("description")}
        className={classes.textField}
        margin="normal"
      />
      <SelectField
      required
        choices={category}
        name={"thématique"}
        handleChange={handleChange}
        currentValue={state.thématique}
      />
      <SelectField
      required
        choices={language}
        name={"langue"}
        handleChange={handleChange}
        currentValue={state.langue}
      />
      <SelectField  required choices={time} name={"durée"} handleChange={handleChange} currentValue={state.durée}/>
      <SelectField
      required
     
        choices={difficulty}
        name={"difficulté"}
        handleChange={handleChange}
        currentValue={state.difficulté}
      />
    <h1 style={{color: 'red'}}>{state.errorMessage}</h1>
      <Button
        fullWidth={true}
        size="large"
        color="inherit"
        onClick={validateParcours}
      >
        Créer mon parcours
      </Button>
    </form>
  );
}

export default withFirebaseContext(TextFields);
