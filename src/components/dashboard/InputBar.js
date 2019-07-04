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
    flexWrap: 'wrap',
    width: '100%',
  },
  input: {
    color: 'white',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    display: 'flex',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
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
      <div
        className={classes.search}
        style={{
          display: 'flex', justifyContent: 'space-around', backgroundColor: '#138787', color: 'white', borderRadius: 0, height: '50px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <SearchIcon style={{ margin: '10px', position: 'absolute' }} />
          <InputBase
            name="searchField"
            onChange={handleChange}
            placeholder="Rechercher..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'Search' }}
            style={{
              margin: '21px 20px 30px -20px',
              width: '265px',
              textAlign: 'left',
              fontSize: '18px',
            }}
            value={currentValue}
          />
        </div>
        <TextField
          id="standard-select-currency"
          select
          name="filter"
          className={classes.margin}
          value={currentFilterValue}
          onChange={handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          style={{
            width: '150px',
            marginTop: 6,
            marginRight: 10,
            backgroundColor: '#4ca9a9',
            // /*#F67E4B*/
            borderRadius: '4px',
            paddingLeft: '4px',
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
