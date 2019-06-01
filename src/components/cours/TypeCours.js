import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Add from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',

  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

function TypeCours() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Quizz');

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>

        <RadioGroup
          aria-label="Type"
          name="Type"
          className={classes.group}
          value={value}
          onChange={handleChange}

        >
          <FormControlLabel value="Quizz" control={<Radio />} label="Quizz" />
          <FormControlLabel value="Vidéo" control={<Radio />} label="Vidéo" />
          <FormControlLabel value="Slide" control={<Radio />} label="Slide" />

        </RadioGroup>

        <Button>
          {' '}
          <Add />
Ajouter cours
        </Button>
      </FormControl>
    </div>
  );
}

export default TypeCours;
