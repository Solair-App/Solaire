import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

function SearchAppBar(props) {
  const classes = useStyles();

  const {
    handleChange, currentValue, currentFilterValue, state,
  } = props;
  const thématique = ['All', ...state.thématique];

  return (
    <div className={classes.root}>

      <div className={classes.search}>
        <SearchIcon style={{ margin: '5px', position: 'absolute' }} />
        <InputBase
          name="searchField"
          onChange={handleChange}
          placeholder="Search tags..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'Search' }}
          style={{
            margin: '0px 20px 30px -20px',
            width: '265px',
            textAlign: 'left',
            fontSize: '18px',
          }}
          value={currentValue}
        />
        <TextField
          id="standard-select-currency"
          select
          name="filter"
          className={classes.textField}
          value={currentFilterValue}
          onChange={handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          style={{
            margin: '0px 0 30px -13px',
            width: '150px',
          }}
          margin="normal"
        >
          {state.thématique.length > 1 ? thématique.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )) : <p>loading</p>}
        </TextField>

      </div>


    </div>
  );
}
const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(SearchAppBar);
