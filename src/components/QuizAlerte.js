import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from 'react-router';


const QuizAlerte = ({ history, resetQuiz }) => {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose(choose) {
    setOpen(false);
    switch (choose) {
      case 'end': history.push('/parcours');
        break;
      case 'again': resetQuiz();
        history.push('/quiz');
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <Button style={{ marginTop: '20%' }} variant="outlined" color="primary" onClick={handleClickOpen}>
        Fin du quiz
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Bravo tu as fini le quiz !</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si tu as compris passe a la suite sinon, recommence !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('again')} color="primary">
          recommencer
          </Button>
          <Button onClick={() => handleClose('end')} color="primary" autoFocus>
            passer a la suite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default withRouter(QuizAlerte);
