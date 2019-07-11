import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import '../../../SCSS/CreateParcours.scss';

class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      correct: '',
      error: '',
    };
    this.answers = [];
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
    this.cours = match.params.coursId;
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };


  isContentNull = () => {
    const { question, correct } = this.state;
    if (question === '' || this.answers.length === 0 || correct === '') {
      return true;
    }
    return false;
  };

  onSubmit = (event) => {
    const { question, correct } = this.state;
    const { firestore } = this.props;
    const db = firestore;
    if (this.isContentNull()) {
      this.setState({ error: 'Il faut une question et au moins une réponse' });
    } else {
      const quizSet = db.collection('parcours').doc(this.parcours).collection('cours');
      const quiz = quizSet.doc(this.cours);
      const questionNumber = parseInt(localStorage.getItem('questionNumb'), 10) + 1;
      localStorage.setItem('questionNumb', questionNumber);
      quiz.set(
        {
          questions: {
            [questionNumber]: { question, answers: this.answers, correct },
          },
        },
        { merge: true },
      );
      event.preventDefault();
      const { history } = this.props;
      history.push(`/createparcours/${this.parcours}/${this.cours}/addquiz`);
    }
  };

  saveAnswer = () => {
    const { answer } = this.state;
    this.answers.push(answer);
    this.setState({ answer: '' });
  };

  render() {
    const {
      question, error, answer, correct,
    } = this.state;
    return (
      <div>
        <div className="topFond">
          <ArrowBack
            style={{
              position: 'absolute', left: 9, top: 13, color: 'white',
            }}
            onClick={this.back}
          />
          <h1>Ajouter une question</h1>
        </div>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              required
              id="question"
              label="Créer une question"
              name="question"
              className="textfield"
              value={question}
              onChange={this.onChange}
              style={{ marginTop: '5%', width: '80%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="answer"
              label="Ajouter une réponse"
              name="answer"
              className="textfield"
              value={answer}
              onChange={this.onChange}
              style={{ marginTop: '5%', width: '80%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Fab
              variant="extended"
              size="medium"
              aria-label="Add"
              onClick={this.saveAnswer}
              style={{
                width: '280px',
                color: 'white',
                marginTop: '20px',
                marginBottom: '7px',
                backgroundColor: '#138787',
              }}
            >
                Enregistrer cette réponse
            </Fab>
            {this.answers.length > 0 && <h4>Choix de réponses</h4>}
            {this.answers.map((ans, index) => (
              <p>{`${index}/${ans}`}</p>
            ))}
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ marginTop: '5px', width: '80%' }}>
              <InputLabel htmlFor="correct">Bonne réponse</InputLabel>
              <Select
                value={correct}
                onChange={this.onChange}
                inputProps={{
                  name: 'correct',
                  id: 'correct',
                }}
              >
                {this.answers.map((ans, index) => (
                  <MenuItem value={index}>{`${index}/${ans}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Fab
          variant="extended"
          size="medium"
          aria-label="Add"
          onClick={this.onSubmit}
          style={{
            width: '320px',
            color: 'white',
            marginTop: '50px',
            backgroundColor: '#E15920',
          }}
        >
          <SaveIcon className="saveicon" />
            Enregistrer cette question
        </Fab>
        {error && <p style={{ margin: 'auto', paddingTop: '7px', width: '100%' }}>{error}</p>}
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(CreateQuestion));
