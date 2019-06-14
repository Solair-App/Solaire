import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import ListCours from './ListCours';
import TypeCours from './TypeCours';

class AddCours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  // componentDidMount() {
  //   const { location, history } = this.props;
  //   if (!location.state || !location.state.parcours) {
  //     history.push('/CreateParcours');
  //   } else {
  //     this.getDataBaseData();
  //   }
  // }

  getDataBaseData = () => {
    const { firestore } = this.props;
    const db = firestore;
    const parcours = db.collection('parcours').doc(localStorage.getItem('id'));
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
    const { firestore } = this.props;
    const db = firestore;
    const type = event.target.value;
    const { history } = this.props;
    const courseSet = db.collection('parcours').doc(localStorage.getItem('id')).collection('cours').doc();
    localStorage.setItem('coursId', courseSet.id);

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
    history.push({
      pathname: `/${cours}`,
      state: { cours: true },
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            this.redirect('/CreateParcours');
          }}
        />
        <h1>{data.name}</h1>
        <Link to="CreateParcours">
          <Button color="primary">
            <Edit />
            Modifier les options
          </Button>

        </Link>
        <ListCours courseName={data} />

        <TypeCours getType={this.getType} />
        <Button
          variant="outlined"
          name="thématique"
          className="Button"
          style={{
            margin: '30px 0 30px 0',
            width: '300px',
          }}
        >
          valider
        </Button>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(AddCours));
