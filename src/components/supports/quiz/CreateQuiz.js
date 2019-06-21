import React, { Component } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import SimpleModal from '../../SimpleModal';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';

class CreateQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoQuiz: {},
      quizData: '',
      name: '',
      description: '',
      open: false,
      coursId: 0,
    };
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
    this.cours = match.params.coursId;
    this.getInfo();
  }

  // componentDidMount() {
  //   const { location, history } = this.props;
  //   if (!location.state || !location.state.cours) {
  //     history.push('/CreateParcours');
  //   }
  // }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveCours = (event) => {
    const { name, description } = this.state;
    const { firestore } = this.props;
    const db = firestore;
    const quizSet = db.collection('parcours').doc(this.parcours).collection('cours');
    const quiz = quizSet.doc(this.cours);
    quiz.set({
      type: 'quiz', name, description, finish: true, creator: localStorage.getItem('userid'),
    }, { merge: true });
    event.preventDefault();
    const { history } = this.props;
    history.push(`/createparcours/${this.parcours}/addcours`);
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
    const { history } = this.props;
    const {
      infoQuiz, name, description, open, coursId,
    } = this.state;

    return (
      <Grid container>
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            history.goBack();
          }}
        />
        <Grid item xs={12}>
          <SimpleModal open={open} idCours={coursId} togle={this.close} deleted={this.deleting} />
          <h1>Création de quiz</h1>

          {Object.keys(infoQuiz).length > 0
            ? <h2 style={{ marginTop: '8px' }}>Aperçu du quiz en cours</h2>
            : <p style={{ marginTop: '8px' }}>Ce quiz ne contient pas encore de questions</p>
          }
          {Object.keys(infoQuiz).length > 0 && Object.keys(infoQuiz).map((key, index) => (
            <>
              <h3 style={{ marginTop: '8px' }}>
                {`Question ${index}`}
                {' '}
                <span><DeleteIcon onClick={() => this.open(key)} /></span>
              </h3>
              <p key={infoQuiz.key}>
                {infoQuiz[key].question}
              </p>
              {infoQuiz[key].answers.map(answer => <p key={answer}>{answer}</p>)}
              <p key={infoQuiz[key]}>
                Numéro de la bonne réponse :
                {' '}
                {infoQuiz[key].correct}
              </p>
            </>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Link to={`/createparcours/${this.parcours}/${this.cours}/addquestion`}>
            <Button
              size="medium"
              variant="contained"
              style={{ marginTop: '8%' }}
              className="Button"
            >
              Ajouter une question
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
            onChange={this.onChange}
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
            onChange={this.onChange}
            style={{ marginTop: '5%', width: '50%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            size="large"
            variant="contained"
            onClick={this.saveCours}
            style={{ marginTop: '8%' }}
            className="Button"
          >
            Enregistrer ce cours
          </Button>
        </Grid>
      </Grid>
    );
  }
}


export default withRouter(withFirebaseContext(CreateQuiz));
