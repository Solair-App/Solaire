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
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import withFirebaseContext from '../Firebase/withFirebaseContext';

import '../App.scss';

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


const CreateSlider = ({ firestore, history }) => {
  const [infoSlide, setSlide] = useState({ slides: [] });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const docRef = firestore.collection('parcours').doc(localStorage.getItem('id')).collection('cours').doc(localStorage.getItem('coursId'));
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
  });
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
    const slideSet = db.collection('parcours').doc(localStorage.getItem('id')).collection('cours');
    const slide = slideSet.doc(localStorage.getItem('coursId'));
    slide.set({
      type: 'slide', name, description, finish: true,
    }, { merge: true });
    event.preventDefault();
    history.push('/AddCours');
  };

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function redirect(url) {
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  }

  return (
    <div className={classes.root}>
      <ArrowBack
        style={{ position: 'fixed', left: '10px', top: '10px' }}
        onClick={() => {
          redirect('/AddCours');
        }}
      />
      <h1>Créer un slider</h1>
      {Object.keys(infoSlide.slides).length > 0
        ? <h2 style={{ marginTop: '8px' }}>Aperçu du slider en cours</h2>
        : <p style={{ marginTop: '8px' }}>Ce slider ne contient pas encore de questions</p>
      }

      {
        infoSlide.slides && Object.values(infoSlide.slides).map(sl => <div className="import">{ReactHtmlParser(sl)[activeStep]}</div>)
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
          <Link to="/addslide">
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
