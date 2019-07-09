import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import * as firebase from 'firebase';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import '../../../App.scss';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100vw',
    height: '98vh',
    width: '200vw',
    overflow: 'hiden',
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#4ca9a9',
    height: '8vh',
    overflow: 'hidden',
  },
  title: {
    paddingTop: '10px',
    marginTop: '0px',
    paddingBottom: 5,
    color: 'white',
    fontSize: '1.5em',
  },
  container: {
    height: '87vh',
    overflowY: 'scroll',
    textAlign: 'left',
  },
  steppeur: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  button: {
    bottom: 55,
    textAlign: 'center',
  },
  image: {
    width: '50%',
  },

  imagePosition: {
    textAlign: 'center',
  },
}));


const SlideApprenant = ({
  firestore, history, location, match,
}) => {
  const [infoSlide, setSlide] = useState({ slides: [] });
  const parcours = match.params.parcoursId;
  const currentcours = match.params.coursId;
  useEffect(() => {
    if (localStorage.getItem('coursData')) {
      const cours = JSON.parse(localStorage.getItem('coursData'));
      setSlide(cours);
    } else {
      const docRef = firestore.collection('parcours').doc(parcours).collection('cours').doc(currentcours);
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
    }
  }, [firestore, history, location, match,
    currentcours, parcours]);

  const connectDb = () => {
    firebase
      .firestore()
      .collection('parcours')
      .doc(parcours).collection('cours')
      .doc(currentcours)
      .set({
        graduate: firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem('userId'),
        ),
      }, { merge: true });
    history.push(`/parcours/${parcours}`);
  };

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = infoSlide.slides && Object.values(infoSlide.slides).length;


  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <ArrowBack
          style={{
            position: 'absolute', left: '2vw', top: '2vh', width: '30%', color: 'white',
          }}
          onClick={() => {
            history.goBack();
          }}
        />
        <h1 className={classes.title}>{infoSlide.slides && Object.values(infoSlide.slides)[activeStep] && Object.values(infoSlide.slides)[activeStep].title}</h1>
      </div>
      <div className={classes.container}>
        <div
          className="import"
          style={{
            width: '100vw', height: '84.5vh', overflowY: 'scroll',
          }}
        >
          {ReactHtmlParser(infoSlide.slides && Object.values(infoSlide.slides)[activeStep] && Object.values(infoSlide.slides)[activeStep].content)}
          <div className={classes.imagePosition}>
            {infoSlide.slides && Object.values(infoSlide.slides)[activeStep] && Object.values(infoSlide.slides)[activeStep].image
              ? <img src={infoSlide.slides && Object.values(infoSlide.slides)[activeStep] && Object.values(infoSlide.slides)[activeStep].image} alt="imageSlide" className={classes.image} /> : ''}
          </div>
        </div>

      </div>
      <MobileStepper
        steps={maxSteps}
        variant="text"
        activeStep={activeStep}
        className={classes.steppeur}
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
      <Fab
        variant="extended"
        size="medium"
        aria-label="Add"
        className={classes.button}
        onClick={connectDb}
        style={{
          width: '300px',
          color: 'white',
          backgroundColor: '#E15920',
        }}
      >
          Cours terminé
      </Fab>
    </div>
  );
};


export default withRouter(withFirebaseContext(SlideApprenant));
