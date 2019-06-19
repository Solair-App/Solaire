import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';

class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      correct: '',
    };
    this.answers = [];
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
    this.cours = match.params.coursId;
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { question, correct } = this.state;
    const { firestore } = this.props;
    const db = firestore;
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
    history.push({
      pathname: `/createparcours/${this.parcours}/${this.cours}/addquiz`,
      state: { cours: true },
    });
  };

  saveAnswer = () => {
    const { answer } = this.state;
    this.answers.push(answer);
    this.setState({ answer: '' });
  };

  render() {
    const { question, answer, correct } = this.state;
    const isInvalid = question === '' || this.answers.length === 0 || correct === '';
    return (
      <div>
        <form
          onSubmit={this.onSubmit}
          className="classesContainer"
          autoComplete="off"
        >
          <Grid container>
            <Grid item xs={12}>
              <h1>Ajouter une question</h1>
              <TextField
                required
                id="question"
                label="Créer une question"
                name="question"
                className="textfield"
                value={question}
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
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
                style={{ marginTop: '5%', width: '50%' }}
              />
              <Button
                size="small"
                type="button"
                onClick={this.saveAnswer}
                variant="contained"
                style={{ position: 'fixed center', marginTop: '8%' }}
                className="Button"
              >
                Enregistrer cette réponse
              </Button>
              {this.answers.length > 0 ? <h4>Choix de réponses</h4> : undefined}
              {this.answers.map((ans, index) => (
                <p>{`${index}/${ans}`}</p>
              ))}
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ marginTop: '5%', width: '50%' }}>
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
          <Button
            disabled={isInvalid}
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            style={{ position: 'fixed center', marginTop: '8%' }}
            className="Button"
          >
            Enregistrer cette question
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(CreateQuestion));
