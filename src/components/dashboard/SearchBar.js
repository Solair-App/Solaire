import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '40%',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function SearchBar() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="age-customized-select">Nom du cours</InputLabel>
        <BootstrapInput />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="age-customized-select">Filtre</InputLabel>
        <Select
          value={age}
          onChange={handleChange}
          input={<BootstrapInput name="Filtre" id="age-customized-select" />}
        >
          <MenuItem value="">
            <em>Thématique</em>
          </MenuItem>
          <MenuItem value={10}>Catégorie</MenuItem>
          <MenuItem value={20}>Catégorie 1</MenuItem>
          <MenuItem value={30}>Catégorie 2</MenuItem>
        </Select>
      </FormControl>

    </form>
  );
}

export default SearchBar;
