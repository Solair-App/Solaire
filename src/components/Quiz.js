import React from 'react';

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
      ];
      
      this.state = {current:0, dataSet:dataSet, correct:0, incorrect:0}
      this.handleClick = this.handleClick.bind(this)
      
    } // end constructor
    
    handleClick(choice) {
      if (choice === this.state.dataSet[this.state.current].correct) {
        this.setState({correct: this.state.correct + 1})
      } else {
        this.setState({incorrect: this.state.incorrect + 1})
      }
      
      if (this.state.current === 9) {
        this.setState({current: 0})
        this.setState({incorrect: 0})
        this.setState({correct: 0})
      } else {
           this.setState({current: this.state.current + 1}) 
      }
    }
    
    render() {
      return(
        <div>
          <ScoreArea correct={this.state.correct} incorrect={this.state.incorrect} />
          <QuizArea handleClick={this.handleClick} dataSet={this.state.dataSet[this.state.current]} />
        </div>
      )
    }
  }
  
  function Question(props) {
    const style = {
        width: "50%",
        height: "50%",
        color: "black",
        display: "block",
        textAlign: "center",
        boxSizing: "border-box",
    }
    return (
      <h1 style={style}>{props.dataSet.question}</h1>
    )
  }
  
  function Answer(props) {
    const style = {
      width: "50%",
      height: "50%",
      color: "black",
      display: "block",
      textAlign: "center",
      boxSizing: "border-box",
    }
    return(
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
    return(
      <div>
        {answers}
      </div>
    )
  }
  
  function QuizArea(props) {
    const style = {
      width: "50%",
      display: "block",
      textAlign: "center",
      boxSizing: "border-box",
      float: "left",
      padding: "0 2em"
    }
    return(
      <div style={style}>
        <Question dataSet={props.dataSet} />
        <AnswerList dataSet={props.dataSet} handleClick={props.handleClick} />
      </div>
    )
  }
  
  function TotalCorrect(props) {
      const style = {
      display: "inline-block",
      textAlign: "center",
      padding: "1em",
      background: "#eee",
      margin: "0 1em 0 0"
    }
    return(
      <h2 style={style}>Correct: {props.correct}</h2>
    )
  }
  
  function TotalIncorrect(props) {
    const style = {
      display: "inline-block", 
      textAlign: "center",   
      padding: "1em",
      background: "#eee",
      margin: "0 0 0 1em"
    }
    return(
      <h2 style={style}>Incorrect: {props.incorrect}</h2>
    )
  }
  
  function ScoreArea(props) {
    const style = {
      width: "50%",
      display: "block",
      textAlign: "center",
      float: "left",
      padding: "2em",
    }
    return(
      <div style={style} >
        <TotalCorrect correct={props.correct} />
        <TotalIncorrect incorrect={props.incorrect} />
      </div>
    )
  }

export default Quiz;