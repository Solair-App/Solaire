
 /* componentDidMount() {
  

    console.log(this.props)
    const { firestore } = this.props;
    console.log(firestore)
    firestore.doc(`parcours/1`).set({
      name: 'tre',
      
  }, { merge: true });
  } */



  import React from 'react';
  import SelectField from './SelectField'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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



function TextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
   
  });


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const category = ['Science', 'Histoire', 'Astronomie']
  const language = ['Français', 'Anglais', 'Italien'] 
  const difficulty = ['Facile', 'Avancé', 'Difficile'] 
  const time = ['1 - 5 minutes', '5 - 25 minutes', 'plus de 30 minutes']   

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-name"
        label="Nom du parcours"
        className={classes.textField}
        value={values.name}
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
      <SelectField choices={category} name={'thématique'} handleChange={handleChange} />
      <SelectField choices={language} name={'langue'} handleChange={handleChange}/>
      <SelectField choices={time} name={'Durée'} handleChange={handleChange}/>
      <SelectField choices={difficulty} name={'Difficulté'}/>

      <Button  fullWidth={true} size='large' color='inherit'>Créer mon parcours</Button>
    </form>
  );
}

export default TextFields