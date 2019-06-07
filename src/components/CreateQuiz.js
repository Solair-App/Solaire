import React from 'react';

class CreateQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            question: " ",
         }
    }

    render () {
      return (
        <form>
        
          <label>Quiz</label>
          <input type="question" name="text" />
          
        </form>
      );
    }
  }

  export default CreateQuiz;