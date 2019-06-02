import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: 'auto',

    color: 'blue',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,

  },
}));

function DialogSelect(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
  });

  // ferme la boite de dialogue
  function handleClickOpen() {
    setState({ ...state, open: true });
  }

  function handleClose() {
    setState({ ...state, open: false });
  }
  const {
    name, choices, handleChange, currentValue,
  } = props;
  return (
    <div style={{ marginBottom: '10%' }}>
      <Button variant="contained" color="primary" style={{ borderRadius: '20px' }} onClick={handleClickOpen}>
        {name}
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={state.open}

        onChange={handleClose}

      >
        <DialogTitle style={{ fontSize: '1vh', backgroundColor: 'yellow' }}>
          Choisissez une
          {' '}
          {name}
        </DialogTitle>
        <DialogContent style={{ backgroundColor: 'red' }}>
          <form className={classes.container} style={{ backgroundColor: 'red' }}>
            <FormControl className={classes.formControl} style={{ backgroundColor: '' }}>

              <Select
                native
                onChange={handleChange(name)}
                input={<Input />}
                style={{ backgroundColor: 'red' }}


              >
                {' '}
                {choices.map((category, index) => (
                  <option key={`${index + 1}a`} value={category}>{category}</option>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>

      </Dialog>
      <h1 style={name === 'difficulté' ? { color: 'white', marginBottom: '15%' } : { color: 'white', marginBottom: '10%' }}>
        {' '}
        {currentValue}
      </h1>
    </div>
  );
}

export default DialogSelect;
