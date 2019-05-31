import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  container: {
    display:'inline-block',
    verticalAlign:'middle',
    margin: 'auto',
    
    
    
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
 
  },
}));


function DialogSelect(props) {

  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,

  });

  const handleChange = name => event => {
    setState({ ...state, name: event.target.value });
  };

  function handleClickOpen() {
    setState({ ...state, open: true });
  }

  function handleClose() {
    setState({ ...state, open: false });
  }
console.log(state.langue)
  return (
   
    <div style={{marginBottom: '20%'}}>
      <Button  style={{fontSize: '2vh'}} onClick={handleClickOpen}>{props.name}</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={state.open} onClose={handleClose}>
        <DialogTitle style={{fontSize: '3vh'}}>Choisissez une {props.name}</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel>{props.name}</InputLabel>
              <Select
                native
               
                onChange={handleChange(props.name)}
                input={<Input />}
              > {  props.choices.map((category, index)=> <option value={category}>{category}</option> )}
              </Select>
              
            
            </FormControl>
           
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose}  color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <h1> </h1>
    </div>
  );
}

export default DialogSelect;

