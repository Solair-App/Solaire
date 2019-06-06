import React from 'react';

import '../SCSS/Quiz.scss';

class Quiz extends React.Component {
  constructor(props) {
    super(props)

    const dataSet = [
      {
        question: " 1 + 1 = ?",
        answers: [
          "1",
          "2",
          "3",
          "4"
        ],
        correct: 1
      },
      {
        question: "Qui forme les reacts",
        answers: [
          "Gregory",
          "Alban",
          "Mael",
          "Google"
        ],
        correct: 3
      },
      {
        question: " A B C ?",
        answers: [
          "E",
          "9",
          "D",
          "&"
        ],
        correct: 2
      },
      {
        question: " 1 2 3 4 ",
        answers: [
          "D",
          "1234",
          "0",
          "5"
        ],
        correct: 3
      },
    ];


    this.state = { current: 0, dataSet: dataSet, correct: 0, incorrect: 0 }
    this.handleClick = this.handleClick.bind(this)

  } // end constructor

  handleClick(choice) {
    if (choice === this.state.dataSet[this.state.current].correct) {
      this.setState({ correct: this.state.correct + 1 })
    } else {
      this.setState({ incorrect: this.state.incorrect + 1 })
    }

    if (this.state.current === 3) {
      this.setState({ current: 0 })
      this.setState({ incorrect: 0 })
      this.setState({ correct: 0 })
    } else {
      this.setState({ current: this.state.current + 1 })
    }
  }

  render() {
    return (
      <div>
        <ScoreArea correct={this.state.correct} incorrect={this.state.incorrect} />
        <QuizArea handleClick={this.handleClick} dataSet={this.state.dataSet[this.state.current]} />
      </div>
    )
  }
}

function Question(props) {

  return (
    <h1>{props.dataSet.question}</h1>
  )
}

function Answer(props) {
  const style = {
    width: "80%",
    height: "100%",
    color: "white",
    display: "block",
    textAlign: "center",
    fontSize: "2em",
    background: "rgba(0, 0, 0, 0.5)",
    opacity: "0.5",
    margin: "10%",
    padding: "3%",
    borderRadius: "20px",

  }
  return (
    <div>
      <button style={style} onClick={() => props.handleClick(props.choice)}>{props.answer}</button>
    </div>
  )
}

function AnswerList(props) {
  const answers = []
  for (let i = 0; i < props.dataSet.answers.length; i++) {
    answers.push(<Answer choice={i} handleClick={props.handleClick} answer={props.dataSet.answers[i]} />)
  }
  return (
    <div>
      {answers}
    </div>
  )
}

function QuizArea(props) {
  const style = {
    width: "100%",
    display: "block",
    textAlign: "center",
    boxSizing: "border-box",
    float: "left",
    padding: "0 2em"
  }
  return (
    <div style={style}>
      <Question dataSet={props.dataSet} />
      <AnswerList dataSet={props.dataSet} handleClick={props.handleClick} />
    </div>
  )
}

function TotalCorrect(props) {
  const style = {
    width: "100%",
    display: "inline-block",
    textAlign: "center",

  }
  return (
    <h2 style={style}>Correct: {props.correct}</h2>
  )
}

function TotalIncorrect(props) {
  const style = {
    width: "100%",
    display: "inline-block",
    textAlign: "center",

  }
  return (
    <h2 style={style}>Incorrect: {props.incorrect}</h2>
  )
}

function ScoreArea(props) {
  const style = {
    width: "100%",
    display: "block",
    textAlign: "center",
    float: "left",
  }
  return (
    <div style={style} >
      <h1>Quiz</h1>
      <TotalCorrect correct={props.correct} />
      <TotalIncorrect incorrect={props.incorrect} />
    </div>
  )
}

export default Quiz;