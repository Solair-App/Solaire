import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../../../SCSS/SelectField.scss';

function DialogSelect(props) {
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
  console.log(choices);
  return (
    <div style={{ marginBottom: '10%' }}>
      <Button
        variant="contained"
        color="primary"
        style={{ borderRadius: '20px' }}
        onClick={handleClickOpen}
      >

        {name}
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={state.open}
        onChange={handleClose}
      >

        <DialogTitle className="DialogTitle">
          Choisissez une
          {' '}
          {name}
        </DialogTitle>
        {' '}


        <DialogContent className="DialogContent">

          <form className="classesContainer">

            <FormControl className="classesFormControl">

              <Select
                native
                onChange={handleChange(name)}
                input={<Input />}
                className="Select"
              >
                {' '}
                {choices.map((category, index) => (
                  <option key={`${index + 1}a`} value={category}>
                    {category}
                  </option>
                ))}
              </Select>

            </FormControl>

          </form>

        </DialogContent>

      </Dialog>
      <h3 style={name === 'difficulté' ? { color: 'white', marginBottom: '15%' } : { color: 'white', marginBottom: '10%' }}>
        {' '}
        {currentValue}
      </h3>
    </div>
  );
}

export default DialogSelect;
