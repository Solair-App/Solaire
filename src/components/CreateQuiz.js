import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import withFirebaseContext from '../Firebase/withFirebaseContext';

class CreateQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoQuiz: [],
    };
    this.getInfo();
  }
  componentWillMount() {
    console.log("hello")
  }

  // componentDidMount() {
  //   const { location, history } = this.props;
  //   if (!location.state || !location.state.cours) {
  //     history.push('/CreateParcours');
  //   }
  // }

  getInfo = () => {
    const { firestore } = this.props;
    console.log(localStorage.getItem('coursId'))

    const docRef = firestore.collection('parcours').doc(localStorage.getItem('id')).collection('cours').doc(localStorage.getItem('coursId'));
    docRef.get().then((doc) => {
      if (doc.exists) {
        const infoQuiz = doc.data();
        console.log(infoQuiz);
        this.setState({
          infoQuiz: [infoQuiz.questions],
        });
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }

  render() {
    const { infoQuiz } = this.state;
    if (infoQuiz[0]) {
      console.log('1', infoQuiz)
      console.log(infoQuiz[0][1])
    }

    return (
      <Grid container>
        <Grid item xs={12}>
          <h1>Création de quiz</h1>

          {Object.keys(infoQuiz).length > 0
            ? <h2>Aperçu du quiz en cours</h2>
            : <p>Ce quiz ne contient pas encore de questions</p>
          }
          {infoQuiz.map((question, index) => (
            <>
              <p key={question[index + 1].question}>
                {`${index}/${question[index + 1].question}`}
              </p>
              {question[index + 1].answers.map(answer => <p key={answer}>{`${index}/${answer}`}</p>)}
              <p>
                Numéro de la bonne réponse :
                {' '}
                {question[index + 1].correct}
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
          <Button
            size="large"
            variant="contained"
            style={{ marginTop: '8%' }}
            className="Button"
          >
            Publier ce quizz
          </Button>
        </Grid>
      </Grid>
    );
  }
}


export default withRouter(withFirebaseContext(CreateQuiz));
