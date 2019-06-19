import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import Add from '@material-ui/icons/Add';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import ListCours from './ListCours';
import TypeCours from './TypeCours';

class AddCours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
    this.cours = '';
    this.getDataBaseData();
  }

  submit = () => {
    this.makeCourseReadable();
    const { history } = this.props;
    history.push('/mydashboard');
  }

  getDataBaseData = () => {
    const { firestore } = this.props;
    const db = firestore;
    const parcours = db.collection('parcours').doc(this.parcours);
    parcours
      .get()
      .then((doc) => {
        const parcoursData = doc.data();
        this.setState({
          data: parcoursData,
        });
      });
  }

  redirect = (url) => {
    const { history } = this.props;
    history.push(url);
  }

  getType = (event) => {
    const { firestore, match } = this.props;
    this.parcours = match.params.parcoursId;
    const db = firestore;
    const type = event.target.value;

    const courseSet = db.collection('parcours').doc(this.parcours).collection('cours').doc();
    localStorage.setItem('coursId', courseSet.id);
    this.cours = courseSet.id;

    let cours;
    switch (type) {
      case 'Quizz':
        cours = 'addquiz';
        localStorage.setItem('questionNumb', 0);
        break;
      case 'Vidéo':
        cours = 'addvideo';
        break;
      case 'Slide':
        cours = 'createslider';
        localStorage.setItem('slideNumb', 0);
        break;
      default:
    }
    this.setState({
      cours,

    });
  }

  makeCourseReadable = () => {
    const { firestore } = this.props;
    const db = firestore;
    const courseSet = db.collection('parcours').doc(this.parcours);
    courseSet.set(
      {
        isReadable: true,
      }, { merge: true },
    );
  }

  redirectToLessons = () => {
    const { history } = this.props;
    const { cours } = this.state;
    history.push({
      pathname: `/createparcours/${this.parcours}/${this.cours}/${cours}`,
      state: { cours: true },
    });
  }

  render() {
    const { data } = this.state;
    const { history } = this.props;

    return (
      <div>
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            history.goBack();
          }}
        />
        <h1>{data.name}</h1>
        <Link to="CreateParcours">
          <Button color="primary">
            <Edit />
            Modifier les options
          </Button>

        </Link>
        <ListCours courseName={data} parcours={this.parcours} />

        <TypeCours getType={this.getType} />

        <Button onClick={() => { this.redirectToLessons(); }}>
          {' '}
          <Add style={{ marginRight: '10px' }} />
Ajouter un cours
        </Button>
        <div>
          <Button

            fullWidth

            size="large"
            onClick={this.submit}
            variant="contained"
          >
          Valider
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(AddCours));
