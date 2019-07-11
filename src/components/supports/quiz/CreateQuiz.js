import React, { Component } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import SaveIcon from '@material-ui/icons/Save';
import Add from '@material-ui/icons/Add';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import SimpleModal from '../../SimpleModal';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import '../../../SCSS/CreateParcours.scss';

class CreateQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoQuiz: {},
      quizData: '',
      name: '',
      description: '',
      error: '',
      open: false,
      coursId: 0,
    };
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
    this.cours = match.params.coursId;
    this.getInfo();
  }

  isContentNull = () => {
    const { name, description, infoQuiz } = this.state;
    if (name === '' || description === '' || Object.keys(infoQuiz).length <= 0) {
      return true;
    }
    return false;
  };

  back = () => {
    const { infoQuiz } = this.state;
    const { history } = this.props;
    if (Object.values(infoQuiz).length > 0 && this.isContentNull()) {
      this.setState({ error: 'Veuillez ajouter un nom et une description' });
    } else {
      history.push(`/createparcours/${this.parcours}/addcours`);
    }
  };


  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveCours = (event) => {
    const { name, description } = this.state;
    const { firestore } = this.props;
    const db = firestore;
    if (this.isContentNull()) {
      this.setState({ error: 'Veuillez ajouter un nom, une description et au moins une question' });
    } else {
      const quizSet = db.collection('parcours').doc(this.parcours).collection('cours');
      const quiz = quizSet.doc(this.cours);
      quiz.set({
        type: 'quiz', name, description, finish: true, creator: localStorage.getItem('userId'), graduate: [],
      }, { merge: true });
      event.preventDefault();
      const { history } = this.props;
      history.push(`/createparcours/${this.parcours}/addcours`);
    }
  }

  getInfo = () => {
    const { firestore } = this.props;
    const docRef = firestore.collection('parcours').doc(this.parcours).collection('cours').doc(this.cours);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const infoQuiz = doc.data();
        this.setState({
          quizData: infoQuiz,
          infoQuiz: infoQuiz.questions,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).then(() => {
      const { quizData } = this.state;
      if (quizData.name && quizData.description) {
        this.setState({ name: quizData.name, description: quizData.description });
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }


  redirect = (url) => {
    const { history } = this.props;
    history.push(url);
  }

  open = (id) => {
    this.setState({ open: true, coursId: id });
  }

  close = () => {
    this.setState({ open: false });
  }

  deleting = (number) => {
    const { firestore } = this.props;
    const docRef = firestore.collection('parcours').doc(this.parcours).collection('cours').doc(this.cours);
    docRef.update({
      [`questions.${number}`]: firebase.firestore.FieldValue.delete(),
    }).then(() => {
      console.log(`Document ${number} successfully deleted!`);
    })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    this.close();
    this.getInfo();
  }

  render() {
    const {
      infoQuiz, name, description, open, coursId, error,
    } = this.state;

    return (
      <Grid container>
        <div className="topFond">
          <ArrowBack
            style={{
              position: 'absolute', left: 9, top: 13, color: 'white',
            }}
            onClick={this.back}
          />
          <h1>Créer un quiz</h1>
        </div>
        <Grid item xs={12}>
          <SimpleModal open={open} idCours={coursId} togle={this.close} deleted={this.deleting} />
          <h2 style={{ marginTop: '7px', marginBottom: '3px' }}>Aperçu du quiz en cours</h2>
          {!Object.keys(infoQuiz).length > 0
            && <p style={{ marginTop: '8px' }}>Ce quiz ne contient pas encore de questions</p>
          }
          {Object.keys(infoQuiz).length > 0 && Object.keys(infoQuiz).map((key, index) => (
            <>
              <h3 style={{ marginTop: '8px' }}>
                {`Question ${index + 1}`}
                {' '}
                <span><DeleteIcon onClick={() => this.open(key)} /></span>
              </h3>
              <p key={infoQuiz.key}>
                {infoQuiz[key].question}
              </p>
              {infoQuiz[key].answers.map((answer, idex) => <p key={answer}>{`${idex + 1}/ ${answer}`}</p>)}
              <p key={infoQuiz[key]}>
                Bonne réponse :
                {' '}
                {infoQuiz[key].correct + 1}
              </p>
            </>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Link style={{ textDecoration: 'none' }} to={`/createparcours/${this.parcours}/${this.cours}/addquestion`}>
            <Fab
              variant="extended"
              size="medium"
              aria-label="Add"
              style={{
                width: '250px',
                color: 'white',
                marginTop: '10px',
                marginBottom: '20px',
                backgroundColor: '#138787',
              }}
            >
              <Add className="saveicon" />
              Ajouter une question
            </Fab>
          </Link>
        </Grid>
        <div className="saveBox">
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              label="Nom du cours"
              name="name"
              className="textfield"
              value={name}
              onChange={this.onChange}
              style={{ marginTop: '5%', width: '80%' }}
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
              onChange={this.onChange}
              style={{ marginTop: '5%', width: '80%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Fab
              variant="extended"
              size="medium"
              aria-label="Add"
              onClick={this.saveCours}
              style={{
                width: '300px',
                color: 'white',
                marginTop: '18px',
                borderRadius: '4px',
                backgroundColor: '#E15920',
              }}
            >
              <SaveIcon className="saveicon" />
              Enregistrer ce quiz
            </Fab>
          </Grid>
        </div>
        {error && <p style={{ margin: 'auto', paddingTop: '7px', width: '100%' }}>{error}</p>}
      </Grid>
    );
  }
}


export default withRouter(withFirebaseContext(CreateQuiz));
