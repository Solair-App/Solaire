



  import React from 'react';
  import SelectField from './SelectField'
import * as firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'firebase/firestore';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    
    flexWrap: 'wrap',
    height: '100%'
  },
  textField: {
    

    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));



function TextFields(props) {
  const classes = useStyles();
  const [values] = React.useState({
    name: '',
   
  });


  const [state, setState] = React.useState({
    parcours: {}

  });

  function getCategoryFromDB (collection, doc) {
    let category = []
    const db = firebase.firestore()
   let themRef = db.collection(collection).doc(doc);
   themRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      let dbCategory = doc.data()
      for (let [, value] of Object.entries(dbCategory)) {
        category.push(`${value}`)
      }
      
      
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

  return category
   }

  const handleChange = name => event => {
    setState({ ...state.parcours, [name]: event.target.value });
  };

  const category1 = getCategoryFromDB('parcours', 'ZaUZ5QfXw9nLWXa0SwIt' )
  const language = getCategoryFromDB('parcours','AkD1DW8HDTZXf7Zmk165')
  const difficulty = ['Facile', 'Avancé', 'Difficile'] 
  const time = ['1 - 5 minutes', '5 - 25 minutes', 'plus de 30 minutes']   


  function storeCourse() {

  

    const { firestore } = props;
    console.log(firestore)
    firestore.doc(`parcours/`).set({
      state,
      
  }, { merge: true });
  } 


  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-name"
        label="Nom du parcours"
        className={classes.textField}
        value={values.text}
        onChange={handleChange('name')}
        margin="normal"
      />
      <TextField
       id="filled-multiline-flexible"
       label="Description"
       multiline
       rows="5"
        defaultValue=""
        onChange={handleChange('description')}
        className={classes.textField}
        margin="normal"
      />
      <SelectField choices={category1} name={'thématique'} handleChange={handleChange}  />
      <SelectField choices={language} name={'langue'} handleChange={handleChange}/>
      <SelectField choices={time} name={'Durée'} handleChange={handleChange}/>
      <SelectField choices={difficulty} name={'Difficulté'}handleChange={handleChange}/>

      <Button  fullWidth={true} size='large' color='inherit' onClick={storeCourse} >Créer mon parcours</Button>
    </form>
  );
}

export default withFirebaseContext(TextFields);