import React from 'react';


import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import '../../../SCSS/SelectField.scss';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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
function DialogSelect(props) {
  // ferme la boite de dialogue


  const classes = useStyles();
  const {
    name, choices, handleChange, currentValue,
  } = props;

  return (
    <div style={{ marginBottom: '10%' }}>


      {name}


      {' '}


      <TextField
        id="standard-select-currency"
        select
        name={name}
        label="Select"
        className={classes.textField}

        onChange={handleChange(`${name}`)}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText={`please select your ${name}`}
        margin="normal"
      >

        {choices.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>


      <h3 style={name === 'difficulté' ? { color: 'white', marginBottom: '15%' } : { color: 'white', marginBottom: '10%' }}>
        {' '}
        {currentValue}
      </h3>
    </div>
  );
}

export default DialogSelect;
