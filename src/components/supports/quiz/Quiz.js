import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import QuizAlerte from './QuizAlerte';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.quiz = [];
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
    this.cours = match.params.coursId;
    if (localStorage.getItem('coursData')) {
      this.quiz = JSON.parse(localStorage.getItem('coursData'));
      // this.getInfo();
    } else {
      this.getInfo();
    }
    this.state = {
      current: 0,
      quiz: this.quiz.questions,
      correct: 0,
      incorrect: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  // end constructor

  resetQuiz = () => {
    this.setState({
      current: 0,
      correct: 0,
      incorrect: 0,
    });
  };

  getInfo = () => {
    const { firestore } = this.props;
    const docRef = firestore.collection('parcours').doc(this.parcours).collection('cours').doc(this.cours);
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

  handleClick(choice) {
    const {
      quiz, current, correct, incorrect,
    } = this.state;
    if (choice === quiz[Object.keys(quiz)[current]].correct) {
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
          style={{
            position: 'absolute', left: 9, top: 13, color: 'white', zIndex: 3,
          }}
          onClick={() => {
            history.goBack();
          }}
        />
        {quiz && Object.keys(quiz).length > current
          ? (
            <>
              <ScoreArea correct={correct} incorrect={incorrect} />
              <QuizArea handleClick={this.handleClick} dataSet={quiz[Object.keys(quiz)[current]]} />
            </>
          )
          : (
            <>
              <ScoreArea correct={correct} incorrect={incorrect} />
              <QuizAlerte parcours={this.parcours} cours={this.cours} resetQuiz={this.resetQuiz} />
            </>
          )
        }
      </div>
    );
  }
}

function Question({ dataSet }) {
  return (
    <h1 style={{
      fontSize: '2em', width: '96vw', marginLeft: '-7vw',
    }}
    >
      {dataSet.question}

    </h1>
  );
}

function Answer({ handleClick, answer, choice }) {
  const style = {
    width: 300,
    color: 'white',
    display: 'block',
    textAlign: 'center',
    fontSize: '1.5em',
    background: 'rgba(0, 0, 0, 0.5)',
    opacity: '0.5',
    marginBottom: 5,
    padding: 10,
    borderRadius: '20px',
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
    div: {
      width: '100%',
      display: 'block',
      textAlign: 'center',
      float: 'left',
    },
    header: {
      backgroundColor: '#138787',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      color: 'white',
      height: '50px',
      zIndex: 1,
      padding: 0,
      margin: 0,
      marginBottom: 20,
    },
  };

  return (
    <div style={style.div}>
      <h1 style={style.header}>Quiz</h1>
      <TotalCorrect correct={correct} />
      <TotalIncorrect incorrect={incorrect} />
    </div>
  );
}


export default withRouter(withFirebaseContext(Quiz));
