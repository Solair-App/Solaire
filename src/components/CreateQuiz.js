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
      infoQuiz: {},
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

  render() {
    const { infoQuiz } = this.state;
    
    return (
      <Grid container>
        <Grid item xs={12}>
          <h1>Création de quiz</h1>

          {Object.keys(infoQuiz).length > 0
            ? <h2>Aperçu du quiz en cours</h2>
            : <p>Ce quiz ne contient pas encore de questions</p>
          }
          {Object.keys(infoQuiz).map((key, index) => (
            <>
              <h3>{`Question ${index}`}</h3>
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
