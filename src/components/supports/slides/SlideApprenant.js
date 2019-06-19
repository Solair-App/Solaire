import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
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

const SlideApprenant = ({ firestore, location, history }) => {
  const [infoSlide, setSlide] = useState({ slides: [] });
  useEffect(() => {
    if (location.state && location.state.data) {
      const cours = location.state.data;
      setSlide(cours);
    } else {
      const docRef = firestore.collection('parcours').doc(localStorage.getItem('parcoursId')).collection('cours').doc(localStorage.getItem('coursId'));
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
  }, [location.state, history, firestore]);

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
      <h1>{infoSlide.name}</h1>
      <p>{infoSlide.description}</p>
      <ArrowBack
        style={{ position: 'fixed', left: '10px', top: '10px' }}
        onClick={() => {
          history.goBack();
        }}
      />
      {
        <div className="import">{ReactHtmlParser(infoSlide.slides && Object.values(infoSlide.slides)[activeStep])}</div>
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
    </div>
  );
};

export default withRouter(withFirebaseContext(SlideApprenant));
