import React, { useState, useEffect } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Add from '@material-ui/icons/Add';
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
import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import SimpleModal from '../../SimpleModal';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import '../../../App.scss';
import '../../../SCSS/CreateParcours.scss';

const useStyles = makeStyles(theme => ({
  root: {
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


  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [saveError, setError] = React.useState('');
  const maxSteps = infoSlide.slides && Object.values(infoSlide.slides).length;

  const getInfo = () => {
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
  };

  const isContentNull = () => {
    if (name === '' || description === '') {
      return true;
    }
    return false;
  };

  const back = () => {
    if (Object.values(infoSlide.slides).length > 0 && isContentNull()) {
      setError('Veuillez ajouter un nom et une description');
    } else {
      history.push(`/createparcours/${parcours}/addcours`);
    }
  };

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
    if (isContentNull()) {
      setError('Veuillez ajouter un nom et une description');
    } else {
      const slideSet = db.collection('parcours').doc(parcours).collection('cours');
      const slide = slideSet.doc(cours);
      slide.set({
        type: 'slide', name, description, finish: true, creator: localStorage.getItem('userId'), graduate: [],
      }, { merge: true });
      event.preventDefault();
      history.push(`/createparcours/${parcours}/addcours`);
    }
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
    getInfo();
  };

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <div className={classes.root}>
      <div className="topFond">
        <ArrowBack
          style={{
            position: 'absolute', left: '10px', top: '10px', color: 'white',
          }}
          onClick={back}
        />
        <h1>Créer un slider</h1>
      </div>
      <SimpleModal open={open} idCours={id} togle={closed} deleted={deleting} />
      <h2 style={{ marginTop: '7px', marginBottom: '3px' }}>Aperçu du slider en cours</h2>
      {
        <div className="aperçuSlider">
          <h3 className="titleSlide">
            {infoSlide.slides && Object.values(infoSlide.slides)[activeStep]
              && Object.values(infoSlide.slides)[activeStep].title}
            {Object.keys(infoSlide.slides).length > 0
              && <DeleteIcon onClick={() => opened(Object.keys(infoSlide.slides)[activeStep])} />}
          </h3>
          <p>
            {ReactHtmlParser(infoSlide.slides
              && Object.values(infoSlide.slides)[activeStep]
              && Object.values(infoSlide.slides)[activeStep].content)}
          </p>
          {infoSlide.slides && Object.values(infoSlide.slides)[activeStep]
            && Object.values(infoSlide.slides)[activeStep].image
            && <img className="imgSlide" src={Object.values(infoSlide.slides)[activeStep].image} alt="imageSlide" />}
        </div>
      }
      {Object.keys(infoSlide.slides).length > 0
        ? (
          <MobileStepper
            steps={maxSteps}
            className="mobileStepper"
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={(
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Suivant
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            )}
            backButton={(
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Précédent
              </Button>
            )}
          />
        )
        : <p style={{ marginTop: '8px' }}>Ce slider ne contient pas encore de slides</p>
      }


      <Grid container>

        <Grid item xs={12}>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/createparcours/${parcours}/${cours}/addslide`}
          >
            <Fab
              variant="extended"
              size="medium"
              aria-label="Add"
              style={{
                width: '210px',
                color: 'white',
                marginBottom: '14px',
                backgroundColor: '#138787',
              }}
            >
              <Add className="saveicon" />
              Ajouter une slide
            </Fab>
          </Link>
        </Grid>
        <div className="saveBox">
          <Grid item xs={12}>
            <TextField
              required
              label="Nom du cours"
              name="name"
              className="textfield"
              value={name}
              onChange={onChange}
              style={{ marginTop: '5%', width: '80%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Description du cours"
              name="description"
              className="textfield"
              value={description}
              onChange={onChange}
              style={{ marginTop: '5px', width: '80%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Fab
              variant="extended"
              size="medium"
              aria-label="Add"
              onClick={saveCours}
              style={{
                width: '300px',
                color: 'white',
                marginTop: '18px',
                borderRadius: '4px',
                backgroundColor: '#E15920',
              }}
            >
              <SaveIcon className="saveicon" />
              Enregistrer ce slider
            </Fab>
          </Grid>
        </div>
        {saveError && <p style={{ margin: 'auto', paddingTop: '3px' }}>{saveError}</p>}
      </Grid>
    </div>
  );
};

export default withRouter(withFirebaseContext(CreateSlider));
