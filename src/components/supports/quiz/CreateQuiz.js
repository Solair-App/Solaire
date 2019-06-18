import React, { Component } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';

class CreateQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoQuiz: {},
      name: '',
      description: '',
    };
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
    const quizSet = db.collection('parcours').doc(localStorage.getItem('id')).collection('cours');
    const quiz = quizSet.doc(localStorage.getItem('coursId'));
    quiz.set({
      type: 'quiz', name, description, finish: true,
    }, { merge: true });
    event.preventDefault();
    const { history } = this.props;
    history.push('/AddCours');
  }

  getInfo = () => {
    const { firestore } = this.props;

    const docRef = firestore.collection('parcours').doc(localStorage.getItem('id')).collection('cours').doc(localStorage.getItem('coursId'));
    docRef.get().then((doc) => {
      if (doc.exists) {
        const infoQuiz = doc.data();
        this.setState({
          infoQuiz: infoQuiz.questions,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }

  redirect = (url) => {
    const { history } = this.props;
    history.push(url);
  }

  render() {
    const { infoQuiz } = this.state;
    const { name, description } = this.state;

    return (
      <Grid container>
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            this.redirect('/AddCours');
          }}
        />
        <Grid item xs={12}>
          <h1>Création de quiz</h1>

          {Object.keys(infoQuiz).length > 0
            ? <h2 style={{ marginTop: '8px' }}>Aperçu du quiz en cours</h2>
            : <p style={{ marginTop: '8px' }}>Ce quiz ne contient pas encore de questions</p>
          }
          {Object.keys(infoQuiz).length > 0 && Object.keys(infoQuiz).map((key, index) => (
            <>
              <h3 style={{ marginTop: '8px' }}>{`Question ${index}`}</h3>
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
          <Link to="/addquestion">
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
