import React from 'react';
import '../../../SCSS/Quiz.scss';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';


class Quiz extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.quiz = [];
    if (location.state && location.state.data) {
      this.quiz = location.state.data.questions;
      // this.getInfo();
    } else {
      this.getInfo();
    }
    this.state = {
      current: 0,
      quiz: this.quiz,
      correct: 0,
      incorrect: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  // end constructor

  getInfo = () => {
    const { firestore } = this.props;
    const docRef = firestore.collection('parcours').doc(localStorage.getItem('parcoursId')).collection('cours').doc(localStorage.getItem('coursId'));
    docRef.get().then((doc) => {
      if (doc.exists) {
        let quiz = doc.data();
        quiz = quiz.questions;
        this.setState({ quiz });
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  };

  redirect = (url) => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  }

  handleClick(choice) {
    const {
      quiz, current, correct, incorrect,
    } = this.state;
    if (choice === quiz[current + 1].correct) {
      this.setState({ correct: correct + 1 });
    } else {
      this.setState({ incorrect: incorrect + 1 });
    }

    // if (current === Object.keys(quiz).length) {
    //   this.setState({ current: 0 });
    //   this.setState({ incorrect: 0 });
    //   this.setState({ correct: 0 });
    // } else {
    this.setState({ current: current + 1 });
    // }
  }


  render() {
    const {
      quiz, current, correct, incorrect,
    } = this.state;
    const { history } = this.props;
    return (
      <div>
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            history.goBack();
          }}
        />
        {quiz && Object.keys(quiz).length > current
          ? (
            <>
              <ScoreArea correct={correct} incorrect={incorrect} />
              <QuizArea handleClick={this.handleClick} dataSet={quiz[current + 1]} />

            </>
          )
          : <ScoreArea correct={correct} incorrect={incorrect} />
        }
      </div>
    );
  }
}

function Question({ dataSet }) {
  return (
    <h1>{dataSet.question}</h1>
  );
}

function Answer({ handleClick, answer, choice }) {
  const style = {
    width: '80%',
    height: '100%',
    color: 'white',
    display: 'block',
    textAlign: 'center',
    fontSize: '2em',
    background: 'rgba(0, 0, 0, 0.5)',
    opacity: '0.5',
    margin: '10%',
    padding: '3%',
    borderRadius: '20px',

  };
  return (
    <div>
      <button type="button" style={style} onClick={() => handleClick(choice)}>{answer}</button>
    </div>
  );
}

function AnswerList({ dataSet, handleClick }) {
  const answers = [];
  if (dataSet.answers) {
    for (let i = 0; i < dataSet.answers.length; i += 1) {
      answers.push(<Answer choice={i} handleClick={handleClick} answer={dataSet.answers[i]} />);
    }
  }
  return (
    <div>
      {answers}
    </div>
  );
}

function QuizArea({ dataSet, handleClick }) {
  const style = {
    width: '100%',
    display: 'block',
    textAlign: 'center',
    boxSizing: 'border-box',
    float: 'left',
    padding: '0 2em',
  };
  return (
    <div style={style}>
      <Question dataSet={dataSet} />
      <AnswerList dataSet={dataSet} handleClick={handleClick} />
    </div>
  );
}

function TotalCorrect({ correct }) {
  const style = {
    width: '100%',
    display: 'inline-block',
    textAlign: 'center',

  };
  return (
    <h2 style={style}>
      Correct:
      {correct}
    </h2>
  );
}

function TotalIncorrect({ incorrect }) {
  const style = {
    width: '100%',
    display: 'inline-block',
    textAlign: 'center',

  };
  return (
    <h2 style={style}>
      Incorrect:
      {incorrect}
    </h2>
  );
}

function ScoreArea({ correct, incorrect }) {
  const style = {
    width: '100%',
    display: 'block',
    textAlign: 'center',
    float: 'left',
  };
  return (
    <div style={style}>
      <h1>Quiz</h1>
      <TotalCorrect correct={correct} />
      <TotalIncorrect incorrect={incorrect} />
    </div>
  );
}

export default withRouter(withFirebaseContext(Quiz));
