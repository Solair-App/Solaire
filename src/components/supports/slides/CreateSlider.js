import React, { useState, useEffect } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import * as firebase from 'firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import SimpleModal from '../../SimpleModal';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import '../../../App.scss';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },

}));


const CreateSlider = ({ firestore, history, match }) => {
  const [infoSlide, setSlide] = useState({ slides: [] });
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');

  const parcours = match.params.parcoursId;
  const cours = match.params.coursId;

  useEffect(() => {
    const docRef = firestore.collection('parcours').doc(parcours).collection('cours').doc(cours);
    docRef.get().then((doc) => {
      if (doc.exists) {
        setSlide(doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
    if (infoSlide.name) {
      setName(infoSlide.name);
      setDescription(infoSlide.description);
    }
  }, [cours, parcours, firestore, infoSlide.name, infoSlide.slides.length, infoSlide.description]);
  // if (localStorage.getItem('coursCreated')) {
  //   const coursCreated = JSON.parse(localStorage.getItem('coursCreated'));
  //   this.setState({});
  // }

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = infoSlide.slides && Object.values(infoSlide.slides).length;

  const onChange = (event) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }
    if (event.target.name === 'description') {
      setDescription(event.target.value);
    }
  };

  const saveCours = (event) => {
    const db = firestore;
    const slideSet = db.collection('parcours').doc(parcours).collection('cours');
    const slide = slideSet.doc(cours);
    slide.set({
      type: 'slide', name, description, finish: true, creator: localStorage.getItem('userid'),
    }, { merge: true });
    event.preventDefault();
    history.push(`/createparcours/${parcours}/addcours`);
  };

  const opened = (myid) => {
    setOpen(true);
    setId(myid);
  };

  const closed = () => {
    setOpen(false);
  };

  const deleting = (number) => {
    const docRef = firestore.collection('parcours').doc(parcours).collection('cours').doc(cours);
    docRef.update({
      [`slides.${number}`]: firebase.firestore.FieldValue.delete(),
    }).then(() => {
      console.log(`Document ${number} successfully deleted!`);
    })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    closed();
  };

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <div className={classes.root}>
      <ArrowBack
        style={{ position: 'fixed', left: '10px', top: '10px' }}
        onClick={() => {
          history.goBack();
        }}
      />
      <SimpleModal open={open} idCours={id} togle={closed} deleted={deleting} />
      <h1>Créer un slider</h1>
      {Object.keys(infoSlide.slides).length > 0
        ? <h2 style={{ marginTop: '8px' }}>Aperçu du slider en cours</h2>
        : <p style={{ marginTop: '8px' }}>Ce slider ne contient pas encore de slides</p>
      }

      {
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="import">{ReactHtmlParser(infoSlide.slides && Object.values(infoSlide.slides)[activeStep])}</div>
          {console.log(Object.keys(infoSlide.slides)[activeStep])}
          <DeleteIcon onClick={() => opened(Object.keys(infoSlide.slides)[activeStep])} />
        </div>
      }

      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={(
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        )}
        backButton={(
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        )}
      />
      <Grid container>

        <Grid item xs={12}>
          <Link to={`/createparcours/${parcours}/${cours}/addslide`}>
            <Button
              size="medium"
              variant="contained"
              style={{ marginTop: '8%' }}
              className="Button"
            >
              Ajouter un slide
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            label="Nom du cours"
            name="name"
            className="textfield"
            value={name}
            onChange={onChange}
            style={{ marginTop: '5%', width: '50%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            label="Description du cours"
            name="description"
            className="textfield"
            value={description}
            onChange={onChange}
            style={{ marginTop: '5%', width: '50%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            size="large"
            variant="contained"
            onClick={saveCours}
            style={{ marginTop: '8%' }}
            className="Button"
          >
            Enregistrer ce cours
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(withFirebaseContext(CreateSlider));
