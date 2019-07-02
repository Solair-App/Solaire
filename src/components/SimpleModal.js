import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function SimpleModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const {
    open, togle, deleted, idCours,
  } = props;

  const deleteChoice = () => {
    if (props.deleteKey) {
      deleted(idCours, props.deleteKey);
    } else {
      deleted(idCours);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Voulez-vous vraiment supprimer cet élément ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Toute suppression est définitive.
            (Vos changements seront visibles dans quelques heures sur l`application)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => deleteChoice()}>
              Supprimer
          </Button>
          <Button variant="outlined" onClick={() => togle()}>
              Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default SimpleModal;
