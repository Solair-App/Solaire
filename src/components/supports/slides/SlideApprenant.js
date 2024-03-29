import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import * as firebase from 'firebase';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    backgroundColor: '#FFF2E9',
    [theme.breakpoints.down('770')]: {
      backgroundColor: 'transparent',
    },
  },

  header: {
    backgroundColor: '#138787',
    height: '50px',
    overflow: 'hidden',
  },

  title: {
    marginTop: 20,
    color: 'black',
    fontSize: '1.5em',
  },

  container: {
    width: 'auto',
    overflow: 'hidden',
    padding: 10,
  },

  infosCours: {
    [theme.breakpoints.down('770')]: {
      display: 'none',
    },
    padding: '3%',
    paddingTop: '5%',
    paddingBottom: '5%',
  },

  titresInfoCours: {
    fontSize: '1.5em',
    paddingTop: '5%',
  },

  texteInfoCours: {
    paddingTop: '2%',
    marginBottom: '40px',
  },

  nomDuCours: {
    fontSize: '2em',
  },

  steppeur: {
    zIndex: 1,
    backgroundColor: '#FFF2E9',
  },

  button: {
    bottom: 55,
    textAlign: 'center',
    marginTop: '10%',
  },

  button2: {
    [theme.breakpoints.up('770')]: {
      display: 'none',
    },
  },

  image: {
    width: '300px',
  },

  texte: {
    paddingTop: '5px',
    paddingBottom: '10px',
  },

  imagePosition: {
    [theme.breakpoints.up('770')]: {
      textAlign: 'center',
      paddingTop: '5%',
      paddingBottom: '5%',
    },
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '5%',
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
            position: 'absolute', left: 9, top: 13, width: '30%', color: 'white',
          }}
          onClick={() => {
            history.goBack();
          }}
        />
      </div>

      <div className={classes.container}>
        <Grid
          container
          style={{
            margin: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} sm={12} md={5}>
            <div className={classes.infosCours}>
              <h1 className={classes.nomDuCours}>{infoSlide.name}</h1>
              <h2 className={classes.titresInfoCours}>Description :</h2>
              <p className={classes.texteInfoCours}>{infoSlide.description}</p>

              <Fab
                variant="extended"
                size="medium"
                aria-label="Add"
                className={classes.button}
                onClick={connectDb}
                style={{
                  width: '70%',
                  color: 'white',
                  backgroundColor: '#E15920',
                }}
              >
          Cours terminé
              </Fab>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <div className={classes.slide}>

              <h1 className={classes.title}>
                {infoSlide.slides && Object.values(infoSlide.slides)[activeStep] && Object.values(infoSlide.slides)[activeStep].title}
              </h1>
              <div className={classes.texte}>
                {ReactHtmlParser(infoSlide.slides && Object.values(infoSlide.slides)[activeStep] && Object.values(infoSlide.slides)[activeStep].content)}
              </div>
              <div className={classes.imagePosition}>
                {infoSlide.slides && Object.values(infoSlide.slides)[activeStep] && Object.values(infoSlide.slides)[activeStep].image
                  ? <img src={infoSlide.slides && Object.values(infoSlide.slides)[activeStep] && Object.values(infoSlide.slides)[activeStep].image} alt="imageSlide" className={classes.image} /> : ''}
              </div>
              <MobileStepper
                steps={maxSteps}
                variant="text"
                activeStep={activeStep}
                className={classes.steppeur}
                position="static"
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
              <Fab
                variant="extended"
                size="medium"
                aria-label="Add"
                className={classes.button2}
                onClick={connectDb}
                style={{
                  width: '70%',
                  color: 'white',
                  backgroundColor: '#E15920',
                  marginTop: '2%',
                  marginBottom: '40px',
                }}
              >
          Cours terminé
              </Fab>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};


export default withRouter(withFirebaseContext(SlideApprenant));
