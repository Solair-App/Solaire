import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles(theme => ({
  root: {


  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
    marginBottom: '20px',
  },
}));

function TypeCours(props) {
  const classes = useStyles();


  const { getType, currentValue } = props;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>

        <RadioGroup
          aria-label="Type"
          name="Type"
          className={classes.group}
          value={currentValue}
          onChange={getType}

        >
          <FormControlLabel value="Quizz" control={<Radio />} label="Quizz" style={{ marginBottom: '20px' }} />
          <FormControlLabel value="Vidéo" control={<Radio />} label="Vidéo" style={{ marginBottom: '20px' }} />
          <FormControlLabel value="Slide" control={<Radio />} label="Slide" style={{ marginBottom: '20px' }} />

        </RadioGroup>

      </FormControl>
    </div>
  );
}

export default TypeCours;
