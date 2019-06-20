import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import * as firebase from 'firebase';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from 'react-router';

const QuizAlerte = ({
  history, resetQuiz, parcours, cours,
}) => {
  const [open, setOpen] = React.useState(false);
  const connectDb = () => {
    firebase
      .firestore()
      .collection('parcours')
      .doc(parcours).collection('cours')
      .doc(cours)
      .set({
        graduate: firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem('userid'),
        ),
      }, { merge: true });
    history.push(`/parcours/${parcours}`);
  };
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose(choose) {
    setOpen(false);
    switch (choose) {
      case 'end': history.push(`/parcours/${parcours}`);
        connectDb();
        break;
      case 'again': resetQuiz();
        history.push(`/parcours/${parcours}/quiz/${cours}`);
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
