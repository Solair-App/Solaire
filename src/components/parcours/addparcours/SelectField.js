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
    marginTop: '1px',
    width: 300,
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
    name, choices, handleChange, value,
  } = props;

  return (
    <div style={{ marginBottom: '10%' }}>
      {' '}
      <TextField
        id="standard-select-currency"
        select
        name={name}
        label={name}
        className={classes.textField}
        value={value}
        onChange={handleChange(`${name}`)}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        {choices.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default DialogSelect;
